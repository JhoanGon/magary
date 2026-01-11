import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { ListResourcesRequestSchema, ListPromptsRequestSchema, GetPromptRequestSchema, ReadResourceRequestSchema, ErrorCode, McpError, } from '@modelcontextprotocol/sdk/types.js';
import catalog from './catalog.json';
/**
 * Custom Transport for Cloudflare Workers (SSE)
 * Adapts the MCP Transport interface to Cloudflare's TransformStream
 */
class CloudflareSSETransport {
    writer = null;
    // Callback provided by the Server/Client to receive messages from us
    onmessage;
    onclose;
    onerror;
    // We can expose a method to efficiently manually feed messages from POST requests
    async handlePostMessage(message) {
        if (this.onmessage) {
            this.onmessage(message);
        }
    }
    // Called by Server when it wants to send a message to the client
    async send(message) {
        if (!this.writer)
            return; // Client not connected yet or disconnected
        try {
            const event = `event: message\ndata: ${JSON.stringify(message)}\n\n`;
            await this.writer.write(new TextEncoder().encode(event));
        }
        catch (error) {
            console.error('Failed to write to SSE stream', error);
            if (this.onerror)
                this.onerror(error);
        }
    }
    // Called by Server to start the transport (we don't need to do much here, just mark ready)
    async start() {
        // We are ready to accept messages once the writer is assigned
        // In the Cloudflare model, handleSSE assigns the writer.
    }
    async close() {
        if (this.writer) {
            try {
                await this.writer.close();
            }
            catch (e) { }
            this.writer = null;
        }
        if (this.onclose)
            this.onclose();
    }
    // Custom method to attach the Web Standard WritableStream writer
    setWriter(writer) {
        this.writer = writer;
        // Send initial endpoint event as expected by MCP clients
        // The endpoint is absolute or relative. Since we are in the worker, relative /messages works.
        const endpointEvent = `event: endpoint\ndata: /messages\n\n`;
        this.writer.write(new TextEncoder().encode(endpointEvent));
    }
}
export default {
    async fetch(request, env, ctx) {
        const url = new URL(request.url);
        if (request.method === 'GET' && url.pathname === '/sse') {
            return handleSSE(request);
        }
        if (request.method === 'POST' && url.pathname === '/messages') {
            return handleMessages(request);
        }
        return new Response('Magary MCP Server Running. Connect via /sse', {
            status: 200,
        });
    },
};
// Singleton Server & Transport (Warm Worker pattern)
let server = null;
let transport = null;
async function getInitializedServer() {
    if (server && transport)
        return { server, transport };
    transport = new CloudflareSSETransport();
    server = new Server({
        name: 'magary-mcp-server-worker',
        version: '0.1.0',
    }, {
        capabilities: {
            resources: {},
            prompts: {},
        },
    });
    // Setup Handlers
    server.setRequestHandler(ListResourcesRequestSchema, async () => {
        return {
            resources: [
                {
                    uri: 'magary://catalog',
                    name: 'Magary Component Catalog',
                    mimeType: 'application/json',
                    description: 'List of all available Magary UI components',
                },
                ...catalog.map((comp) => ({
                    uri: `magary://component/${comp.selector}`,
                    name: `Component: ${comp.name}`,
                    mimeType: 'application/json',
                    description: comp.description,
                })),
            ],
        };
    });
    server.setRequestHandler(ReadResourceRequestSchema, async (req) => {
        const uri = req.params.uri;
        if (uri === 'magary://catalog') {
            return {
                contents: [
                    {
                        uri,
                        mimeType: 'application/json',
                        text: JSON.stringify(catalog, null, 2),
                    },
                ],
            };
        }
        if (uri.startsWith('magary://component/')) {
            const selector = uri.split('/').pop();
            const component = catalog.find((c) => c.selector === selector);
            if (!component)
                throw new McpError(ErrorCode.InvalidRequest, `Component not found: ${selector}`);
            return {
                contents: [
                    {
                        uri,
                        mimeType: 'application/json',
                        text: JSON.stringify(component, null, 2),
                    },
                ],
            };
        }
        throw new McpError(ErrorCode.InvalidRequest, `Unknown resource: ${uri}`);
    });
    server.setRequestHandler(ListPromptsRequestSchema, async () => {
        return {
            prompts: [
                {
                    name: 'magary-expert',
                    description: 'Activates the Magary UI Expert persona with strict implementation rules.',
                },
            ],
        };
    });
    server.setRequestHandler(GetPromptRequestSchema, async (req) => {
        if (req.params.name !== 'magary-expert')
            throw new McpError(ErrorCode.MethodNotFound, 'Prompt not found');
        return {
            messages: [
                {
                    role: 'user',
                    content: {
                        type: 'text',
                        text: `You are a Magary UI Expert. You MUST strictly follow these rules:
1. ONLY use components from the 'ng-magary' library. Do NOT use native HTML elements like <button>, <input>, or <select> if a Magary equivalent exists.
2. Mapping Table:
   - <button> -> <magary-button>
   - <input type="text"> -> <magary-input>
   - <input type="checkbox"> -> <magary-checkbox>
   - <select> -> <magary-select>
   - <table> -> <magary-table>
3. Always use Standalone Components (imports: [MagaryButton, ...]).
4. Use Signals for Inputs.
5. If you need an icon, use <i-lucide name="..."> via LucideAngularModule.

Catalog of available components:
${catalog.map((c) => `- <${c.selector}>: ${c.name}`).join('\n')}
`,
                    },
                },
            ],
        };
    });
    await server.connect(transport);
    return { server, transport };
}
async function handleSSE(request) {
    const { transport } = await getInitializedServer();
    // Create a TransformStream for the SSE connection
    const stream = new TransformStream();
    const writer = stream.writable.getWriter();
    // Attach the writer to our transport so it can push events
    transport.setWriter(writer);
    // Keep connection alive helper (optional heartbeat)
    // Cloudflare might drop idle connections, MCP clients ideally ping or we send comments.
    // For now simple implem.
    return new Response(stream.readable, {
        headers: {
            'Content-Type': 'text/event-stream',
            'Cache-Control': 'no-cache',
            Connection: 'keep-alive',
            'Access-Control-Allow-Origin': '*', // Helpful for web clients
        },
    });
}
async function handleMessages(request) {
    const { transport } = await getInitializedServer();
    try {
        const body = (await request.json());
        await transport.handlePostMessage(body);
        return new Response('Accepted', { status: 202 });
    }
    catch (e) {
        console.error(e);
        return new Response('Error processing message', { status: 500 });
    }
}
