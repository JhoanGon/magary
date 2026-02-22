import fs from 'node:fs';
import path from 'node:path';

const roots = [
  'projects/ng-magary/src/lib',
  'projects/demo-app/src/app',
];
const baselinePath = path.resolve('tools/ci/api-contract-baseline.json');
const updateBaseline = process.argv.includes('--update-baseline');

const fileExtensions = new Set(['.ts', '.scss']);

const rules = [
  {
    id: 'legacy-decorators',
    regex:
      /@(?:Input|Output|ViewChild|ViewChildren|ContentChild|ContentChildren)\s*\(/,
    message:
      'Legacy decorators are not allowed. Use input()/output()/viewChild()/viewChildren()/contentChild()/contentChildren().',
  },
  {
    id: 'output-any',
    regex: /\boutput\s*<\s*any\s*>\s*\(/,
    message:
      'output<any>() is not allowed. Use a concrete output type.',
  },
  {
    id: 'no-ng-deep',
    regex: /::ng-deep\b/,
    message:
      '::ng-deep is not allowed. Use component APIs, CSS variables, or explicit global styles.',
  },
];

function fingerprint(violation) {
  return `${violation.rule}|${violation.file}|${violation.code}`;
}

function collectTsFiles(dirPath, collected) {
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name);

    if (entry.isDirectory()) {
      collectTsFiles(fullPath, collected);
      continue;
    }

    if (!entry.isFile()) {
      continue;
    }

    if (!fileExtensions.has(path.extname(entry.name))) {
      continue;
    }

    if (entry.name.endsWith('.d.ts')) {
      continue;
    }

    collected.push(fullPath);
  }
}

function relativePath(filePath) {
  return path.relative(process.cwd(), filePath).split(path.sep).join('/');
}

const files = [];

for (const root of roots) {
  if (!fs.existsSync(root)) {
    continue;
  }
  collectTsFiles(root, files);
}

const violations = [];

for (const filePath of files) {
  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split(/\r?\n/);

  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index];

    for (const rule of rules) {
      if (rule.regex.test(line)) {
        violations.push({
          rule: rule.id,
          message: rule.message,
          file: relativePath(filePath),
          line: index + 1,
          code: line.trim(),
        });
      }
    }
  }
}

if (violations.length > 0) {
  violations.sort((left, right) =>
    `${left.rule}|${left.file}|${left.code}`.localeCompare(
      `${right.rule}|${right.file}|${right.code}`,
    ),
  );
}

if (updateBaseline) {
  const baselinePayload = {
    version: 1,
    generatedAt: new Date().toISOString(),
    notes: 'Baseline for API contract gate. New violations fail CI.',
    violations: violations.map((violation) => ({
      rule: violation.rule,
      file: violation.file,
      code: violation.code,
    })),
  };

  fs.writeFileSync(
    baselinePath,
    `${JSON.stringify(baselinePayload, null, 2)}\n`,
    'utf8',
  );
  console.log(
    `API contract baseline updated at ${relativePath(baselinePath)} with ${violations.length} violation(s).`,
  );
  process.exit(0);
}

if (!fs.existsSync(baselinePath)) {
  console.error(
    `API contract baseline is missing at ${relativePath(baselinePath)}.`,
  );
  console.error(
    'Run "pnpm run check:api-contract:update" once to initialize the baseline.',
  );
  process.exit(1);
}

const baselineContent = fs.readFileSync(baselinePath, 'utf8');
const baselineJson = JSON.parse(baselineContent);
const baselineViolations = Array.isArray(baselineJson.violations)
  ? baselineJson.violations
  : [];

const baselineSet = new Set(
  baselineViolations.map((violation) => fingerprint(violation)),
);
const currentSet = new Set(violations.map((violation) => fingerprint(violation)));

const newViolations = violations.filter(
  (violation) => !baselineSet.has(fingerprint(violation)),
);
const resolvedViolations = baselineViolations.filter(
  (violation) => !currentSet.has(fingerprint(violation)),
);

if (newViolations.length > 0) {
  console.error(
    `API contract gate failed with ${newViolations.length} new violation(s):`,
  );
  for (const violation of newViolations) {
    console.error(
      `- [${violation.rule}] ${violation.file}:${violation.line}: ${violation.code}`,
    );
  }

  console.error('');
  for (const rule of rules) {
    console.error(`Rule "${rule.id}": ${rule.message}`);
  }

  process.exit(1);
}

if (resolvedViolations.length > 0) {
  console.log(
    `API contract gate: ${resolvedViolations.length} baseline violation(s) were resolved. Consider refreshing baseline with "pnpm run check:api-contract:update".`,
  );
}

console.log(
  `API contract gate passed (${files.length} source files scanned, ${violations.length} known baseline violation(s), 0 new).`,
);
