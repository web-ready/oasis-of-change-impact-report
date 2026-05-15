/* Tree-Nation forest list and partner mapping.
   Per-forest counts are hydrated into TreeData upstream by
   tree-cache-loader.js (which prefers /api/trees, then the cron'd static
   JSON, then bundled TreeData). This module just reshapes that hydrated
   data into the { forests, totalTrees } envelope that dashboard.js and
   breakdown.js consume — preserving their existing contract while
   eliminating cross-origin requests that were CORS-blocked anyway. */
var TreeNationAPI = (function () {
    'use strict';

    var LOG_PREFIX = '[TreeNationAPI]';

    var FORESTS = [
        { slug: 'web-ready',                      label: 'Oasis of Change (Web-Ready)',               forestId: 583310 },
        { slug: 'stanley-park-ecology-society',   label: 'Stanley Park Ecology Society',               forestId: 736166 },
        { slug: 'sustainable-www',                label: 'Sustainable WWW',                            forestId: 723719 },
        { slug: 'mittler-senior-technology',      label: 'Mittler Senior Technology',                  forestId: 702493 },
        { slug: 'ecosearch',                      label: 'EcoSearch',                                  forestId: 786435 },
        { slug: 'denman-place-mall',              label: 'Denman Place Mall',                          forestId: 954402 },
        { slug: 'gabriel-dalton',                 label: 'Gabriel Dalton (CEO Personal Forest)',       forestId: 955445 },
        { slug: 'west-end-seniors-network',       label: "West End Seniors' Network (WESN)",           forestId: 955812 }
    ];

    var PARTNER_SLUG_TO_ID = {
        'stanley-park-ecology-society': 'spes',
        'sustainable-www':             'sustainable-www',
        'mittler-senior-technology':    'mst',
        'ecosearch':                    'ecosearch',
        'denman-place-mall':            'denman-place-mall',
        'gabriel-dalton':               'gabriel-dalton',
        'west-end-seniors-network':     'wesn'
    };

    function toNumberOrNull(value) {
        var num = Number(value);
        return Number.isFinite(num) ? num : null;
    }

    function buildForestsFromTreeData(treeData) {
        var partnersById = {};
        (treeData.verifiedPartners || []).forEach(function (p) {
            partnersById[p.id] = p;
        });

        return FORESTS.map(function (forest) {
            var trees = 0;
            var co2Tonnes = null;

            if (forest.slug === 'web-ready') {
                trees = toNumberOrNull(treeData.totals && treeData.totals.webReadyTrees) || 0;
                var co2Kg = toNumberOrNull(treeData.totals && treeData.totals.webReadyCo2Kg);
                co2Tonnes = co2Kg != null ? co2Kg / 1000 : null;
            } else {
                var partnerId = PARTNER_SLUG_TO_ID[forest.slug];
                var partner = partnerId ? partnersById[partnerId] : null;
                if (partner) {
                    trees = toNumberOrNull(partner.trees) || 0;
                    co2Tonnes = toNumberOrNull(partner.co2Tonnes);
                }
            }

            return {
                slug: forest.slug,
                label: forest.label,
                trees: trees,
                co2Tonnes: co2Tonnes,
                source: 'tree-data',
                forestId: forest.forestId
            };
        });
    }

    function fetchAllForests() {
        return new Promise(function (resolve, reject) {
            try {
                if (typeof TreeData === 'undefined' || !TreeData || !TreeData.totals) {
                    throw new Error('TreeData unavailable when reshaping forest data');
                }
                var forests = buildForestsFromTreeData(TreeData);
                var totalTrees = forests.reduce(function (sum, f) { return sum + (f.trees || 0); }, 0);
                if (typeof console !== 'undefined' && console.log) {
                    console.log(LOG_PREFIX, 'Built forests view from hydrated TreeData:', {
                        forests: forests.length,
                        totalTrees: totalTrees
                    });
                }
                resolve({ forests: forests, totalTrees: totalTrees });
            } catch (err) {
                reject(err);
            }
        });
    }

    return {
        FORESTS:            FORESTS,
        PARTNER_SLUG_TO_ID: PARTNER_SLUG_TO_ID,
        fetchAllForests:    fetchAllForests
    };
})();
