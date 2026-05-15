/* Minimal companion to /api/trees, returning only the running total.
   Intended for oasisofchange.com to display a single "trees planted"
   counter without parsing the full breakdown payload. Same 10-min edge
   cache, same CORS allowlist. */

const { fetchAggregatedTreeStats, applyCors } = require('../_shared.js');

module.exports = async function handler(req, res) {
  applyCors(req, res);
  if (req.method === 'OPTIONS') {
    res.status(204).end();
    return;
  }
  try {
    const payload = await fetchAggregatedTreeStats();
    res.setHeader('Cache-Control', 'public, s-maxage=600, stale-while-revalidate=86400');
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.status(200).send(JSON.stringify({
      count: payload.totals.totalTrees,
      updatedAtIso: payload.updatedAtIso
    }));
  } catch (err) {
    res.setHeader('Cache-Control', 'public, s-maxage=30, stale-while-revalidate=60');
    res.status(502).json({
      error: 'tree-nation upstream failed',
      detail: String((err && err.message) || err)
    });
  }
};
