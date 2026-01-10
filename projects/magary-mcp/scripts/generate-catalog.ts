import { ComponentScanner } from '../src/component-scanner.ts';
import * as path from 'path';
import * as fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function generate() {
  // Resolve path to ng-magary library relative to this script (scripts folder)
  // Structure: projects/magary-mcp/scripts/generate-catalog.ts
  // Target: projects/ng-magary/src/lib
  // ../ -> projects/magary-mcp
  // ../../ -> projects
  // ../../ng-magary -> projects/ng-magary
  const libPath = path.resolve(__dirname, '../../ng-magary/src/lib');
  console.log(`Scanning components from: ${libPath}`);

  if (!fs.existsSync(libPath)) {
    console.error(`Error: Library path not found at ${libPath}`);
    process.exit(1);
  }

  const scanner = new ComponentScanner(libPath);
  const components = await scanner.scan();

  console.log(`Found ${components.length} components.`);

  const outputPath = path.resolve(__dirname, '../src/catalog.json');
  fs.writeFileSync(outputPath, JSON.stringify(components, null, 2));
  console.log(`Catalog saved to: ${outputPath}`);
}

generate().catch((err) => {
  console.error(err);
  process.exit(1);
});
