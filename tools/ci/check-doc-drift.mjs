import fs from 'node:fs';
import path from 'node:path';
import { diffPublicApiContract, generateManifest } from './api-contract-lib.mjs';
import { enrichManifest } from './enrich-manifest.mjs';
import { generateMCPCatalog } from './generate-mcp-catalog.mjs';

// ---------------------------------------------------------------------------
// Pure drift detection functions
// ---------------------------------------------------------------------------

/**
 * Detects export drift between a generated manifest and the approved baseline.
 * Uses the existing diffPublicApiContract from api-contract-lib.mjs.
 *
 * @param {{exports: Array<{name: string}>}} manifest — generated manifest
 * @param {{publicApi: {exports: string[]}}} baseline — approved baseline
 * @returns {{addedExports: string[], removedExports: string[]}}
 */
export function detectExportDrift(manifest, baseline) {
  const manifestNames = (manifest.exports ?? []).map((e) => e.name);
  const baselineNames = baseline.publicApi?.exports ?? [];

  return diffPublicApiContract({
    baselineExports: baselineNames,
    currentExports: manifestNames,
  });
}

/**
 * Finds catalog entries that reference components NOT present in the manifest.
 * Orphaned entries mean the catalog is out of sync with the barrel.
 *
 * @param {Array<{name: string}>} catalogEntries — MCP catalog entries
 * @param {string[]} manifestNames — export names from the manifest
 * @returns {{orphaned: string[]}}
 */
export function detectCatalogDrift(catalogEntries, manifestNames) {
  const manifestSet = new Set(manifestNames);
  const orphaned = catalogEntries
    .filter((entry) => !manifestSet.has(entry.name))
    .map((entry) => entry.name);

  return { orphaned };
}

// ---------------------------------------------------------------------------
// Orchestration — full drift check pipeline
// ---------------------------------------------------------------------------

/**
 * Runs the full drift check pipeline: compare manifest against baseline and
 * (optionally) existing catalog against manifest.
 *
 * All parameters are resolved data (caller handles file I/O). This keeps the
 * function pure and testable.
 *
 * @param {object} params
 * @param {object} params.manifest — generated manifest
 * @param {object} params.baseline — approved baseline (api-contract-baseline.json)
 * @param {object} [params.editorial] — editorial metadata (editorial.json), used to generate catalog when existingCatalog is not provided
 * @param {Array<{name: string}>} [params.existingCatalog] — existing MCP catalog from disk; if omitted, catalog drift check is skipped
 * @returns {{ passed: boolean, report: object }}
 */
export function runDriftCheck({ manifest, baseline, editorial, existingCatalog }) {
  const exportDrift = detectExportDrift(manifest, baseline);

  const manifestNames = manifest.exports.map((e) => e.name);

  let catalogDrift = { orphaned: [] };
  if (existingCatalog) {
    catalogDrift = detectCatalogDrift(existingCatalog, manifestNames);
  }

  const hasExportDrift = exportDrift.addedExports.length > 0 || exportDrift.removedExports.length > 0;
  const hasCatalogDrift = catalogDrift.orphaned.length > 0;
  const passed = !hasExportDrift && !hasCatalogDrift;

  return {
    passed,
    report: {
      exportDrift,
      catalogDrift,
    },
  };
}

// ---------------------------------------------------------------------------
// CLI mode — invoked via `node tools/ci/check-doc-drift.mjs`
// ---------------------------------------------------------------------------

const isMainModule = process.argv[1] && process.argv[1].endsWith('check-doc-drift.mjs');

if (isMainModule) {
  const publicApiEntrypoint = 'projects/ng-magary/src/public-api.ts';
  const baselinePath = 'tools/ci/api-contract-baseline.json';
  const editorialPath = 'projects/ng-magary/editorial.json';
  const catalogPath = 'projects/magary-mcp/src/catalog.json';

  let manifest;
  try {
    manifest = generateManifest(publicApiEntrypoint);
  } catch (err) {
    console.error(`Doc drift gate: manifest generation failed — ${err.message}`);
    process.exit(1);
  }

  const baseline = JSON.parse(fs.readFileSync(baselinePath, 'utf8'));
  const editorial = JSON.parse(fs.readFileSync(editorialPath, 'utf8'));

  let existingCatalog;
  try {
    existingCatalog = JSON.parse(fs.readFileSync(catalogPath, 'utf8'));
  } catch {
    // Catalog may not exist yet — skip catalog drift check
    existingCatalog = undefined;
  }

  const { passed, report } = runDriftCheck({ manifest, baseline, editorial, existingCatalog });

  if (!passed) {
    const { exportDrift, catalogDrift } = report;

    console.error('Doc drift gate failed:');

    if (exportDrift.addedExports.length > 0) {
      console.error(
        `\nUnapproved exports (in barrel, not in baseline): ${exportDrift.addedExports.length}`,
      );
      for (const name of exportDrift.addedExports) {
        console.error(`  - ${name}`);
      }
    }

    if (exportDrift.removedExports.length > 0) {
      console.error(
        `\nStale baseline entries (in baseline, not in barrel): ${exportDrift.removedExports.length}`,
      );
      for (const name of exportDrift.removedExports) {
        console.error(`  - ${name}`);
      }
    }

    if (catalogDrift.orphaned.length > 0) {
      console.error(
        `\nOrphaned catalog entries (in catalog, not in manifest): ${catalogDrift.orphaned.length}`,
      );
      for (const name of catalogDrift.orphaned) {
        console.error(`  - ${name}`);
      }
    }

    console.error(
      '\nIf these changes are intentional, update the baseline with "pnpm run check:api-contract:update".',
    );
    process.exit(1);
  }

  console.log(
    `Doc drift gate passed (${manifest.exports.length} manifest exports, baseline matches, catalog consistent).`,
  );
}
