/* Tree-Nation API (public forest counters):
   - GET /api/forests/{id} -> { id, tree_count, co2_compensated_tons } (preferred when forest ID is known)
   - GET /api/forests/{slug}/tree_counter -> { count }
   TreeData remains the fallback source when API calls are unavailable. */
var TreeNationAPI = (function () {
    'use strict';

    var LOG_PREFIX = '[TreeNationAPI]';

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
        // Keep slug fallback minimal to avoid noisy 422 responses on CO2 endpoints.
        // Forest IDs are the preferred source for both tree and CO2 counters.
        return fetchForestBySlug(forest.slug).then(function (treeData) {
            return normalizeForestResult(forest, treeData, null);
        });
    }

    function fetchAllForests() {
        if (typeof console !== 'undefined' && console.log) {
            console.log(LOG_PREFIX, 'fetchAllForests start:', FORESTS.length, 'forests');
        }

        var promises = FORESTS.map(function (forest) {
            var preferredFetch = forest.forestId
                ? fetchForestById(forest.forestId)
                    .then(function (summary) {
                        var normalized = normalizeForestResult(forest, summary, summary);
                        normalized.source = 'id';
                        normalized.forestId = forest.forestId;
                        return normalized;
                    })
                    .catch(function (idErr) {
                        if (typeof console !== 'undefined' && console.warn) {
                            console.warn(LOG_PREFIX, forest.slug, 'ID fetch failed, falling back to slug tree counter:', idErr.message || idErr);
                        }
                        return fetchBySlugCounters(forest).then(function (normalized) {
                            normalized.source = 'slug';
                            return normalized;
                        });
                    })
                : fetchBySlugCounters(forest).then(function (normalized) {
                    normalized.source = 'slug';
                    return normalized;
                });

            return preferredFetch
                .catch(function (err) {
                    if (typeof console !== 'undefined' && console.warn) {
                        console.warn(LOG_PREFIX, forest.slug, 'fetch failed:', err.message || err);
                    }
                    return { slug: forest.slug, label: forest.label, trees: 0, co2Tonnes: null, source: 'fallback-zero', error: err.message };
                });
        });

        return Promise.all(promises).then(aggregate);
    }

    function aggregate(results) {
        var totalTrees = 0;
        var idSources = 0;
        var slugSources = 0;
        var fallbackSources = 0;
        results.forEach(function (r) { totalTrees += r.trees; });
        results.forEach(function (r) {
            if (r.source === 'id') idSources += 1;
            else if (r.source === 'slug') slugSources += 1;
            else fallbackSources += 1;
        });

        if (typeof console !== 'undefined' && console.log) {
            console.log(LOG_PREFIX, 'fetchAllForests done:', {
                forests: results.length,
                totalTrees: totalTrees,
                sources: { id: idSources, slug: slugSources, fallback: fallbackSources }
            });
        }

        return { forests: results, totalTrees: totalTrees };
    }

    return {
        FORESTS:            FORESTS,
        PARTNER_SLUG_TO_ID: PARTNER_SLUG_TO_ID,
        fetchForestBySlug:  fetchForestBySlug,
        fetchForestById:    fetchForestById,
        fetchAllForests:    fetchAllForests
    };
})();
