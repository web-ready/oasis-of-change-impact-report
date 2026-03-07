function initializeTreeData() {
    if (typeof TreeData === 'undefined') {
        console.error('TreeData not loaded.');
        return;
    }
    const lastUpdatedEl = document.getElementById('last-updated-date');
    if (lastUpdatedEl) lastUpdatedEl.textContent = TreeData.lastUpdated;
    const lastUpdated = parseDisplayDate(TreeData.lastUpdated) || new Date(document.lastModified);
    const rel = getRelativeTimeLabel(lastUpdated);
    const relEl = document.getElementById('last-updated-relative');
    if (relEl) relEl.textContent = '(' + rel + ')';

    updateUI();
}

function parseDisplayDate(dateText) {
    if (!dateText || typeof dateText !== 'string') return null;
    const normalized = dateText.replace(/(\d+)(st|nd|rd|th)/gi, '$1');
    const parsed = new Date(normalized);
    return Number.isNaN(parsed.getTime()) ? null : parsed;
}

function getRelativeTimeLabel(date) {
    if (!(date instanceof Date) || Number.isNaN(date.getTime())) return 'just now';
    const diffDay = Math.max(0, Math.floor((Date.now() - date.getTime()) / 86400000));
    const diffMonth = Math.floor(diffDay / 30.44);
    const diffYear = Math.floor(diffDay / 365.25);
    if (diffYear > 0) return diffYear === 1 ? '1 year ago' : diffYear + ' years ago';
    if (diffMonth > 0) return diffMonth === 1 ? '1 month ago' : diffMonth + ' months ago';
    if (diffDay > 0) return diffDay === 1 ? '1 day ago' : diffDay + ' days ago';
    return 'just now';
}

function safeCall(fn, fallback) {
    try { return typeof fn === 'function' ? fn() : fallback; } catch (e) { return fallback; }
}

function updateUI() {
    const verified = safeCall(function() { return TreeData.getVerifiedTrees(); }, 0);
    const legacy = safeCall(function() { return TreeData.getLegacyTrees(); }, 0);

    setText('verified-count', verified.toLocaleString());
    setText('legacy-count', legacy.toLocaleString());
    setText('footnote-oasis-trees', safeCall(function() { return TreeData.getOasisFundedTrees(); }, 0).toLocaleString());
    setText('footnote-historical-trees', safeCall(function() { return TreeData.getHistoricalTrees(); }, 0).toLocaleString());
    setText('footnote-seeds-trees', safeCall(function() { return TreeData.getSeedsTrees(); }, 0).toLocaleString());
    setText('footnote-partner-trees', safeCall(function() { return TreeData.getPartnerTrees(); }, 0).toLocaleString());
    setText('species-count', safeCall(function() { return TreeData.getSpeciesCount(); }, 0));
    const sites = safeCall(function() { return TreeData.getMapSites(); }, []);
    const countries = [...new Set(sites.map(function(s) { return s.country; }))];
    setText('countries-count', countries.length);
    setText('continents-count', safeCall(function() { return TreeData.getContinentsCount(); }, 0));
    setText('planting-sites-count', safeCall(function() { return TreeData.getPlantingSitesCount(); }, 0));
    setText('co2-offset', safeCall(function() { return TreeData.getCo2Captured(); }, 0).toLocaleString() + '+');

    populateProjectTables();
    populateSpeciesGrid();
}

function setText(id, val) {
    const el = document.getElementById(id);
    if (el) el.textContent = val;
}

function fyBadge(fy) {
    if (!fy) return '';
    var cls = fy === '2025-2026' ? 'fy-current' : (fy === 'Historical' ? 'fy-historical' : 'fy-previous');
    return ' <span class="fy-badge ' + cls + '">' + fy + '</span>';
}

