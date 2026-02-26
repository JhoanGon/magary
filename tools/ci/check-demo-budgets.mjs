import fs from 'node:fs';
import path from 'node:path';

const workspaceRoot = process.cwd();
const browserDir = path.join(workspaceRoot, 'dist', 'demo-app', 'browser');
const indexPath = path.join(browserDir, 'index.html');

if (!fs.existsSync(indexPath)) {
  console.error(
    '[check-demo-budgets] Missing dist/demo-app/browser/index.html. Run `pnpm run build:demo` first.',
  );
  process.exit(1);
}

const budgets = {
  maxInitialChunkBytes: 500_000,
  maxInitialTotalJsBytes: 1_050_000,
  maxMainJsBytes: 120_000,
  maxStylesCssBytes: 40_000,
};

const html = fs.readFileSync(indexPath, 'utf8');
const preloadJs = [
  ...html.matchAll(/<link rel="modulepreload" href="([^"]+\.js)">/g),
].map((match) => match[1]);
const mainJs = [
  ...html.matchAll(/<script src="([^"]+\.js)" type="module"><\/script>/g),
].map((match) => match[1]);
const stylesCss = [
  ...html.matchAll(
    /<link rel="stylesheet" href="([^"]+\.css)"(?:\s+media="print"\s+onload="[^"]+")?>/g,
  ),
].map((match) => match[1]);

const initialJsFiles = [...new Set([...preloadJs, ...mainJs])];

const resolveSize = (relativePath) => {
  const absolutePath = path.join(browserDir, relativePath);
  if (!fs.existsSync(absolutePath)) {
    throw new Error(`Referenced file not found: ${relativePath}`);
  }
  return fs.statSync(absolutePath).size;
};

const initialSizes = initialJsFiles.map((file) => ({
  file,
  bytes: resolveSize(file),
}));
const initialTotalJsBytes = initialSizes.reduce((sum, item) => sum + item.bytes, 0);
const maxInitialChunkBytes = Math.max(...initialSizes.map((item) => item.bytes));
const mainJsFile = mainJs[0];
const mainJsBytes = mainJsFile ? resolveSize(mainJsFile) : 0;
const stylesCssFile = stylesCss[0];
const stylesCssBytes = stylesCssFile ? resolveSize(stylesCssFile) : 0;

const checks = [
  {
    name: 'maxInitialChunkBytes',
    actual: maxInitialChunkBytes,
    budget: budgets.maxInitialChunkBytes,
  },
  {
    name: 'maxInitialTotalJsBytes',
    actual: initialTotalJsBytes,
    budget: budgets.maxInitialTotalJsBytes,
  },
  { name: 'maxMainJsBytes', actual: mainJsBytes, budget: budgets.maxMainJsBytes },
  {
    name: 'maxStylesCssBytes',
    actual: stylesCssBytes,
    budget: budgets.maxStylesCssBytes,
  },
];

const formatKiB = (bytes) => `${(bytes / 1024).toFixed(2)} KiB`;

console.log('[check-demo-budgets] Initial JS files:');
for (const item of initialSizes) {
  console.log(`- ${item.file}: ${formatKiB(item.bytes)}`);
}

console.log('[check-demo-budgets] Budget checks:');
let hasFailures = false;
for (const check of checks) {
  const pass = check.actual <= check.budget;
  if (!pass) {
    hasFailures = true;
  }
  console.log(
    `- ${check.name}: ${formatKiB(check.actual)} / ${formatKiB(check.budget)} => ${pass ? 'PASS' : 'FAIL'}`,
  );
}

if (hasFailures) {
  console.error('[check-demo-budgets] Performance budget check failed.');
  process.exit(1);
}

console.log('[check-demo-budgets] All budgets passed.');
