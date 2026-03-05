/**
 * Tree-Nation API – Fetch & Aggregate Impact Data
 *
 * Public endpoints (no API key / Bearer token required):
 *   • Forest details     GET /api/forests/{id}                → { id, tree_count, co2_compensated_tons }
 *   • Forest tree count  GET /api/forests/{slug}/tree_counter  → { count }
 *   • Profile updates    GET /rss/profile/{slug}/updates       → RSS/XML feed
 *
 * The details endpoint only accepts numeric IDs and returns both
 * tree_count and co2_compensated_tons.  The tree_counter endpoint
 * accepts profile slugs but returns tree count only (no CO₂).
 *
 * CORS note: Tree-Nation does not set Access-Control-Allow-Origin on
 * these endpoints, so browser fetch() calls from a different origin
 * will be blocked.  Workarounds:
 *   1. Use a lightweight serverless proxy (Cloudflare Worker, Netlify
 *      Function, etc.).
 *   2. Run during build/CI with Node.js instead of client-side.
 */

var TreeNationAPI = (function () {
    'use strict';

    // ── Configuration ──────────────────────────────────

    // All forests to aggregate, using the slug-based tree_counter
    // endpoint so every forest can be referenced by its profile slug.
    var FORESTS = [
        { slug: 'web-ready',                     label: 'Oasis of Change (Web-Ready)' },
        { slug: 'stanley-park-ecology-society',   label: 'Stanley Park Ecology Society' },
        { slug: 'sustainable-www',                label: 'Sustainable WWW' },
        { slug: 'mittler-senior-technology',      label: 'Mittler Senior Technology' },
        { slug: 'ecosearch',                      label: 'EcoSearch' }
    ];

    // Profile slugs for the RSS update feeds (same slugs).
    var PROFILE_SLUGS = FORESTS.map(function (f) { return f.slug; });

    var API_BASE = 'https://tree-nation.com/api';
    var RSS_BASE = 'https://tree-nation.com/rss/profile';

    var requestOptions = { method: 'GET', redirect: 'follow' };

    // ── Forest tree counts ─────────────────────────────

    function fetchForestBySlug(slug) {
        return fetch(API_BASE + '/forests/' + slug + '/tree_counter', requestOptions)
            .then(function (response) {
                if (!response.ok) throw new Error('Forest ' + slug + ': HTTP ' + response.status);
                return response.json();
            });
    }

    function fetchForestById(id) {
        return fetch(API_BASE + '/forests/' + id, requestOptions)
            .then(function (response) {
                if (!response.ok) throw new Error('Forest ' + id + ': HTTP ' + response.status);
                return response.json();
            });
    }

    function fetchAllForests() {
        var promises = FORESTS.map(function (forest) {
            return fetchForestBySlug(forest.slug)
                .then(function (data) {
                    return {
                        slug:  forest.slug,
                        label: forest.label,
                        trees: data.count || 0
                    };
                })
                .catch(function (err) {
                    console.warn('[TreeNationAPI]', err.message);
                    return { slug: forest.slug, label: forest.label, trees: 0, error: err.message };
                });
        });

        return Promise.all(promises).then(aggregate);
    }

    function aggregate(results) {
        var totalTrees = 0;

        results.forEach(function (r) {
            totalTrees += r.trees;
        });

        return {
            forests:    results,
            totalTrees: totalTrees
        };
    }

    // ── RSS updates ────────────────────────────────────

    function fetchRSSUpdates(slug) {
        return fetch(RSS_BASE + '/' + slug + '/updates', requestOptions)
            .then(function (response) {
                if (!response.ok) throw new Error('RSS ' + slug + ': HTTP ' + response.status);
                return response.text();
            })
            .then(parseRSS);
    }

    function parseRSS(xml) {
        var parser  = new DOMParser();
        var doc     = parser.parseFromString(xml, 'application/xml');
        var items   = doc.querySelectorAll('item');
        var updates = [];

        items.forEach(function (item) {
            var get = function (tag) {
                var el = item.querySelector(tag);
                return el ? el.textContent : '';
            };
            var enclosure = item.querySelector('enclosure');

            updates.push({
                title:       get('title'),
                description: get('description'),
                link:        get('link'),
                pubDate:     get('pubDate'),
                imageUrl:    enclosure ? enclosure.getAttribute('url') : null
            });
        });

        return updates;
    }

    function fetchAllUpdates() {
        var promises = PROFILE_SLUGS.map(function (slug) {
            return fetchRSSUpdates(slug)
                .then(function (updates) {
                    return { slug: slug, updates: updates };
                })
                .catch(function (err) {
                    console.warn('[TreeNationAPI] RSS', slug, err.message);
                    return { slug: slug, updates: [], error: err.message };
                });
        });

        return Promise.all(promises);
    }

    // ── Combined runner ────────────────────────────────

    function run() {
        return Promise.all([fetchAllForests(), fetchAllUpdates()])
            .then(function (results) {
                var forestData  = results[0];
                var updatesData = results[1];

                console.group('[TreeNationAPI] Aggregated Forest Data');
                console.table(forestData.forests);
                console.log('Total trees:', forestData.totalTrees);
                console.groupEnd();

                console.group('[TreeNationAPI] Latest Project Updates');
                updatesData.forEach(function (profile) {
                    if (profile.updates.length) {
                        console.log(profile.slug + ' — ' + profile.updates.length + ' update(s)');
                        profile.updates.slice(0, 3).forEach(function (u) {
                            console.log('  •', u.title, '(' + u.pubDate + ')');
                        });
                    }
                });
                console.groupEnd();

                return { forests: forestData, updates: updatesData };
            });
    }

    // ── Public interface ───────────────────────────────

    return {
        FORESTS:          FORESTS,
        PROFILE_SLUGS:    PROFILE_SLUGS,
        fetchForestBySlug: fetchForestBySlug,
        fetchForestById:   fetchForestById,
        fetchAllForests:   fetchAllForests,
        fetchRSSUpdates:   fetchRSSUpdates,
        fetchAllUpdates:   fetchAllUpdates,
        run:               run
    };
})();
