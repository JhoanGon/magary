import { spawn } from 'node:child_process';
import process from 'node:process';

const WARNING_PATTERNS = [
  {
    name: 'NG0953 destroyed OutputRef emit',
    regex: /NG0953: Unexpected emit for destroyed `?OutputRef`?/i,
  },
  {
    name: 'Destroyed OutputRef emit',
    regex: /Unexpected emit for destroyed `?OutputRef`?/i,
  },
];

const stripAnsi = (value) => value.replace(/\x1B\[[0-9;]*m/g, '');

const useWindowsShell = process.platform === 'win32';
const command = useWindowsShell ? 'pnpm run test:unit' : 'pnpm';
const args = useWindowsShell ? [] : ['run', 'test:unit'];

const child = spawn(command, args, {
  env: process.env,
  shell: useWindowsShell,
  stdio: ['inherit', 'pipe', 'pipe'],
});

let output = '';

child.stdout.on('data', (chunk) => {
  const text = chunk.toString();
  output += text;
  process.stdout.write(text);
});

child.stderr.on('data', (chunk) => {
  const text = chunk.toString();
  output += text;
  process.stderr.write(text);
});

child.on('error', (error) => {
  console.error('[unit-clean-gate] Failed to start test:unit:', error);
  process.exit(1);
});

child.on('close', (code) => {
  if (code !== 0) {
    process.exit(code ?? 1);
  }

  const lines = stripAnsi(output).split(/\r?\n/);
  const violations = [];

  for (const line of lines) {
    const trimmedLine = line.trim();
    if (!trimmedLine) {
      continue;
    }

    for (const pattern of WARNING_PATTERNS) {
      if (pattern.regex.test(trimmedLine)) {
        violations.push({ pattern: pattern.name, line: trimmedLine });
      }
    }
  }

  if (violations.length > 0) {
    console.error(
      `\n[unit-clean-gate] Blocked: detected ${violations.length} warning(s) that are disallowed in CI.`,
    );
    const uniqueLines = Array.from(
      new Set(violations.map((violation) => violation.line)),
    );
    for (const line of uniqueLines) {
      console.error(`[unit-clean-gate] ${line}`);
    }
    process.exit(1);
  }

  console.log('[unit-clean-gate] Passed: no disallowed unit-test warnings found.');
});
