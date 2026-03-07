(function () {
    'use strict';

    var PROFILE_BASE = 'https://tree-nation.com/profile/';
    var EXT_ICON = '<span class="profile-link-icon" aria-hidden="true"><svg fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg></span>';

    var state = {
        webReadyTrees: 0,
        partners: [],
        legacyProjects: [],
        verifiedTotal: 0,
        legacyTotal: 0,
        grandTotal: 0,
        isLive: false
    };

    function init() {
        if (typeof TreeData === 'undefined') return;

        state.webReadyTrees = typeof TreeData.getWebReadyTrees === 'function'
            ? TreeData.getWebReadyTrees()
            : (TreeData.totals && TreeData.totals.webReadyTrees) || 0;

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

        fetchLiveData();
    }

    function recalculate() {
        var partnerTrees = state.partners.reduce(function (sum, p) { return sum + (p.trees || 0); }, 0);
        state.verifiedTotal = state.webReadyTrees + partnerTrees;
        state.legacyTotal = state.legacyProjects.reduce(function (sum, p) { return sum + (p.trees || 0); }, 0);
        state.grandTotal = state.verifiedTotal + state.legacyTotal;
    }

    function renderAll() {
        renderSummary();
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

    function renderWebReady() {
        setText('bd-webready-count', state.webReadyTrees.toLocaleString());
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

        var sorted = state.partners.slice().sort(function (a, b) { return (b.trees || 0) - (a.trees || 0); });

        sorted.forEach(function (p) {
            var slug = getSlugForPartner(p.id);
            var profileUrl = slug ? PROFILE_BASE + slug : '';
            var tagHtml = p.isLive
                ? '<span class="live-tag"><span class="live-dot"></span> Live</span>'
                : '<span class="cached-tag">Cached</span>';

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
            card.innerHTML =
                '<div class="flex items-start justify-between gap-3 mb-1">' +
                    '<div class="flex flex-wrap items-center gap-2 min-w-0">' + nameHtml + tagHtml + '</div>' +
                    '<div class="text-xl font-bold text-brand-green tabular-nums flex-shrink-0">' + (p.trees || 0).toLocaleString() + '</div>' +
                '</div>' +
                '<div class="text-xs text-gray-400">Based in ' + (p.baseLocation || '—') + '</div>' +
                countriesHtml;

            grid.appendChild(card);
        });

        var partnerTotal = state.partners.reduce(function (sum, p) { return sum + (p.trees || 0); }, 0);
        setText('bd-partner-subtotal', partnerTotal.toLocaleString());
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

        var partnersContainer = document.getElementById('eq-partners-rows');
        if (partnersContainer) {
            partnersContainer.innerHTML = '';
            var sorted = state.partners.slice().sort(function (a, b) { return (b.trees || 0) - (a.trees || 0); });
            sorted.forEach(function (p) {
                var row = document.createElement('div');
                row.className = 'equation-row';
                row.innerHTML =
                    '<span class="equation-operator">+</span>' +
                    '<span class="equation-label text-gray-700">' + p.name + '</span>' +
                    '<span class="equation-value font-medium text-deep-forest">' + (p.trees || 0).toLocaleString() + '</span>';
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

    // ── Live API fetch (tree counts only, CO₂ stays from certificates) ──

    function fetchLiveData() {
        if (typeof TreeNationAPI === 'undefined') {
            setApiStatus('fallback');
            return;
        }

        setApiStatus('loading');

        TreeNationAPI.fetchAllForests()
            .then(function (data) {
                var forests = data.forests || [];

                var wr = forests.filter(function (f) { return f.slug === 'web-ready'; })[0];
                if (wr && !wr.error) {
                    state.webReadyTrees = wr.trees;
                }

                state.partners.forEach(function (p) {
                    var slug = getSlugForPartner(p.id);
                    if (!slug) return;
                    var live = forests.filter(function (f) { return f.slug === slug; })[0];
                    if (live && !live.error) {
                        p.trees = live.trees;
                        p.isLive = true;
                    }
                });

                state.isLive = true;
                recalculate();
                renderAll();
                setApiStatus('live');
            })
            .catch(function (err) {
                console.warn('[Breakdown] API unavailable:', err.message || err);
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

    // ── Mobile menu toggle ──────────────────────────────

    function initMobileMenu() {
        var toggleBtn = document.getElementById('mobile-menu-toggle');
        var mobileMenu = document.getElementById('mobile-menu');
        var closeBtn = document.getElementById('mobile-menu-close');
        var backdrop = document.getElementById('mobile-menu-backdrop');
        if (!toggleBtn || !mobileMenu) return;

        function openMenu() {
            mobileMenu.classList.add('menu-open');
            document.documentElement.style.overflow = 'hidden';
            document.body.style.overflow = 'hidden';
            toggleBtn.setAttribute('aria-expanded', 'true');
        }
        function closeMenu() {
            mobileMenu.classList.remove('menu-open');
            document.documentElement.style.overflow = '';
            document.body.style.overflow = '';
            toggleBtn.setAttribute('aria-expanded', 'false');
        }
        toggleBtn.addEventListener('click', openMenu);
        if (closeBtn) closeBtn.addEventListener('click', closeMenu);
        if (backdrop) backdrop.addEventListener('click', closeMenu);
    }

    // ── Boot ────────────────────────────────────────────

    function boot() {
        initMobileMenu();
        try { init(); } catch (e) { console.error('[Breakdown] init failed:', e); }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', boot);
    } else {
        boot();
    }
})();