function populatePartnerSection(partners) {
    var list = partners.slice().sort(function(a, b) { return (b.trees || 0) - (a.trees || 0); });
    var extIcon = '<span class="partner-link-icon" aria-hidden="true"><svg fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg></span>';
    var pBody = document.getElementById('partners-table-body');
    if (pBody) {
        pBody.innerHTML = '';
        list.forEach(function(p) {
            var tr = document.createElement('tr');
            tr.className = 'data-row border-b border-gray-50 transition-all duration-200';
            var nameCell = p.profileUrl
                ? '<a href="' + p.profileUrl + '" target="_blank" rel="noopener" class="partner-profile-link font-medium text-deep-forest hover:text-brand-green underline-offset-2 hover:underline">' + p.name + extIcon + '</a>'
                : p.name;
            tr.innerHTML =
                '<td class="py-4 px-2">' + nameCell + '</td>' +
                '<td class="py-4 px-2 text-sm text-gray-600">' + p.baseLocation + '</td>' +
                '<td class="py-4 px-2 text-sm text-gray-600">' + p.countries + '</td>' +
                '<td class="py-4 px-2 text-right tabular-nums text-lg font-semibold text-deep-forest">' + (p.trees || 0).toLocaleString() + '</td>';
            pBody.appendChild(tr);
        });
    }
    var pCards = document.getElementById('partners-mobile-cards');
    if (pCards) {
        pCards.innerHTML = '';
        list.forEach(function(p) {
            var card = document.createElement('div');
            card.className = 'mobile-data-card';
            card.setAttribute('data-search', (p.name + ' ' + (p.baseLocation || '') + ' ' + (p.countries || '')).toLowerCase());
            var nameBlock = p.profileUrl
                ? '<a href="' + p.profileUrl + '" target="_blank" rel="noopener" class="partner-profile-link mobile-card-title text-deep-forest hover:text-brand-green underline-offset-2 hover:underline">' + p.name + extIcon + '</a>'
                : '<div class="mobile-card-title">' + p.name + '</div>';
            card.innerHTML =
                '<div class="mobile-card-header">' +
                    '<div>' +
                        nameBlock +
                        '<div class="mobile-card-subtitle">' + (p.baseLocation || '') + ' · ' + (p.countries || '') + '</div>' +
                    '</div>' +
                    '<div class="mobile-trees-count">' + (p.trees || 0).toLocaleString() + '</div>' +
                '</div>';
            pCards.appendChild(card);
        });
    }
}

function populateProjectTables() {
    var partners = (TreeData.getVerifiedPartners ? TreeData.getVerifiedPartners() : []).slice().sort(function(a,b){ return (b.trees||0)-(a.trees||0); });
    populatePartnerSection(partners);

    const verifiedProjects = [...TreeData.getVerifiedProjects()].sort((a, b) => (b.trees || 0) - (a.trees || 0));
    const vBody = document.getElementById('verified-table-body');
    const extIconSvg = '<span class="partner-link-icon" aria-hidden="true"><svg fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg></span>';
    if (vBody) {
        vBody.innerHTML = '';
        verifiedProjects.forEach(p => {
            const tr = document.createElement('tr');
            tr.className = 'data-row border-b border-gray-50 transition-all duration-200';
            tr.innerHTML = `
                <td class="py-4 px-2"><a href="${p.url}" target="_blank" rel="noopener" class="partner-profile-link font-medium text-deep-forest hover:text-brand-green underline-offset-2 hover:underline">${p.name}${extIconSvg}</a>${fyBadge(p.fy)}</td>
                <td class="py-4 px-2 text-sm text-gray-600">${p.location}</td>
                <td class="py-4 px-2 text-right tabular-nums text-lg font-semibold text-deep-forest">${p.trees.toLocaleString()}</td>`;
            vBody.appendChild(tr);
        });
    }
    const vCards = document.getElementById('verified-mobile-cards');
    if (vCards) {
        vCards.innerHTML = '';
        verifiedProjects.forEach(p => {
            const card = document.createElement('div');
            card.className = 'mobile-data-card';
            card.setAttribute('data-search', `${p.name.toLowerCase()} ${p.location.toLowerCase()}`);
            card.innerHTML = `
                <div class="mobile-card-header">
                    <div>
                        <div class="mobile-card-title"><a href="${p.url}" target="_blank" rel="noopener" class="partner-profile-link text-deep-forest hover:text-brand-green underline-offset-2 hover:underline">${p.name}${extIconSvg}</a>${fyBadge(p.fy)}</div>
                        <div class="mobile-card-subtitle">${p.location}</div>
                    </div>
                    <div class="mobile-trees-count">${p.trees.toLocaleString()}</div>
                </div>`;
            vCards.appendChild(card);
        });
    }

    const lBody = document.getElementById('legacy-table-body');
    if (lBody) {
        lBody.innerHTML = '';
        TreeData.getLegacyProjects().forEach(p => {
            const tr = document.createElement('tr');
            tr.className = 'data-row border-b border-gray-50 transition-all duration-200';
            tr.innerHTML = `
                <td class="py-4 px-2 font-medium text-deep-forest">${p.name}</td>
                <td class="py-4 px-2 text-right tabular-nums text-lg font-semibold text-deep-forest">${p.trees.toLocaleString()}</td>`;
            lBody.appendChild(tr);
        });
    }
    const lCards = document.getElementById('legacy-mobile-cards');
    if (lCards) {
        lCards.innerHTML = '';
        TreeData.getLegacyProjects().forEach(p => {
            const card = document.createElement('div');
            card.className = 'mobile-data-card';
            card.setAttribute('data-search', p.name.toLowerCase());
            card.innerHTML = `
                <div class="mobile-card-header">
                    <div><div class="mobile-card-title">${p.name}</div></div>
                    <div class="mobile-trees-count">${p.trees.toLocaleString()}</div>
                </div>`;
            lCards.appendChild(card);
        });
    }
}

