import fs from 'node:fs';
import path from 'node:path';

// ---------------------------------------------------------------------------
// Enrichment — merge manifest + editorial
// ---------------------------------------------------------------------------

const VALID_VISIBILITY = new Set(['public', 'internal', 'companion']);

/**
 * Merges editorial metadata into a generated manifest.
 * Generated fields (selector, inputs, outputs, kind, sourceFile, name) are
 * NEVER overwritten by editorial data.
 *
 * @param {{version: number, generatedAt: string, exports: Array<object>}} manifest
 * @param {{version: number, entries: Record<string, object>}} editorial
 * @returns {{version: number, generatedAt: string, exports: Array<object>}}
 */
export function enrichManifest(manifest, editorial) {
  const entries = editorial?.entries ?? {};

  const enrichedExports = manifest.exports.map((exportEntry) => {
    const editorialData = entries[exportEntry.name];
    if (!editorialData) {
      return { ...exportEntry };
    }

    // Merge: generated fields take priority, editorial enriches
    const enriched = {
      ...exportEntry,
      description: editorialData.description,
      usage: editorialData.usage,
      examples: editorialData.examples,
      notes: editorialData.notes,
      visibility: normalizeVisibility(editorialData.visibility),
    };

    return enriched;
  });

  return {
    version: manifest.version,
    generatedAt: manifest.generatedAt,
    exports: enrichedExports,
  };
}

/**
 * Normalizes visibility to a known value. Defaults to 'public'.
 * @param {string|undefined} raw
 * @returns {'public'|'internal'|'companion'}
 */
function normalizeVisibility(raw) {
  if (!raw || !VALID_VISIBILITY.has(raw)) {
    return 'public';
  }
  return raw;
}

/**
 * Filters manifest exports by visibility.
 * Entries without explicit visibility are treated as public (included when
 * filtering for public).
 *
 * @param {object} enrichedManifest
 * @param {string|string[]} allowed — visibility value(s) to include
 * @returns {{version: number, generatedAt: string, exports: Array<object>}}
 */
export function filterByVisibility(enrichedManifest, allowed) {
  const allowedSet = new Set(Array.isArray(allowed) ? allowed : [allowed]);

  const filteredExports = enrichedManifest.exports.filter((entry) => {
    const visibility = entry.visibility ?? 'public';
    return allowedSet.has(visibility);
  });

  return {
    version: enrichedManifest.version,
    generatedAt: enrichedManifest.generatedAt,
    exports: filteredExports,
  };
}
