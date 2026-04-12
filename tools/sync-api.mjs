#!/usr/bin/env node
/**
 * sync-api.mjs — Generate api/v1/impact.json from the tree-stats cache.
 */
import fs from 'node:fs/promises';
import path from 'node:path';

const ROOT = process.cwd();
const CACHE_PATH = path.join(ROOT, 'assets', 'data', 'tree-stats-cache.json');
const OUT_PATH = path.join(ROOT, 'api', 'v1', 'impact.json');

const SPECIES_COUNT = 106;

async function run() {
  const cache = JSON.parse(await fs.readFile(CACHE_PATH, 'utf8'));
  const totals = cache.totals || {};

  const api = {
    totalTrees: totals.totalTrees || 0,
    verifiedTrees: totals.verifiedTrees || 0,
    legacyTrees: totals.legacyTrees || 0,
    co2OffsetKg: totals.webReadyCo2Kg || 0,
    species: SPECIES_COUNT,
    lastUpdated: cache.lastUpdated || null,
    updatedAtIso: cache.updatedAtIso || null
  };

  await fs.mkdir(path.dirname(OUT_PATH), { recursive: true });
  await fs.writeFile(OUT_PATH, JSON.stringify(api, null, 2) + '\n', 'utf8');

  console.log('[sync-api] Written', OUT_PATH);
}

run().catch((err) => {
  console.error('[sync-api] Failed:', err.message || err);
  process.exit(1);
});