function populateSpeciesGrid() {
    const grid = document.getElementById('species-grid');
    if (!grid) return;
    const data = TreeData.getSpeciesData();
    grid.innerHTML = '';
    const vCard = createSpeciesCard('Verified Species', 'chip', data.verifiedSpecies.map(s => `<strong>${s}</strong>`));
    vCard.setAttribute('data-category', 'verified');
    grid.appendChild(vCard);
    Object.entries(data.legacySpecies).forEach(([region, species]) => {
        const card = createSpeciesCard(region, 'tag', species.map(s => `<strong>${s}</strong>`));
        card.setAttribute('data-category', 'legacy');
        grid.appendChild(card);
    });
}

function createSpeciesCard(title, badgeClass, items) {
    const div = document.createElement('div');
    div.className = 'species-card bg-white rounded-lg p-5 border border-gray-200';
    const badge = badgeClass === 'chip' ? '<span class="chip">Verified</span>' : '<span class="tag">Legacy</span>';
    div.innerHTML = `
        <div class="flex items-center justify-between mb-3">
            <h3 class="text-base font-semibold text-deep-forest">${title}</h3>
            ${badge}
        </div>
        <div class="space-y-1.5 text-sm text-gray-700">${items.map(i => `<p>${i}</p>`).join('')}</div>`;
    return div;
}

function switchTab(tabName) {
    document.querySelectorAll('.tab-content').forEach(c => c.classList.add('hidden'));
    document.querySelectorAll('.tab-button').forEach(b => {
        b.classList.remove('text-brand-green', 'bg-brand-green/5', 'text-yellow-700', 'bg-legacy-gold/5');
        b.classList.add('text-gray-500');
    });
    document.getElementById(tabName + '-content').classList.remove('hidden');

    const activeTab = document.getElementById(tabName + '-tab');
    activeTab.classList.remove('text-gray-500');

    const indicator = document.getElementById('tab-indicator');
    if (tabName === 'verified') {
        activeTab.classList.add('text-brand-green', 'bg-brand-green/5');
        indicator.style.left = '0%';
        indicator.classList.remove('tab-indicator--legacy');
    } else {
        activeTab.classList.add('text-yellow-700', 'bg-legacy-gold/5');
        indicator.style.left = '50%';
        indicator.classList.add('tab-indicator--legacy');
    }
}

