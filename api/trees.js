/* Vercel serverless function: live tree counts from Tree-Nation.
   Returns the full payload shape (totals + per-partner breakdown).
   Edge-cached for 10 min, ~144 origin calls/day max regardless of traffic.
   CORS-locked to oasisofchange.com origins. */

const { fetchAggregatedTreeStats, applyCors } = require('./_shared.js');

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
    res.status(200).send(JSON.stringify(payload));
  } catch (err) {
    res.setHeader('Cache-Control', 'public, s-maxage=30, stale-while-revalidate=60');
    res.status(502).json({
      error: 'tree-nation upstream failed',
      detail: String((err && err.message) || err)
    });
  }
};
