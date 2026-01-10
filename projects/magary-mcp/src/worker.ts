import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { SSEServerTransport } from '@modelcontextprotocol/sdk/server/sse.js';
import {
  ListResourcesRequestSchema,
  ListPromptsRequestSchema,
  GetPromptRequestSchema,
  ReadResourceRequestSchema,
  ErrorCode,
  McpError,
} from '@modelcontextprotocol/sdk/types.js';
import catalog from './catalog.json';

// Define the component docs interface locally since we can't easily import from other files in simple workers without bundling
// But since we are bundling with tsc/rollup or just relying on wrangler, we can try importing.
// For safety/simplicity in this file, we'll just use 'any' or the implicit type of the JSON.

export default {
  async fetch(request: Request, env: any, ctx: any): Promise<Response> {
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

// Global server instance (in memory, effective for warm workers)
let server: Server | null = null;
let transport: SSEServerTransport | null = null;

async function getInitializedServer() {
  if (server) return { server, transport };

  transport = new SSEServerTransport('/messages', new Response());
  server = new Server(
    {
      name: 'magary-mcp-server-worker',
      version: '0.1.0',
    },
    {
      capabilities: {
        resources: {},
        prompts: {},
      },
    },
  );

  // Setup Handlers (Duplicated logic from index.ts but adapted for worker context if needed)
  // Resources
  server.setRequestHandler(ListResourcesRequestSchema, async () => {
    return {
      resources: [
        {
          uri: 'magary://catalog',
          name: 'Magary Component Catalog',
          mimeType: 'application/json',
          description: 'List of all available Magary UI components',
        },
        ...catalog.map((comp: any) => ({
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
      const component = catalog.find((c: any) => c.selector === selector);
      if (!component)
        throw new McpError(
          ErrorCode.InvalidRequest,
          `Component not found: ${selector}`,
        );
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

  // Prompts
  server.setRequestHandler(ListPromptsRequestSchema, async () => {
    return {
      prompts: [
        {
          name: 'magary-expert',
          description:
            'Activates the Magary UI Expert persona with strict implementation rules.',
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
${catalog.map((c: any) => `- <${c.selector}>: ${c.name}`).join('\n')}
`,
          },
        },
      ],
    };
  });

  await server.connect(transport);
  return { server, transport };
}

async function handleSSE(request: Request): Promise<Response> {
  const { transport } = await getInitializedServer();

  // SSEServerTransport in the SDK expects specific node-like handling or manual start
  // We need to manually construct the SSE response compatible with Cloudflare
  // The SDK's SSEServerTransport usually handles 'res.write', which we can't do natively here the same way without a stream.
  // However, for MCP specifically, the transport abstraction helps.
  // NOTE: The official Node SDK SSEServerTransport is tied to Node's http.ServerResponse.
  // For Cloudflare, it is easier to implement a simple manual SSE handshake.

  // Changing strategy: We will just return the transport's sessionId and let client post messages.
  // Actually, let's try to reuse the transport's internal logic if possible, IF NOT, we stream manually.

  // The SDK SSEServerTransport.start(req, res) uses res.writeHead/write.
  // We mock these for the worker environment.

  const { readable, writable } = new TransformStream();
  const writer = writable.getWriter();
  const encoder = new TextEncoder();

  // Hacky adapter to make Node SDK happy
  const mockRes = {
    writeHead: (status: number, headers: any) => {},
    write: (chunk: string) => {
      writer.write(encoder.encode(chunk));
    },
    end: () => {
      writer.close();
    },
  } as any;

  const mockReq = {
    url: request.url,
  } as any;

  // Start the transport (sends connection initialized event)
  await transport!.start(mockReq, mockRes);

  // Send the endpoint URL for POST messages (the client needs to know where to send subsequent POSTs)
  // The SDK sends "endpoint: /messages" usually.

  return new Response(readable, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive',
    },
  });
}

async function handleMessages(request: Request): Promise<Response> {
  const { transport } = await getInitializedServer();

  // Parse JSON body
  const body = await request.json(); // as JSON-RPC message

  // Feed it to the transport
  await transport!.handlePostMessage(
    {
      url: request.url,
      body: body,
    } as any,
    {} as any,
  ); // Req, Res - SDK doesn't strictly use Res for handlePostMessage if we look at source, it processes and sends via SSE channel.

  return new Response('Accepted', { status: 202 });
}
