(function () {
    'use strict';

    var PROFILE_BASE = 'https://tree-nation.com/profile/';
    var EXT_ICON = '<span class="profile-link-icon" aria-hidden="true"><svg fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg></span>';

    var state = {
        webReadyTrees: 0,
        webReadyCo2Kg: 0,
        partners: [],
        legacyProjects: [],
        verifiedTotal: 0,
        additivePartnerTotal: 0,
        sharedPartnerTotal: 0,
        legacyTotal: 0,
        grandTotal: 0,
        isLive: false
    };

    function init() {
        if (typeof TreeData === 'undefined') {
            console.error('[Oasis of Change Breakdown] TreeData not loaded');
            return;
        }

        state.webReadyTrees = typeof TreeData.getWebReadyTrees === 'function'
            ? TreeData.getWebReadyTrees()
            : (TreeData.totals && TreeData.totals.webReadyTrees) || 0;

        var webReadyCo2Kg = typeof TreeData.getWebReadyCo2Kg === 'function'
            ? TreeData.getWebReadyCo2Kg()
            : null;
        state.webReadyCo2Kg = Number.isFinite(webReadyCo2Kg) ? webReadyCo2Kg : 0;

        var partners = typeof TreeData.getVerifiedPartners === 'function'
            ? TreeData.getVerifiedPartners()
            : TreeData.verifiedPartners;

        state.partners = (partners || []).map(function (p) {
            return {
                id: p.id,
                name: p.name,
                baseLocation: p.baseLocation,
                countries: p.countries,
                trees: p.trees,
                co2Tonnes: p.co2Tonnes || 0,
                isSharedWithWebReady: p.isSharedWithWebReady === true,
                sharedTreesWithWebReady: p.sharedTreesWithWebReady,
                sharedWithLabel: p.sharedWithLabel || 'Web-Ready by Oasis of Change, Inc.',
                isLive: false
            };
        });

        var legacy = typeof TreeData.getLegacyProjects === 'function'
            ? TreeData.getLegacyProjects()
            : TreeData.legacyProjects;

        state.legacyProjects = (legacy || []).map(function (p) {
            return { id: p.id, name: p.name, trees: p.trees, source: p.source };
        });

        recalculate();
        renderAll();
        setText('bd-last-updated', TreeData.lastUpdated);
        if (typeof console !== 'undefined' && console.log) {
            console.log('[Oasis of Change Breakdown] Ready (cached), total:', state.grandTotal, 'lastUpdated:', TreeData.lastUpdated);
        }
        fetchLiveData();
    }

    function recalculate() {
        var additivePartnerTrees = state.partners.reduce(function (sum, p) {
            return sum + getAdditiveTrees(p);
        }, 0);
        var sharedPartnerTrees = state.partners.reduce(function (sum, p) {
            return sum + getSharedTrees(p);
        }, 0);
        state.additivePartnerTotal = additivePartnerTrees;
        state.sharedPartnerTotal = sharedPartnerTrees;
        state.verifiedTotal = state.webReadyTrees + additivePartnerTrees;
        state.legacyTotal = state.legacyProjects.reduce(function (sum, p) { return sum + (p.trees || 0); }, 0);
        state.grandTotal = state.verifiedTotal + state.legacyTotal;
    }

    function renderAll() {
        renderSummary();
        renderGoalProgress();
        renderWebReady();
        renderPartners();
        renderLegacy();
        renderEquation();
    }

    function renderSummary() {
        setText('bd-grand-total', state.grandTotal.toLocaleString());
        setText('bd-verified-total', state.verifiedTotal.toLocaleString());
        setText('bd-legacy-total', state.legacyTotal.toLocaleString());
    }

    function renderGoalProgress() {
        var goal = (typeof TreeData !== 'undefined' && TreeData.getGoalTrees) ? TreeData.getGoalTrees() : 1000000;
        var total = state.grandTotal;
        var pct = Math.min(100, goal > 0 ? (total / goal) * 100 : 0);
        setText('bd-goal-progress-pct', pct.toFixed(1) + '%');
        var barEl = document.getElementById('bd-goal-progress-bar');
        if (barEl) barEl.style.width = pct + '%';
        setText('bd-goal-progress-text', total.toLocaleString() + ' / 1,000,000 trees');
    }

    function co2KgLineFromTonnes(tonnes) {
        if (typeof tonnes === 'number' && Number.isFinite(tonnes) && tonnes > 0) {
            return '<div class="text-xs text-gray-400 mt-0.5">CO\u2082: <span class="tabular-nums text-gray-600 font-medium">' +
                Math.round(tonnes * 1000).toLocaleString() + '</span> kg</div>';
        }
        return '<div class="text-xs text-gray-400 mt-0.5">CO\u2082: <span class="tabular-nums text-gray-500 font-medium">\u2014</span></div>';
    }

    function renderWebReady() {
        setText('bd-webready-count', state.webReadyTrees.toLocaleString());
        var co2Display = (typeof state.webReadyCo2Kg === 'number' && state.webReadyCo2Kg > 0)
            ? Math.round(state.webReadyCo2Kg).toLocaleString()
            : '—';
        setText('bd-webready-co2-kg', co2Display);

        var tag = document.getElementById('bd-webready-tag');
        if (tag) {
            if (state.isLive) {
                tag.className = 'live-tag';
                tag.innerHTML = '<span class="live-dot"></span> Live';
            } else {
                tag.className = 'cached-tag';
                tag.textContent = 'Cached';
            }
        }
    }

    function renderPartners() {
        var grid = document.getElementById('bd-partners-grid');
        if (!grid) return;
        grid.innerHTML = '';

        var sorted = state.partners.slice().sort(function (a, b) {
            return (b.trees || 0) - (a.trees || 0);
        });

        sorted.forEach(function (p) {
            var slug = getSlugForPartner(p.id);
            var profileUrl = slug ? PROFILE_BASE + slug : '';
            var tagHtml = p.isLive
                ? '<span class="live-tag"><span class="live-dot"></span> Live</span>'
                : '<span class="cached-tag">Cached</span>';
            if (p.isSharedWithWebReady) {
                tagHtml += '<span class="shared-tag">' + getSharedTagText(p) + '</span>';
            }

            var nameHtml = profileUrl
                ? '<a href="' + profileUrl + '" target="_blank" rel="noopener" class="profile-link font-semibold text-deep-forest hover:text-brand-green underline-offset-2 hover:underline">' + p.name + EXT_ICON + '</a>'
                : '<span class="font-semibold text-deep-forest">' + p.name + '</span>';

            var countriesHtml = '';
            if (p.countries) {
                var countryList = p.countries.split(',').map(function (c) { return c.trim(); }).filter(Boolean);
                countriesHtml = '<div class="flex flex-wrap gap-1.5 mt-2.5">' +
                    countryList.map(function (c) {
                        return '<span class="inline-block px-2 py-0.5 bg-brand-green/[0.06] text-brand-green/80 text-[11px] font-medium rounded-md">' + c + '</span>';
                    }).join('') +
                '</div>';
            }

            var card = document.createElement('div');
            card.className = 'forest-card';
            var co2Html = co2KgLineFromTonnes(p.co2Tonnes);
            var forestTrees = Number(p.trees) || 0;
            card.innerHTML =
                '<div class="flex items-start justify-between gap-3 mb-1">' +
                    '<div class="flex flex-wrap items-center gap-2 min-w-0">' + nameHtml + tagHtml + '</div>' +
                    '<div class="text-xl font-bold text-brand-green tabular-nums flex-shrink-0">' + forestTrees.toLocaleString() + '</div>' +
                '</div>' +
                '<div class="text-xs text-gray-400">Based in ' + (p.baseLocation || '—') + '</div>' +
                co2Html +
                countriesHtml;

            grid.appendChild(card);
        });

        setText('bd-partner-subtotal', state.additivePartnerTotal.toLocaleString());
        setText('bd-shared-partner-subtotal', state.sharedPartnerTotal.toLocaleString());
    }

    function renderLegacy() {
        var grid = document.getElementById('bd-legacy-grid');
        if (!grid) return;
        grid.innerHTML = '';

        state.legacyProjects.forEach(function (p) {
            var card = document.createElement('div');
            card.className = 'forest-card forest-card--legacy';
            card.innerHTML =
                '<div class="flex items-center justify-between gap-3">' +
                    '<div class="flex-1 text-center"><div class="font-semibold text-deep-forest">' + p.name + '</div></div>' +
                    '<div class="text-xl font-bold text-amber-700 tabular-nums flex-shrink-0">' + (p.trees || 0).toLocaleString() + '</div>' +
                '</div>';
            grid.appendChild(card);
        });

        setText('bd-legacy-subtotal', state.legacyTotal.toLocaleString());
    }

    function renderEquation() {
        setText('eq-webready', state.webReadyTrees.toLocaleString());
        var webCo2Suffix = document.getElementById('eq-webready-co2-suffix');
        if (webCo2Suffix) {
            webCo2Suffix.textContent = (typeof state.webReadyCo2Kg === 'number' && state.webReadyCo2Kg > 0)
                ? ' (' + Math.round(state.webReadyCo2Kg).toLocaleString() + ' kg CO\u2082)'
                : '';
        }

        var partnersContainer = document.getElementById('eq-partners-rows');
        if (partnersContainer) {
            partnersContainer.innerHTML = '';
            var sorted = state.partners.slice().sort(function (a, b) {
                return (b.trees || 0) - (a.trees || 0);
            });
            sorted.forEach(function (p) {
                var row = document.createElement('div');
                row.className = 'equation-row';
                var co2Suffix = (typeof p.co2Tonnes === 'number' && p.co2Tonnes > 0)
                    ? ' <span class="text-xs text-gray-400 tabular-nums">(' + Math.round(p.co2Tonnes * 1000).toLocaleString() + ' kg CO\u2082)</span>'
                    : '';
                var sharedTrees = getSharedTrees(p);
                var additiveTrees = getAdditiveTrees(p);
                var sharedSuffix = sharedTrees > 0
                    ? ' <span class="text-xs text-amber-700">[' + sharedTrees.toLocaleString() + ' trees shared with the Oasis of Change Forest]</span>'
                    : '';
                row.innerHTML =
                    '<span class="equation-operator">+</span>' +
                    '<span class="equation-label text-gray-700">' + p.name + co2Suffix + sharedSuffix + '</span>' +
                    '<span class="equation-value font-medium text-deep-forest">' + (additiveTrees || 0).toLocaleString() + '</span>';
                partnersContainer.appendChild(row);
            });
        }

        setText('eq-verified-total', state.verifiedTotal.toLocaleString());
        setText('eq-verified-carry', state.verifiedTotal.toLocaleString());

        var legacyContainer = document.getElementById('eq-legacy-rows');
        if (legacyContainer) {
            legacyContainer.innerHTML = '';
            state.legacyProjects.forEach(function (p) {
                var row = document.createElement('div');
                row.className = 'equation-row';
                row.innerHTML =
                    '<span class="equation-operator">+</span>' +
                    '<span class="equation-label text-gray-500">' + p.name + '</span>' +
                    '<span class="equation-value font-medium text-gray-600">' + (p.trees || 0).toLocaleString() + '</span>';
                legacyContainer.appendChild(row);
            });
        }

        setText('eq-grand-total', state.grandTotal.toLocaleString());
    }

    function fetchLiveData() {
        if (typeof TreeNationAPI === 'undefined') {
            setApiStatus('fallback');
            return;
        }

        if (typeof console !== 'undefined' && console.log) {
            console.log('[Oasis of Change Breakdown] Requesting live Tree-Nation counters...');
        }
        setApiStatus('loading');

        TreeNationAPI.fetchAllForests()
            .then(function (data) {
                var forests = data.forests || [];

                var wr = forests.filter(function (f) { return f.slug === 'web-ready'; })[0];
                if (wr && !wr.error) {
                    state.webReadyTrees = wr.trees;
                    if (typeof wr.co2Tonnes === 'number' && Number.isFinite(wr.co2Tonnes)) {
                        state.webReadyCo2Kg = wr.co2Tonnes * 1000;
                    }
                }

                state.partners.forEach(function (p) {
                    var slug = getSlugForPartner(p.id);
                    if (!slug) return;
                    var live = forests.filter(function (f) { return f.slug === slug; })[0];
                    if (live && !live.error) {
                        p.trees = live.trees;
                        if (typeof live.co2Tonnes === 'number') p.co2Tonnes = live.co2Tonnes;
                        p.isLive = true;
                    }
                });

                state.isLive = true;
                recalculate();
                renderAll();
                setApiStatus('live');
                if (typeof console !== 'undefined' && console.log) {
                    console.log('[Oasis of Change Breakdown] Live counters applied, total:', state.grandTotal);
                }
            })
            .catch(function (err) {
                console.warn('[Oasis of Change Breakdown] API unavailable — using cached TreeData:', err.message || err);
                setApiStatus('fallback');
            });
    }

    // ── Helpers ──────────────────────────────────────────

    var _loadingTimer = null;

    function setApiStatus(status) {
        var el = document.getElementById('api-status-badge');
        if (!el) return;

        if (_loadingTimer) { clearTimeout(_loadingTimer); _loadingTimer = null; }

        if (status === 'live') {
            el.className = 'api-badge api-badge--live';
            el.innerHTML = '<span class="api-pulse"></span> Live tree counts from Tree-Nation API';
        } else if (status === 'loading') {
            el.className = 'api-badge api-badge--loading';
            el.innerHTML = '<span class="api-spinner"></span> Connecting to Tree-Nation\u2026';
            _loadingTimer = setTimeout(function () {
                if (el.className.indexOf('loading') !== -1) {
                    el.innerHTML = '<span class="api-spinner"></span> Fetching live data \u2014 this can take a few seconds\u2026';
                }
            }, 3000);
        } else {
            el.className = 'api-badge api-badge--fallback';
            el.innerHTML = '<span class="api-dot"></span> Showing cached data from ' + (TreeData ? TreeData.lastUpdated : 'last update');
        }
    }

    function getSlugForPartner(partnerId) {
        if (typeof TreeNationAPI === 'undefined') return null;
        var map = TreeNationAPI.PARTNER_SLUG_TO_ID || {};
        var keys = Object.keys(map);
        for (var i = 0; i < keys.length; i++) {
            if (map[keys[i]] === partnerId) return keys[i];
        }
        return null;
    }

    function setText(id, val) {
        var el = document.getElementById(id);
        if (el) el.textContent = val;
    }

    function getSharedTrees(partner) {
        if (!partner || !partner.isSharedWithWebReady) return 0;
        var totalTrees = Number(partner.trees) || 0;
        var explicitShared = Number(partner.sharedTreesWithWebReady);
        if (Number.isFinite(explicitShared) && explicitShared > 0) {
            return Math.min(totalTrees, Math.floor(explicitShared));
        }
        return totalTrees;
    }

    function getAdditiveTrees(partner) {
        if (!partner) return 0;
        var totalTrees = Number(partner.trees) || 0;
        return Math.max(0, totalTrees - getSharedTrees(partner));
    }

    function getSharedTagText(partner) {
        var sharedTrees = getSharedTrees(partner);
        if (sharedTrees > 0) {
            return sharedTrees.toLocaleString() + ' trees shared with the Oasis of Change Forest';
        }
        return 'Shared with the Oasis of Change Forest';
    }

    // ── Boot ────────────────────────────────────────────

    function boot() {
        var hydratePromise = (typeof TreeDataCache !== 'undefined' && typeof TreeDataCache.loadAndApply === 'function')
            ? TreeDataCache.loadAndApply(typeof TreeData !== 'undefined' ? TreeData : null)
            : Promise.resolve(false);

        hydratePromise.finally(function () {
            try { init(); } catch (e) { console.error('[Oasis of Change Breakdown] init failed:', e); }
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', boot);
    } else {
        boot();
    }
})();
