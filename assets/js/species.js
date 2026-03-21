(function () {
    'use strict';

    var API_BASE = 'https://tree-nation.com/api';
    var requestOptions = { method: 'GET', redirect: 'follow' };
    var SPECIES_API_CACHE = {};
    var SPECIES_CACHE_PATH = 'assets/data/species-cache.json';
    var SPECIES_STORAGE_PREFIX = 'ooc_tree_species_cache_v1:';
    var SPECIES_STORAGE_TTL_MS = 24 * 60 * 60 * 1000; // 24h

    // Lightbox: single document listener; species map refreshed after each render.
    var lightboxSpeciesById = {};
    var lightboxDocumentClickBound = false;
    var lightboxKeydownBound = false;
    var lightboxLastFocusedElement = null;

    function getCachedSpeciesFromStorage(id) {
        if (typeof localStorage === 'undefined') return undefined;
        try {
            var raw = localStorage.getItem(SPECIES_STORAGE_PREFIX + String(id));
            if (!raw) return undefined;
            var parsed = JSON.parse(raw);
            if (!parsed || typeof parsed.ts !== 'number') return undefined;
            if (Date.now() - parsed.ts > SPECIES_STORAGE_TTL_MS) return undefined;
            return parsed.species;
        } catch (e) {
            return undefined;
        }
    }

    function setCachedSpeciesInStorage(id, species) {
        if (typeof localStorage === 'undefined') return;
        try {
            localStorage.setItem(
                SPECIES_STORAGE_PREFIX + String(id),
                JSON.stringify({ ts: Date.now(), species: species })
            );
        } catch (e) {
            // Ignore storage failures (private mode/quota/etc).
        }
    }

    function applySpeciesCacheFileToApiCache(cacheFile) {
        if (!cacheFile || !cacheFile.speciesById) return false;
        var byId = cacheFile.speciesById;
        Object.keys(byId).forEach(function (idKey) {
            var id = Number(idKey);
            if (!Number.isFinite(id)) return;
            SPECIES_API_CACHE[id] = byId[idKey];
        });
        return true;
    }

    function loadSpeciesCacheFile() {
        if (typeof fetch === 'undefined') return Promise.resolve(false);
        return fetch(SPECIES_CACHE_PATH)
            .then(function (response) {
                if (!response.ok) throw new Error('HTTP ' + response.status);
                return response.json();
            })
            .then(function (cacheFile) {
                var applied = applySpeciesCacheFileToApiCache(cacheFile);
                if (applied && typeof console !== 'undefined' && console.log) {
                    console.log('[Oasis of Change Species] Loaded species cache:', cacheFile.lastUpdated || cacheFile.updatedAtIso || 'unknown');
                }
                return applied;
            })
            .catch(function () {
                return false;
            });
    }

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
            groupLabel: "West End Seniors' Network (WESN)",
            speciesIds: [2213]
        },
        {
            groupLabel: 'EcoSearch',
            speciesIds: [727]
        }
    ];

    var PARTNER_GROUP_LABEL_TO_ID = {
        'Web-Ready by Oasis of Change, Inc.': 'web-ready',
        'Stanley Park Ecology Society (SPES)': 'spes',
        'Mittler Senior Technology': 'mst',
        'Denman Place Mall': 'denman-place-mall',
        'West End Seniors\' Network (WESN)': 'wesn',
        'EcoSearch': 'ecosearch'
    };

    /** Sum of species slots listed per verified forest card (same ID can appear in multiple groups). */
    function countListedVerifiedSpeciesSlots() {
        var n = 0;
        PARTNER_SPECIES_ID_GROUPS.forEach(function (g) {
            n += (g.speciesIds && g.speciesIds.length) || 0;
        });
        return n;
    }

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

    function escapeAttr(value) {
        return String(value || '')
            .replace(/&/g, '&amp;')
            .replace(/"/g, '&quot;');
    }

    function fetchSpeciesById(id) {
        if (!id && id !== 0) return Promise.resolve(null);
        if (Object.prototype.hasOwnProperty.call(SPECIES_API_CACHE, id)) return Promise.resolve(SPECIES_API_CACHE[id]);

        var stored = getCachedSpeciesFromStorage(id);
        if (stored !== undefined) {
            SPECIES_API_CACHE[id] = stored;
            return Promise.resolve(stored);
        }

        var url = API_BASE + '/species/' + id;
        var SPECIES_FETCH_TIMEOUT_MS = 15000;
        var controller = (typeof AbortController !== 'undefined') ? new AbortController() : null;
        var timeoutId = null;
        var fetchOptions = requestOptions;

        if (controller) {
            fetchOptions = Object.assign({}, requestOptions, { signal: controller.signal });
            timeoutId = window.setTimeout(function () {
                try { controller.abort(); } catch (e) { /* noop */ }
            }, SPECIES_FETCH_TIMEOUT_MS);
        }

        var clearTimer = function () {
            if (timeoutId) window.clearTimeout(timeoutId);
        };

        return fetch(url, fetchOptions)
            .then(function (response) {
                if (!response.ok) throw new Error('HTTP ' + response.status);
                return response.json();
            })
            .then(function (species) {
                clearTimer();
                SPECIES_API_CACHE[id] = species || null;
                setCachedSpeciesInStorage(id, SPECIES_API_CACHE[id]);
                return SPECIES_API_CACHE[id];
            })
            .catch(function () {
                clearTimer();
                SPECIES_API_CACHE[id] = null;
                setCachedSpeciesInStorage(id, null);
                return null;
            });
    }

    function toUniqueNumberList(values) {
        var seen = {};
        var out = [];
        (values || []).forEach(function (value) {
            var n = Number(value);
            if (!Number.isFinite(n)) return;
            if (seen[n]) return;
            seen[n] = true;
            out.push(n);
        });
        return out;
    }

    function renderVerifiedPartnerSpeciesCard(entriesById) {
        var grid = document.getElementById('species-grid');
        if (!grid) return;

        var existing = document.getElementById('verified-partner-species-card');
        if (existing && existing.parentNode) existing.parentNode.removeChild(existing);

        var skeleton = document.getElementById('verified-partner-species-skeleton');
        if (skeleton && skeleton.parentNode) skeleton.parentNode.removeChild(skeleton);

        var card = document.createElement('div');
        card.id = 'verified-partner-species-card';
        card.className = 'species-card species-card--partner-verified bg-white rounded-lg p-4 sm:p-5 border border-gray-200';
        card.setAttribute('data-category', 'verified');
        card.setAttribute('data-country', 'partner-verified');

        var partnerTreesById = {};
        if (typeof TreeData !== 'undefined' && typeof TreeData.getVerifiedPartners === 'function') {
            TreeData.getVerifiedPartners().forEach(function (p) {
                partnerTreesById[p.id] = p.trees || 0;
            });
        }

        function isWesnGroup(g) {
            return g && g.groupLabel && g.groupLabel.indexOf('WESN') !== -1;
        }

        var sortedGroups = PARTNER_SPECIES_ID_GROUPS.slice().sort(function (a, b) {
            // Keep Web-Ready pinned first; WESN second-to-last (left of EcoSearch); EcoSearch last.
            if (a.groupLabel.indexOf('Web-Ready') !== -1) return -1;
            if (b.groupLabel.indexOf('Web-Ready') !== -1) return 1;

            var aEco = a.groupLabel === 'EcoSearch';
            var bEco = b.groupLabel === 'EcoSearch';
            var aWesn = isWesnGroup(a);
            var bWesn = isWesnGroup(b);

            if (aEco && bEco) return 0;
            if (aEco) return 1;
            if (bEco) return -1;

            if (aWesn && bWesn) return 0;
            if (aWesn) return 1;
            if (bWesn) return -1;

            // Remaining partners sort by live partner tree totals.
            var aId = PARTNER_GROUP_LABEL_TO_ID[a.groupLabel];
            var bId = PARTNER_GROUP_LABEL_TO_ID[b.groupLabel];
            var aTrees = aId && partnerTreesById[aId] ? partnerTreesById[aId] : 0;
            var bTrees = bId && partnerTreesById[bId] ? partnerTreesById[bId] : 0;
            if (aTrees !== bTrees) return bTrees - aTrees;

            // Stable fallback when tree counts are unavailable/equal.
            return (b.speciesIds.length || 0) - (a.speciesIds.length || 0);
        });

        var content = sortedGroups.map(function (group, idx) {
            var groupSpeciesLines = group.speciesIds.map(function (sid) {
                var sp = entriesById[sid];
                var name = sp && sp.name ? sp.name : ('Species ID ' + sid);
                var common = sp && sp.common_names ? firstCommonName(sp.common_names) : '';
                var category = sp && sp.category && sp.category.name ? sp.category.name : '';
                var imageUrl = sp && sp.image ? String(sp.image) : '';
                var meta = [];
                if (category) meta.push(escapeHtml(category));

                var nameSafe = escapeHtml(name);
                var commonSafe = common ? escapeHtml(common) : '';
                var altSafe = escapeAttr(name);

                var thumbHtml = imageUrl
                    ? '<button type="button" class="partner-species-thumb-btn js-species-thumb" data-species-id="' + sid + '" aria-label="View larger image of ' + nameSafe + '">' +
                        '<img class="partner-species-thumb is-loading js-partner-species-img" src="' + escapeAttr(imageUrl) + '" alt="' + altSafe + '" loading="lazy" decoding="async" data-fallback-label="' + String(sid) + '">' +
                        '<span class="partner-species-thumb-loading-text" aria-hidden="true">Loading image...</span>' +
                      '</button>'
                    : '<span class="partner-species-thumb partner-species-thumb--fallback" aria-hidden="true">' + String(sid) + '</span>';

                var detailsButtonHtml = imageUrl
                    ? '<button type="button" class="partner-species-details-btn js-species-thumb" data-species-id="' + sid + '" aria-label="View larger image and details for ' + nameSafe + '">' +
                        '<div class="partner-species-name">' + nameSafe + (commonSafe ? (' (' + commonSafe + ')') : '') + '</div>' +
                        (meta.length ? '<div class="partner-species-meta">' + meta.join(' \u2022 ') + '</div>' : '') +
                      '</button>'
                    : '<div>' +
                        '<div class="partner-species-name">' + nameSafe + (commonSafe ? (' (' + commonSafe + ')') : '') + '</div>' +
                        (meta.length ? '<div class="partner-species-meta">' + meta.join(' \u2022 ') + '</div>' : '') +
                      '</div>';

                return '<div class="partner-species-item">' +
                    thumbHtml +
                    detailsButtonHtml +
                    '</div>';
            }).join('');

            // Keep the original experience: all partner groups open by default.
            var openAttr = ' open';
            return '<details class="partner-group"' + openAttr + '>' +
                '<summary><span class="partner-group-title">' + escapeHtml(group.groupLabel) + '</span><span class="partner-group-count">' + group.speciesIds.length + ' species</span></summary>' +
                '<div class="partner-species-list">' + groupSpeciesLines + '</div>' +
                '</details>';
        }).join('');

        card.innerHTML =
            // Mobile: stacked title + full-width 2-col toolbar. sm+: title and buttons on one row when space allows.
            '<div class="verified-partner-card__header flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:gap-x-4 mb-4">' +
                '<h3 class="verified-partner-card__title text-lg font-semibold text-deep-forest leading-tight w-full min-w-0 sm:w-auto sm:shrink-0">Verified Tree Planting</h3>' +
                '<div class="partner-group-toolbar partner-group-toolbar--verified-header w-full grid grid-cols-2 gap-2 sm:flex sm:w-auto sm:shrink-0 sm:justify-end sm:gap-2 sm:ml-auto">' +
                    '<button type="button" class="partner-accordion-btn partner-accordion-btn--expand" data-partner-accordion="expand-all">' +
                        '<span>Expand all</span>' +
                        '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">' +
                            '<path d="M12 5v14" stroke="currentColor" stroke-width="2" stroke-linecap="round" />' +
                            '<path d="M5 12h14" stroke="currentColor" stroke-width="2" stroke-linecap="round" />' +
                        '</svg>' +
                    '</button>' +
                    '<button type="button" class="partner-accordion-btn partner-accordion-btn--collapse" data-partner-accordion="collapse-all">' +
                        '<span>Collapse all</span>' +
                        '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">' +
                            '<path d="M5 12h14" stroke="currentColor" stroke-width="2" stroke-linecap="round" />' +
                        '</svg>' +
                    '</button>' +
                '</div>' +
            '</div>' +
            '<p class="text-xs text-gray-500 mb-3 leading-relaxed">Species for partner forests shown on the Breakdown page.</p>' +
            '<div class="partner-group-grid">' + content + '</div>';

        var insertBefore = grid.firstElementChild;
        if (insertBefore) {
            grid.insertBefore(card, insertBefore);
        } else {
            grid.appendChild(card);
        }

        setupPartnerGroupExpandCollapseAll(card);
    }

    function renderVerifiedPartnerSpeciesSkeleton() {
        var grid = document.getElementById('species-grid');
        if (!grid) return;

        var existing = document.getElementById('verified-partner-species-skeleton');
        if (existing && existing.parentNode) existing.parentNode.removeChild(existing);

        var card = document.createElement('div');
        card.id = 'verified-partner-species-skeleton';
        card.className = 'species-card species-card--partner-verified skeleton-card p-4 sm:p-5';
        card.setAttribute('data-category', 'verified');
        card.setAttribute('data-country', 'partner-verified');

        // Skeleton mirrors the eventual verified card structure, but without API data.
        card.innerHTML =
            '<div class="flex flex-col items-center justify-center text-center gap-3 py-10 px-4">' +
                '<h3 class="text-2xl md:text-3xl font-bold text-deep-forest">Data loading</h3>' +
                '<p class="text-base md:text-lg text-gray-600 max-w-2xl">Fetching verified tree planting species and thumbnails from Tree-Nation. This can take a moment.</p>' +
                '<span class="tag" style="border-color:#BBF7D0;color:#166534;background-color:#F0FDF4">Loading from Tree-Nation</span>' +
                '<p id="verified-partner-loading-status" class="text-xs text-gray-500">Loading species metadata (0/0)...</p>' +
            '</div>' +
            '<div class="partner-group-grid">' +
                '<details class="partner-group" open>' +
                    '<summary>' +
                        '<span class="skeleton skeleton-line skeleton--flat" style="width: 70%; height: 0.95rem">&nbsp;</span>' +
                        '<span class="skeleton skeleton-line skeleton--flat" style="width: 5.5rem; height: 0.7rem">&nbsp;</span>' +
                    '</summary>' +
                    '<div class="partner-species-list">' +
                        '<div class="partner-species-item">' +
                            '<div class="skeleton skeleton--flat" style="width:56px;height:56px;border-radius:0.6rem">&nbsp;</div>' +
                            '<div>' +
                                '<div class="skeleton skeleton-line skeleton--flat" style="width: 75%; height: 0.9rem; display:block">&nbsp;</div>' +
                                '<div class="skeleton skeleton-line skeleton--flat" style="width: 40%; height: 0.7rem; display:block; margin-top:0.2rem">&nbsp;</div>' +
                            '</div>' +
                        '</div>' +
                        '<div class="partner-species-item">' +
                            '<div class="skeleton skeleton--flat" style="width:56px;height:56px;border-radius:0.6rem">&nbsp;</div>' +
                            '<div>' +
                                '<div class="skeleton skeleton-line skeleton--flat" style="width: 68%; height: 0.9rem; display:block">&nbsp;</div>' +
                                '<div class="skeleton skeleton-line skeleton--flat" style="width: 38%; height: 0.7rem; display:block; margin-top:0.2rem">&nbsp;</div>' +
                            '</div>' +
                        '</div>' +
                        '<div class="partner-species-item">' +
                            '<div class="skeleton skeleton--flat" style="width:56px;height:56px;border-radius:0.6rem">&nbsp;</div>' +
                            '<div>' +
                                '<div class="skeleton skeleton-line skeleton--flat" style="width: 80%; height: 0.9rem; display:block">&nbsp;</div>' +
                                '<div class="skeleton skeleton-line skeleton--flat" style="width: 35%; height: 0.7rem; display:block; margin-top:0.2rem">&nbsp;</div>' +
                            '</div>' +
                        '</div>' +
                    '</div>' +
                '</details>' +
                '<details class="partner-group">' +
                    '<summary>' +
                        '<span class="skeleton skeleton-line skeleton--flat" style="width: 60%; height: 0.95rem">&nbsp;</span>' +
                        '<span class="skeleton skeleton-line skeleton--flat" style="width: 5rem; height: 0.7rem">&nbsp;</span>' +
                    '</summary>' +
                '</details>' +
                '<details class="partner-group">' +
                    '<summary>' +
                        '<span class="skeleton skeleton-line skeleton--flat" style="width: 58%; height: 0.95rem">&nbsp;</span>' +
                        '<span class="skeleton skeleton-line skeleton--flat" style="width: 5.4rem; height: 0.7rem">&nbsp;</span>' +
                    '</summary>' +
                '</details>' +
                '<details class="partner-group">' +
                    '<summary>' +
                        '<span class="skeleton skeleton-line skeleton--flat" style="width: 52%; height: 0.95rem">&nbsp;</span>' +
                        '<span class="skeleton skeleton-line skeleton--flat" style="width: 5.2rem; height: 0.7rem">&nbsp;</span>' +
                    '</summary>' +
                '</details>' +
                '<details class="partner-group">' +
                    '<summary>' +
                        '<span class="skeleton skeleton-line skeleton--flat" style="width: 48%; height: 0.95rem">&nbsp;</span>' +
                        '<span class="skeleton skeleton-line skeleton--flat" style="width: 4.8rem; height: 0.7rem">&nbsp;</span>' +
                    '</summary>' +
                '</details>' +
            '</div>';

        var insertBefore = grid.firstElementChild;
        if (insertBefore) {
            grid.insertBefore(card, insertBefore);
        } else {
            grid.appendChild(card);
        }
    }

    function refreshPartnerGroupPanel(details, fromUserToggle) {
        if (!details || !details.open) return;

        requestAnimationFrame(function () {
            var list = details.querySelector('.partner-species-list');
            if (list) {
                if (fromUserToggle) list.scrollTop = 0;
                void list.offsetHeight;
            }
            void details.offsetHeight;

            if (!fromUserToggle) return;

            var imgs = details.querySelectorAll('img.js-partner-species-img');
            imgs.forEach(function (img) {
                img.loading = 'eager';
                var src = img.getAttribute('src');
                if (src && !img.complete) {
                    img.removeAttribute('data-thumb-handled');
                    img.src = '';
                    img.src = src;
                }
            });

            setupSpeciesThumbLoading(details);
        });
    }

    function setupPartnerGroupExpandCollapseAll(card) {
        if (!card) return;

        var groups = card.querySelectorAll('details.partner-group');
        var expandBtn = card.querySelector('[data-partner-accordion="expand-all"]');
        var collapseBtn = card.querySelector('[data-partner-accordion="collapse-all"]');
        // Match Tailwind `lg` / partner-group 2-col grid: desktop = no per-row summary toggle.
        var desktopMq = typeof window.matchMedia === 'function'
            ? window.matchMedia('(min-width: 1024px)')
            : { matches: false, addEventListener: null, addListener: null };

        function setMode(mode) {
            if (expandBtn) {
                var isActive = mode === 'expand';
                expandBtn.classList.toggle('is-active', isActive);
                expandBtn.setAttribute('aria-pressed', isActive ? 'true' : 'false');
            }
            if (collapseBtn) {
                var isActive = mode === 'collapse';
                collapseBtn.classList.toggle('is-active', isActive);
                collapseBtn.setAttribute('aria-pressed', isActive ? 'true' : 'false');
            }
        }

        function clearToolbarActive() {
            if (expandBtn) {
                expandBtn.classList.remove('is-active');
                expandBtn.setAttribute('aria-pressed', 'false');
            }
            if (collapseBtn) {
                collapseBtn.classList.remove('is-active');
                collapseBtn.setAttribute('aria-pressed', 'false');
            }
        }

        function syncToolbarFromGroups() {
            if (desktopMq.matches) return;
            var allOpen = true;
            var allClosed = true;
            groups.forEach(function (d) {
                if (!d.open) allOpen = false;
                if (d.open) allClosed = false;
            });
            if (allOpen) setMode('expand');
            else if (allClosed) setMode('collapse');
            else clearToolbarActive();
        }

        // Start based on the `<details open>` boolean attribute in markup.
        groups.forEach(function (details) {

            var summary = details.querySelector('summary');
            if (summary) {
                summary.addEventListener('click', function (event) {
                    if (desktopMq.matches) {
                        event.preventDefault();
                        event.stopPropagation();
                    }
                });
            }

            details.addEventListener('toggle', function () {
                if (desktopMq.matches) return;
                requestAnimationFrame(function () {
                    syncToolbarFromGroups();
                    if (details.open) refreshPartnerGroupPanel(details, true);
                });
            });
        });
        syncToolbarFromGroups();

        function expandAll() {
            groups.forEach(function (details) {
                details.open = true;
            });

            setMode('expand');
            requestAnimationFrame(function () {
                // Re-run thumb handling in case some groups were collapsed before.
                setupSpeciesThumbLoading(card);
            });
        }

        function collapseAll() {
            groups.forEach(function (details) {
                details.open = false;
            });
            setMode('collapse');
        }

        if (expandBtn) expandBtn.addEventListener('click', expandAll);
        if (collapseBtn) collapseBtn.addEventListener('click', collapseAll);

        function onDesktopBreakpointChange() {
            if (!desktopMq.matches) return;
            groups.forEach(function (details) {
                details.open = true;
            });
            setMode('expand');
            requestAnimationFrame(function () {
                setupSpeciesThumbLoading(card);
            });
        }

        if (desktopMq.addEventListener) {
            desktopMq.addEventListener('change', onDesktopBreakpointChange);
        } else if (desktopMq.addListener) {
            desktopMq.addListener(onDesktopBreakpointChange);
        }
    }

    /**
     * Browsers can intermittently fail to paint or load content inside <details>.
     * Nudge layout on first paint; on user open, re-trigger image loads + thumb handlers.
     */
    function setupPartnerGroupToggleFix(card) {
        if (!card) return;

        var groups = card.querySelectorAll('details.partner-group');
        if (!groups || !groups.length) return;

        // Ensure only the first group is open on initial render.
        groups.forEach(function (d, idx) {
            d.open = idx === 0;
        });

        groups.forEach(function (details, idx) {
            if (details.getAttribute('data-toggle-fix') === 'true') return;
            details.setAttribute('data-toggle-fix', 'true');

            var summary = details.querySelector('summary');
            if (!summary) return;

            // Use click prevention to fully control accordion state.
            summary.addEventListener('click', function (event) {
                event.preventDefault();
                event.stopPropagation();

                var nextOpen = !(details.open === true);

                if (nextOpen) {
                    groups.forEach(function (other) {
                        other.open = false;
                    });
                    details.open = true;
                    refreshPartnerGroupPanel(details, true);
                    return;
                }

                // Allow closing the current panel.
                details.open = false;
            });

            if (details.open) {
                refreshPartnerGroupPanel(details, false);
            }
        });
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
                '<div class="species-lightbox__header">' +
                    '<p class="species-lightbox__source-tag">Tree-Nation API content</p>' +
                    '<button type="button" class="species-lightbox__close" data-close-lightbox="true" aria-label="Close image viewer">' +
                        '<span aria-hidden="true">×</span>' +
                    '</button>' +
                '</div>' +
                '<div class="species-lightbox__media">' +
                    '<img id="species-lightbox-img" class="species-lightbox__img" src="" alt="" loading="eager" decoding="async">' +
                '</div>' +
                '<div class="species-lightbox__body">' +
                    '<h4 id="species-lightbox-title" class="species-lightbox__title"></h4>' +
                    '<p id="species-lightbox-desc" class="species-lightbox__desc"></p>' +
                    '<p id="species-lightbox-disclaimer" class="species-lightbox__disclaimer"></p>' +
                '</div>' +
            '</div>';
        document.body.appendChild(lightbox);
        return lightbox;
    }

    function closeSpeciesLightbox() {
        var lightbox = document.getElementById('species-lightbox');
        if (!lightbox) return;
        lightbox.classList.add('hidden');
        document.body.classList.remove('species-lightbox-open');

        var imgEl = document.getElementById('species-lightbox-img');
        if (imgEl) {
            imgEl.removeAttribute('src');
        }

        if (lightboxLastFocusedElement && typeof lightboxLastFocusedElement.focus === 'function') {
            lightboxLastFocusedElement.focus();
        }
        lightboxLastFocusedElement = null;
    }

    function openSpeciesLightbox(species) {
        if (!species || !species.image) return;
        var lightbox = ensureLightbox();
        var imgEl = document.getElementById('species-lightbox-img');
        var titleEl = document.getElementById('species-lightbox-title');
        var descEl = document.getElementById('species-lightbox-desc');
        var disclaimerEl = document.getElementById('species-lightbox-disclaimer');

        lightboxLastFocusedElement = document.activeElement;
        imgEl.src = species.image;
        imgEl.alt = species.name || 'Species';
        titleEl.textContent = species.name || 'Species';
        descEl.textContent = species.particularities || species.planter_likes || 'No additional description available from Tree-Nation API.';
        disclaimerEl.textContent = 'Image and species details are supplied by the Tree-Nation API.';
        lightbox.classList.remove('hidden');
        document.body.classList.add('species-lightbox-open');

        var closeBtn = lightbox.querySelector('.species-lightbox__close');
        if (closeBtn) closeBtn.focus();
    }

    function setupLightboxInteractions(entriesById) {
        lightboxSpeciesById = entriesById || {};
        var lightbox = ensureLightbox();

        if (lightboxDocumentClickBound) return;
        lightboxDocumentClickBound = true;

        document.addEventListener('click', function (event) {
            var closeTrigger = event.target.closest('[data-close-lightbox="true"]');
            if (closeTrigger) {
                closeSpeciesLightbox();
                return;
            }

            var thumb = event.target.closest('.js-species-thumb');
            if (!thumb) return;
            var sid = Number(thumb.getAttribute('data-species-id'));
            openSpeciesLightbox(lightboxSpeciesById[sid]);
        });

        if (!lightboxKeydownBound) {
            lightboxKeydownBound = true;
            document.addEventListener('keydown', function (event) {
                if (event.key !== 'Escape') return;
                if (lightbox.classList.contains('hidden')) return;
                closeSpeciesLightbox();
            });
        }
    }

    function setupSpeciesThumbLoading(root) {
        var scope = root && root.querySelectorAll ? root : document;
        var thumbs = scope.querySelectorAll('.js-partner-species-img:not([data-thumb-handled])');
        thumbs.forEach(function (img) {
            // If the thumbnail is inside a closed <details>, some browsers may report
            // `img.complete === true` and `naturalWidth === 0` before the resource
            // is actually requested. In that case we must defer handling until the
            // group is opened, otherwise we prematurely replace the image with a fallback.
            var detailsParent = img.closest('details.partner-group');
            if (detailsParent && !detailsParent.open) return;

            img.setAttribute('data-thumb-handled', 'true');
            var button = img.closest('.partner-species-thumb-btn');
            if (!button) return;

            var markReady = function () {
                img.classList.remove('is-loading');
                img.classList.add('is-loaded');
                button.classList.add('is-ready');
            };

            var swapToFallback = function () {
                var fallback = document.createElement('span');
                fallback.className = 'partner-species-thumb partner-species-thumb--fallback';
                fallback.setAttribute('aria-hidden', 'true');
                fallback.textContent = img.getAttribute('data-fallback-label') || 'N/A';
                button.replaceWith(fallback);
            };

            var safetyTimer = window.setTimeout(function () {
                if (img.classList.contains('is-loading')) {
                    markReady();
                }
            }, 10000);

            var clearTimer = function () {
                window.clearTimeout(safetyTimer);
            };

            if (img.complete) {
                clearTimer();
                if (img.naturalWidth > 0) {
                    markReady();
                } else {
                    swapToFallback();
                }
                return;
            }

            img.addEventListener('load', function () {
                clearTimer();
                markReady();
            }, { once: true });
            img.addEventListener('error', function () {
                clearTimer();
                swapToFallback();
            }, { once: true });
        });
    }

    function renderFocusTagSummary(entriesById) {
        var grid = document.getElementById('species-focus-tags-grid');
        if (!grid) return;

        var byTag = {};
        var knownCategoryAliases = {
            'medicine': 'Medicinal',
            'medicinal': 'Medicinal',
            'fast growing': 'Fast-growing',
            'fast-growing': 'Fast-growing'
        };
        var totalSpecies = 0;

        Object.keys(entriesById || {}).forEach(function (idKey) {
            var sp = entriesById[idKey];
            if (!sp || !sp.name) return;
            totalSpecies += 1;
            var rawCategoryName = String((sp.category && sp.category.name) || '').trim();
            var normalizedCategoryName = rawCategoryName.toLowerCase();
            var key = knownCategoryAliases[normalizedCategoryName] || rawCategoryName || 'Uncategorized';
            if (!byTag[key]) byTag[key] = [];
            byTag[key].push(sp.name);
        });

        Object.keys(byTag).forEach(function (tagName) {
            byTag[tagName] = dedupeAndSort(byTag[tagName]);
        });

        var tagNames = Object.keys(byTag).sort(function (a, b) {
            var diff = (byTag[b].length || 0) - (byTag[a].length || 0);
            return diff !== 0 ? diff : a.localeCompare(b);
        });

        grid.innerHTML = tagNames.map(function (tagName) {
            var species = byTag[tagName] || [];
            return (
                '<div class="focus-tag-summary-card">' +
                    '<div class="flex items-start justify-between gap-3">' +
                        '<span class="focus-tag-summary-pill">' + tagName + '</span>' +
                        '<span class="text-lg font-semibold text-brand-green tabular-nums">' + species.length + '</span>' +
                    '</div>' +
                '</div>'
            );
        }).join('');

        var meta = document.getElementById('species-focus-tags-meta');
        if (meta) {
            var listed = countListedVerifiedSpeciesSlots();
            meta.textContent =
                listed + ' species listed across verified forests below (' + totalSpecies + ' unique after overlap).';
        }
    }

    function dedupeAndSort(values) {
        var seen = {};
        var out = [];
        (values || []).forEach(function (value) {
            var key = String(value || '').trim();
            if (!key || seen[key]) return;
            seen[key] = true;
            out.push(key);
        });
        out.sort(function (a, b) { return a.localeCompare(b); });
        return out;
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

    function updateVerifiedPartnerLoadingStatus(doneCount, totalCount) {
        var statusEl = document.getElementById('verified-partner-loading-status');
        if (!statusEl) return;
        var done = Number(doneCount) || 0;
        var total = Number(totalCount) || 0;
        statusEl.textContent = 'Loading species metadata (' + done + '/' + total + ')...';
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

        // Immediately show a skeleton for the API-backed "Verified Tree Planting" section.
        renderVerifiedPartnerSpeciesSkeleton();

        var configuredIds = [];
        PARTNER_SPECIES_ID_GROUPS.forEach(function (group) {
            (group.speciesIds || []).forEach(function (sid) { configuredIds.push(sid); });
        });
        configuredIds = toUniqueNumberList(configuredIds);

        function mapWithConcurrency(items, concurrency, mapper, onProgress) {
            return new Promise(function (resolve) {
                var results = new Array(items.length);
                var nextIndex = 0;
                var inFlight = 0;
                var doneCount = 0;

                function launchMore() {
                    while (inFlight < concurrency && nextIndex < items.length) {
                        (function (index) {
                            var sid = items[index];
                            inFlight += 1;

                            Promise.resolve(mapper(sid))
                                .then(function (value) {
                                    results[index] = value;
                                }, function () {
                                    results[index] = null;
                                })
                                .then(function () {
                                    inFlight -= 1;
                                    doneCount += 1;
                                    if (typeof onProgress === 'function') {
                                        onProgress(doneCount, items.length);
                                    }
                                    if (doneCount === items.length) resolve(results);
                                    else launchMore();
                                });
                        })(nextIndex);
                        nextIndex += 1;
                    }
                }

                launchMore();
            });
        }

        function renderFromAllIds(allIds) {
            allIds = toUniqueNumberList(allIds);
            if (!allIds.length) return;

            var missing = allIds.filter(function (sid) {
                return !Object.prototype.hasOwnProperty.call(SPECIES_API_CACHE, sid);
            });

            function buildById() {
                var byId = {};
                allIds.forEach(function (sid) {
                    byId[sid] = Object.prototype.hasOwnProperty.call(SPECIES_API_CACHE, sid)
                        ? SPECIES_API_CACHE[sid]
                        : null;
                });
                return byId;
            }

            if (!missing.length) {
                var byIdNoFetch = buildById();
                renderFocusTagSummary(byIdNoFetch);
                renderVerifiedPartnerSpeciesCard(byIdNoFetch);
                setupSpeciesThumbLoading();
                hideStaticVerifiedCardsIfCovered(byIdNoFetch);
                setupLightboxInteractions(byIdNoFetch);
                var activeBtnNoFetch = document.querySelector('.filter-btn.active');
                applyFilter(activeBtnNoFetch ? activeBtnNoFetch.getAttribute('data-filter') : 'all');
                return;
            }

            var concurrency = 8;
            updateVerifiedPartnerLoadingStatus(0, missing.length);
            mapWithConcurrency(missing, concurrency, function (sid) {
                return fetchSpeciesById(sid).then(function (sp) { return { sid: sid, sp: sp }; });
            }, function (done, total) {
                updateVerifiedPartnerLoadingStatus(done, total);
            }).then(function (results) {
                results.forEach(function (r) {
                    SPECIES_API_CACHE[r.sid] = r.sp;
                });

                var byId = buildById();
                renderFocusTagSummary(byId);
                renderVerifiedPartnerSpeciesCard(byId);
                setupSpeciesThumbLoading();
                hideStaticVerifiedCardsIfCovered(byId);
                setupLightboxInteractions(byId);
                var activeBtn = document.querySelector('.filter-btn.active');
                applyFilter(activeBtn ? activeBtn.getAttribute('data-filter') : 'all');
            });
        }

        // Hydrate from cache and render only the planted-species registry used below.
        loadSpeciesCacheFile().finally(function () {
            renderFromAllIds(configuredIds);
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', boot);
    } else {
        boot();
    }
})();
