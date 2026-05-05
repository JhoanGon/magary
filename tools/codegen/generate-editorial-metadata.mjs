/**
 * Generate a typed TypeScript constants file from editorial.json metadata.
 *
 * This is a pure function: editorial JSON data → TypeScript source string.
 * The generated file is importable by any Angular/demo component.
 *
 * @param {object} editorialData - Parsed editorial.json content
 * @param {number} editorialData.version
 * @param {Record<string, object>} editorialData.entries - Map of component name → editorial entry
 * @returns {string} TypeScript source code with EditorialEntry interface and EDITORIAL_METADATA const
 */
export function generateEditorialMetadata(editorialData) {
  const entries = editorialData.entries ?? {};

  const lines = [];

  // Header
  lines.push('// Auto-generated from projects/ng-magary/editorial.json');
  lines.push('// DO NOT EDIT MANUALLY — changes will be overwritten');
  lines.push('');

  // Interface
  lines.push('/** Editorial metadata for a component. */');
  lines.push('export interface EditorialEntry {');
  lines.push('  /** Human-readable description of the component. */');
  lines.push('  description: string;');
  lines.push('  /** Example usage snippet. */');
  lines.push('  usage: string;');
  lines.push('  /** Named usage examples. */');
  lines.push('  examples: string[];');
  lines.push('  /** Additional notes or caveats. */');
  lines.push('  notes: string;');
  lines.push("  /** Visibility: public (shown), internal (hidden), companion (reduced). */");
  lines.push("  visibility: 'public' | 'internal' | 'companion';");
  lines.push('}');
  lines.push('');

  // Const record
  lines.push('/** Editorial metadata keyed by component export name. */');
  lines.push(
    "export const EDITORIAL_METADATA: Record<string, EditorialEntry> = {",
  );

  const entryNames = Object.keys(entries);
  for (let i = 0; i < entryNames.length; i++) {
    const name = entryNames[i];
    const entry = entries[name];
    const isLast = i === entryNames.length - 1;

    lines.push(`  ${name}: {`);
    lines.push(`    description: ${escapeStringField(entry.description)},`);
    lines.push(`    usage: ${escapeStringField(entry.usage)},`);
    lines.push(
      `    examples: [${(entry.examples ?? []).map((ex) => escapeStringField(ex)).join(', ')}],`,
    );
    lines.push(`    notes: ${escapeStringField(entry.notes)},`);
    lines.push(`    visibility: '${entry.visibility}',`);
    lines.push(`  }${isLast ? '' : ','}`);
  }

  lines.push('};\n');

  return lines.join('\n');
}

/**
 * Safely embed a string as a TypeScript string literal.
 * Uses template literals (backticks) when the string contains double quotes,
 * otherwise uses single-quoted strings. Escapes backticks within template literals.
 *
 * @param {string} value
 * @returns {string} TypeScript string literal expression
 */
function escapeStringField(value) {
  if (value == null) return "''";

  const str = String(value);

  // Multi-line strings MUST use template literals
  // Single-line strings: use single quotes (simpler output) unless they contain single quotes
  if (str.includes('\n') || str.includes('\r')) {
    // Template literal: escape backticks and dollar-brace (template interpolation)
    const escaped = str.replace(/`/g, '\\`').replace(/\$\{/g, '\\${');
    return '`' + escaped + '`';
  }

  if (str.includes('"')) {
    // Use template literal for strings containing double quotes (no newlines here)
    const escaped = str.replace(/`/g, '\\`').replace(/\$\{/g, '\\${');
    return '`' + escaped + '`';
  }

  // Safe to use single quotes
  if (str.includes("'")) {
    // Contains single quotes but no double quotes or newlines → use template literal
    const escaped = str.replace(/`/g, '\\`').replace(/\$\{/g, '\\${');
    return '`' + escaped + '`';
  }

  // Simple string: use single quotes
  return "'" + str + "'";
}

// ---------------------------------------------------------------------------
// CLI mode: when run directly, read editorial.json and write the TS file
// ---------------------------------------------------------------------------
const __filename = import.meta.url
  ? new URL(import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1')
  : process.argv[1]?.replace(/\\/g, '/');
const isMain = process.argv[1]
  ? process.argv[1].replace(/\\/g, '/').endsWith('generate-editorial-metadata.mjs')
  : false;

if (isMain) {
  import('fs/promises').then(async ({ readFile, writeFile, mkdir }) => {
    import('path').then(async (path) => {
      const root = process.env.INIT_CWD || process.cwd();
      const editorialPath = path.resolve(
        root,
        'projects/ng-magary/editorial.json',
      );
      const outputDir = path.resolve(
        root,
        'projects/demo-app/src/app/generated',
      );
      const outputPath = path.resolve(outputDir, 'editorial-metadata.ts');

      try {
        const raw = await readFile(editorialPath, 'utf-8');
        const data = JSON.parse(raw);
        const ts = generateEditorialMetadata(data);

        await mkdir(outputDir, { recursive: true });
        await writeFile(outputPath, ts, 'utf-8');
        console.log(`Generated ${outputPath} (${Object.keys(data.entries ?? {}).length} entries)`);
      } catch (err) {
        console.error('Failed to generate editorial metadata:', err.message);
        process.exit(1);
      }
    });
  });
}
