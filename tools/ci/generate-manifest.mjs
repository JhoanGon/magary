import fs from 'node:fs';
import path from 'node:path';
import { generateManifest } from './api-contract-lib.mjs';

const entrypoint = path.resolve('projects/ng-magary/src/public-api.ts');
const output = path.resolve('manifest.json');

const manifest = generateManifest(entrypoint);

fs.writeFileSync(output, `${JSON.stringify(manifest, null, 2)}\n`, 'utf8');

const componentCount = manifest.exports.filter((e) => e.kind === 'component').length;
const typeCount = manifest.exports.filter((e) => e.kind === 'type').length;
const serviceCount = manifest.exports.filter((e) => e.kind === 'service').length;
const constantCount = manifest.exports.filter((e) => e.kind === 'constant').length;
const unknownCount = manifest.exports.filter((e) => e.kind === 'unknown').length;

console.log(
  `Manifest written to ${output} (${manifest.exports.length} exports: ${componentCount} components, ${typeCount} types, ${serviceCount} services, ${constantCount} constants${unknownCount > 0 ? `, ${unknownCount} unknown` : ''}).`,
);
