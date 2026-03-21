/* Runtime cache hydration for static pages.
   Loads pre-synced totals when available and applies them to TreeData before UI render. */
var TreeDataCache = (function () {
    'use strict';

    var CACHE_PATH = 'assets/data/tree-stats-cache.json';

    function toNumber(value, fallback) {
        var n = Number(value);
        return Number.isFinite(n) ? n : fallback;
    }

    function applyCacheToTreeData(cache, treeData) {
        if (!cache || !treeData || !treeData.totals) return false;

        var totals = cache.totals || {};
        var partners = cache.partnersById || {};

        if (cache.lastUpdated) {
            treeData.lastUpdated = cache.lastUpdated;
        }

        treeData.totals.webReadyTrees = toNumber(totals.webReadyTrees, treeData.totals.webReadyTrees || 0);
        treeData.totals.webReadyCo2Kg = toNumber(totals.webReadyCo2Kg, treeData.totals.webReadyCo2Kg || 0);
        treeData.totals.verifiedTrees = toNumber(totals.verifiedTrees, treeData.totals.verifiedTrees || 0);
        treeData.totals.legacyTrees = toNumber(totals.legacyTrees, treeData.totals.legacyTrees || 0);
        treeData.totals.totalTrees = toNumber(totals.totalTrees, treeData.totals.totalTrees || 0);

        if (Array.isArray(treeData.verifiedPartners)) {
            treeData.verifiedPartners.forEach(function (p) {
                var incoming = partners[p.id];
                if (!incoming) return;
                p.trees = toNumber(incoming.trees, p.trees || 0);
                p.co2Tonnes = toNumber(incoming.co2Tonnes, p.co2Tonnes || 0);
            });
        }

        return true;
    }

    function loadAndApply(treeData) {
        if (typeof fetch === 'undefined') return Promise.resolve(false);
        return fetch(CACHE_PATH, { cache: 'no-store' })
            .then(function (response) {
                if (!response.ok) throw new Error('HTTP ' + response.status);
                return response.json();
            })
            .then(function (cache) {
                var applied = applyCacheToTreeData(cache, treeData);
                if (applied && typeof console !== 'undefined' && console.log) {
                    console.log('[TreeDataCache] Applied cached snapshot:', cache.lastUpdated || 'unknown date');
                }
                return applied;
            })
            .catch(function (err) {
                if (typeof console !== 'undefined' && console.warn) {
                    console.warn('[TreeDataCache] Cache not loaded, using bundled fallback:', err.message || err);
                }
                return false;
            });
    }

    return {
        loadAndApply: loadAndApply,
        applyCacheToTreeData: applyCacheToTreeData
    };
})();
