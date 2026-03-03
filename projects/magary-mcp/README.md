# magary-mcp

This is the Model Context Protocol (MCP) server for the **ng-magary** Angular UI library. 

It is designed to be used locally by developers via their AI IDEs (like Cursor, Windsurf) or AI Assistants (like Claude Desktop) to provide instant expertise on `ng-magary` components, inputs, outputs, and implementation rules.

## Installation & Usage

Instead of hosting this in the cloud, you run this MCP server locally alongside your editor using `npx`. This ensures zero lag, zero downtime, and that you are always using the MCP server version that matches the npm registry.

### Using in Cursor
1. Open Cursor Settings.
2. Navigate to **Features > MCP**.
3. Click **+ Add new MCP server**.
4. Configure it as follows:
   * **Name:** `magary-expert`
   * **Type:** `command`
   * **Command:** `npx -y magary-mcp`
5. Save and enable it.

### Using in Claude Desktop
Add the following to your `claude_desktop_config.json`:
```json
{
  "mcpServers": {
    "magary-expert": {
      "command": "npx",
      "args": ["-y", "magary-mcp"]
    }
  }
}
```

## Features

- **Component Catalog (`magary://catalog`):** Access the full list of available UI components.
- **Component Details (`magary://component/:selector`):** Read exact properties, inputs, and outputs of any Magary component natively within the AI context.
- **Magary Expert Persona:** Activate the included prompt (`magary-expert`) to instruct your AI to strictly follow ng-magary rules (using `<magary-card>` instead of raw div cards, etc.).

## Publishing
To publish updates to the npm registry:
```bash
npm run build
npm publish
```
