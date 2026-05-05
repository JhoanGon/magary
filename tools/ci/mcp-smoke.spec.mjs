import { describe, it, expect } from 'vitest';
import { generateMCPCatalog } from './generate-mcp-catalog.mjs';
import { generateManifest } from './api-contract-lib.mjs';
import { enrichManifest, filterByVisibility } from './enrich-manifest.mjs';
import fs from 'node:fs';
import path from 'node:path';

// ---------------------------------------------------------------------------
// E2E Smoke Test: verify MCP catalog works end-to-end
// Simulates: build → catalog generation → server load → get_catalog response
// ---------------------------------------------------------------------------

describe('MCP E2E Smoke', () => {
  const entrypointPath = path.resolve('projects/ng-magary/src/public-api.ts');
  const editorialPath = path.resolve('projects/ng-magary/editorial.json');
  const catalogOutputPath = path.resolve('projects/magary-mcp/src/catalog.json');

  it('generated catalog.json is valid JSON parseable by MCP server', () => {
    // Step 1: Generate the catalog through the full pipeline
    const manifest = generateManifest(entrypointPath);
    const editorial = JSON.parse(fs.readFileSync(editorialPath, 'utf8'));
    const enriched = enrichManifest(manifest, editorial);
    const catalog = generateMCPCatalog(enriched);

    // Step 2: Write to file (simulating build)
    fs.writeFileSync(catalogOutputPath, JSON.stringify(catalog, null, 2) + '\n', 'utf8');

    // Step 3: Read back (simulating MCP server init)
    const data = fs.readFileSync(catalogOutputPath, 'utf-8');
    const parsed = JSON.parse(data);

    // Step 4: Verify shape matches what MCP server expects
    // MCP server maps: { name, selector, description } for get_catalog
    expect(Array.isArray(parsed)).toBe(true);
    expect(parsed.length).toBeGreaterThan(0);

    for (const entry of parsed) {
      // These three fields are what get_catalog tool returns
      expect(typeof entry.name).toBe('string');
      expect(typeof entry.selector).toBe('string');
      expect(typeof entry.description).toBe('string');

      // The prompt handler uses selector and name
      expect(entry.name.length).toBeGreaterThan(0);
      expect(entry.selector.length).toBeGreaterThan(0);
      expect(entry.description.length).toBeGreaterThan(0);
    }
  });

  it('get_catalog response shape is backward-compatible', () => {
    // Simulates what the MCP server's CallToolRequestSchema handler does:
    // this.components.map(c => ({ name: c.name, selector: c.selector, description: c.description }))
    const manifest = generateManifest(entrypointPath);
    const editorial = JSON.parse(fs.readFileSync(editorialPath, 'utf8'));
    const enriched = enrichManifest(manifest, editorial);
    const catalog = generateMCPCatalog(enriched);

    const getCatalogResponse = catalog.map((c) => ({
      name: c.name,
      selector: c.selector,
      description: c.description,
    }));

    // Verify the response
    expect(getCatalogResponse.length).toBe(catalog.length);

    for (const item of getCatalogResponse) {
      expect(item).toHaveProperty('name');
      expect(item).toHaveProperty('selector');
      expect(item).toHaveProperty('description');
    }

    // Snapshot check: known public components must be present
    const names = getCatalogResponse.map((i) => i.name);
    expect(names).toContain('MagaryButton');
    expect(names).toContain('MagaryDialog');
    expect(names).toContain('MagaryTable');
    expect(names).toContain('MagaryInput');
    expect(names).toContain('MagarySelect');

    // Descriptions are from editorial (not "Magary UI Component: ...")
    const button = getCatalogResponse.find((i) => i.name === 'MagaryButton');
    expect(button.description).not.toMatch(/^Magary UI Component:/);
    expect(button.description).toContain('Primary action button');
  });

  it('prompt handler component list includes all catalog entries', () => {
    // Simulates what SetupPromptHandlers does:
    // ${this.components.map(c => `- <${c.selector}>: ${c.name}`).join('\n')}
    const manifest = generateManifest(entrypointPath);
    const editorial = JSON.parse(fs.readFileSync(editorialPath, 'utf8'));
    const enriched = enrichManifest(manifest, editorial);
    const catalog = generateMCPCatalog(enriched);

    const promptLines = catalog.map((c) => `- <${c.selector}>: ${c.name}`);

    expect(promptLines.length).toBe(catalog.length);

    // Each line must be valid — selector can be tag name or CSS attribute
    for (const line of promptLines) {
      expect(line).toMatch(/^- <[\w\[\]-]+>: \w+/);
      expect(line.length).toBeLessThan(200); // reasonable max
    }

    // Known entries in prompt
    const fullPrompt = promptLines.join('\n');
    expect(fullPrompt).toContain('<magary-button>: MagaryButton');
    expect(fullPrompt).toContain('<magary-dialog>: MagaryDialog');
    expect(fullPrompt).toContain('<magary-table>: MagaryTable');
  });

  it('resource handler can read individual component by selector', () => {
    // Simulates ReadResourceRequestSchema:
    // const selector = uri.split('/').pop();
    // const component = this.components.find(c => c.selector === selector);
    const manifest = generateManifest(entrypointPath);
    const editorial = JSON.parse(fs.readFileSync(editorialPath, 'utf8'));
    const enriched = enrichManifest(manifest, editorial);
    const catalog = generateMCPCatalog(enriched);

    // Test lookup by selector for various components
    const lookups = [
      { selector: 'magary-button', expectedName: 'MagaryButton' },
      { selector: 'magary-dialog', expectedName: 'MagaryDialog' },
      { selector: 'magary-input', expectedName: 'MagaryInput' },
      { selector: 'magary-table', expectedName: 'MagaryTable' },
      { selector: 'magary-checkbox', expectedName: 'MagaryCheckbox' },
    ];

    for (const { selector, expectedName } of lookups) {
      const component = catalog.find((c) => c.selector === selector);
      expect(component, `Component with selector "${selector}" not found`).toBeDefined();
      expect(component.name).toBe(expectedName);

      // Verify the resource response shape (what MCP returns)
      const resourceResponse = JSON.stringify(component);
      expect(resourceResponse).toContain(component.name);
      expect(resourceResponse).toContain(component.selector);
    }
  });
});
