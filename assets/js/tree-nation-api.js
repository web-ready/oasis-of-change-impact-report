/* Tree-Nation API (public forest counters):
   - GET /api/forests/{slug}/tree_counter -> { count }
   - GET /api/forests/{slug}/co2_counter -> { count } (availability can vary by account/permissions)
   TreeData remains the fallback source when API calls are unavailable. */
var TreeNationAPI = (function () {
    'use strict';

    // ── Configuration ──────────────────────────────────

    var FORESTS = [
        { slug: 'web-ready',                     label: 'Oasis of Change (Web-Ready)' },
        { slug: 'stanley-park-ecology-society',   label: 'Stanley Park Ecology Society' },
        { slug: 'sustainable-www',                label: 'Sustainable WWW' },
        { slug: 'mittler-senior-technology',      label: 'Mittler Senior Technology' },
        { slug: 'ecosearch',                      label: 'EcoSearch' },
        { slug: 'denman-place-mall',              label: 'Denman Place Mall' },
        { slug: 'gabriel-dalton',                 label: 'Gabriel Dalton (Founder\'s personal forest)' }
    ];

    var PARTNER_SLUG_TO_ID = {
        'stanley-park-ecology-society': 'spes',
        'sustainable-www':             'sustainable-www',
        'mittler-senior-technology':    'mst',
        'ecosearch':                    'ecosearch',
        'denman-place-mall':            'denman-place-mall',
        'gabriel-dalton':               'gabriel-dalton'
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

    function fetchForestCo2BySlug(slug) {
        return fetch(API_BASE + '/forests/' + slug + '/co2_counter', requestOptions)
            .then(function (response) {
                if (!response.ok) throw new Error('Forest CO2 ' + slug + ': HTTP ' + response.status);
                return response.json();
            });
    }

    function fetchAllForests() {
        var promises = FORESTS.map(function (forest) {
            return Promise.all([
                fetchForestBySlug(forest.slug),
                fetchForestCo2BySlug(forest.slug).catch(function () { return null; })
            ])
                .then(function (results) {
                    var treeData = results[0] || {};
                    var co2Data = results[1];
                    var co2Count = co2Data && typeof co2Data.count !== 'undefined' ? Number(co2Data.count) : null;
                    return {
                        slug:  forest.slug,
                        label: forest.label,
                        trees: Number(treeData.count) || 0,
                        co2Tonnes: Number.isFinite(co2Count) ? co2Count : null
                    };
                })
                .catch(function (err) {
                    console.warn('[TreeNationAPI]', forest.slug, err.message);
                    return { slug: forest.slug, label: forest.label, trees: 0, co2Tonnes: null, error: err.message };
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
        fetchForestCo2BySlug: fetchForestCo2BySlug,
        fetchAllForests:    fetchAllForests
    };
})();
