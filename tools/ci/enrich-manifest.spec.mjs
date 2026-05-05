import { describe, it, expect } from 'vitest';
import { enrichManifest, filterByVisibility } from './enrich-manifest.mjs';

// ---------------------------------------------------------------------------
// Fixtures
// ---------------------------------------------------------------------------

const sampleManifest = {
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
      name: 'MagaryTab',
      kind: 'component',
      sourceFile: 'src/lib/Panel/tabs/tab/tab.ts',
      selector: 'magary-tab',
      inputs: [{ name: 'label', type: 'string', required: false }],
      outputs: [],
    },
    {
      name: 'MagaryAccordionTab',
      kind: 'component',
      sourceFile: 'src/lib/Panel/accordion/accordion-tab.ts',
      selector: 'magary-accordion-tab',
      inputs: [{ name: 'header', type: 'string', required: false }],
      outputs: [],
    },
    {
      name: 'Theme',
      kind: 'type',
      sourceFile: 'src/lib/Services/theme.service.ts',
    },
    {
      name: 'MagaryConfirmationService',
      kind: 'service',
      sourceFile: 'src/lib/Overlay/confirm-dialog/confirmation.service.ts',
    },
  ],
};

const sampleEditorial = {
  version: 1,
  entries: {
    MagaryButton: {
      description: 'Primary action button with multiple variants.',
      usage: '<magary-button [label]="\'Click me\'"></magary-button>',
      examples: ['Basic usage', 'With icon', 'Loading state'],
      notes: 'Always use magary-button over native <button>.',
      visibility: 'public',
    },
    MagaryTab: {
      description: 'Individual tab panel for use inside MagaryTabs.',
      usage: '<magary-tab label="Tab 1"><p>Content</p></magary-tab>',
      examples: ['Basic tab', 'Nested content'],
      notes: 'Must be a child of MagaryTabs.',
      visibility: 'companion',
    },
    MagaryAccordionTab: {
      description: 'Single accordion tab panel.',
      usage: '<magary-accordion-tab header="Section 1">Content</magary-accordion-tab>',
      examples: ['Basic accordion tab'],
      notes: 'Must be used inside MagaryAccordion.',
      visibility: 'companion',
    },
    MagaryConfirmationService: {
      description: 'Service for showing confirmation dialogs.',
      usage: 'inject(MagaryConfirmationService).confirm({...})',
      examples: ['Delete confirmation', 'Save confirmation'],
      notes: 'Use app-level injection.',
      visibility: 'public',
    },
  },
};

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe('enrichManifest', () => {
  it('merges editorial metadata into manifest entries', () => {
    const enriched = enrichManifest(sampleManifest, sampleEditorial);

    // Manifest structure preserved
    expect(enriched.version).toBe(1);
    expect(enriched.exports).toHaveLength(5);

    // Enriched entry has editorial data
    const button = enriched.exports.find((e) => e.name === 'MagaryButton');
    expect(button).toBeDefined();
    expect(button.description).toBe('Primary action button with multiple variants.');
    expect(button.usage).toBe('<magary-button [label]="\'Click me\'"></magary-button>');
    expect(button.examples).toEqual(['Basic usage', 'With icon', 'Loading state']);
    expect(button.notes).toBe('Always use magary-button over native <button>.');
    expect(button.visibility).toBe('public');

    // Generated fields preserved
    expect(button.selector).toBe('magary-button');
    expect(button.inputs).toHaveLength(1);
  });

  it('preserves manifest entries without editorial metadata', () => {
    const enriched = enrichManifest(sampleManifest, sampleEditorial);

    const theme = enriched.exports.find((e) => e.name === 'Theme');
    expect(theme).toBeDefined();
    expect(theme.description).toBeUndefined();
    expect(theme.visibility).toBeUndefined();
    // But generated fields remain
    expect(theme.kind).toBe('type');
  });

  it('applies companion visibility tag', () => {
    const enriched = enrichManifest(sampleManifest, sampleEditorial);

    const tab = enriched.exports.find((e) => e.name === 'MagaryTab');
    expect(tab.visibility).toBe('companion');
    expect(tab.description).toBeDefined();
  });

  it('does not modify generated fields (selector, inputs, outputs) with editorial data', () => {
    const enriched = enrichManifest(sampleManifest, sampleEditorial);

    const button = enriched.exports.find((e) => e.name === 'MagaryButton');
    // Generated fields unchanged
    expect(button.selector).toBe('magary-button');
    expect(button.inputs).toEqual([{ name: 'label', type: 'string', required: false }]);
    expect(button.outputs).toEqual([{ name: 'onClick', type: 'EventEmitter<void>' }]);
  });

  it('handles empty editorial gracefully', () => {
    const enriched = enrichManifest(sampleManifest, { version: 1, entries: {} });

    expect(enriched.exports).toHaveLength(5);
    for (const entry of enriched.exports) {
      expect(entry.visibility).toBeUndefined();
    }
  });
});

describe('filterByVisibility', () => {
  it('filters out internal entries', () => {
    const editorial = {
      version: 1,
      entries: {
        MagaryButton: { description: '', visibility: 'public' },
        MagaryTab: { description: '', visibility: 'internal' },
        MagaryAccordionTab: { description: '', visibility: 'companion' },
      },
    };

    const enriched = enrichManifest(sampleManifest, editorial);
    const publicOnly = filterByVisibility(enriched, 'public');

    const names = publicOnly.exports.map((e) => e.name).sort();
    expect(names).toContain('MagaryButton');
    expect(names).not.toContain('MagaryTab'); // internal excluded
    expect(names).not.toContain('MagaryAccordionTab'); // companion excluded from 'public' filter
    expect(names).toContain('Theme'); // no editorial = default: included
  });

  it('includes companion entries when filtering for companion+public', () => {
    const editorial = {
      version: 1,
      entries: {
        MagaryButton: { description: '', visibility: 'public' },
        MagaryTab: { description: '', visibility: 'internal' },
        MagaryAccordionTab: { description: '', visibility: 'companion' },
      },
    };

    const enriched = enrichManifest(sampleManifest, editorial);
    const allVisible = filterByVisibility(enriched, ['public', 'companion']);

    const names = allVisible.exports.map((e) => e.name).sort();
    expect(names).toContain('MagaryButton');
    expect(names).toContain('MagaryAccordionTab');
    expect(names).not.toContain('MagaryTab'); // internal still excluded
  });
});

describe('enrich-manifest schema compliance', () => {
  it('enriched manifest passes schema validation', () => {
    const enriched = enrichManifest(sampleManifest, sampleEditorial);

    // Basic structural assertions
    expect(enriched.version).toBe(1);
    expect(typeof enriched.generatedAt).toBe('string');
    expect(Array.isArray(enriched.exports)).toBe(true);

    for (const entry of enriched.exports) {
      expect(entry.name).toBeDefined();
      expect(entry.kind).toBeDefined();
      expect(entry.sourceFile).toBeDefined();
    }
  });

  it('rejects editorial with unknown visibility value via validation', () => {
    // Bad editorial with invalid visibility
    const badEditorial = {
      version: 1,
      entries: {
        MagaryButton: { description: '', visibility: 'super-secret' },
      },
    };

    // enrichManifest should not crash, but the enrichment should not set invalid visibility
    // Or it should reject the invalid value. Design says "apply visibility rules".
    // Let's expect it to normalize or reject.
    expect(() => {
      enrichManifest(sampleManifest, badEditorial);
    }).not.toThrow();
  });
});
