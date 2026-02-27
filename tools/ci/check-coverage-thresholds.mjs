import fs from 'node:fs';
import path from 'node:path';

const args = process.argv.slice(2);
const configArg = args.find((arg) => arg.startsWith('--config='));
const outputArg = args.find((arg) => arg.startsWith('--output='));
const configPath = configArg?.split('=')[1] ?? 'tools/ci/coverage-critical.config.json';
const outputPath = outputArg?.split('=')[1] ?? 'tmp/day5-coverage/critical-threshold-report.json';

const normalize = (value) => value.replace(/\\/g, '/').toLowerCase();
const toPercent = (covered, total) => (total === 0 ? 100 : (covered / total) * 100);

if (!fs.existsSync(configPath)) {
  console.error(`[coverage-gate] Missing config: ${configPath}`);
  process.exit(1);
}

const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
const minLines = Number(config?.thresholds?.lines ?? 0);
const minBranches = Number(config?.thresholds?.branches ?? 0);
const report = [];
let hasFailures = false;

for (const project of config.projects ?? []) {
  const summaryPath = project.summary;
  if (!fs.existsSync(summaryPath)) {
    console.error(`[coverage-gate] Missing summary for ${project.name}: ${summaryPath}`);
    hasFailures = true;
    continue;
  }

  const summary = JSON.parse(fs.readFileSync(summaryPath, 'utf8'));
  const entries = Object.entries(summary).filter(([key]) => key !== 'total');

  const aggregate = {
    lines: { covered: 0, total: 0 },
    branches: { covered: 0, total: 0 },
  };
  const projectFiles = [];

  for (const relativeFile of project.files ?? []) {
    const normalizedTarget = normalize(relativeFile);
    const matched = entries.find(([key]) => {
      const normalizedKey = normalize(key);
      return (
        normalizedKey.endsWith(`/${normalizedTarget}`) ||
        normalizedKey.endsWith(normalizedTarget)
      );
    });

    if (!matched) {
      console.error(
        `[coverage-gate] Missing file entry in ${summaryPath}: ${relativeFile}`,
      );
      hasFailures = true;
      continue;
    }

    const [actualFilePath, metrics] = matched;
    aggregate.lines.covered += metrics.lines.covered;
    aggregate.lines.total += metrics.lines.total;
    aggregate.branches.covered += metrics.branches.covered;
    aggregate.branches.total += metrics.branches.total;

    projectFiles.push({
      file: actualFilePath,
      linesPct: Number(toPercent(metrics.lines.covered, metrics.lines.total).toFixed(2)),
      branchesPct: Number(
        toPercent(metrics.branches.covered, metrics.branches.total).toFixed(2),
      ),
    });
  }

  const linesPct = Number(
    toPercent(aggregate.lines.covered, aggregate.lines.total).toFixed(2),
  );
  const branchesPct = Number(
    toPercent(aggregate.branches.covered, aggregate.branches.total).toFixed(2),
  );
  const pass = linesPct >= minLines && branchesPct >= minBranches;
  if (!pass) {
    hasFailures = true;
  }

  report.push({
    project: project.name,
    summary: summaryPath,
    linesPct,
    branchesPct,
    minLines,
    minBranches,
    pass,
    files: projectFiles,
  });
}

for (const item of report) {
  const status = item.pass ? 'PASS' : 'FAIL';
  console.log(
    `[coverage-gate] ${status} ${item.project} lines=${item.linesPct}% branches=${item.branchesPct}% (min lines=${item.minLines}% branches=${item.minBranches}%)`,
  );
}

if (outputPath) {
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, JSON.stringify(report, null, 2));
}

if (hasFailures) {
  process.exit(1);
}
