(function () {
    'use strict';

    var API_BASE = 'https://tree-nation.com/api';
    var requestOptions = { method: 'GET', redirect: 'follow' };
    var SPECIES_API_CACHE = {};

    // Species IDs derived from the species registries / taxonomic indices for
    // the project/forest sources represented on `breakdown.html`.
    var PARTNER_SPECIES_ID_GROUPS = [
        {
            groupLabel: 'Mittler Senior Technology',
            speciesIds: [3022, 1729, 2070, 727, 2071, 2208, 198, 2996, 1517, 730, 1730]
        },
        {
            groupLabel: 'Denman Place Mall',
            speciesIds: [1730, 2924, 184]
        },
        {
            groupLabel: 'Stanley Park Ecology Society (SPES)',
            speciesIds: [2208, 2070, 729, 1729, 2071, 727, 3043, 198, 728, 3186, 1730, 204, 212]
        },
        {
            groupLabel: 'Web-Ready by Oasis of Change, Inc.',
            speciesIds: [729, 1741, 2072, 1206, 2068, 1519, 1516, 2286, 1374, 1746, 70, 2070, 2071, 1729, 730, 2208, 204, 727, 198, 1520, 3046, 2925, 3590, 3315, 1189, 3031, 3303, 2350, 1367, 1861, 2415, 3596, 3060, 2905, 1730, 3186, 2213, 3061]
        },
        {
            groupLabel: 'EcoSearch',
            speciesIds: [727]
        }
    ];

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

    function escapeHtml(value) {
        return String(value || '')
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
    }

    function fetchSpeciesById(id) {
        if (!id && id !== 0) return Promise.resolve(null);
        if (Object.prototype.hasOwnProperty.call(SPECIES_API_CACHE, id)) return Promise.resolve(SPECIES_API_CACHE[id]);

        var url = API_BASE + '/species/' + id;
        return fetch(url, requestOptions)
            .then(function (response) {
                if (!response.ok) throw new Error('HTTP ' + response.status);
                return response.json();
            })
            .then(function (species) {
                SPECIES_API_CACHE[id] = species || null;
                return SPECIES_API_CACHE[id];
            })
            .catch(function () {
                SPECIES_API_CACHE[id] = null;
                return null;
            });
    }

    function renderVerifiedPartnerSpeciesCard(entriesById) {
        var grid = document.getElementById('species-grid');
        if (!grid) return;

        var existing = document.getElementById('verified-partner-species-card');
        if (existing && existing.parentNode) existing.parentNode.removeChild(existing);

        var card = document.createElement('div');
        card.id = 'verified-partner-species-card';
        card.className = 'species-card species-card--partner-verified bg-white rounded-lg p-5 border border-gray-200';
        card.setAttribute('data-category', 'verified');
        card.setAttribute('data-country', 'partner-verified');

        var content = PARTNER_SPECIES_ID_GROUPS.map(function (group) {
            var groupSpeciesLines = group.speciesIds.map(function (sid) {
                var sp = entriesById[sid];
                var name = sp && sp.name ? sp.name : ('Species ID ' + sid);
                var common = sp && sp.common_names ? firstCommonName(sp.common_names) : '';
                var category = sp && sp.category && sp.category.name ? sp.category.name : '';
                var imageUrl = sp && sp.image ? String(sp.image) : '';
                var meta = [];
                if (category) meta.push(category);

                var thumbHtml = imageUrl
                    ? '<button type="button" class="partner-species-thumb-btn js-species-thumb" data-species-id="' + sid + '" aria-label="View larger image of ' + escapeHtml(name) + '">' +
                        '<img class="partner-species-thumb" src="' + imageUrl + '" alt="' + escapeHtml(name) + '" loading="lazy" decoding="async">' +
                      '</button>'
                    : '<span class="partner-species-thumb partner-species-thumb--fallback" aria-hidden="true">' + String(sid) + '</span>';

                return '<div class="partner-species-item">' +
                    thumbHtml +
                    '<div>' +
                        '<div class="partner-species-name">' + name + (common ? (' (' + common + ')') : '') + '</div>' +
                        (meta.length ? '<div class="partner-species-meta">' + meta.join(' \u2022 ') + '</div>' : '') +
                    '</div>' +
                    '</div>';
            }).join('');

            return '<details class="partner-group" open>' +
                '<summary><span>' + group.groupLabel + '</span><span class="partner-group-count">' + group.speciesIds.length + ' species</span></summary>' +
                '<div class="partner-species-list">' + groupSpeciesLines + '</div>' +
                '</details>';
        }).join('');

        card.innerHTML =
            '<div class="flex items-center justify-between mb-4">' +
                '<h3 class="text-lg font-semibold text-deep-forest">Verified Tree Planting</h3>' +
                '<span class="tag" style="border-color:#BBF7D0;color:#166534;background-color:#F0FDF4">Verified (API)</span>' +
            '</div>' +
            '<p class="text-xs text-gray-500 mb-3">Species for partner forests shown on the Breakdown page. Names and metadata are fetched from Tree-Nation by species ID.</p>' +
            '<div class="partner-group-grid">' + content + '</div>';

        var insertBefore = grid.firstElementChild;
        if (insertBefore) {
            grid.insertBefore(card, insertBefore);
        } else {
            grid.appendChild(card);
        }
    }

    function hideStaticVerifiedCardsIfCovered(entriesById) {
        var grid = document.getElementById('species-grid');
        if (!grid) return;

        var webReadyGroup = PARTNER_SPECIES_ID_GROUPS.filter(function (g) {
            return g.groupLabel.indexOf('Web-Ready') !== -1;
        })[0];
        if (!webReadyGroup) return;

        var webReadyNames = {};
        (webReadyGroup.speciesIds || []).forEach(function (sid) {
            var sp = entriesById[sid];
            if (sp && sp.name) {
                webReadyNames[normalizeName(sp.name)] = true;
            }
        });

        var staticVerifiedCards = Array.prototype.slice.call(
            grid.querySelectorAll('.species-card[data-category="verified"]:not([data-country="partner-verified"])')
        );
        if (!staticVerifiedCards.length) return;

        var staticNames = [];
        staticVerifiedCards.forEach(function (card) {
            var speciesEls = card.querySelectorAll('p strong');
            speciesEls.forEach(function (el) {
                staticNames.push(normalizeName(el.textContent));
            });
        });
        if (!staticNames.length) return;

        var covered = staticNames.every(function (name) {
            return !!webReadyNames[name];
        });
        if (covered) {
            staticVerifiedCards.forEach(function (card) {
                card.style.display = 'none';
                card.setAttribute('data-hidden-by-api', 'true');
            });
        }
    }

    function ensureLightbox() {
        var existing = document.getElementById('species-lightbox');
        if (existing) return existing;

        var lightbox = document.createElement('div');
        lightbox.id = 'species-lightbox';
        lightbox.className = 'species-lightbox hidden';
        lightbox.innerHTML =
            '<div class="species-lightbox__backdrop" data-close-lightbox="true"></div>' +
            '<div class="species-lightbox__panel" role="dialog" aria-modal="true" aria-label="Species image viewer">' +
                '<button type="button" class="species-lightbox__close" data-close-lightbox="true" aria-label="Close image viewer">×</button>' +
                '<img id="species-lightbox-img" class="species-lightbox__img" src="" alt="">' +
                '<div class="species-lightbox__body">' +
                    '<h4 id="species-lightbox-title" class="species-lightbox__title"></h4>' +
                    '<p id="species-lightbox-desc" class="species-lightbox__desc"></p>' +
                '</div>' +
            '</div>';
        document.body.appendChild(lightbox);
        return lightbox;
    }

    function openSpeciesLightbox(species) {
        if (!species || !species.image) return;
        var lightbox = ensureLightbox();
        var imgEl = document.getElementById('species-lightbox-img');
        var titleEl = document.getElementById('species-lightbox-title');
        var descEl = document.getElementById('species-lightbox-desc');

        imgEl.src = species.image;
        imgEl.alt = species.name || 'Species';
        titleEl.textContent = species.name || 'Species';
        descEl.textContent = species.particularities || species.planter_likes || 'No additional description available from Tree-Nation API.';
        lightbox.classList.remove('hidden');
    }

    function setupLightboxInteractions(entriesById) {
        var lightbox = ensureLightbox();

        document.addEventListener('click', function (event) {
            var closeTrigger = event.target.closest('[data-close-lightbox="true"]');
            if (closeTrigger) {
                lightbox.classList.add('hidden');
                return;
            }

            var thumb = event.target.closest('.js-species-thumb');
            if (!thumb) return;
            var sid = Number(thumb.getAttribute('data-species-id'));
            openSpeciesLightbox(entriesById[sid]);
        });
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

        var allIds = [];
        PARTNER_SPECIES_ID_GROUPS.forEach(function (group) {
            (group.speciesIds || []).forEach(function (sid) { allIds.push(sid); });
        });
        // De-dup for fewer API calls.
        allIds = allIds.filter(function (x, i, arr) { return arr.indexOf(x) === i; });

        if (!allIds.length) return;

        Promise.all(allIds.map(function (sid) {
            return fetchSpeciesById(sid).then(function (sp) { return { sid: sid, sp: sp }; });
        })).then(function (results) {
            var byId = {};
            results.forEach(function (r) { byId[r.sid] = r.sp; });
            renderVerifiedPartnerSpeciesCard(byId);
            hideStaticVerifiedCardsIfCovered(byId);
            setupLightboxInteractions(byId);
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
