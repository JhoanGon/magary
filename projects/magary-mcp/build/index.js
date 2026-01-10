#!/usr/bin/env node
import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { ErrorCode, ListResourcesRequestSchema, McpError, ReadResourceRequestSchema, ListPromptsRequestSchema, GetPromptRequestSchema, } from '@modelcontextprotocol/sdk/types.js';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import * as fs from 'fs';
class MagaryMcpServer {
    server;
    components = [];
    constructor() {
        this.server = new Server({
            name: 'magary-mcp-server',
            version: '0.1.0',
        }, {
            capabilities: {
                resources: {},
                tools: {},
                prompts: {},
            },
        });
        this.setupResourceHandlers();
        this.setupPromptHandlers();
        // Error handling
        this.server.onerror = (error) => console.error('[MCP Error]', error);
        process.on('SIGINT', async () => {
            await this.server.close();
            process.exit(0);
        });
    }
    async init() {
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = dirname(__filename);
        const catalogPath = path.join(__dirname, 'catalog.json');
        try {
            const data = fs.readFileSync(catalogPath, 'utf-8');
            this.components = JSON.parse(data);
            console.error(`Magary MCP: Loaded ${this.components.length} components from catalog.`);
        }
        catch (e) {
            console.error(`Magary MCP ERROR: Could not load catalog from ${catalogPath}. Ensure you run 'pnpm run build' first.`);
            process.exit(1);
        }
        const transport = new StdioServerTransport();
        await this.server.connect(transport);
    }
    setupResourceHandlers() {
        // 1. List Resources (Catalog & Individual Components)
        this.server.setRequestHandler(ListResourcesRequestSchema, async () => {
            return {
                resources: [
                    {
                        uri: 'magary://catalog',
                        name: 'Magary Component Catalog',
                        mimeType: 'application/json',
                        description: 'List of all available Magary UI components',
                    },
                    ...this.components.map((comp) => ({
                        uri: `magary://component/${comp.selector}`,
                        name: `Component: ${comp.name}`,
                        mimeType: 'application/json',
                        description: comp.description,
                    })),
                ],
            };
        });
        // 2. Read Resource
        this.server.setRequestHandler(ReadResourceRequestSchema, async (request) => {
            const uri = request.params.uri;
            if (uri === 'magary://catalog') {
                const catalog = this.components.map((c) => ({
                    name: c.name,
                    selector: c.selector,
                    description: c.description,
                }));
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
                const component = this.components.find((c) => c.selector === selector);
                if (!component) {
                    throw new McpError(ErrorCode.InvalidRequest, `Component not found: ${selector}`);
                }
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
    }
    setupPromptHandlers() {
        this.server.setRequestHandler(ListPromptsRequestSchema, async () => {
            return {
                prompts: [
                    {
                        name: 'magary-expert',
                        description: 'Activates the Magary UI Expert persona with strict implementation rules.',
                    },
                ],
            };
        });
        this.server.setRequestHandler(GetPromptRequestSchema, async (request) => {
            if (request.params.name !== 'magary-expert') {
                throw new McpError(ErrorCode.MethodNotFound, 'Prompt not found');
            }
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
${this.components.map((c) => `- <${c.selector}>: ${c.name}`).join('\n')}
`,
                        },
                    },
                ],
            };
        });
    }
}
const server = new MagaryMcpServer();
server.init().catch(console.error);
