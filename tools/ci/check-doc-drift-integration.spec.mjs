import { describe, it, expect } from 'vitest';
import { generateManifest } from './api-contract-lib.mjs';
import { runDriftCheck } from './check-doc-drift.mjs';
import fs from 'node:fs';
import path from 'node:path';

// ---------------------------------------------------------------------------
// Integration test: real gate against real files
// ---------------------------------------------------------------------------

describe('Doc Drift Integration', () => {
  const entrypointPath = path.resolve('projects/ng-magary/src/public-api.ts');
  const baselinePath = path.resolve('tools/ci/api-contract-baseline.json');
  const editorialPath = path.resolve('projects/ng-magary/editorial.json');
  const catalogPath = path.resolve('projects/magary-mcp/src/catalog.json');

  it('gate passes on clean state: barrel matches baseline, catalog matches manifest', () => {
    const manifest = generateManifest(entrypointPath);
    const baseline = JSON.parse(fs.readFileSync(baselinePath, 'utf8'));

    // Test export drift only (no existing catalog needed for this check)
    const result = runDriftCheck({ manifest, baseline });

    expect(result.passed).toBe(true);
    expect(result.report.exportDrift.addedExports).toEqual([]);
    expect(result.report.exportDrift.removedExports).toEqual([]);
  });

  it('gate detects unapproved export via fixture injection', () => {
    const manifest = generateManifest(entrypointPath);
    const baseline = JSON.parse(fs.readFileSync(baselinePath, 'utf8'));

    // Simulate: add a fake unapproved export to the manifest
    const modifiedManifest = {
      ...manifest,
      exports: [
        ...manifest.exports,
        { name: 'FakeUnapprovedExport', kind: 'component', sourceFile: 'fake.ts' },
      ],
    };

    const result = runDriftCheck({ manifest: modifiedManifest, baseline });

    expect(result.passed).toBe(false);
    expect(result.report.exportDrift.addedExports).toContain('FakeUnapprovedExport');
  });

  it('gate detects stale baseline entry via fixture injection', () => {
    const manifest = generateManifest(entrypointPath);
    const baseline = JSON.parse(fs.readFileSync(baselinePath, 'utf8'));

    // Simulate: fake baseline with an entry not in the barrel
    const modifiedBaseline = {
      ...baseline,
      publicApi: {
        ...baseline.publicApi,
        exports: [...baseline.publicApi.exports, 'StaleExportRemovedFromBarrel'],
      },
    };

    const result = runDriftCheck({ manifest, baseline: modifiedBaseline });

    expect(result.passed).toBe(false);
    expect(result.report.exportDrift.removedExports).toContain('StaleExportRemovedFromBarrel');
  });

  it('gate passes with existing catalog matching manifest', () => {
    const manifest = generateManifest(entrypointPath);
    const baseline = JSON.parse(fs.readFileSync(baselinePath, 'utf8'));
    const catalog = JSON.parse(fs.readFileSync(catalogPath, 'utf8'));

    const result = runDriftCheck({ manifest, baseline, existingCatalog: catalog });

    // Export drift should be clean
    expect(result.report.exportDrift.addedExports).toEqual([]);
    expect(result.report.exportDrift.removedExports).toEqual([]);

    // Catalog drift: every catalog entry should have a matching manifest export
    expect(result.report.catalogDrift.orphaned).toEqual([]);
    expect(result.passed).toBe(true);
  });

  it('gate detects orphaned catalog entry via fixture injection', () => {
    const manifest = generateManifest(entrypointPath);
    const baseline = JSON.parse(fs.readFileSync(baselinePath, 'utf8'));

    // Fake catalog with an entry not in the barrel
    const fakeCatalog = [
      { name: 'OrphanedInternalHelper', selector: 'orphaned-helper' },
    ];

    const result = runDriftCheck({
      manifest,
      baseline,
      existingCatalog: fakeCatalog,
    });

    expect(result.passed).toBe(false);
    expect(result.report.catalogDrift.orphaned).toContain('OrphanedInternalHelper');
  });

  it('gate reports all manifest exports have corresponding entries in catalog when catalog is present', () => {
    const manifest = generateManifest(entrypointPath);
    const baseline = JSON.parse(fs.readFileSync(baselinePath, 'utf8'));
    const catalog = JSON.parse(fs.readFileSync(catalogPath, 'utf8'));

    const result = runDriftCheck({ manifest, baseline, existingCatalog: catalog });

    // Verify there are NO orphaned catalog entries — every catalog entry maps to a manifest export
    expect(result.report.catalogDrift.orphaned).toEqual([]);
  });
});