(function(){
    const toggleBtn = document.getElementById('mobile-menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const closeBtn = document.getElementById('mobile-menu-close');
    const backdrop = document.getElementById('mobile-menu-backdrop');
    if (!toggleBtn || !mobileMenu) return;
    if (toggleBtn.dataset.menuInit) return;
    toggleBtn.dataset.menuInit = '1';
    const open = () => {
        mobileMenu.classList.add('menu-open');
        document.documentElement.style.overflow = 'hidden';
        document.body.style.overflow = 'hidden';
        toggleBtn.setAttribute('aria-expanded', 'true');
    };
    const close = () => {
        mobileMenu.classList.remove('menu-open');
        document.documentElement.style.overflow = '';
        document.body.style.overflow = '';
        toggleBtn.setAttribute('aria-expanded', 'false');
    };
    toggleBtn.addEventListener('click', open);
    if (closeBtn) closeBtn.addEventListener('click', close);
    if (backdrop) backdrop.addEventListener('click', close);
})();

function setupSearch(searchId, tableId, dataClass) {
    const input = document.getElementById(searchId);
    if (!input) return;
    input.addEventListener('input', (e) => {
        const term = e.target.value.toLowerCase();
        const tbody = document.querySelector(`${tableId} .${dataClass}`);
        if (!tbody) return;
        const rows = tbody.querySelectorAll('tr:not(.no-results-message)');
        let visible = 0;
        rows.forEach(row => {
            const match = row.textContent.toLowerCase().includes(term);
            row.style.display = match ? '' : 'none';
            if (match) visible++;
        });
        const existing = tbody.querySelector('.no-results-message');
        if (existing) existing.remove();
        if (visible === 0 && term.length > 0) {
            const tr = document.createElement('tr');
            tr.className = 'no-results-message';
            tr.innerHTML = `<td colspan="3" class="py-8 text-center text-gray-400 text-sm">No results for "${term}"</td>`;
            tbody.appendChild(tr);
        }
    });
}

function setupSorting(tableId, dataClass) {
    const headers = document.querySelectorAll(`${tableId} th[data-sort]`);
    const tbody = document.querySelector(`${tableId} .${dataClass}`);
    if (!tbody) return;
    const rows = Array.from(tbody.querySelectorAll('tr'));
    rows.sort((a, b) => {
        const ci = dataClass === 'verified-data' ? 2 : 1;
        return parseInt(b.cells[ci].textContent.replace(/,/g, '')) - parseInt(a.cells[ci].textContent.replace(/,/g, ''));
    });
    tbody.innerHTML = '';
    rows.forEach(r => tbody.appendChild(r));

    headers.forEach(header => {
        header.addEventListener('click', () => {
            const sortKey = header.getAttribute('data-sort');
            const state = header.getAttribute('data-sort-state') || 'none';
            const asc = state !== 'asc';

            headers.forEach(h => { h.setAttribute('data-sort-state', 'none'); const a = h.querySelector('.text-xs'); if (a) a.textContent = '↕'; });

            const r = Array.from(tbody.querySelectorAll('tr:not(.no-results-message)'));
            r.sort((a, b) => {
                let av, bv;
                if (sortKey === 'trees') {
                    const ci = dataClass === 'verified-data' ? 2 : 1;
                    av = parseInt(a.cells[ci].textContent.replace(/,/g, ''));
                    bv = parseInt(b.cells[ci].textContent.replace(/,/g, ''));
                    return asc ? av - bv : bv - av;
                }
                av = a.cells[sortKey === 'country' ? 1 : 0].textContent.trim();
                bv = b.cells[sortKey === 'country' ? 1 : 0].textContent.trim();
                return asc ? av.localeCompare(bv) : bv.localeCompare(av);
            });
            tbody.innerHTML = '';
            r.forEach(row => tbody.appendChild(row));
            header.setAttribute('data-sort-state', asc ? 'asc' : 'desc');
            const arrow = header.querySelector('.text-xs');
            if (arrow) arrow.textContent = asc ? '↑' : '↓';
        });
    });
}

function setupSpeciesFilters() {
    const btns = document.querySelectorAll('.species-filter-btn');
    btns.forEach(btn => {
        btn.addEventListener('click', () => {
            btns.forEach(b => {
                b.classList.remove('active', 'bg-brand-green', 'text-white', 'border-brand-green');
                b.classList.add('bg-white', 'text-gray-600', 'border-gray-200');
            });
            btn.classList.add('active', 'bg-brand-green', 'text-white', 'border-brand-green');
            btn.classList.remove('bg-white', 'text-gray-600', 'border-gray-200');

            const filter = btn.getAttribute('data-filter');
            document.querySelectorAll('#species-grid .species-card').forEach(card => {
                if (filter === 'all') { card.style.display = ''; return; }
                card.style.display = card.getAttribute('data-category') === filter ? '' : 'none';
            });
        });
    });
}

function animateCount() {
    if (typeof TreeData === 'undefined') return;
    const el = document.getElementById('total-count');
    if (!el) return;
    const target = safeCall(function() { return TreeData.getTotalTrees(); }, 0);
    if (!target) { el.textContent = '—'; return; }

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        el.textContent = target.toLocaleString();
        return;
    }

    let current = 0;
    const inc = target / 60;
    function step() {
        current += inc;
        if (current >= target) { el.textContent = target.toLocaleString(); return; }
        el.textContent = Math.floor(current).toLocaleString();
        requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        const cur = document.querySelector('.tab-button.text-brand-green, .tab-button.text-yellow-700');
        if (cur) switchTab(e.key === 'ArrowLeft' ? 'verified' : 'legacy');
    }
});

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
} else {
    boot();
}

