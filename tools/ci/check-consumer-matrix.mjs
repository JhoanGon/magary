import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';

const DEFAULT_MAJORS = [17, 19, 21];
const args = process.argv.slice(2);

const majorsArg = args.find((arg) => arg.startsWith('--majors='));
const keepTemp = args.includes('--keep-temp');

const majors = majorsArg
  ? majorsArg
      .split('=')[1]
      .split(',')
      .map((value) => Number.parseInt(value.trim(), 10))
      .filter((value) => Number.isInteger(value) && value > 0)
  : DEFAULT_MAJORS;

if (majors.length === 0) {
  console.error(
    '[consumer-matrix] No valid Angular majors provided. Use --majors=17,19,21',
  );
  process.exit(1);
}

const workspaceRoot = process.cwd();
const distLibDir = path.join(workspaceRoot, 'dist', 'ng-magary');
const tempRoot = path.join(os.tmpdir(), 'magary-consumer-matrix');

if (!fs.existsSync(path.join(distLibDir, 'package.json'))) {
  console.error(
    '[consumer-matrix] Missing dist/ng-magary/package.json. Run `pnpm run build:lib` first.',
  );
  process.exit(1);
}

const run = (command, commandArgs, options = {}) => {
  const baseOptions = {
    cwd: options.cwd ?? workspaceRoot,
    env: process.env,
    encoding: 'utf8',
    stdio: options.capture ? ['ignore', 'pipe', 'pipe'] : 'inherit',
  };

  const quoteForCmd = (value) => {
    if (/[\s"&<>|^]/.test(value)) {
      return `"${value.replace(/(["^])/g, '^$1')}"`;
    }

    return value;
  };

  const result =
    process.platform === 'win32'
      ? spawnSync(
          process.env.ComSpec ?? 'cmd.exe',
          [
            '/d',
            '/s',
            '/c',
            [command, ...commandArgs].map((part) => quoteForCmd(part)).join(' '),
          ],
          baseOptions,
        )
      : spawnSync(command, commandArgs, baseOptions);

  if (result.error) {
    throw new Error(
      `[consumer-matrix] Failed to start command (${command} ${commandArgs.join(' ')}): ${result.error.message}`,
    );
  }

  if (result.status !== 0) {
    const details = options.capture
      ? `\nstdout:\n${result.stdout ?? ''}\nstderr:\n${result.stderr ?? ''}`
      : '';
    throw new Error(
      `[consumer-matrix] Command failed (${command} ${commandArgs.join(' ')})${details}`,
    );
  }

  return result;
};

const updateAppForSmoke = (appDir) => {
  const appTsCandidates = [
    path.join(appDir, 'src', 'app', 'app.component.ts'),
    path.join(appDir, 'src', 'app', 'app.ts'),
  ];
  const appTsPath = appTsCandidates.find((candidate) => fs.existsSync(candidate));

  if (!appTsPath) {
    throw new Error(
      `[consumer-matrix] Missing app component file in ${path.join(appDir, 'src', 'app')}`,
    );
  }

  const appHtmlPath = appTsPath.endsWith('app.component.ts')
    ? path.join(appDir, 'src', 'app', 'app.component.html')
    : path.join(appDir, 'src', 'app', 'app.html');

  let source = fs.readFileSync(appTsPath, 'utf8');

  if (!source.includes(`from 'ng-magary'`)) {
    const importMatches = [...source.matchAll(/^import\s.+?;$/gm)];
    if (importMatches.length > 0) {
      const lastImport = importMatches[importMatches.length - 1];
      const insertAt = (lastImport.index ?? 0) + lastImport[0].length;
      source =
        source.slice(0, insertAt) +
        `\nimport { MagaryButton } from 'ng-magary';` +
        source.slice(insertAt);
    } else {
      source = `import { MagaryButton } from 'ng-magary';\n${source}`;
    }
  }

  if (/imports\s*:\s*\[/.test(source)) {
    source = source.replace(/imports\s*:\s*\[([\s\S]*?)\]/m, (match, inner) => {
      if (inner.includes('MagaryButton')) {
        return match;
      }

      const normalized = inner.trim();
      return normalized.length > 0
        ? `imports: [${normalized}, MagaryButton]`
        : 'imports: [MagaryButton]';
    });
  } else {
    source = source.replace(
      /standalone\s*:\s*true\s*,/m,
      `standalone: true,\n  imports: [MagaryButton],`,
    );
  }

  const smokeHtml = `<section class="compat-smoke">
  <h1>ng-magary compatibility smoke</h1>
  <magary-button label="Compat build ok"></magary-button>
</section>
`;

  if (fs.existsSync(appHtmlPath) || /templateUrl\s*:/.test(source)) {
    if (/template\s*:/.test(source) && !/templateUrl\s*:/.test(source)) {
      const fileName = path.basename(appHtmlPath);
      source = source.replace(
        /template\s*:\s*`[\s\S]*?`\s*,?/m,
        `templateUrl: './${fileName}',`,
      );
    }
    fs.writeFileSync(appHtmlPath, smokeHtml, 'utf8');
  } else if (/template\s*:/.test(source)) {
    source = source.replace(
      /template\s*:\s*`[\s\S]*?`\s*,?/m,
      `template: \`${smokeHtml}\`,`,
    );
  } else {
    source = source.replace(
      /selector\s*:\s*'app-root'\s*,/m,
      `selector: 'app-root',\n  template: \`${smokeHtml}\`,`,
    );
  }

  fs.writeFileSync(appTsPath, source, 'utf8');
};

let tarballPath = '';
let shouldKeepTemp = keepTemp;

try {
  fs.rmSync(tempRoot, { recursive: true, force: true });
  fs.mkdirSync(tempRoot, { recursive: true });

  const packResult = run('npm', ['pack'], { cwd: distLibDir, capture: true });
  const packedOutput = `${packResult.stdout ?? ''}\n${packResult.stderr ?? ''}`;
  const tarballName = [...packedOutput.matchAll(/([A-Za-z0-9._-]+\.tgz)/g)]
    .map((match) => match[1])
    .at(-1);

  if (!tarballName) {
    throw new Error('[consumer-matrix] Failed to resolve npm pack tarball name.');
  }

  tarballPath = path.join(distLibDir, tarballName);
  if (!fs.existsSync(tarballPath)) {
    throw new Error(`[consumer-matrix] Tarball not found: ${tarballPath}`);
  }

  for (const major of majors) {
    const majorRoot = path.join(tempRoot, `ng${major}`);
    const appName = `compat-ng${major}`;
    const appDir = path.join(majorRoot, appName);

    fs.mkdirSync(majorRoot, { recursive: true });

    console.log(`\n[consumer-matrix] Angular ${major}: scaffold consumer app`);
    run(
      'npx',
      [
        '-y',
        `@angular/cli@${major}`,
        'new',
        appName,
        '--standalone',
        '--skip-git',
        '--skip-install',
        '--skip-tests',
        '--minimal',
        '--style=scss',
        '--package-manager=npm',
        '--no-routing',
      ],
      { cwd: majorRoot },
    );

    console.log(`[consumer-matrix] Angular ${major}: install app dependencies`);
    run('npm', ['install'], { cwd: appDir });

    console.log(`[consumer-matrix] Angular ${major}: install ng-magary tarball + peers`);
    run(
      'npm',
      [
        'install',
        tarballPath,
        `@angular/cdk@${major}`,
        `@angular/animations@${major}`,
        'lucide-angular',
        'lucide',
        'gridstack@12',
      ],
      { cwd: appDir },
    );

    updateAppForSmoke(appDir);

    console.log(`[consumer-matrix] Angular ${major}: build smoke app`);
    run('npm', ['run', 'build', '--', '--configuration', 'production'], {
      cwd: appDir,
    });
  }

  console.log(
    `\n[consumer-matrix] Passed: ng-magary compiles in consumer apps for Angular majors: ${majors.join(', ')}.`,
  );
} catch (error) {
  shouldKeepTemp = true;
  console.error(String(error));
  process.exitCode = 1;
} finally {
  if (tarballPath && fs.existsSync(tarballPath)) {
    fs.rmSync(tarballPath, { force: true });
  }

  if (!shouldKeepTemp) {
    fs.rmSync(tempRoot, { recursive: true, force: true });
  } else if (fs.existsSync(tempRoot)) {
    console.error(`[consumer-matrix] Temp artifacts kept at: ${tempRoot}`);
  }
}
