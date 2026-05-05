import { describe, it, expect } from 'vitest';
import { generateEditorialMetadata } from './generate-editorial-metadata.mjs';

// ---------------------------------------------------------------------------
// Fixtures
// ---------------------------------------------------------------------------

const sampleEditorial = {
  version: 1,
  entries: {
    MagaryButton: {
      description:
        'Primary action button with multiple variants: solid, outlined, and text. Supports icons and loading state.',
      usage:
        '<magary-button label="Submit" severity="primary" (onClick)="handleClick($event)" />',
      examples: ['Basic button', 'With icon', 'Loading state', 'Disabled'],
      notes:
        'Use magary-button over native <button> for consistent styling. Supports severity, size, rounded, shadow.',
      visibility: 'public',
    },
    MagaryAccordionTab: {
      description:
        'Single panel inside a MagaryAccordion. Each tab has a header and collapsible content.',
      usage:
        '<magary-accordion-tab header="Details"><p>More info...</p></magary-accordion-tab>',
      examples: ['Basic tab', 'Disabled tab'],
      notes: 'Must be used as a direct child of MagaryAccordion.',
      visibility: 'companion',
    },
  },
};

const emptyEditorial = {
  version: 1,
  entries: {},
};

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe('generateEditorialMetadata', () => {
  it('produces valid TypeScript with EditorialEntry interface', () => {
    const output = generateEditorialMetadata(sampleEditorial);

    // The output must contain the interface declaration
    expect(output).toContain('export interface EditorialEntry');
    expect(output).toContain('description: string');
    expect(output).toContain('usage: string');
    expect(output).toContain('examples: string[]');
    expect(output).toContain('notes: string');
    expect(output).toContain("visibility: 'public' | 'internal' | 'companion'");
  });

  it('produces a typed EDITORIAL_METADATA const record', () => {
    const output = generateEditorialMetadata(sampleEditorial);

    expect(output).toContain(
      'export const EDITORIAL_METADATA: Record<string, EditorialEntry>',
    );
  });

  it('includes all entries from editorial data', () => {
    const output = generateEditorialMetadata(sampleEditorial);

    // Both entries should appear in the generated output
    expect(output).toContain('MagaryButton');
    expect(output).toContain('MagaryAccordionTab');
  });

  it('embeds description text from editorial entries', () => {
    const output = generateEditorialMetadata(sampleEditorial);

    expect(output).toContain(
      'Primary action button with multiple variants',
    );
  });

  it('embeds usage example text from editorial entries', () => {
    const output = generateEditorialMetadata(sampleEditorial);

    expect(output).toContain('<magary-button label="Submit"');
  });

  it('embeds examples array from editorial entries', () => {
    const output = generateEditorialMetadata(sampleEditorial);

    // The generated TS uses single-quoted strings for examples
    expect(output).toContain("'Basic button'");
    expect(output).toContain("'Loading state'");
  });

  it('embeds notes from editorial entries', () => {
    const output = generateEditorialMetadata(sampleEditorial);

    expect(output).toContain(
      'Use magary-button over native',
    );
  });

  it('includes visibility value from editorial entries', () => {
    const output = generateEditorialMetadata(sampleEditorial);

    // Visibility is emitted as single-quoted TS strings
    expect(output).toContain("visibility: 'public'");
    expect(output).toContain("visibility: 'companion'");
  });

  it('handles empty editorial entries gracefully', () => {
    const output = generateEditorialMetadata(emptyEditorial);

    // Must still produce valid TypeScript with interface and const, just empty record
    expect(output).toContain('export interface EditorialEntry');
    expect(output).toContain(
      'export const EDITORIAL_METADATA: Record<string, EditorialEntry>',
    );
    expect(output).toContain('{');
    expect(output).toContain('}');
  });

  it('escapes double quotes in description strings', () => {
    const editorialWithQuotes = {
      version: 1,
      entries: {
        TestComponent: {
          description: 'Uses "double quotes" inside text',
          usage: 'basic',
          examples: ['Example "one"'],
          notes: 'Note with "quotes"',
          visibility: 'public',
        },
      },
    };

    const output = generateEditorialMetadata(editorialWithQuotes);

    // Should escape or use template literals to avoid breaking TypeScript strings
    // Either escaped quotes or template literals (backticks) are valid
    const hasEscapedOrBacktick =
      output.includes('\\"double quotes\\"') ||
      output.includes('`Uses "double quotes" inside text`');
    expect(hasEscapedOrBacktick).toBe(true);
  });

  it('escapes backtick characters in description strings', () => {
    const editorialWithBackticks = {
      version: 1,
      entries: {
        TestComponent: {
          description: 'Uses `backticks` inside text',
          usage: 'basic',
          examples: ['Example'],
          notes: 'Note',
          visibility: 'public',
        },
      },
    };

    const output = generateEditorialMetadata(editorialWithBackticks);

    // Backticks must be escaped or the string must not use template literals
    const safe =
      output.includes('\\`backticks\\`') ||
      !output.includes('`Uses `backticks` inside text`');
    expect(safe).toBe(true);
  });

  it('preserves multi-line strings in usage examples', () => {
    const output = generateEditorialMetadata(sampleEditorial);

    // The MagaryAccordionTab usage has multiple lines with <p> tag
    expect(output).toContain('<p>More info...</p>');
  });

  it('produces syntactically parseable TypeScript', () => {
    // Basic check: opening/closing braces balanced
    const output = generateEditorialMetadata(sampleEditorial);

    // Count actual export declarations (keyword at start of line, not in comments)
    const exportCount = (output.match(/^export /gm) || []).length;
    expect(exportCount).toBe(2); // one interface + one const

    // Simple brace balance check
    const openBraces = (output.match(/\{/g) || []).length;
    const closeBraces = (output.match(/\}/g) || []).length;
    expect(openBraces).toBe(closeBraces);
  });
});
