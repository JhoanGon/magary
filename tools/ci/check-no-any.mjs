import fs from 'node:fs';
import path from 'node:path';
import ts from 'typescript';

const ignoreDirs = new Set([
  '.git',
  '.angular',
  '.idea',
  '.vscode',
  'dist',
  'coverage',
  'node_modules',
]);

const sourceRoots = ['projects/ng-magary/src/lib'];
const specSearchRoot = '.';
const files = new Set();
const violations = [];

function toRelativePath(filePath) {
  return path.relative(process.cwd(), filePath).split(path.sep).join('/');
}

function shouldSkipDir(name) {
  return ignoreDirs.has(name);
}

function collectFiles(dirPath, includeFile) {
  if (!fs.existsSync(dirPath)) {
    return;
  }

  const entries = fs.readdirSync(dirPath, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name);

    if (entry.isDirectory()) {
      if (shouldSkipDir(entry.name)) {
        continue;
      }

      collectFiles(fullPath, includeFile);
      continue;
    }

    if (entry.isFile() && includeFile(entry.name, fullPath)) {
      files.add(path.resolve(fullPath));
    }
  }
}

for (const root of sourceRoots) {
  collectFiles(root, (name) => name.endsWith('.ts') && !name.endsWith('.d.ts'));
}

collectFiles(specSearchRoot, (name) => name.endsWith('.spec.ts'));

function scanFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const sourceFile = ts.createSourceFile(
    filePath,
    content,
    ts.ScriptTarget.Latest,
    true,
    ts.ScriptKind.TS,
  );
  const lines = content.split(/\r?\n/);

  function visit(node) {
    if (node.kind === ts.SyntaxKind.AnyKeyword) {
      const start = node.getStart(sourceFile);
      const location = sourceFile.getLineAndCharacterOfPosition(start);
      const lineText = lines[location.line]?.trim() ?? '';

      violations.push({
        file: toRelativePath(filePath),
        line: location.line + 1,
        column: location.character + 1,
        code: lineText,
      });
    }

    ts.forEachChild(node, visit);
  }

  visit(sourceFile);
}

for (const filePath of [...files].sort()) {
  scanFile(filePath);
}

if (violations.length > 0) {
  console.error(
    `No-any gate failed with ${violations.length} violation(s) in src/lib or *.spec.ts:`,
  );
  for (const violation of violations) {
    console.error(
      `- ${violation.file}:${violation.line}:${violation.column}: ${violation.code}`,
    );
  }
  process.exit(1);
}

console.log(
  `No-any gate passed (${files.size} files scanned in src/lib and *.spec.ts).`,
);