/**
 * Fetches all forest tree counts (Web-Ready + partners) from Tree-Nation API
 * and updates the dashboard hero stats, CO₂, and partner section.
 * Falls back to TreeData if API is unavailable (e.g. CORS).
 */
function loadLiveTreeCountsFromAPI() {
    if (typeof TreeNationAPI === 'undefined' || typeof TreeData === 'undefined') {
        console.log('[Dashboard] Using hard-coded TreeData (TreeNationAPI not loaded).');
        return;
    }

    TreeNationAPI.fetchAllForests()
        .then(function(data) {
            var forests = data.forests || [];
            var slugToId = TreeNationAPI.PARTNER_SLUG_TO_ID || {};

            var wr = forests.filter(function(f) { return f.slug === 'web-ready'; })[0];
            var webReadyTrees = (wr && !wr.error) ? wr.trees : safeCall(function() { return TreeData.getWebReadyTrees(); }, 0);

            var basePartners = safeCall(function() { return TreeData.getVerifiedPartners(); }, TreeData.verifiedPartners || []);
            var mergedPartners = (basePartners || []).map(function(p) {
                var slug = Object.keys(slugToId).filter(function(k) { return slugToId[k] === p.id; })[0];
                var live = slug ? forests.filter(function(f) { return f.slug === slug; })[0] : null;
                var trees = (live && !live.error) ? live.trees : p.trees;
                return { id: p.id, name: p.name, baseLocation: p.baseLocation, countries: p.countries, trees: trees, profileUrl: p.profileUrl, co2Tonnes: p.co2Tonnes };
            });

            var partnerTreesTotal = mergedPartners.reduce(function(sum, p) { return sum + (p.trees || 0); }, 0);
            var verifiedTotal = webReadyTrees + partnerTreesTotal;
            var legacyTrees = safeCall(function() { return TreeData.getLegacyTrees(); }, 0);
            var totalTotal = verifiedTotal + legacyTrees;

            console.log('[Dashboard] Live from Tree-Nation API. Web-Ready:', webReadyTrees, '| Partners:', partnerTreesTotal);

            setText('verified-count', verifiedTotal.toLocaleString());
            setText('total-count', totalTotal.toLocaleString());
            setText('footnote-partner-trees', partnerTreesTotal.toLocaleString());
            populatePartnerSection(mergedPartners);
        })
        .catch(function(err) {
            console.warn('[Dashboard] Using hard-coded TreeData (API failed:', err.message + ').');
        });
}

function boot() {
    initializeTreeData();
    animateCount();
    loadLiveTreeCountsFromAPI();

    setupSearch('verified-search', '#verified-table', 'verified-data');
    setupSearch('legacy-search', '#legacy-table', 'legacy-data');
    setupSorting('#verified-table', 'verified-data');
    setupSorting('#legacy-table', 'legacy-data');
    setupSpeciesFilters();
}
