import { DemoLanguage } from '../../../types';

export const MCP_DOC_TEXT = {
  es: {
    'mcp.title': 'Magary MCP (AI Assistant)',
    'mcp.subtitle': 'Convierte a tu IDE o Asistente AI en un experto en Magary UI.',
    'mcp.step1.title': 'Ejecución Local',
    'mcp.step1.desc':
      'El servidor MCP de Magary se ejecuta localmente en tu máquina usando npx. Esto garantiza latencia cero, evita desconexiones y asegura que estás utilizando la versión compatible con tu proyecto. Tienes que tener Node.js instalado.',
    'mcp.step1.recommended': 'Comando de ejecución base:',
    'mcp.step2.title': 'Configuración por IDE',
    'mcp.step2.desc': 'Elige tu herramienta preferida para ver las instrucciones exactas de integración.',
    'mcp.step2.vscode': 'VS Code',
    'mcp.step2.vscode.desc': 'Busca tu extensión de IA (RooCode, Clinic, etc) y pega este JSON en su configuración de servidores MCP:',
    'mcp.step2.cursor': 'Cursor',
    'mcp.step2.cursor.desc': 'Ve a Cursor Settings > Features > MCP. Agrega un nuevo servidor con nombre "magary-expert", selecciona el tipo "command" y usa el siguiente comando:',
    'mcp.step2.windsurf': 'Windsurf',
    'mcp.step2.windsurf.desc': 'Abre ~/.codeium/windsurf/mcp_config.json y agrega:',
    'mcp.step2.claude': 'Claude Desktop',
    'mcp.step2.claude.desc': 'Edita el archivo de configuración según tu sistema operativo local:',
    'mcp.step2.antigravity': 'Antigravity',
    'mcp.step2.antigravity.desc': 'En el panel del Agente > MCP Servers > Manage MCP Servers > Agrega este código JSON en el editor raw:',
    'mcp.step2.claudePaths': 'Rutas de configuración Claude Desktop:',
    'mcp.step3.title': 'Codex CLI',
    'mcp.step3.desc':
      'Si prefieres configurarlo a través de la línea de comandos abierta de Codex:',
    'mcp.step3.addServer': 'Agregar servidor',
    'mcp.step3.verify': 'Verificar conexión',
    'mcp.step3.note': 'Config manual opcional: ~/.codex/config.toml',
    'mcp.step4.title': 'Verificación de Vida',
    'mcp.step4.desc':
      'Después de configurar MCP, reinicia tu IDE y abre un chat nuevo. Prueba conectarlo con estos prompts:',
    'mcp.step4.tip1': 'Asegúrate de ejecutar "npm run docs" o de tener tu proyecto Magary sirviendo antes para que el MCP extraiga las métricas locales si aplican.',
    'mcp.promptsLine1':
      'Lista los recursos disponibles del servidor MCP "magary-mcp".',
    'mcp.promptsLine2':
      'Lee "magary://catalog" y dame un resumen de los componentes.',
  },
  en: {
    'mcp.title': 'Magary MCP (AI Assistant)',
    'mcp.subtitle': 'Turn your IDE or AI Assistant into a Magary UI expert.',
    'mcp.step1.title': 'Local Execution',
    'mcp.step1.desc':
      'The Magary MCP server runs locally on your machine using npx. This guarantees zero latency, avoids disconnects, and ensures you are using the version compatible with your project. Node.js is required.',
    'mcp.step1.recommended': 'Base execution command:',
    'mcp.step2.title': 'IDE Configuration',
    'mcp.step2.desc': 'Choose your preferred tool to see exact integration instructions.',
    'mcp.step2.vscode': 'VS Code',
    'mcp.step2.vscode.desc': 'Find your AI extension (RooCode, Clinic, etc) and paste this JSON in its MCP servers config:',
    'mcp.step2.cursor': 'Cursor',
    'mcp.step2.cursor.desc': 'Go to Cursor Settings > Features > MCP. Add a new server named "magary-mcp", select "command" type and use this command:',
    'mcp.step2.windsurf': 'Windsurf',
    'mcp.step2.windsurf.desc': 'Open ~/.codeium/windsurf/mcp_config.json and append:',
    'mcp.step2.claude': 'Claude Desktop',
    'mcp.step2.claude.desc': 'Edit your configuration file based on your local OS:',
    'mcp.step2.antigravity': 'Antigravity',
    'mcp.step2.antigravity.desc': 'Agent panel > MCP Servers > Manage MCP Servers > Add this JSON code in the raw editor:',
    'mcp.step2.claudePaths': 'Claude Desktop config paths:',
    'mcp.step3.title': 'Codex CLI',
    'mcp.step3.desc': 'If you manage your MCP environment via Codex CLI:',
    'mcp.step3.addServer': 'Add server',
    'mcp.step3.verify': 'Verify Connection',
    'mcp.step3.note': 'Optional manual config: ~/.codex/config.toml',
    'mcp.step4.title': 'Sanity Check',
    'mcp.step4.desc':
      'After configuring the MCP, restart your IDE and open a new chat session. Validate the hook with these prompts:',
    'mcp.step4.tip1': 'Make sure you have Node.js and NPM correctly installed and added to your system PATH.',
    'mcp.promptsLine1':
      'List the available resources from MCP server "magary-mcp".',
    'mcp.promptsLine2':
      'Read "magary://catalog" and give me a summary of components.',
  }
} as const satisfies Record<DemoLanguage, Record<string, string>>;
