/* Tree-Nation API (public forest counters):
   - GET /api/forests/{id} -> { id, tree_count, co2_compensated_tons } (preferred when forest ID is known)
   - GET /api/forests/{slug}/tree_counter -> { count }
   - GET /api/forests/{slug}/co2_counter -> { count } (availability can vary by account/permissions)
   TreeData remains the fallback source when API calls are unavailable. */
var TreeNationAPI = (function () {
    'use strict';

    // ── Configuration ──────────────────────────────────

    var FORESTS = [
        { slug: 'web-ready',                      label: 'Oasis of Change (Web-Ready)' },
        { slug: 'stanley-park-ecology-society',   label: 'Stanley Park Ecology Society',               forestId: 736166 },
        { slug: 'sustainable-www',                label: 'Sustainable WWW',                            forestId: 723719 },
        { slug: 'mittler-senior-technology',      label: 'Mittler Senior Technology',                  forestId: 702493 },
        { slug: 'ecosearch',                      label: 'EcoSearch',                                  forestId: 786435 },
        { slug: 'denman-place-mall',              label: 'Denman Place Mall',                          forestId: 954402 },
        { slug: 'gabriel-dalton',                 label: 'Gabriel Dalton (CEO Personal Forest)', forestId: 955445 }
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

    function fetchForestById(forestId) {
        return fetch(API_BASE + '/forests/' + forestId, requestOptions)
            .then(function (response) {
                if (!response.ok) throw new Error('Forest ID ' + forestId + ': HTTP ' + response.status);
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

    function toNumberOrNull(value) {
        var num = Number(value);
        return Number.isFinite(num) ? num : null;
    }

    function normalizeForestResult(forest, treeData, co2Data) {
        var trees = toNumberOrNull(treeData && (treeData.tree_count != null ? treeData.tree_count : treeData.count));
        var co2Tonnes = null;

        if (co2Data && co2Data.co2_compensated_tons != null) {
            co2Tonnes = toNumberOrNull(co2Data.co2_compensated_tons);
        } else if (co2Data && co2Data.count != null) {
            co2Tonnes = toNumberOrNull(co2Data.count);
        } else if (treeData && treeData.co2_compensated_tons != null) {
            co2Tonnes = toNumberOrNull(treeData.co2_compensated_tons);
        }

        return {
            slug: forest.slug,
            label: forest.label,
            trees: trees || 0,
            co2Tonnes: co2Tonnes
        };
    }

    function fetchBySlugCounters(forest) {
        return Promise.all([
            fetchForestBySlug(forest.slug),
            fetchForestCo2BySlug(forest.slug).catch(function () { return null; })
        ]).then(function (results) {
            return normalizeForestResult(forest, results[0], results[1]);
        });
    }

    function fetchAllForests() {
        var promises = FORESTS.map(function (forest) {
            var preferredFetch = forest.forestId
                ? fetchForestById(forest.forestId)
                    .then(function (summary) { return normalizeForestResult(forest, summary, summary); })
                    .catch(function () { return fetchBySlugCounters(forest); })
                : fetchBySlugCounters(forest);

            return preferredFetch
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
        fetchForestById:    fetchForestById,
        fetchForestCo2BySlug: fetchForestCo2BySlug,
        fetchAllForests:    fetchAllForests
    };
})();
