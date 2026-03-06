function scrollToDetails() {
    var footer = document.querySelector('footer[role="contentinfo"]');
    if (footer) footer.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function getCertificateCategory(filename) {
    if (!filename) return 'other';
    if (filename.indexOf('Historical_Planting') === 0) return 'historical';
    if (filename.indexOf('2024-2025_FY') === 0) return '2024-2025';
    if (filename.indexOf('2025-2026_FY') === 0) return '2025-2026';
    if (filename.indexOf('Partners/') === 0) return 'partners';
    return 'other';
}

function getSortedAndFilteredCertificates(categoryFilter, searchQuery) {
    if (typeof TreeData === 'undefined') return [];
    let list = TreeData.getCertificates().map(function(cert) {
        return { ...cert, category: getCertificateCategory(cert.filename) };
    });
    if (categoryFilter && categoryFilter !== 'all') {
        list = list.filter(function(c) { return c.category === categoryFilter; });
    }
    if (searchQuery && searchQuery.trim()) {
        var q = searchQuery.trim().toLowerCase();
        list = list.filter(function(c) {
            return (c.title && c.title.toLowerCase().indexOf(q) !== -1) ||
                (c.location && c.location.toLowerCase().indexOf(q) !== -1) ||
                (c.certificate && c.certificate.toLowerCase().indexOf(q) !== -1) ||
                (c.fyNote && c.fyNote.toLowerCase().indexOf(q) !== -1) ||
                (c.date && c.date.toLowerCase().indexOf(q) !== -1);
        });
    }
    list.sort(function(a, b) {
        var treesA = a.trees || 0;
        var treesB = b.trees || 0;
        if (treesB !== treesA) return treesB - treesA;
        return (a.title || '').localeCompare(b.title || '');
    });
    return list;
}

function downloadCertificate(certificateId) {
    if (typeof TreeData === 'undefined') {
        console.error('TreeData not loaded');
        return;
    }
    var certificate = TreeData.getCertificates().find(function(cert) { return cert.id === certificateId; });
    if (certificate) {
        var filePath = 'assets/certificates/' + certificate.filename.split('/').map(encodeURIComponent).join('/');
        var link = document.createElement('a');
        link.href = filePath;
        link.download = certificate.filename.split('/').pop();
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    } else {
        alert('Certificate ' + certificateId + ' not found.');
    }
}

function renderCertificateCard(certificate) {
    var encodedPath = certificate.filename.split('/').map(encodeURIComponent).join('/');
    var treesStr = certificate.trees ? certificate.trees.toLocaleString() : '—';
    var co2Str = certificate.co2Offset ? certificate.co2Offset.toLocaleString() + ' kg' : '—';
    var fyNoteHtml = certificate.fyNote
        ? '<p class="text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded px-2 py-1.5 mb-2">' + certificate.fyNote + '</p>'
        : '';
    return '<div class="certificate-card" data-category="' + (certificate.category || '') + '">' +
        '<div class="space-y-4">' +
        '<div>' +
        '<h3 class="text-lg font-semibold text-deep-forest mb-3">' + certificate.title + '</h3>' +
        fyNoteHtml +
        '<div class="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-gray-600">' +
        '<p><strong>Certificate:</strong> ' + certificate.certificate + '</p>' +
        '<p><strong>Location:</strong> ' + certificate.location + '</p>' +
        '<p><strong>Trees Planted:</strong> ' + treesStr + '</p>' +
        '<p><strong>CO2 Offset:</strong> ' + co2Str + '</p>' +
        '<p class="sm:col-span-2"><strong>Date:</strong> ' + certificate.date + '</p>' +
        '</div>' +
        '</div>' +
        '<div class="pt-1 flex flex-wrap gap-3 items-center">' +
        '<a href="assets/certificates/' + encodedPath + '" target="_blank" rel="noopener noreferrer" class="ui-pill-btn">View PDF</a>' +
        '<button class="download-btn" onclick="downloadCertificate(\'' + certificate.id + '\')">' +
        '<svg xmlns="http://www.w3.org/2000/svg" class="download-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">' +
        '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>' +
        '</svg>' +
        '<span>Download PDF</span>' +
        '</button>' +
        '</div>' +
        '</div>' +
        '</div>';
}

function populateCertificates(categoryFilter, searchQuery) {
    categoryFilter = categoryFilter || 'all';
    searchQuery = searchQuery || '';
    var container = document.getElementById('certificates-container');
    var emptyEl = document.getElementById('certificates-empty');
    if (!container) return;
    var list = getSortedAndFilteredCertificates(categoryFilter, searchQuery);
    container.innerHTML = '';
    if (list.length === 0) {
        if (emptyEl) emptyEl.classList.remove('hidden');
        return;
    }
    if (emptyEl) emptyEl.classList.add('hidden');
    list.forEach(function(certificate) {
        var div = document.createElement('div');
        div.innerHTML = renderCertificateCard(certificate);
        container.appendChild(div.firstElementChild);
    });
}

function initFilters() {
    var filterButtons = document.querySelectorAll('[data-cert-filter]');
    var searchInput = document.getElementById('certificates-search');
    var currentFilter = 'all';
    var currentSearch = '';

    function applyFilters() {
        populateCertificates(currentFilter, currentSearch);
        filterButtons.forEach(function(btn) {
            var value = btn.getAttribute('data-cert-filter');
            if (value === currentFilter) {
                btn.classList.add('cert-filter-active');
                btn.classList.remove('cert-filter-inactive');
            } else {
                btn.classList.remove('cert-filter-active');
                btn.classList.add('cert-filter-inactive');
            }
        });
    }

    filterButtons.forEach(function(btn) {
        btn.addEventListener('click', function() {
            currentFilter = btn.getAttribute('data-cert-filter') || 'all';
            applyFilters();
        });
    });

    if (searchInput) {
        searchInput.addEventListener('input', function() {
            currentSearch = searchInput.value;
            applyFilters();
        });
    }

    applyFilters();
}

document.addEventListener('DOMContentLoaded', function() {
    initFilters();

    document.addEventListener('click', function(e) {
        if (e.target.closest('.download-btn')) {
            var button = e.target.closest('.download-btn');
            button.style.transform = 'scale(0.95)';
            setTimeout(function() {
                button.style.transform = '';
            }, 150);
        }
    });

    const toggleBtn = document.getElementById('mobile-menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const closeBtn = document.getElementById('mobile-menu-close');
    const backdrop = document.getElementById('mobile-menu-backdrop');
    if (toggleBtn && mobileMenu) {
        const openMenu = () => {
            mobileMenu.classList.add('menu-open');
            document.documentElement.style.overflow = 'hidden';
            document.body.style.overflow = 'hidden';
            toggleBtn.setAttribute('aria-expanded', 'true');
        };
        const closeMenu = () => {
            mobileMenu.classList.remove('menu-open');
            document.documentElement.style.overflow = '';
            document.body.style.overflow = '';
            toggleBtn.setAttribute('aria-expanded', 'false');
        };
        toggleBtn.addEventListener('click', openMenu);
        if (closeBtn) closeBtn.addEventListener('click', closeMenu);
        if (backdrop) backdrop.addEventListener('click', closeMenu);
    }
});
