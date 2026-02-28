import fs from 'node:fs';
import path from 'node:path';

const workspaceRoot = process.cwd();

const requiredPackages = [
  {
    packageName: 'gridstack',
    expectedLicense: 'MIT',
    expectedSource: 'https://github.com/gridstack/gridstack.js',
    licenseFile: 'third_party/licenses/gridstack-LICENSE.txt',
  },
  {
    packageName: '@atlaskit/pragmatic-drag-and-drop',
    expectedLicense: 'Apache-2.0',
    expectedSource: 'https://github.com/atlassian/pragmatic-drag-and-drop',
    licenseFile: 'third_party/licenses/atlaskit-pragmatic-dnd-LICENSE.md',
  },
  {
    packageName: 'lucide',
    expectedLicense: 'ISC',
    expectedSource: 'https://github.com/lucide-icons/lucide',
    licenseFile: 'third_party/licenses/lucide-LICENSE.txt',
  },
  {
    packageName: 'lucide-angular',
    expectedLicense: 'ISC',
    expectedSource: 'https://github.com/lucide-icons/lucide',
    licenseFile: 'third_party/licenses/lucide-LICENSE.txt',
  },
];

const requiredRepoFiles = [
  'THIRD_PARTY_NOTICES.md',
  'third_party/licenses/gridstack-LICENSE.txt',
  'third_party/licenses/atlaskit-pragmatic-dnd-LICENSE.md',
  'third_party/licenses/APACHE-2.0.txt',
  'third_party/licenses/lucide-LICENSE.txt',
  'projects/ng-magary/THIRD_PARTY_NOTICES.md',
  'projects/ng-magary/third_party/licenses/gridstack-LICENSE.txt',
  'projects/ng-magary/third_party/licenses/atlaskit-pragmatic-dnd-LICENSE.md',
  'projects/ng-magary/third_party/licenses/APACHE-2.0.txt',
  'projects/ng-magary/third_party/licenses/lucide-LICENSE.txt',
];

function readJson(relativePath) {
  const absolutePath = path.join(workspaceRoot, relativePath);
  return JSON.parse(fs.readFileSync(absolutePath, 'utf8'));
}

function normalizeLicense(license) {
  return String(license ?? '')
    .trim()
    .toUpperCase();
}

function resolveNodeModulePackageJson(packageName) {
  return path.join(
    workspaceRoot,
    'node_modules',
    ...packageName.split('/'),
    'package.json',
  );
}

const errors = [];

for (const relativePath of requiredRepoFiles) {
  const absolutePath = path.join(workspaceRoot, relativePath);
  if (!fs.existsSync(absolutePath)) {
    errors.push(`[third-party] Missing required file: ${relativePath}`);
    continue;
  }

  const size = fs.statSync(absolutePath).size;
  if (size === 0) {
    errors.push(`[third-party] Required file is empty: ${relativePath}`);
  }
}

const noticesPath = path.join(workspaceRoot, 'THIRD_PARTY_NOTICES.md');
const noticesContent = fs.existsSync(noticesPath)
  ? fs.readFileSync(noticesPath, 'utf8')
  : '';

for (const entry of requiredPackages) {
  const packageJsonPath = resolveNodeModulePackageJson(entry.packageName);
  if (!fs.existsSync(packageJsonPath)) {
    errors.push(
      `[third-party] Package not installed in node_modules: ${entry.packageName}`,
    );
    continue;
  }

  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
  const actualLicense = normalizeLicense(packageJson.license);
  const expectedLicense = normalizeLicense(entry.expectedLicense);

  if (actualLicense !== expectedLicense) {
    errors.push(
      `[third-party] License mismatch for ${entry.packageName}: expected ${entry.expectedLicense}, got ${packageJson.license ?? 'undefined'}`,
    );
  }

  if (!noticesContent.includes(`\`${entry.packageName}\``)) {
    errors.push(
      `[third-party] THIRD_PARTY_NOTICES.md is missing package entry for ${entry.packageName}`,
    );
  }

  if (!noticesContent.includes(entry.expectedLicense)) {
    errors.push(
      `[third-party] THIRD_PARTY_NOTICES.md is missing license marker ${entry.expectedLicense}`,
    );
  }

  if (!noticesContent.includes(entry.expectedSource)) {
    errors.push(
      `[third-party] THIRD_PARTY_NOTICES.md is missing source link ${entry.expectedSource}`,
    );
  }

  const licenseFilePath = path.join(workspaceRoot, entry.licenseFile);
  if (!fs.existsSync(licenseFilePath)) {
    errors.push(
      `[third-party] Missing committed license copy for ${entry.packageName}: ${entry.licenseFile}`,
    );
  }
}

const rootPackageJson = readJson('package.json');
const libPackageJson = readJson('projects/ng-magary/package.json');

const rootDependencies = rootPackageJson.dependencies ?? {};
if (!rootDependencies['@atlaskit/pragmatic-drag-and-drop']) {
  errors.push(
    '[third-party] package.json dependencies must declare @atlaskit/pragmatic-drag-and-drop',
  );
}

const libPeerDependencies = libPackageJson.peerDependencies ?? {};

if (!libPeerDependencies.gridstack) {
  errors.push(
    '[third-party] projects/ng-magary/package.json peerDependencies must declare gridstack',
  );
}

if (!libPeerDependencies['@atlaskit/pragmatic-drag-and-drop']) {
  errors.push(
    '[third-party] projects/ng-magary/package.json peerDependencies must declare @atlaskit/pragmatic-drag-and-drop',
  );
}

const rootNotices = fs.readFileSync(
  path.join(workspaceRoot, 'THIRD_PARTY_NOTICES.md'),
  'utf8',
);
const libNotices = fs.readFileSync(
  path.join(workspaceRoot, 'projects/ng-magary/THIRD_PARTY_NOTICES.md'),
  'utf8',
);

if (rootNotices !== libNotices) {
  errors.push(
    '[third-party] projects/ng-magary/THIRD_PARTY_NOTICES.md must match root THIRD_PARTY_NOTICES.md',
  );
}

const mirroredLicenseFiles = [
  'gridstack-LICENSE.txt',
  'atlaskit-pragmatic-dnd-LICENSE.md',
  'APACHE-2.0.txt',
  'lucide-LICENSE.txt',
];

for (const licenseFileName of mirroredLicenseFiles) {
  const rootFile = path.join(workspaceRoot, 'third_party/licenses', licenseFileName);
  const libFile = path.join(
    workspaceRoot,
    'projects/ng-magary/third_party/licenses',
    licenseFileName,
  );

  const rootContent = fs.readFileSync(rootFile, 'utf8');
  const libContent = fs.readFileSync(libFile, 'utf8');

  if (rootContent !== libContent) {
    errors.push(
      `[third-party] projects/ng-magary/third_party/licenses/${licenseFileName} must match root copy`,
    );
  }
}

if (errors.length > 0) {
  console.error('[third-party] Compliance check failed:');
  for (const error of errors) {
    console.error(`- ${error}`);
  }
  process.exit(1);
}

console.log(
  `[third-party] Compliance check passed for ${requiredPackages.length} required packages.`,
);
