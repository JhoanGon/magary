import fs from 'node:fs';
import path from 'node:path';
import {
  collectContractViolations,
  collectPublicApiExportNames,
  contractRules,
  diffPublicApiContract,
  fingerprintViolation,
  generateManifest,
  relativePath,
} from './api-contract-lib.mjs';
import { runDriftCheck } from './check-doc-drift.mjs';

const baselinePath = path.resolve('tools/ci/api-contract-baseline.json');
const publicApiEntrypoint = 'projects/ng-magary/src/public-api.ts';
const updateBaseline = process.argv.includes('--update-baseline');

const { files, violations } = collectContractViolations();
const currentPublicApiExports = collectPublicApiExportNames(publicApiEntrypoint);

function writeBaseline() {
  const baselinePayload = {
    version: 2,
    generatedAt: new Date().toISOString(),
    notes:
      'Baseline for the public root API contract plus legacy source hygiene rules. New exports or new violations fail CI.',
    publicApi: {
      entrypoint: publicApiEntrypoint,
      exports: currentPublicApiExports,
    },
    violations: violations.map((violation) => ({
      rule: violation.rule,
      file: violation.file,
      code: violation.code,
    })),
  };

  fs.writeFileSync(baselinePath, `${JSON.stringify(baselinePayload, null, 2)}\n`, 'utf8');
  console.log(
    `API contract baseline updated at ${relativePath(baselinePath)} with ${currentPublicApiExports.length} public export(s) and ${violations.length} violation(s).`,
  );
}

if (updateBaseline) {
  writeBaseline();
  process.exit(0);
}

if (!fs.existsSync(baselinePath)) {
  console.error(`API contract baseline is missing at ${relativePath(baselinePath)}.`);
  console.error('Run "pnpm run check:api-contract:update" once to initialize the baseline.');
  process.exit(1);
}

const baselineJson = JSON.parse(fs.readFileSync(baselinePath, 'utf8'));
const baselineViolations = Array.isArray(baselineJson.violations)
  ? baselineJson.violations
  : [];
const baselinePublicApiExports = Array.isArray(baselineJson.publicApi?.exports)
  ? [...baselineJson.publicApi.exports].sort()
  : [];

const baselineSet = new Set(
  baselineViolations.map((violation) => fingerprintViolation(violation)),
);
const currentSet = new Set(violations.map((violation) => fingerprintViolation(violation)));

const newViolations = violations.filter(
  (violation) => !baselineSet.has(fingerprintViolation(violation)),
);
const resolvedViolations = baselineViolations.filter(
  (violation) => !currentSet.has(fingerprintViolation(violation)),
);

const { addedExports, removedExports } = diffPublicApiContract({
  baselineExports: baselinePublicApiExports,
  currentExports: currentPublicApiExports,
});

if (addedExports.length > 0 || removedExports.length > 0) {
  console.error('API contract gate failed: public root exports drifted from the approved baseline.');

  if (addedExports.length > 0) {
    console.error('\nAdded exports:');
    for (const exportName of addedExports) {
      console.error(`- ${exportName}`);
    }
  }

  if (removedExports.length > 0) {
    console.error('\nRemoved exports:');
    for (const exportName of removedExports) {
      console.error(`- ${exportName}`);
    }
  }

  console.error(
    '\nIf this change is intentional, update the snapshot with "pnpm run check:api-contract:update".',
  );
  process.exit(1);
}

if (newViolations.length > 0) {
  console.error(`API contract gate failed with ${newViolations.length} new hygiene violation(s):`);

  for (const violation of newViolations) {
    console.error(`- [${violation.rule}] ${violation.file}:${violation.line}: ${violation.code}`);
  }

  console.error('');
  for (const rule of contractRules) {
    console.error(`Rule "${rule.id}": ${rule.message}`);
  }

  process.exit(1);
}

if (resolvedViolations.length > 0) {
  console.log(
    `API contract gate: ${resolvedViolations.length} baseline hygiene violation(s) were resolved. Consider refreshing baseline with "pnpm run check:api-contract:update".`,
  );
}

// ---------------------------------------------------------------------------
// Doc drift detection — verify manifest↔baseline and catalog↔manifest
// ---------------------------------------------------------------------------

const editorialPath = path.resolve('projects/ng-magary/editorial.json');
const catalogPath = path.resolve('projects/magary-mcp/src/catalog.json');

let manifest;
try {
  manifest = generateManifest(publicApiEntrypoint);
} catch (err) {
  console.error(`Doc drift gate: manifest generation failed — ${err.message}`);
  process.exit(1);
}

const editorial = JSON.parse(fs.readFileSync(editorialPath, 'utf8'));

let existingCatalog;
try {
  existingCatalog = JSON.parse(fs.readFileSync(catalogPath, 'utf8'));
} catch {
  // Catalog may not exist yet — skip catalog drift check
  existingCatalog = undefined;
}

const driftResult = runDriftCheck({
  manifest,
  baseline: JSON.parse(fs.readFileSync(baselinePath, 'utf8')),
  editorial,
  existingCatalog,
});

if (!driftResult.passed) {
  const { exportDrift, catalogDrift } = driftResult.report;

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
  `API contract gate passed (${currentPublicApiExports.length} approved public export(s), ${files.length} source files scanned, ${violations.length} known baseline hygiene violation(s), 0 new, catalog drift clean).`,
);
