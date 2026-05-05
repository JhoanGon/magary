import { describe, it, expect } from 'vitest';
import { detectExportDrift, detectCatalogDrift, runDriftCheck } from './check-doc-drift.mjs';

// ---------------------------------------------------------------------------
// Fixtures
// ---------------------------------------------------------------------------

const sampleManifest = {
  version: 1,
  generatedAt: '2026-05-05T00:00:00.000Z',
  exports: [
    { name: 'MagaryButton', kind: 'component', sourceFile: 'src/lib/Button/button.ts', selector: 'magary-button' },
    { name: 'MagaryCard', kind: 'component', sourceFile: 'src/lib/Panel/card/card.ts', selector: 'magary-card' },
    { name: 'MagaryDialog', kind: 'component', sourceFile: 'src/lib/Overlay/dialog/dialog.ts', selector: 'magary-dialog' },
    { name: 'Theme', kind: 'type', sourceFile: 'src/lib/Services/theme.service.ts' },
  ],
};

const sampleBaseline = {
  version: 2,
  publicApi: {
    exports: ['MagaryButton', 'MagaryCard', 'MagaryDialog', 'Theme'],
  },
};

const sampleCatalog = [
  { name: 'MagaryButton', selector: 'magary-button' },
  { name: 'MagaryCard', selector: 'magary-card' },
  { name: 'MagaryDialog', selector: 'magary-dialog' },
];

// ---------------------------------------------------------------------------
// detectExportDrift tests
// ---------------------------------------------------------------------------

describe('detectExportDrift', () => {
  it('returns no drift when manifest matches baseline exactly', () => {
    const result = detectExportDrift(sampleManifest, sampleBaseline);

    expect(result.addedExports).toEqual([]);
    expect(result.removedExports).toEqual([]);
  });

  it('detects unapproved export: in manifest but NOT in baseline', () => {
    const manifestWithNew = {
      ...sampleManifest,
      exports: [
        ...sampleManifest.exports,
        { name: 'UnapprovedComponent', kind: 'component', sourceFile: 'src/lib/unapproved.ts' },
      ],
    };

    const result = detectExportDrift(manifestWithNew, sampleBaseline);

    expect(result.addedExports).toContain('UnapprovedComponent');
    expect(result.addedExports).toHaveLength(1);
    expect(result.removedExports).toEqual([]);
  });

  it('detects stale baseline entry: in baseline but NOT in manifest', () => {
    const manifestMissingCard = {
      ...sampleManifest,
      exports: sampleManifest.exports.filter((e) => e.name !== 'MagaryCard'),
    };

    const result = detectExportDrift(manifestMissingCard, sampleBaseline);

    expect(result.removedExports).toContain('MagaryCard');
    expect(result.removedExports).toHaveLength(1);
    expect(result.addedExports).toEqual([]);
  });

  it('detects both unapproved and stale simultaneously', () => {
    const shiftedManifest = {
      ...sampleManifest,
      exports: [
        { name: 'MagaryButton', kind: 'component', sourceFile: 'src/lib/Button/button.ts' },
        { name: 'NewExport', kind: 'component', sourceFile: 'src/lib/new.ts' },
      ],
    };

    const result = detectExportDrift(shiftedManifest, sampleBaseline);

    expect(result.addedExports).toContain('NewExport');
    expect(result.removedExports).toContain('MagaryCard');
    expect(result.removedExports).toContain('MagaryDialog');
    expect(result.removedExports).toContain('Theme');
  });

  it('handles empty manifest', () => {
    const emptyManifest = { version: 1, generatedAt: '2026-05-05T00:00:00.000Z', exports: [] };

    const result = detectExportDrift(emptyManifest, sampleBaseline);

    expect(result.addedExports).toEqual([]);
    expect(result.removedExports).toEqual(['MagaryButton', 'MagaryCard', 'MagaryDialog', 'Theme']);
  });

  it('handles empty baseline', () => {
    const emptyBaseline = { version: 2, publicApi: { exports: [] } };

    const result = detectExportDrift(sampleManifest, emptyBaseline);

    expect(result.addedExports).toEqual(['MagaryButton', 'MagaryCard', 'MagaryDialog', 'Theme']);
    expect(result.removedExports).toEqual([]);
  });
});

// ---------------------------------------------------------------------------
// detectCatalogDrift tests
// ---------------------------------------------------------------------------

