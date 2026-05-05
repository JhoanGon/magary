import { describe, it, expect } from 'vitest';
import { generateMCPCatalog } from './generate-mcp-catalog.mjs';

// ---------------------------------------------------------------------------
// Fixtures
// ---------------------------------------------------------------------------

const sampleEnrichedManifest = {
  version: 1,
  generatedAt: '2026-05-05T00:00:00.000Z',
  exports: [
    {
      name: 'MagaryButton',
      kind: 'component',
      sourceFile: 'projects/ng-magary/src/lib/Button/button/button.ts',
      selector: 'magary-button',
      inputs: [
        { name: 'label', type: 'string', required: false },
        { name: 'disabled', type: 'boolean', required: false },
      ],
      outputs: [{ name: 'onClick', type: 'EventEmitter<void>' }],
      description: 'Primary action button with multiple variants.',
      usage: '<magary-button label="Click"></magary-button>',
      examples: ['Basic', 'With icon'],
      notes: 'Always use magary-button over native <button>.',
      visibility: 'public',
    },
    {
      name: 'MagaryAccordionTab',
      kind: 'component',
      sourceFile: 'projects/ng-magary/src/lib/Panel/accordion/accordion-tab.ts',
      selector: 'magary-accordion-tab',
      inputs: [{ name: 'header', type: 'string', required: false }],
      outputs: [],
      description: 'Single panel inside MagaryAccordion.',
      visibility: 'companion',
    },
    {
      name: 'MenuService',
      kind: 'service',
      sourceFile: 'projects/ng-magary/src/lib/Menu/menu.service.ts',
      description: 'Internal menu state management.',
      visibility: 'internal',
    },
    {
      name: 'MagaryCheckbox',
      kind: 'component',
      sourceFile: 'projects/ng-magary/src/lib/Form/checkbox/checkbox.ts',
      selector: 'magary-checkbox',
      inputs: [
        { name: 'label', type: 'string', required: false },
        { name: 'disabled', type: 'boolean', required: false },
        { name: 'required', type: 'boolean', required: false },
      ],
      outputs: [{ name: 'change', type: 'EventEmitter<boolean>' }],
      description: 'Checkbox form control with label.',
      visibility: 'public',
    },
    {
      name: 'MagaryTooltipDirective',
      kind: 'directive',
      sourceFile: 'projects/ng-magary/src/lib/Overlay/tooltip/tooltip.ts',
      selector: '[magaryTooltip]',
      inputs: [
        { name: 'tooltipText', type: 'string', required: false },
        { name: 'tooltipPosition', type: "string", required: false },
      ],
      outputs: [],
      description: 'Tooltip directive that shows text on hover.',
      visibility: 'public',
    },
    {
      name: 'CardConfig',
      kind: 'type',
      sourceFile: 'projects/ng-magary/src/lib/Panel/card/card.types.ts',
    },
    {
      name: 'MagaryGridItem',
      kind: 'component',
      sourceFile: 'projects/ng-magary/src/lib/Grid/grid-item/grid-item.ts',
      selector: 'magary-grid-item',
      inputs: [{ name: 'x', type: 'number', required: false }],
      outputs: [],
      description: 'Individual grid item for MagaryGrid.',
      visibility: 'companion',
    },
  ],
};

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe('generateMCPCatalog', () => {
  it('filters by public visibility only', () => {
    const catalog = generateMCPCatalog(sampleEnrichedManifest);

    const names = catalog.map((c) => c.name);
    expect(names).toContain('MagaryButton');
    expect(names).toContain('MagaryCheckbox');
    expect(names).toContain('MagaryTooltipDirective');
    // companion + internal excluded
    expect(names).not.toContain('MagaryAccordionTab');
    expect(names).not.toContain('MenuService');
    expect(names).not.toContain('MagaryGridItem');
  });

  it('excludes non-component/non-directive kinds', () => {
    const catalog = generateMCPCatalog(sampleEnrichedManifest);

    const names = catalog.map((c) => c.name);
    expect(names).not.toContain('CardConfig');
  });

  it('produces correct catalog shape with all required fields', () => {
    const catalog = generateMCPCatalog(sampleEnrichedManifest);
    expect(catalog.length).toBeGreaterThan(0);

    for (const entry of catalog) {
      expect(entry).toHaveProperty('name');
      expect(entry).toHaveProperty('selector');
      expect(entry).toHaveProperty('inputs');
      expect(entry).toHaveProperty('outputs');
      expect(entry).toHaveProperty('description');
      expect(entry).toHaveProperty('filePath');

      expect(typeof entry.name).toBe('string');
      expect(typeof entry.selector).toBe('string');
      expect(Array.isArray(entry.inputs)).toBe(true);
      expect(Array.isArray(entry.outputs)).toBe(true);
      expect(typeof entry.description).toBe('string');
      expect(typeof entry.filePath).toBe('string');
    }
  });

  it('maps inputs with name, type, and required fields', () => {
    const catalog = generateMCPCatalog(sampleEnrichedManifest);
    const button = catalog.find((c) => c.name === 'MagaryButton');

    expect(button).toBeDefined();
    expect(button.inputs).toHaveLength(2);
    expect(button.inputs[0]).toEqual({
      name: 'label',
      type: 'string',
      required: false,
    });
    expect(button.inputs[1]).toEqual({
      name: 'disabled',
      type: 'boolean',
      required: false,
    });
  });

  it('maps outputs with name and description fields', () => {
    const catalog = generateMCPCatalog(sampleEnrichedManifest);
    const button = catalog.find((c) => c.name === 'MagaryButton');

    expect(button).toBeDefined();
    expect(button.outputs).toHaveLength(1);
    expect(button.outputs[0]).toEqual({
      name: 'onClick',
      description: 'Event emitter for onClick',
    });
  });

  it('uses description from editorial metadata (enriched manifest)', () => {
    const catalog = generateMCPCatalog(sampleEnrichedManifest);
    const button = catalog.find((c) => c.name === 'MagaryButton');

    expect(button).toBeDefined();
    expect(button.description).toBe('Primary action button with multiple variants.');
  });

  it('maps filePath from sourceFile', () => {
    const catalog = generateMCPCatalog(sampleEnrichedManifest);
    const button = catalog.find((c) => c.name === 'MagaryButton');

    expect(button).toBeDefined();
    expect(button.filePath).toBe('projects/ng-magary/src/lib/Button/button/button.ts');
  });

  it('handles empty manifest gracefully', () => {
    const emptyManifest = { version: 1, generatedAt: '2026-05-05T00:00:00.000Z', exports: [] };
    const catalog = generateMCPCatalog(emptyManifest);

    expect(catalog).toEqual([]);
  });

  it('includes directive-kind entries alongside components', () => {
    const catalog = generateMCPCatalog(sampleEnrichedManifest);

    const directive = catalog.find((c) => c.name === 'MagaryTooltipDirective');
    expect(directive).toBeDefined();
    expect(directive.selector).toBe('[magaryTooltip]');
  });

  it('does not include kind field in output (MCP shape compatibility)', () => {
    const catalog = generateMCPCatalog(sampleEnrichedManifest);

    for (const entry of catalog) {
      expect(entry).not.toHaveProperty('kind');
    }
  });

  it('does not include editorial fields (usage, examples, notes, visibility) in output', () => {
    const catalog = generateMCPCatalog(sampleEnrichedManifest);

    for (const entry of catalog) {
      expect(entry).not.toHaveProperty('usage');
      expect(entry).not.toHaveProperty('examples');
      expect(entry).not.toHaveProperty('notes');
      expect(entry).not.toHaveProperty('visibility');
    }
  });

  it('handles component without selector gracefully', () => {
    const manifestNoSelector = {
      version: 1,
      generatedAt: '2026-05-05T00:00:00.000Z',
      exports: [
        {
          name: 'NoSelectorComp',
          kind: 'component',
          sourceFile: 'projects/ng-magary/src/lib/test.ts',
          inputs: [],
          outputs: [],
          description: 'No selector component.',
          visibility: 'public',
        },
      ],
    };

    const catalog = generateMCPCatalog(manifestNoSelector);
    expect(catalog[0].selector).toBe('');
  });
});
