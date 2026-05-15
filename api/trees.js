/* Vercel serverless function: live tree counts from Tree-Nation.
   Returns the same payload shape as assets/data/tree-stats-cache.json so
   tree-cache-loader.js can consume either source interchangeably.

   Edge-cached for 10 min with 24h stale-while-revalidate, bounding origin
   calls to Tree-Nation to ~144/day regardless of incoming traffic. */

const API_BASE = 'https://tree-nation.com/api';

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
const SHARED_TREES_WITH_WEB_READY = { wesn: 900 };
const PARTNER_IDS = ['spes', 'sustainable-www', 'mst', 'ecosearch', 'denman-place-mall', 'gabriel-dalton', 'wesn'];

function ordinal(n) {
  const mod10 = n % 10;
  const mod100 = n % 100;
  if (mod10 === 1 && mod100 !== 11) return n + 'st';
  if (mod10 === 2 && mod100 !== 12) return n + 'nd';
  if (mod10 === 3 && mod100 !== 13) return n + 'rd';
  return n + 'th';
}

function toDisplayDate(date) {
  const month = date.toLocaleString('en-US', { month: 'long', timeZone: 'UTC' });
  return month + ' ' + ordinal(date.getUTCDate()) + ', ' + date.getUTCFullYear();
}

async function fetchForest(id) {
  const res = await fetch(API_BASE + '/forests/' + id, {
    method: 'GET',
    redirect: 'follow',
    headers: { 'User-Agent': 'oasisofchange-impact-report/1.0 (+https://oasisofchange.com)' }
  });
  if (!res.ok) throw new Error('Forest ' + id + ': HTTP ' + res.status);
  return res.json();
}

module.exports = async function handler(req, res) {
  try {
    const fetched = await Promise.all(
      FORESTS.map(async (f) => ({ ...f, data: await fetchForest(f.id) }))
    );

    const byId = {};
    for (const f of fetched) {
      byId[f.partnerId] = {
        trees: Number(f.data.tree_count || 0),
        co2Tonnes: Number(f.data.co2_compensated_tons || 0)
      };
    }

    const webReadyTrees = (byId['web-ready'] && byId['web-ready'].trees) || 0;
    const webReadyCo2Kg = Math.round(((byId['web-ready'] && byId['web-ready'].co2Tonnes) || 0) * 1000);

    let additivePartnerTrees = 0;
    for (const [id, p] of Object.entries(byId)) {
      if (id === 'web-ready') continue;
      const partnerTrees = p.trees || 0;
      const sharedTrees = Math.max(0, Math.min(partnerTrees, Number(SHARED_TREES_WITH_WEB_READY[id]) || 0));
      additivePartnerTrees += Math.max(0, partnerTrees - sharedTrees);
    }

    const verifiedTrees = webReadyTrees + additivePartnerTrees;
    const totalTrees = verifiedTrees + LEGACY_TREES;

    const partnersById = {};
    for (const id of PARTNER_IDS) {
      partnersById[id] = byId[id] || { trees: 0, co2Tonnes: 0 };
    }

    const now = new Date();
    const payload = {
      updatedAtIso: now.toISOString(),
      lastUpdated: toDisplayDate(now),
      source: 'live',
      totals: {
        webReadyTrees: webReadyTrees,
        webReadyCo2Kg: webReadyCo2Kg,
        verifiedTrees: verifiedTrees,
        legacyTrees: LEGACY_TREES,
        totalTrees: totalTrees
      },
      partnersById: partnersById
    };

    res.setHeader('Cache-Control', 'public, s-maxage=600, stale-while-revalidate=86400');
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.status(200).send(JSON.stringify(payload));
  } catch (err) {
    res.setHeader('Cache-Control', 'public, s-maxage=30, stale-while-revalidate=60');
    res.status(502).json({
      error: 'tree-nation upstream failed',
      detail: String((err && err.message) || err)
    });
  }
};
