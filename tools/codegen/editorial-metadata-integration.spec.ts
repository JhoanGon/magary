/**
 * Integration test: verifies the generated editorial-metadata.ts
 * correctly maps editorial.json content for the MagaryButton component.
 *
 * This test validates the data contract consumed by the Buttons demo page.
 */
import { describe, it, expect, beforeAll } from 'vitest';

// Dynamic import of the generated file (mjs can import .ts with vitest)
describe('Editorial Metadata — Buttons Page Contract', () => {
  let EDITORIAL_METADATA: Record<string, unknown>;

  beforeAll(async () => {
    const mod = await import(
      '../../../projects/demo-app/src/app/generated/editorial-metadata'
    );
    EDITORIAL_METADATA = mod.EDITORIAL_METADATA;
  });

  it('contains MagaryButton entry with all required fields', () => {
    const entry = EDITORIAL_METADATA['MagaryButton'];
    expect(entry).toBeDefined();
    expect(entry).toHaveProperty('description');
    expect(entry).toHaveProperty('usage');
    expect(entry).toHaveProperty('examples');
    expect(entry).toHaveProperty('notes');
    expect(entry).toHaveProperty('visibility');
  });

  it('MagaryButton description matches editorial source', () => {
    const entry = EDITORIAL_METADATA['MagaryButton'] as Record<string, unknown>;
    expect(entry.description).toContain('Primary action button');
    expect(entry.description).toContain('multiple variants');
    expect(entry.description).toContain('Supports icons');
  });

  it('MagaryButton usage is a non-empty string', () => {
    const entry = EDITORIAL_METADATA['MagaryButton'] as Record<string, unknown>;
    expect(entry.usage).toBeTruthy();
    expect(typeof entry.usage).toBe('string');
    expect((entry.usage as string).length).toBeGreaterThan(10);
  });

  it('MagaryButton examples is a non-empty array', () => {
    const entry = EDITORIAL_METADATA['MagaryButton'] as Record<string, unknown>;
    expect(Array.isArray(entry.examples)).toBe(true);
    expect((entry.examples as string[]).length).toBeGreaterThanOrEqual(1);
    expect(entry.examples).toContain('Basic button');
  });

  it('MagaryButton visibility is public', () => {
    const entry = EDITORIAL_METADATA['MagaryButton'] as Record<string, unknown>;
    expect(entry.visibility).toBe('public');
  });

  it('contains companion entries like MagaryAccordionTab', () => {
    const entry = EDITORIAL_METADATA['MagaryAccordionTab'];
    expect(entry).toBeDefined();
    expect((entry as Record<string, unknown>).visibility).toBe('companion');
  });

  it('does not contain non-existent entries', () => {
    expect(EDITORIAL_METADATA['NonExistentComponent']).toBeUndefined();
  });
});
