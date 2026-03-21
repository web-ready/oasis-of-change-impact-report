(function () {
    'use strict';

    var API_BASE = 'https://tree-nation.com/api';
    var requestOptions = { method: 'GET', redirect: 'follow' };

    function initializeSpeciesData() {
        if (typeof TreeData === 'undefined') {
            console.warn('[Oasis of Change Species] TreeData not loaded');
            return;
        }
        var speciesData = TreeData.getSpeciesData();
        var speciesCountElement = document.getElementById('species-count-display');
        if (speciesCountElement && speciesData && speciesData.totalSpecies) {
            speciesCountElement.textContent = String(speciesData.totalSpecies) + ' Species Combinations';
        }
    }

    function normalizeName(value) {
        return String(value || '').trim().toLowerCase();
    }

    function firstCommonName(commonNames) {
        if (!commonNames) return '';
        var first = String(commonNames).split(',')[0];
        return first ? first.trim() : '';
    }

    function fetchSpeciesByName(name) {
        var url = API_BASE + '/species?name=' + encodeURIComponent(name);
        return fetch(url, requestOptions)
            .then(function (response) {
                if (!response.ok) throw new Error('HTTP ' + response.status);
                return response.json();
            })
            .then(function (payload) {
                var list = (payload && payload.result) || [];
                if (!list.length) return null;

                var target = normalizeName(name);
                for (var i = 0; i < list.length; i++) {
                    if (normalizeName(list[i].name) === target) return list[i];
                }
                return list[0];
            })
            .catch(function () {
                return null;
            });
    }

    function collectVerifiedPartnerSpeciesSeeds() {
        if (typeof TreeData === 'undefined') return [];
        var partners = typeof TreeData.getVerifiedPartners === 'function'
            ? TreeData.getVerifiedPartners()
            : (TreeData.verifiedPartners || []);

        var seeds = [];
        (partners || []).forEach(function (partner) {
            var items = partner.partnerSpecies || [];
            items.forEach(function (item) {
                if (item && item.name) {
                    seeds.push({
                        partnerName: partner.name,
                        speciesName: item.name,
                        country: item.country || partner.countries || '',
                        project: item.project || ''
                    });
                }
            });
        });
        return seeds;
    }

    function buildPartnerSpeciesEntries(seeds) {
        var lookups = seeds.map(function (seed) {
            return fetchSpeciesByName(seed.speciesName).then(function (apiSpecies) {
                return {
                    partnerName: seed.partnerName,
                    country: seed.country,
                    project: seed.project,
                    scientificName: seed.speciesName,
                    commonName: apiSpecies ? firstCommonName(apiSpecies.common_names) : '',
                    category: apiSpecies && apiSpecies.category ? apiSpecies.category.name : '',
                    source: apiSpecies ? 'api' : 'seed'
                };
            });
        });
        return Promise.all(lookups);
    }

    function renderVerifiedPartnerSpeciesCard(entries) {
        if (!entries || !entries.length) return;
        var grid = document.getElementById('species-grid');
        if (!grid) return;

        var existing = document.getElementById('verified-partner-species-card');
        if (existing && existing.parentNode) existing.parentNode.removeChild(existing);

        var card = document.createElement('div');
        card.id = 'verified-partner-species-card';
        card.className = 'species-card bg-white rounded-lg p-5 border border-gray-200';
        card.setAttribute('data-category', 'verified');
        card.setAttribute('data-country', 'partner-verified');

        var lines = entries.map(function (entry) {
            var common = entry.commonName ? (' (' + entry.commonName + ')') : '';
            var meta = [];
            if (entry.country) meta.push(entry.country);
            if (entry.project) meta.push(entry.project);
            meta.push(entry.partnerName);
            var category = entry.category ? (' \u2022 ' + entry.category) : '';
            return '<p><strong>' + entry.scientificName + '</strong>' + common +
                '<span class="block text-xs text-gray-400 mt-0.5">' + meta.join(' \u2022 ') + category + '</span></p>';
        }).join('');

        card.innerHTML =
            '<div class="flex items-center justify-between mb-4">' +
                '<h3 class="text-lg font-semibold text-deep-forest">Verified Partner Planting</h3>' +
                '<span class="tag" style="border-color:#BBF7D0;color:#166534;background-color:#F0FDF4">Verified (API)</span>' +
            '</div>' +
            '<p class="text-xs text-gray-500 mb-3">Species for partner forests listed on the Breakdown page, enriched from Tree-Nation species endpoints when available.</p>' +
            '<div class="space-y-2 text-sm">' + lines + '</div>';

        var insertBefore = grid.querySelector('[data-category="preincorporation"]');
        if (insertBefore) {
            grid.insertBefore(card, insertBefore);
        } else {
            grid.appendChild(card);
        }
    }

    function applyFilter(filter) {
        var speciesCards = document.querySelectorAll('.species-card');
        speciesCards.forEach(function (card) {
            if (filter === 'all' || card.getAttribute('data-category') === filter) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }

    function setupFilters() {
        var filterBtns = document.querySelectorAll('.filter-btn');
        filterBtns.forEach(function (btn) {
            btn.addEventListener('click', function () {
                filterBtns.forEach(function (b) {
                    b.classList.remove('active', 'bg-brand-green', 'text-white', 'border-brand-green');
                    b.classList.add('bg-white', 'text-gray-700', 'border-gray-300');
                });
                btn.classList.add('active', 'bg-brand-green', 'text-white', 'border-brand-green');
                btn.classList.remove('bg-white', 'text-gray-700', 'border-gray-300');
                applyFilter(btn.getAttribute('data-filter'));
            });
        });
    }

    function boot() {
        initializeSpeciesData();
        setupFilters();

        var seeds = collectVerifiedPartnerSpeciesSeeds();
        if (!seeds.length) return;
        buildPartnerSpeciesEntries(seeds).then(function (entries) {
            renderVerifiedPartnerSpeciesCard(entries);
            var activeBtn = document.querySelector('.filter-btn.active');
            applyFilter(activeBtn ? activeBtn.getAttribute('data-filter') : 'all');
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', boot);
    } else {
        boot();
    }
})();
