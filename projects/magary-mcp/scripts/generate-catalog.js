import { execSync } from 'child_process';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
// Structure: projects/magary-mcp/scripts/generate-catalog.ts
// Workspace root: ../../.. (from scripts → magary-mcp → projects → workspace root)
const workspaceRoot = path.resolve(__dirname, '../../..');
const outputPath = path.resolve(__dirname, '../src/catalog.json');
console.log(`Generating MCP catalog from enriched manifest...`);
try {
    execSync(`node tools/ci/generate-mcp-catalog.mjs "${outputPath}"`, {
        cwd: workspaceRoot,
        stdio: 'inherit',
    });
}
catch (err) {
    console.error('Catalog generation failed:', err.message);
    process.exit(1);
}
