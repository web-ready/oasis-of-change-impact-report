/* Tree-Nation API: GET /api/forests/{slug}/tree_counter → { count }
   CO₂ comes from TreeData (certificates), not API. CORS blocks cross-origin fetch — use proxy or build-time fetch. */
var TreeNationAPI = (function () {
    'use strict';

    // ── Configuration ──────────────────────────────────

    var FORESTS = [
        { slug: 'web-ready',                     label: 'Oasis of Change (Web-Ready)' },
        { slug: 'stanley-park-ecology-society',   label: 'Stanley Park Ecology Society' },
        { slug: 'sustainable-www',                label: 'Sustainable WWW' },
        { slug: 'mittler-senior-technology',      label: 'Mittler Senior Technology' },
        { slug: 'ecosearch',                      label: 'EcoSearch' }
    ];

    var PARTNER_SLUG_TO_ID = {
        'stanley-park-ecology-society': 'spes',
        'sustainable-www':             'sustainable-www',
        'mittler-senior-technology':    'mst',
        'ecosearch':                    'ecosearch'
    };

    var API_BASE = 'https://tree-nation.com/api';
    var requestOptions = { method: 'GET', redirect: 'follow' };

    // ── Forest tree counts ─────────────────────────────

    function fetchForestBySlug(slug) {
        return fetch(API_BASE + '/forests/' + slug + '/tree_counter', requestOptions)
            .then(function (response) {
                if (!response.ok) throw new Error('Forest ' + slug + ': HTTP ' + response.status);
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
                    console.warn('[TreeNationAPI]', forest.slug, err.message);
                    return { slug: forest.slug, label: forest.label, trees: 0, error: err.message };
                });
        });

        return Promise.all(promises).then(aggregate);
    }

    function aggregate(results) {
        var totalTrees = 0;
        results.forEach(function (r) { totalTrees += r.trees; });
        return { forests: results, totalTrees: totalTrees };
    }

    return {
        FORESTS:            FORESTS,
        PARTNER_SLUG_TO_ID: PARTNER_SLUG_TO_ID,
        fetchForestBySlug:  fetchForestBySlug,
        fetchAllForests:    fetchAllForests
    };
})();
