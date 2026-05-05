import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { generateManifest, resolveComponentMetadata } from './api-contract-lib.mjs';

// ---------------------------------------------------------------------------
// Fixture helpers — create a temporary project structure for isolated testing
// ---------------------------------------------------------------------------

let tmpDir;
let originalCwd;

beforeAll(() => {
  originalCwd = process.cwd();
  tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'magary-manifest-test-'));
  process.chdir(tmpDir);

  // Minimal barrel file
  const barrelContent = `
export { TestButton } from './button/button';
export { type TestConfig } from './button/button-types';
export { TestService } from './service/service';
export { TEST_CONSTANT } from './constants';
`;

  // Component with @Component decorator, inputs, outputs
  const buttonContent = `
import { Component, input, output } from '@angular/core';

@Component({
  selector: 'test-button',
  standalone: true,
  template: '<button (click)="onClick.emit($event)">{{ label() }}</button>',
})
export class TestButton {
  readonly label = input<string>();
  readonly disabled = input<boolean>(false);
  readonly variant = input<'solid' | 'outlined'>('solid');
  readonly onClick = output<Event>();
}
`;

  // Type-only file
  const buttonTypesContent = `
export interface TestConfig {
  label: string;
  icon?: string;
}
`;

  // Service (Injectable)
  const serviceContent = `
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class TestService {
  getValue(): string { return 'test'; }
}
`;

  // Constant
  const constantsContent = `
export const TEST_CONSTANT = 'magary-test-value';
`;

  const buttonDir = path.join(tmpDir, 'button');
  const serviceDir = path.join(tmpDir, 'service');

  fs.mkdirSync(buttonDir, { recursive: true });
  fs.mkdirSync(serviceDir, { recursive: true });

  fs.writeFileSync(path.join(tmpDir, 'public-api.ts'), barrelContent, 'utf8');
  fs.writeFileSync(path.join(buttonDir, 'button.ts'), buttonContent, 'utf8');
  fs.writeFileSync(path.join(buttonDir, 'button-types.ts'), buttonTypesContent, 'utf8');
  fs.writeFileSync(path.join(serviceDir, 'service.ts'), serviceContent, 'utf8');
  fs.writeFileSync(path.join(tmpDir, 'constants.ts'), constantsContent, 'utf8');
});

afterAll(() => {
  process.chdir(originalCwd);
  if (tmpDir) {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  }
});

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe('generateManifest', () => {
  it('produces manifest with correct export count matching the barrel', () => {
    const manifest = generateManifest(path.join(tmpDir, 'public-api.ts'));

    expect(manifest).toBeDefined();
    expect(manifest.version).toBe(1);
    expect(manifest.generatedAt).toBeDefined();
    expect(Array.isArray(manifest.exports)).toBe(true);
    // Barrel has 4 exports: TestButton, TestConfig (type), TestService, TEST_CONSTANT
    expect(manifest.exports).toHaveLength(4);
  });

  it('classifies export kinds correctly (component, type, service, constant)', () => {
    const manifest = generateManifest(path.join(tmpDir, 'public-api.ts'));

    const byName = Object.fromEntries(
      manifest.exports.map((e) => [e.name, e]),
    );

    expect(byName['TestButton'].kind).toBe('component');
    expect(byName['TestConfig'].kind).toBe('type');
    expect(byName['TestService'].kind).toBe('service');
    expect(byName['TEST_CONSTANT'].kind).toBe('constant');
  });

  it('throws when the public-api entrypoint does not exist', () => {
    expect(() => generateManifest('/nonexistent/public-api.ts')).toThrow(
      /entrypoint not found/i,
    );
  });

  it('extracts component selector from @Component decorator', () => {
    const manifest = generateManifest(path.join(tmpDir, 'public-api.ts'));
    const button = manifest.exports.find((e) => e.name === 'TestButton');

    expect(button).toBeDefined();
    expect(button.selector).toBe('test-button');
  });

  it('extracts component inputs from input() signal declarations', () => {
    const manifest = generateManifest(path.join(tmpDir, 'public-api.ts'));
    const button = manifest.exports.find((e) => e.name === 'TestButton');

    expect(button.inputs).toBeDefined();
    expect(button.inputs).toHaveLength(3);

    const inputNames = button.inputs.map((i) => i.name).sort();
    expect(inputNames).toEqual(['disabled', 'label', 'variant']);
  });

  it('extracts component outputs from output() declarations', () => {
    const manifest = generateManifest(path.join(tmpDir, 'public-api.ts'));
    const button = manifest.exports.find((e) => e.name === 'TestButton');

    expect(button.outputs).toBeDefined();
    expect(button.outputs).toHaveLength(1);
    expect(button.outputs[0].name).toBe('onClick');
  });

  it('includes sourceFile relative path for each export', () => {
    const manifest = generateManifest(path.join(tmpDir, 'public-api.ts'));
    const button = manifest.exports.find((e) => e.name === 'TestButton');

    expect(button.sourceFile).toBeDefined();
    expect(button.sourceFile).toContain('button.ts');
    expect(button.sourceFile).not.toContain(path.sep + path.sep); // no double slashes
  });
});

describe('resolveComponentMetadata', () => {
  it('returns null for non-component exports', () => {
    // We test this indirectly through the manifest
    const manifest = generateManifest(path.join(tmpDir, 'public-api.ts'));
    const config = manifest.exports.find((e) => e.name === 'TestConfig');
    const constant = manifest.exports.find((e) => e.name === 'TEST_CONSTANT');

    expect(config.selector).toBeUndefined();
    expect(config.inputs).toBeUndefined();
    expect(constant.selector).toBeUndefined();
  });
});
