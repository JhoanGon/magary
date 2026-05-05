import { describe, it, expect } from 'vitest';
import { generateMCPCatalog } from './generate-mcp-catalog.mjs';
import { generateManifest } from './api-contract-lib.mjs';
import { enrichManifest } from './enrich-manifest.mjs';
import fs from 'node:fs';
import path from 'node:path';

// ---------------------------------------------------------------------------
// Integration test: verify generated catalog matches existing field shape
// This test runs the FULL pipeline (manifest → enrich → catalog) against the
// real public-api.ts and editorial.json.
// ---------------------------------------------------------------------------

describe('MCP Catalog Integration', () => {
  const entrypointPath = path.resolve('projects/ng-magary/src/public-api.ts');
  const editorialPath = path.resolve('projects/ng-magary/editorial.json');

  it('generates catalog from real public barrel with all required fields', () => {
    const manifest = generateManifest(entrypointPath);
    const editorial = JSON.parse(fs.readFileSync(editorialPath, 'utf8'));
    const enriched = enrichManifest(manifest, editorial);
    const catalog = generateMCPCatalog(enriched);

    // Must produce a non-empty catalog
    expect(catalog.length).toBeGreaterThan(0);

    // Every entry must have the backward-compatible fields
    const requiredFields = ['name', 'selector', 'inputs', 'outputs', 'description', 'filePath'];

    for (const entry of catalog) {
      for (const field of requiredFields) {
        expect(entry).toHaveProperty(field);
      }

      // name must be a non-empty string
      expect(typeof entry.name).toBe('string');
      expect(entry.name.length).toBeGreaterThan(0);

      // selector must be a string (may be empty for edge cases)
      expect(typeof entry.selector).toBe('string');

      // inputs must be an array of objects with name, type, required
      expect(Array.isArray(entry.inputs)).toBe(true);
      for (const input of entry.inputs) {
        expect(input).toHaveProperty('name');
        expect(input).toHaveProperty('type');
        expect(input).toHaveProperty('required');
      }

      // outputs must be an array of objects with name, description
      expect(Array.isArray(entry.outputs)).toBe(true);
      for (const output of entry.outputs) {
        expect(output).toHaveProperty('name');
        expect(output).toHaveProperty('description');
      }

      // description must be a non-trivial string (from editorial, not "Magary UI Component: ...")
      expect(typeof entry.description).toBe('string');
      expect(entry.description.length).toBeGreaterThan(0);
      expect(entry.description).not.toMatch(/^Magary UI Component:/);

      // filePath must be a string
      expect(typeof entry.filePath).toBe('string');
      expect(entry.filePath.length).toBeGreaterThan(0);
    }
  });

  it('all catalog names correspond to known editorial entries', () => {
    const manifest = generateManifest(entrypointPath);
    const editorial = JSON.parse(fs.readFileSync(editorialPath, 'utf8'));
    const enriched = enrichManifest(manifest, editorial);
    const catalog = generateMCPCatalog(enriched);

    for (const entry of catalog) {
      // Every public component should have an editorial entry
      expect(editorial.entries).toHaveProperty(entry.name);
      const editorialEntry = editorial.entries[entry.name];
      expect(editorialEntry.visibility).toBe('public');
    }
  });

  it('excludes companion and internal components', () => {
    const manifest = generateManifest(entrypointPath);
    const editorial = JSON.parse(fs.readFileSync(editorialPath, 'utf8'));
    const enriched = enrichManifest(manifest, editorial);
    const catalog = generateMCPCatalog(enriched);

    const names = catalog.map((c) => c.name);

    // Known companion components — must be excluded
    expect(names).not.toContain('MagaryAccordionTab');
    expect(names).not.toContain('MagaryTab');
    expect(names).not.toContain('MagaryGridItem');

    // Known internal entries — must be excluded
    expect(names).not.toContain('MagaryTemplate');

    // Public components — must be present
    expect(names).toContain('MagaryButton');
    expect(names).toContain('MagaryCard');
    expect(names).toContain('MagaryDialog');
    expect(names).toContain('MagaryInput');
    expect(names).toContain('MagaryTable');
  });

  it('catalog is a superset of old catalog names', () => {
    // The new catalog derived from the manifest should include at least
    // all the components the old regex scanner found.
    const manifest = generateManifest(entrypointPath);
    const editorial = JSON.parse(fs.readFileSync(editorialPath, 'utf8'));
    const enriched = enrichManifest(manifest, editorial);
    const catalog = generateMCPCatalog(enriched);

    const catalogNames = new Set(catalog.map((c) => c.name));

    // These names came from the OLD regex-based catalog.
    // Names adjusted to match barrel export names where old scanner
    // used raw class names (e.g., Sidebar → MagarySidebar).
    const oldCatalogNames = [
      'MagaryButton',
      'MagaryCard',
      'MagaryTabs',
      'MagaryAccordion',
      'MagaryFieldset',
      'MagaryOverlayPanel',
      'MagaryDialog',
      'MagaryConfirmDialog',
      'MagarySlideMenu',
      'MagarySteps',
      'MagarySidebar',        // old scanner: Sidebar
      'MagaryPanelmenu',
      'MagaryContextMenu',
      'MagaryBreadcrumb',
      'MagaryMessage',
      'MagaryImage',
      'MagaryGalleria',       // old scanner: GalleriaIconsModule
      'MagaryCarousel',       // old scanner: CarouselIconsModule
      'MagaryTag',
      'MagaryDivider',
      'MagarySkeleton',
      'MagaryAvatar',
      'MagaryToast',
      // MagaryToastItem is NOT a public barrel export — old regex scanner
      // incorrectly exposed an internal sub-component. New manifest correctly excludes it.
      'MagaryGrid',
      'MagarySwitch',
      'MagarySelect',
      'MagaryTextArea',
      'MagarySegmented',
      'MagarySlider',
      'MagaryRating',
      'MagaryInputNumber',
      'MagaryInput',
      'MagaryDatePicker',
      'MagaryRadioButton',
      'MagaryRadioGroup',
      'MagaryCheckbox',
      'MagaryCascadeSelect',
      'MagaryUpload',
      'MagarySpeedDial',
      'MagarySplitButton',
      'MagaryTable',
      'MagaryPickList',
      'MagaryPaginator',
      'MagaryOrderList',
      'MagaryOrganizationChart',
      'MagaryTree',
      'MagaryTimeline',
      'MagaryDataView',
      'MagaryKanban',
      'MagaryToolbar',        // old scanner: MagaryToolbar
    ];

    for (const oldName of oldCatalogNames) {
      expect(
        catalogNames.has(oldName),
        `Expected ${oldName} to be in new catalog`,
      ).toBe(true);
    }
  });
});
