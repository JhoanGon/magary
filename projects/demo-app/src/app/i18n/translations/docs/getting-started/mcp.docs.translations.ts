import { DemoLanguage } from '../../../types';

export const MCP_DOC_TEXT = {
  es: {
    'mcp.title': 'MCP',
    'mcp.subtitle': 'Guia rapida para conectar magary-mcp en tu IDE.',
    'mcp.step1.title': 'Endpoint oficial',
    'mcp.step1.desc':
      'Este es el endpoint remoto SSE del servidor MCP de Magary. Todas las configuraciones de esta pagina usan esta URL.',
    'mcp.step2.title': 'Configuracion recomendada (mcp-remote)',
    'mcp.step2.desc':
      'Para mayor compatibilidad entre clientes MCP, usa el bridge mcp-remote. Si tu cliente soporta URL remota directa, usa la opcion alternativa.',
    'mcp.step2.recommended': 'Recomendada',
    'mcp.step2.alternative': 'Alternativa (URL directa)',
    'mcp.step3.title': 'Codex (CLI + Extension)',
    'mcp.step3.desc':
      'Agrega el servidor, verifica y abre un chat nuevo en Codex.',
    'mcp.step3.addServer': 'Agregar servidor',
    'mcp.step3.verify': 'Verificar',
    'mcp.step3.note': 'Config manual opcional: ~/.codex/config.toml',
    'mcp.step4.title': 'Cursor, Claude, Antigravity, VS Code',
    'mcp.step4.vscode':
      'VS Code: configura MCP desde tu extension cliente (UI o JSON), no hay un archivo universal del core de VS Code.',
    'mcp.step4.cursor':
      'Cursor: usa .cursor/mcp.json (proyecto) o ~/.cursor/mcp.json (global).',
    'mcp.step4.claude':
      'Claude Desktop: edita el archivo de configuracion segun tu sistema.',
    'mcp.step4.antigravity':
      'Antigravity: Agent panel > MCP Servers > Manage MCP Servers > View raw config.',
    'mcp.step4.claudePaths': 'Rutas de Claude',
    'mcp.step4.recommendedJson': 'JSON recomendado para estos clientes',
    'mcp.step5.title': 'Verificacion y troubleshooting',
    'mcp.step5.desc':
      'Despues de configurar MCP, reinicia el IDE y abre una sesion nueva. Luego valida con estos prompts:',
    'mcp.step5.tip1': 'Si no aparecen herramientas, reinicia IDE y chat/sesion.',
    'mcp.step5.tip2':
      'Si usas mcp-remote, verifica que Node.js y npx esten instalados.',
    'mcp.step5.tip3':
      'Si falla HTTPS en red corporativa, revisa proxy/SSL interception.',
    'mcp.promptsLine1':
      'Lista los recursos disponibles del servidor MCP "magary-mcp".',
    'mcp.promptsLine2':
      'Lee "magary://catalog" y dime los componentes disponibles.',
  },
  en: {
    'mcp.title': 'MCP',
    'mcp.subtitle': 'Quick guide to connect magary-mcp in your IDE.',
    'mcp.step1.title': 'Official endpoint',
    'mcp.step1.desc':
      'This is the remote SSE endpoint for Magary MCP server. Every config on this page uses this URL.',
    'mcp.step2.title': 'Recommended config (mcp-remote)',
    'mcp.step2.desc':
      'For best compatibility across MCP clients, use the mcp-remote bridge. If your client supports direct remote URL, use the alternative option.',
    'mcp.step2.recommended': 'Recommended',
    'mcp.step2.alternative': 'Alternative (direct URL)',
    'mcp.step3.title': 'Codex (CLI + extension)',
    'mcp.step3.desc': 'Add the server, verify it, and open a new Codex chat.',
    'mcp.step3.addServer': 'Add server',
    'mcp.step3.verify': 'Verify',
    'mcp.step3.note': 'Optional manual config: ~/.codex/config.toml',
    'mcp.step4.title': 'Cursor, Claude, Antigravity, VS Code',
    'mcp.step4.vscode':
      'VS Code: configure MCP from your client extension (UI or JSON); there is no universal core VS Code MCP file.',
    'mcp.step4.cursor':
      'Cursor: use .cursor/mcp.json (project) or ~/.cursor/mcp.json (global).',
    'mcp.step4.claude':
      'Claude Desktop: edit the configuration file based on your OS.',
    'mcp.step4.antigravity':
      'Antigravity: Agent panel > MCP Servers > Manage MCP Servers > View raw config.',
    'mcp.step4.claudePaths': 'Claude paths',
    'mcp.step4.recommendedJson': 'Recommended JSON for these clients',
    'mcp.step5.title': 'Verification and troubleshooting',
    'mcp.step5.desc':
      'After configuring MCP, restart the IDE and open a new session. Then validate with these prompts:',
    'mcp.step5.tip1': 'If tools do not appear, restart IDE and chat/session.',
    'mcp.step5.tip2':
      'If you use mcp-remote, verify Node.js and npx are installed.',
    'mcp.step5.tip3':
      'If HTTPS fails on a corporate network, review proxy/SSL interception settings.',
    'mcp.promptsLine1':
      'List the available resources from MCP server "magary-mcp".',
    'mcp.promptsLine2':
      'Read "magary://catalog" and tell me which components are available.',
  },
} as const satisfies Record<DemoLanguage, Record<string, string>>;
