import fs from 'node:fs';
import path from 'node:path';
import { generateManifest } from './api-contract-lib.mjs';
import { enrichManifest, filterByVisibility } from './enrich-manifest.mjs';

// ---------------------------------------------------------------------------
// MCP Catalog generation
// ---------------------------------------------------------------------------

/**
 * Generates an MCP-compatible catalog from an enriched manifest.
 * Filters by visibility=public and includes only components and directives.
 * Maps each entry to the backward-compatible catalog shape:
 * { name, selector, inputs, outputs, description, filePath }
 *
 * @param {{version: number, generatedAt: string, exports: Array<object>}} enrichedManifest
 * @returns {Array<{name: string, selector: string, inputs: Array, outputs: Array, description: string, filePath: string}>}
 */
export function generateMCPCatalog(enrichedManifest) {
  const publicManifest = filterByVisibility(enrichedManifest, 'public');

  return publicManifest.exports
    .filter((entry) => entry.kind === 'component' || entry.kind === 'directive')
    .map((entry) => ({
      name: entry.name,
      selector: entry.selector || '',
      inputs: (entry.inputs || []).map((i) => ({
        name: i.name,
        type: i.type,
        required: i.required,
      })),
      outputs: (entry.outputs || []).map((o) => ({
        name: o.name,
        description: `Event emitter for ${o.name}`,
      })),
      description: entry.description || `${entry.name} (${entry.selector || 'no-selector'})`,
      filePath: entry.sourceFile || '',
    }));
}

// ---------------------------------------------------------------------------
// CLI mode — invoked directly via `node tools/ci/generate-mcp-catalog.mjs`
// ---------------------------------------------------------------------------

const isMainModule = process.argv[1] && process.argv[1].endsWith('generate-mcp-catalog.mjs');

if (isMainModule) {
  // Accept optional --root flag for running from subdirectories
  const rootArgIndex = process.argv.indexOf('--root');
  const rootDir = rootArgIndex !== -1 ? path.resolve(process.argv[rootArgIndex + 1]) : process.cwd();
  const outputPath = process.argv[2] && !process.argv[2].startsWith('--')
    ? path.resolve(rootDir, process.argv[2])
    : path.resolve(rootDir, 'projects/magary-mcp/src/catalog.json');

  const entrypoint = path.resolve(rootDir, 'projects/ng-magary/src/public-api.ts');
  const editorialPath = path.resolve(rootDir, 'projects/ng-magary/editorial.json');

  const manifest = generateManifest(entrypoint);
  const editorial = JSON.parse(fs.readFileSync(editorialPath, 'utf8'));
  const enriched = enrichManifest(manifest, editorial);
  const catalog = generateMCPCatalog(enriched);

  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, JSON.stringify(catalog, null, 2) + '\n', 'utf8');
  console.log(
    `MCP Catalog written to ${outputPath} (${catalog.length} public components/directives).`,
  );
}
