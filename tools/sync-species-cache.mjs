#!/usr/bin/env node
import fs from 'node:fs/promises';
import path from 'node:path';

const ROOT = process.cwd();
const API_BASE = 'https://tree-nation.com/api';
const OUT_PATH = path.join(ROOT, 'assets', 'data', 'species-cache.json');

// Species IDs shown on `species.html` (verified partner species).
const SPECIES_IDS = [
  3022, 1729, 2070, 727, 2071, 2208, 198, 2996, 1517, 730, 1730,
  2924, 184,
  729, 3043, 728, 3186, 204, 212,
  1741, 2072, 1206, 2068, 1519, 1516, 2286, 1374, 1746, 70, 1520, 3046, 2925,
  3590, 3315, 1189, 3031, 3303, 2350, 1367, 1861, 2415, 3596, 3060, 2905, 2213, 3061
];

const CACHE_TTL_NOTE = 'Generated snapshot for fast species-page hydration.';

function ordinal(n) {
  const mod10 = n % 10;
  const mod100 = n % 100;
  if (mod10 === 1 && mod100 !== 11) return `${n}st`;
  if (mod10 === 2 && mod100 !== 12) return `${n}nd`;
  if (mod10 === 3 && mod100 !== 13) return `${n}rd`;
  return `${n}th`;
}

function toDisplayDate(date) {
  const month = date.toLocaleString('en-US', { month: 'long', timeZone: 'UTC' });
  return `${month} ${ordinal(date.getUTCDate())}, ${date.getUTCFullYear()}`;
}

async function fetchSpeciesById(id) {
  const res = await fetch(`${API_BASE}/species/${id}`, { method: 'GET', redirect: 'follow' });
  if (!res.ok) throw new Error(`Species ${id}: HTTP ${res.status}`);
  return res.json();
}

async function run() {
  const uniq = Array.from(new Set(SPECIES_IDS));
  const now = new Date();

  // Fetch with a small concurrency cap so we finish quickly without hammering the API.
  const concurrency = 8;
  const byId = {};
  let cursor = 0;

  async function worker() {
    while (cursor < uniq.length) {
      const idx = cursor;
      cursor += 1;
      const sid = uniq[idx];
      const species = await fetchSpeciesById(sid);
      byId[sid] = species;
    }
  }

  await Promise.all(new Array(concurrency).fill(0).map(worker));

  const cache = {
    note: CACHE_TTL_NOTE,
    updatedAtIso: now.toISOString(),
    lastUpdated: toDisplayDate(now),
    speciesById: byId
  };

  await fs.mkdir(path.dirname(OUT_PATH), { recursive: true });
  await fs.writeFile(OUT_PATH, JSON.stringify(cache, null, 2) + '\n', 'utf8');
  console.log('[sync-species-cache] Wrote', OUT_PATH, 'species:', uniq.length);
}

run().catch((err) => {
  console.error('[sync-species-cache] Failed:', err?.message || err);
  process.exit(1);
});

