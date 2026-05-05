import fs from 'node:fs';
import path from 'node:path';
import { describe, it, expect } from 'vitest';

// Read the schema
const schemaPath = path.resolve('tools/ci/manifest-schema.json');

function readSchema() {
  if (!fs.existsSync(schemaPath)) {
    throw new Error(`Schema not found: ${schemaPath}`);
  }
  return JSON.parse(fs.readFileSync(schemaPath, 'utf8'));
}

/**
 * Minimal JSON Schema validator for testing.
 * Validates a manifest object against the schema.
 */
function validateManifest(manifest, schema = readSchema()) {
  const errors = [];

  if (typeof manifest !== 'object' || manifest === null) {
    errors.push('manifest must be an object');
    return { valid: false, errors };
  }

  // Check required top-level fields
  for (const field of schema.required ?? []) {
    if (!(field in manifest)) {
      errors.push(`missing required field: ${field}`);
    }
  }

  // Check version type
  if (schema.properties?.version) {
    if (typeof manifest.version !== 'number') {
      errors.push('version must be a number');
    }
  }

  // Check generatedAt type
  if (schema.properties?.generatedAt) {
    if (typeof manifest.generatedAt !== 'string') {
      errors.push('generatedAt must be a string');
    }
  }

  // Check exports array
  if (schema.properties?.exports) {
    if (!Array.isArray(manifest.exports)) {
      errors.push('exports must be an array');
    } else {
      const itemSchema = schema.properties.exports.items;
      for (let i = 0; i < manifest.exports.length; i++) {
        const entry = manifest.exports[i];
        if (typeof entry !== 'object' || entry === null) {
          errors.push(`exports[${i}] must be an object`);
          continue;
        }
        // Check required fields per entry
        if (itemSchema?.required) {
          for (const field of itemSchema.required) {
            if (!(field in entry)) {
              errors.push(`exports[${i}].${field} is required`);
            }
          }
        }
        // Check allowed kinds
        if (itemSchema?.properties?.kind?.enum) {
          if (!itemSchema.properties.kind.enum.includes(entry.kind)) {
            errors.push(
              `exports[${i}].kind "${entry.kind}" not in allowed values: ${itemSchema.properties.kind.enum.join(', ')}`,
            );
          }
        }
      }
    }
  }

  return { valid: errors.length === 0, errors };
}

describe('manifest-schema.json', () => {
  it('exists and is valid JSON', () => {
    const schema = readSchema();
    expect(schema).toBeDefined();
    expect(schema.$schema).toBe('https://json-schema.org/draft/2020-12/schema');
    expect(schema.type).toBe('object');
  });

  it('validates a well-formed manifest', () => {
    const validManifest = {
      version: 1,
      generatedAt: '2026-05-05T00:00:00.000Z',
      exports: [
        {
          name: 'MagaryButton',
          kind: 'component',
          sourceFile: 'src/lib/Button/button/button.ts',
          selector: 'magary-button',
          inputs: [{ name: 'label', type: 'string', required: false }],
          outputs: [{ name: 'onClick', type: 'EventEmitter<void>' }],
        },
        {
          name: 'InputSize',
          kind: 'type',
          sourceFile: 'src/lib/Form/input/input.ts',
        },
      ],
    };

    const result = validateManifest(validManifest);
    expect(result.valid).toBe(true);
    expect(result.errors).toHaveLength(0);
  });

  it('rejects manifest with missing required field (type/kind)', () => {
    const brokenManifest = {
      version: 1,
      generatedAt: '2026-05-05T00:00:00.000Z',
      exports: [
        {
          name: 'MagaryButton',
          // missing 'kind' field
          sourceFile: 'src/lib/Button/button/button.ts',
        },
      ],
    };

    const result = validateManifest(brokenManifest);
    expect(result.valid).toBe(false);
    expect(result.errors.some((e) => e.includes('kind'))).toBe(true);
  });

  it('rejects missing top-level version field', () => {
    const brokenManifest = {
      generatedAt: '2026-05-05T00:00:00.000Z',
      exports: [],
    };

    const result = validateManifest(brokenManifest);
    expect(result.valid).toBe(false);
    expect(result.errors.some((e) => e.includes('version'))).toBe(true);
  });

  it('rejects invalid kind value', () => {
    const brokenManifest = {
      version: 1,
      generatedAt: '2026-05-05T00:00:00.000Z',
      exports: [
        {
          name: 'SomeGhost',
          kind: 'ghost-type', // invalid
          sourceFile: 'some/file.ts',
        },
      ],
    };

    const result = validateManifest(brokenManifest);
    expect(result.valid).toBe(false);
    expect(result.errors.some((e) => e.includes('kind'))).toBe(true);
  });
});
