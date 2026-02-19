import { Component } from '@angular/core';
import { MagaryCard } from 'ng-magary';
import { Highlight } from 'ngx-highlightjs';

@Component({
  selector: 'app-mcp',
  standalone: true,
  imports: [MagaryCard, Highlight],
  templateUrl: './mcp.html',
  styleUrl: './mcp.scss',
})
export class Mcp {
  readonly endpoint = 'https://magary-mcp.zebasg-07.workers.dev/sse';

  readonly recommendedBridgeConfig = `{
  "mcpServers": {
    "magary-mcp": {
      "command": "npx",
      "args": ["-y", "mcp-remote", "https://magary-mcp.zebasg-07.workers.dev/sse"]
    }
  }
}`;

  readonly directRemoteConfig = `{
  "mcpServers": {
    "magary-mcp": {
      "url": "https://magary-mcp.zebasg-07.workers.dev/sse"
    }
  }
}`;

  readonly codexAddCommand =
    'codex mcp add magary-mcp --url https://magary-mcp.zebasg-07.workers.dev/sse';

  readonly codexVerifyCommands = `codex mcp list
codex mcp get magary-mcp`;

  readonly codexToml = `[mcp_servers.magary-mcp]
url = "https://magary-mcp.zebasg-07.workers.dev/sse"`;

  readonly claudePathConfig = `%APPDATA%\\\\Claude\\\\claude_desktop_config.json
~/Library/Application Support/Claude/claude_desktop_config.json
~/.config/Claude/claude_desktop_config.json`;

  readonly verificationPrompts = `Lista los recursos disponibles del servidor MCP "magary-mcp".
Lee "magary://catalog" y dime los componentes disponibles.`;
}
