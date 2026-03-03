import { Component, inject } from '@angular/core';
import { MagaryCard, MagaryTabs, MagaryTab } from 'ng-magary';
import { Highlight } from 'ngx-highlightjs';
import { DemoI18nService } from '../../../i18n/demo-i18n.service';

@Component({
  selector: 'app-mcp',
  standalone: true,
  imports: [MagaryCard, MagaryTabs, MagaryTab, Highlight],
  templateUrl: './mcp.html',
  styleUrl: './mcp.scss',
})
export class Mcp {
  public readonly i18n = inject(DemoI18nService);

  readonly baseCommand = 'npx -y magary-mcp';

  readonly universalJsonConfig = `{
  "mcpServers": {
    "magary-mcp": {
      "command": "npx",
      "args": ["-y", "magary-mcp"]
    }
  }
}`;

  readonly cursorConfig = `{
  "mcpServers": {
    "magary-mcp": {
      "command": "npx",
      "args": ["-y", "magary-mcp"]
    }
  }
}`;

  readonly claudeConfig = `{
  "mcpServers": {
    "magary-mcp": {
      "command": "npx",
      "args": ["-y", "magary-mcp"]
    }
  }
}`;

  readonly claudePathConfig = `%APPDATA%\\\\Claude\\\\claude_desktop_config.json
~/Library/Application Support/Claude/claude_desktop_config.json
~/.config/Claude/claude_desktop_config.json`;

  readonly codexAddCommand = 'codex mcp add magary-mcp --command "npx -y magary-mcp"';

  readonly codexVerifyCommands = `codex mcp list
codex mcp get magary-mcp`;

  readonly codexToml = `[mcp_servers.magary-mcp]
command = "npx"
args = ["-y", "magary-mcp"]`;

  get verificationPrompts(): string {
    return `${this.i18n.translateDocs('mcp.promptsLine1')}
${this.i18n.translateDocs('mcp.promptsLine2')}`;
  }
}
