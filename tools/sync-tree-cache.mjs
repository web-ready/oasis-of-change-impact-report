#!/usr/bin/env node
import fs from 'node:fs/promises';
import path from 'node:path';

const ROOT = process.cwd();
const API_BASE = 'https://tree-nation.com/api';
const OUT_PATH = path.join(ROOT, 'assets', 'data', 'tree-stats-cache.json');

const FORESTS = [
  { id: 583310, partnerId: 'web-ready' },
  { id: 736166, partnerId: 'spes' },
  { id: 723719, partnerId: 'sustainable-www' },
  { id: 702493, partnerId: 'mst' },
  { id: 786435, partnerId: 'ecosearch' },
  { id: 954402, partnerId: 'denman-place-mall' },
  { id: 955445, partnerId: 'gabriel-dalton' },
  { id: 955812, partnerId: 'wesn' }
];

const LEGACY_TREES = 7338;
const SHARED_TREES_WITH_WEB_READY = {
  // WESN/Web-Ready shared allocation.
  wesn: 900
};

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

async function fetchForest(id) {
  const res = await fetch(`${API_BASE}/forests/${id}`, { method: 'GET', redirect: 'follow' });
  if (!res.ok) throw new Error(`Forest ${id}: HTTP ${res.status}`);
  return res.json();
}

async function run() {
  const fetched = await Promise.all(
    FORESTS.map(async (f) => ({ ...f, data: await fetchForest(f.id) }))
  );

  const byId = {};
  for (const f of fetched) {
    const trees = Number(f.data.tree_count || 0);
    const co2Tonnes = Number(f.data.co2_compensated_tons || 0);
    byId[f.partnerId] = { trees, co2Tonnes };
  }

  const webReadyTrees = byId['web-ready']?.trees || 0;
  const webReadyCo2Kg = Math.round((byId['web-ready']?.co2Tonnes || 0) * 1000);

  const additivePartnerTrees = Object.entries(byId).reduce((sum, [id, p]) => {
    if (id === 'web-ready') return sum;
    const partnerTrees = p.trees || 0;
    const sharedTrees = Math.max(0, Math.min(partnerTrees, Number(SHARED_TREES_WITH_WEB_READY[id]) || 0));
    return sum + Math.max(0, partnerTrees - sharedTrees);
  }, 0);

  const verifiedTrees = webReadyTrees + additivePartnerTrees;
  const totalTrees = verifiedTrees + LEGACY_TREES;

  const now = new Date();
  const cache = {
    updatedAtIso: now.toISOString(),
    lastUpdated: toDisplayDate(now),
    totals: {
      webReadyTrees,
      webReadyCo2Kg,
      verifiedTrees,
      legacyTrees: LEGACY_TREES,
      totalTrees
    },
    partnersById: {
      spes: byId.spes || { trees: 0, co2Tonnes: 0 },
      'sustainable-www': byId['sustainable-www'] || { trees: 0, co2Tonnes: 0 },
      mst: byId.mst || { trees: 0, co2Tonnes: 0 },
      ecosearch: byId.ecosearch || { trees: 0, co2Tonnes: 0 },
      'denman-place-mall': byId['denman-place-mall'] || { trees: 0, co2Tonnes: 0 },
      'gabriel-dalton': byId['gabriel-dalton'] || { trees: 0, co2Tonnes: 0 },
      wesn: byId.wesn || { trees: 0, co2Tonnes: 0 }
    }
  };

  await fs.mkdir(path.dirname(OUT_PATH), { recursive: true });
  await fs.writeFile(OUT_PATH, JSON.stringify(cache, null, 2) + '\n', 'utf8');

  console.log('[sync-tree-cache] Updated', OUT_PATH);
  console.log('[sync-tree-cache] Totals:', cache.totals);
}

run().catch((err) => {
  console.error('[sync-tree-cache] Failed:', err.message || err);
  process.exit(1);
});