describe('detectCatalogDrift', () => {
  it('returns no orphaned catalog entries when catalog matches manifest', () => {
    const manifestNames = ['MagaryButton', 'MagaryCard', 'MagaryDialog'];

    const result = detectCatalogDrift(sampleCatalog, manifestNames);

    expect(result.orphaned).toEqual([]);
  });

  it('detects orphaned catalog entry not in manifest', () => {
    const catalogWithOrphan = [
      ...sampleCatalog,
      { name: 'InternalHelper', selector: 'internal-helper' },
    ];

    const manifestNames = ['MagaryButton', 'MagaryCard', 'MagaryDialog'];

    const result = detectCatalogDrift(catalogWithOrphan, manifestNames);

    expect(result.orphaned).toContain('InternalHelper');
    expect(result.orphaned).toHaveLength(1);
  });

  it('detects multiple orphaned entries', () => {
    const catalogWithOrphans = [
      { name: 'MagaryButton', selector: 'magary-button' },
      { name: 'OrphanOne', selector: 'orphan-one' },
      { name: 'OrphanTwo', selector: 'orphan-two' },
    ];

    const manifestNames = ['MagaryButton'];

    const result = detectCatalogDrift(catalogWithOrphans, manifestNames);

    expect(result.orphaned).toContain('OrphanOne');
    expect(result.orphaned).toContain('OrphanTwo');
    expect(result.orphaned).toHaveLength(2);
  });

  it('handles empty catalog', () => {
    const result = detectCatalogDrift([], ['MagaryButton']);

    expect(result.orphaned).toEqual([]);
  });

  it('handles empty manifest names', () => {
    const result = detectCatalogDrift(sampleCatalog, []);

    expect(result.orphaned).toEqual(['MagaryButton', 'MagaryCard', 'MagaryDialog']);
  });
});

// ---------------------------------------------------------------------------
// runDriftCheck orchestration tests
// ---------------------------------------------------------------------------

describe('runDriftCheck', () => {
  it('passes when manifest matches baseline and no existing catalog', () => {
    const result = runDriftCheck({
      manifest: sampleManifest,
      baseline: sampleBaseline,
    });

    expect(result.passed).toBe(true);
    expect(result.report.exportDrift.addedExports).toEqual([]);
    expect(result.report.exportDrift.removedExports).toEqual([]);
    expect(result.report.catalogDrift.orphaned).toEqual([]);
  });

  it('fails on unapproved export not in baseline', () => {
    const manifestWithNew = {
      ...sampleManifest,
      exports: [
        ...sampleManifest.exports,
        { name: 'UnapprovedComponent', kind: 'component', sourceFile: 'src/lib/unapproved.ts' },
      ],
    };

    const result = runDriftCheck({
      manifest: manifestWithNew,
      baseline: sampleBaseline,
    });

    expect(result.passed).toBe(false);
    expect(result.report.exportDrift.addedExports).toContain('UnapprovedComponent');
    expect(result.report.exportDrift.removedExports).toEqual([]);
  });

  it('fails on stale baseline entry removed from barrel', () => {
    const manifestMissing = {
      ...sampleManifest,
      exports: sampleManifest.exports.filter((e) => e.name !== 'MagaryCard'),
    };

    const result = runDriftCheck({
      manifest: manifestMissing,
      baseline: sampleBaseline,
    });

    expect(result.passed).toBe(false);
    expect(result.report.exportDrift.removedExports).toContain('MagaryCard');
    expect(result.report.exportDrift.addedExports).toEqual([]);
  });

  it('fails on orphaned catalog entry not in manifest', () => {
    const staleCatalog = [
      { name: 'MagaryButton', selector: 'magary-button' },
      { name: 'InternalHelper', selector: 'internal-helper' }, // not in manifest
    ];

    const result = runDriftCheck({
      manifest: sampleManifest,
      baseline: sampleBaseline,
      existingCatalog: staleCatalog,
    });

    expect(result.passed).toBe(false);
    expect(result.report.catalogDrift.orphaned).toContain('InternalHelper');
    expect(result.report.catalogDrift.orphaned).toHaveLength(1);
    // Export drift should be clean
    expect(result.report.exportDrift.addedExports).toEqual([]);
    expect(result.report.exportDrift.removedExports).toEqual([]);
  });

  it('fails on both export drift AND catalog drift simultaneously', () => {
    const manifestWithNew = {
      ...sampleManifest,
      exports: [
        ...sampleManifest.exports,
        { name: 'UnapprovedComponent', kind: 'component', sourceFile: 'src/lib/unapproved.ts' },
      ],
    };

    const staleCatalog = [
      { name: 'InternalHelper', selector: 'internal-helper' },
    ];

    const result = runDriftCheck({
      manifest: manifestWithNew,
      baseline: sampleBaseline,
      existingCatalog: staleCatalog,
    });

    expect(result.passed).toBe(false);
    expect(result.report.exportDrift.addedExports).toContain('UnapprovedComponent');
    expect(result.report.catalogDrift.orphaned).toContain('InternalHelper');
  });

  it('skips catalog drift check when existingCatalog is not provided', () => {
    const result = runDriftCheck({
      manifest: sampleManifest,
      baseline: sampleBaseline,
    });

    expect(result.passed).toBe(true);
    expect(result.report.catalogDrift.orphaned).toEqual([]);
  });

  it('passes when existing catalog exactly matches manifest', () => {
    const matchingCatalog = [
      { name: 'MagaryButton', selector: 'magary-button' },
      { name: 'MagaryCard', selector: 'magary-card' },
      { name: 'MagaryDialog', selector: 'magary-dialog' },
    ];

    const result = runDriftCheck({
      manifest: sampleManifest,
      baseline: sampleBaseline,
      existingCatalog: matchingCatalog,
    });

    expect(result.passed).toBe(true);
    expect(result.report.catalogDrift.orphaned).toEqual([]);
    expect(result.report.exportDrift.addedExports).toEqual([]);
  });
});
