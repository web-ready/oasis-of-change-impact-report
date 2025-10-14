// Initialize tree data and update UI
function initializeTreeData() {
    if (typeof TreeData === 'undefined') {
        console.error('TreeData not loaded. Make sure tree-data.js is included before dashboard.js');
        return;
    }

    // Update last updated date
    const lastUpdatedElement = document.getElementById('last-updated-date');
    if (lastUpdatedElement) {
        lastUpdatedElement.textContent = TreeData.lastUpdated;
    }

    // Calculate relative time
    var lastUpdated = new Date('2025-09-10T00:00:00-07:00'); 
    var now = new Date();
    var diffMs = now - lastUpdated;
    var diffSec = Math.floor(diffMs / 1000);
    var diffMin = Math.floor(diffSec / 60);
    var diffHr = Math.floor(diffMin / 60);
    var diffDay = Math.floor(diffHr / 24);
    var diffMonth = Math.floor(diffDay / 30.44);
    var diffYear = Math.floor(diffDay / 365.25);

    var rel = '';
    if (diffYear > 0) {
        rel = diffYear === 1 ? '1 year ago' : diffYear + ' years ago';
    } else if (diffMonth > 0) {
        rel = diffMonth === 1 ? '1 month ago' : diffMonth + ' months ago';
    } else if (diffDay > 0) {
        rel = diffDay === 1 ? '1 day ago' : diffDay + ' days ago';
    } else if (diffHr > 0) {
        rel = diffHr === 1 ? '1 hour ago' : diffHr + ' hours ago';
    } else if (diffMin > 0) {
        rel = diffMin === 1 ? '1 minute ago' : diffMin + ' minutes ago';
    } else {
        rel = 'just now';
    }
    
    var desktopElement = document.getElementById('last-updated-relative');
    var mobileElement = document.getElementById('last-updated-relative-mobile');
    if (desktopElement) desktopElement.textContent = '(' + rel + ')';
    if (mobileElement) mobileElement.textContent = '(' + rel + ')';

    // Update all tree statistics
    updateTreeStatistics();
}

function updateTreeStatistics() {
    // Update total trees
    const totalTrees = TreeData.getTotalTrees();
    const totalElement = document.getElementById('total-count');
    const totalElementMobile = document.getElementById('total-count-mobile');
    if (totalElement) totalElement.textContent = totalTrees.toLocaleString();
    if (totalElementMobile) totalElementMobile.textContent = totalTrees.toLocaleString();

    // Update verified trees
    const verifiedTrees = TreeData.getVerifiedTrees();
    const verifiedElement = document.getElementById('verified-count');
    if (verifiedElement) verifiedElement.textContent = verifiedTrees.toLocaleString();

    // Update legacy trees
    const legacyTrees = TreeData.getLegacyTrees();
    const legacyElement = document.getElementById('legacy-count');
    if (legacyElement) legacyElement.textContent = legacyTrees.toLocaleString();

    // Update percentages
    const verifiedPercentage = TreeData.getVerifiedPercentage();
    const legacyPercentage = TreeData.getLegacyPercentage();
    
    const verifiedPercentageElement = document.getElementById('verified-percentage');
    const legacyPercentageElement = document.getElementById('legacy-percentage');
    if (verifiedPercentageElement) verifiedPercentageElement.textContent = verifiedPercentage + '% of total';
    if (legacyPercentageElement) legacyPercentageElement.textContent = legacyPercentage + '% of total';

    // Update tree count text
    const verifiedTreesText = document.getElementById('verified-trees-text');
    const legacyTreesText = document.getElementById('legacy-trees-text');
    if (verifiedTreesText) verifiedTreesText.textContent = verifiedTrees.toLocaleString() + ' trees';
    if (legacyTreesText) legacyTreesText.textContent = legacyTrees.toLocaleString() + ' trees';

    // Update progress bars
    const verifiedProgressBar = document.getElementById('verified-progress-bar');
    const legacyProgressBar = document.getElementById('legacy-progress-bar');
    if (verifiedProgressBar) verifiedProgressBar.style.width = verifiedPercentage + '%';
    if (legacyProgressBar) legacyProgressBar.style.width = legacyPercentage + '%';

    // Update CO2 and species counts
    const co2Element = document.getElementById('co2-simple');
    const speciesElement = document.getElementById('species-count');
    if (co2Element) co2Element.textContent = TreeData.getCo2Captured().toLocaleString();
    if (speciesElement) speciesElement.textContent = TreeData.getSpeciesCount();

    // Update progress section
    const progressPercentage = TreeData.getProgressPercentage();
    const remainingTrees = TreeData.getRemainingTrees();
    const goalTrees = TreeData.totals.goalTrees;
    
    const progressPercentageElement = document.getElementById('progress-percentage');
    const remainingTreesElement = document.getElementById('remaining-trees-text');
    const progressTreesPlantedElement = document.getElementById('progress-trees-planted');
    const progressGoalElement = document.getElementById('progress-goal');
    const mainProgressBar = document.getElementById('main-progress-bar');
    
    if (progressPercentageElement) progressPercentageElement.textContent = progressPercentage + '%';
    if (remainingTreesElement) remainingTreesElement.textContent = remainingTrees.toLocaleString() + ' trees remaining to reach our milestone';
    if (progressTreesPlantedElement) progressTreesPlantedElement.textContent = totalTrees.toLocaleString();
    if (progressGoalElement) progressGoalElement.textContent = goalTrees.toLocaleString();
    if (mainProgressBar) mainProgressBar.style.width = progressPercentage + '%';

    // Populate project tables
    populateProjectTables();
}

function populateProjectTables() {
    // Populate verified projects table
    const verifiedTableBody = document.getElementById('verified-table-body');
    const verifiedMobileCards = document.getElementById('verified-mobile-cards');
    
    if (verifiedTableBody) {
        verifiedTableBody.innerHTML = '';
        TreeData.getVerifiedProjects().forEach(project => {
            const row = document.createElement('tr');
            row.className = 'data-row border-b border-gray-50 transition-all duration-200';
            row.innerHTML = `
                <td class="py-6 px-2">
                    <div class="font-medium text-deep-forest">
                        <a href="${project.url}" target="_blank" rel="noopener" class="hover:text-brand-green underline-offset-2 hover:underline">${project.name}</a>
                    </div>
                    <div class="text-sm text-gray-500">${project.description}</div>
                </td>
                <td class="py-6 px-2">
                    <span class="text-sm font-medium text-gray-700">${project.location}</span>
                </td>
                <td class="py-6 px-2 text-right">
                    <div class="tabular-nums text-lg font-semibold text-deep-forest">${project.trees.toLocaleString()}</div>
                </td>
            `;
            verifiedTableBody.appendChild(row);
        });
    }

    // Populate verified mobile cards
    if (verifiedMobileCards) {
        verifiedMobileCards.innerHTML = '';
        TreeData.getVerifiedProjects().forEach(project => {
            const card = document.createElement('div');
            card.className = 'mobile-data-card';
            card.setAttribute('data-search', `${project.name.toLowerCase()} ${project.description.toLowerCase()} ${project.location.toLowerCase()}`);
            card.innerHTML = `
                <div class="mobile-card-header">
                    <div>
                        <div class="mobile-card-title"><a href="${project.url}" target="_blank" rel="noopener" class="hover:text-brand-green underline-offset-2 hover:underline">${project.name}</a></div>
                        <div class="mobile-card-subtitle">${project.description}</div>
                    </div>
                    <div class="mobile-trees-count">${project.trees.toLocaleString()}</div>
                </div>
                <div class="mobile-card-meta">
                    <div class="mobile-meta-item">
                        <span>${project.location}</span>
                    </div>
                </div>
            `;
            verifiedMobileCards.appendChild(card);
        });
    }

    // Populate legacy projects table
    const legacyTableBody = document.getElementById('legacy-table-body');
    const legacyMobileCards = document.getElementById('legacy-mobile-cards');
    
    if (legacyTableBody) {
        legacyTableBody.innerHTML = '';
        TreeData.getLegacyProjects().forEach(project => {
            const row = document.createElement('tr');
            row.className = 'data-row border-b border-gray-50 transition-all duration-200';
            row.innerHTML = `
                <td class="py-6 px-2">
                    <div class="font-medium text-deep-forest">${project.name}</div>
                    <div class="text-sm text-gray-500">${project.description}</div>
                </td>
                <td class="py-6 px-2 text-right">
                    <div class="tabular-nums text-lg font-semibold text-deep-forest">${project.trees.toLocaleString()}</div>
                </td>
            `;
            legacyTableBody.appendChild(row);
        });
    }

    // Populate legacy mobile cards
    if (legacyMobileCards) {
        legacyMobileCards.innerHTML = '';
        TreeData.getLegacyProjects().forEach(project => {
            const card = document.createElement('div');
            card.className = 'mobile-data-card';
            card.setAttribute('data-search', `${project.name.toLowerCase()} ${project.description.toLowerCase()}`);
            card.innerHTML = `
                <div class="mobile-card-header">
                    <div>
                        <div class="mobile-card-title">${project.name}</div>
                        <div class="mobile-card-subtitle">${project.description}</div>
                    </div>
                    <div class="mobile-trees-count">${project.trees.toLocaleString()}</div>
                </div>
            `;
            legacyMobileCards.appendChild(card);
        });
    }
}

// Initialize when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeTreeData);
} else {
    initializeTreeData();
}

(function(){
    const toggleBtn = document.getElementById('mobile-menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const closeBtn = document.getElementById('mobile-menu-close');
    if (!toggleBtn || !mobileMenu) return;
    const toggleMenu = () => {
        const isOpen = !mobileMenu.classList.contains('hidden');
        mobileMenu.classList.toggle('hidden');
        document.documentElement.style.overflow = isOpen ? '' : 'hidden';
        document.body.style.overflow = isOpen ? '' : 'hidden';
        toggleBtn.setAttribute('aria-expanded', String(!isOpen));
    };
    toggleBtn.addEventListener('click', toggleMenu);
    if (closeBtn) closeBtn.addEventListener('click', toggleMenu);
})();

function switchTab(tabName) {
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.add('hidden');
    });
    
    document.querySelectorAll('.tab-button').forEach(button => {
        button.classList.remove('text-brand-green', 'bg-brand-green/5', 'text-yellow-700', 'bg-legacy-gold/5');
        button.classList.add('text-gray-500');
        button.querySelector('.w-2').classList.remove('bg-brand-green', 'bg-legacy-gold');
        button.querySelector('.w-2').classList.add('bg-gray-300');
    });
    
    document.getElementById(tabName + '-content').classList.remove('hidden');
    
    const activeTab = document.getElementById(tabName + '-tab');
    activeTab.classList.remove('text-gray-500');
    
    const indicator = document.getElementById('tab-indicator');
    
    if (tabName === 'verified') {
        activeTab.classList.add('text-brand-green', 'bg-brand-green/5');
        activeTab.querySelector('.w-2').classList.remove('bg-gray-300');
        activeTab.querySelector('.w-2').classList.add('bg-brand-green');
        indicator.style.left = '0%';
        indicator.style.background = 'linear-gradient(90deg, #16A34A, #22c55e)';
    } else {
        activeTab.classList.add('text-yellow-700', 'bg-legacy-gold/5');
        activeTab.querySelector('.w-2').classList.remove('bg-gray-300');
        activeTab.querySelector('.w-2').classList.add('bg-legacy-gold');
        indicator.style.left = '50%';
        indicator.style.background = 'linear-gradient(90deg, #EAB308, #facc15)';
    }
}

document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        // Update progress bars with centralized data
        const verifiedProgressBar = document.getElementById('verified-progress-bar');
        const legacyProgressBar = document.getElementById('legacy-progress-bar');
        
        if (verifiedProgressBar) {
            const verifiedPercentage = TreeData.getVerifiedPercentage();
            verifiedProgressBar.style.width = verifiedPercentage + '%';
        }
        
        if (legacyProgressBar) {
            const legacyPercentage = TreeData.getLegacyPercentage();
            legacyProgressBar.style.width = legacyPercentage + '%';
        }
    }, 300);

    // Animate the total count with centralized data
    const totalElement = document.getElementById('total-count');
    const totalElementMobile = document.getElementById('total-count-mobile');
    const targetValue = TreeData.getTotalTrees();
    let currentValue = 0;
    const duration = 1000;
    const increment = targetValue / (duration / 16);

    function updateCount() {
        currentValue += increment;
        if (currentValue >= targetValue) {
            currentValue = targetValue;
            if (totalElement) totalElement.textContent = currentValue.toLocaleString();
            if (totalElementMobile) totalElementMobile.textContent = currentValue.toLocaleString();
            return;
        }
        const displayValue = Math.floor(currentValue).toLocaleString();
        if (totalElement) totalElement.textContent = displayValue;
        if (totalElementMobile) totalElementMobile.textContent = displayValue;
        requestAnimationFrame(updateCount);
    }

    setTimeout(updateCount, 500);
    
    document.querySelectorAll('.animate-slide-up').forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        setTimeout(() => {
            el.style.transition = 'all 0.6s ease-out';
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }, index * 100);
    });

    function setupSearch(searchId, tableId, dataClass) {
        const searchInput = document.getElementById(searchId);
        if (!searchInput) return;
        
        const rows = document.querySelectorAll(`${tableId} .${dataClass} tr`);
        const tbody = document.querySelector(`${tableId} .${dataClass}`);

        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            let visibleCount = 0;
            
            rows.forEach(row => {
                const text = row.textContent.toLowerCase();
                if (text.includes(searchTerm)) {
                    row.style.display = '';
                    visibleCount++;
                } else {
                    row.style.display = 'none';
                }
            });
            
            const existingMessage = tbody.querySelector('.no-results-message');
            if (existingMessage) {
                existingMessage.remove();
            }
            
            if (visibleCount === 0 && searchTerm.length > 0) {
                const noResultsRow = document.createElement('tr');
                noResultsRow.className = 'no-results-message';
                noResultsRow.innerHTML = `
                    <td colspan="3" class="py-12 text-center text-gray-500">
                        <div class="flex flex-col items-center space-y-2">
                            <svg class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                            </svg>
                            <p class="text-sm">No projects found matching "${searchTerm}"</p>
                            <p class="text-xs text-gray-400">Try adjusting your search terms</p>
                        </div>
                    </td>
                `;
                tbody.appendChild(noResultsRow);
            }
        });
    }

    function setupMobileSearch(searchId, cardsId) {
        const searchInput = document.getElementById(searchId);
        if (!searchInput) return;
        
        const cards = document.querySelectorAll(`#${cardsId} .mobile-data-card`);
        const cardsContainer = document.getElementById(cardsId);

        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            let visibleCount = 0;
            
            cards.forEach(card => {
                const searchData = card.getAttribute('data-search').toLowerCase();
                if (searchData.includes(searchTerm)) {
                    card.style.display = 'block';
                    visibleCount++;
                } else {
                    card.style.display = 'none';
                }
            });
            
            const existingMessage = cardsContainer.querySelector('.no-results-message');
            if (existingMessage) {
                existingMessage.remove();
            }
            
            if (visibleCount === 0 && searchTerm.length > 0) {
                const noResultsDiv = document.createElement('div');
                noResultsDiv.className = 'no-results-message mobile-data-card';
                noResultsDiv.innerHTML = `
                    <div class="text-center py-12 text-gray-500">
                        <div class="flex flex-col items-center space-y-2">
                            <svg class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                            </svg>
                            <p class="text-sm">No projects found matching "${searchTerm}"</p>
                            <p class="text-xs text-gray-400">Try adjusting your search terms</p>
                        </div>
                    </div>
                `;
                cardsContainer.appendChild(noResultsDiv);
            }
        });
    }

    setupSearch('verified-search', '#verified-table', 'verified-data');
    setupSearch('legacy-search', '#legacy-table', 'legacy-data');
    setupMobileSearch('verified-search-mobile', 'verified-mobile-cards');
    setupMobileSearch('legacy-search-mobile', 'legacy-mobile-cards');

    function setupSorting(tableId, dataClass) {
        const headers = document.querySelectorAll(`${tableId} th[data-sort]`);
        
        const tbody = document.querySelector(`${tableId} .${dataClass}`);
        const rows = Array.from(tbody.querySelectorAll('tr'));
        rows.sort((a, b) => {
            const cellIndex = dataClass === 'verified-data' ? 2 : 1;
            const aVal = parseInt(a.cells[cellIndex].textContent.replace(/,/g, ''));
            const bVal = parseInt(b.cells[cellIndex].textContent.replace(/,/g, ''));
            return bVal - aVal;
        });
        tbody.innerHTML = '';
        rows.forEach(row => tbody.appendChild(row));
        
        headers.forEach(header => {
            header.addEventListener('click', () => {
                const sortKey = header.getAttribute('data-sort');
                const tbody = document.querySelector(`${tableId} .${dataClass}`);
                const rows = Array.from(tbody.querySelectorAll('tr'));
                
                const isNumeric = sortKey === 'trees';
                const currentState = header.getAttribute('data-sort-state') || 'none';
                
                let newState, isAscending;
                if (currentState === 'none' || currentState === 'desc') {
                    newState = 'asc';
                    isAscending = true;
                } else {
                    newState = 'desc';
                    isAscending = false;
                }
                
                headers.forEach(h => {
                    h.classList.remove('sort-desc', 'sort-asc', 'sort-none');
                    h.setAttribute('data-sort-state', 'none');
                    const arrow = h.querySelector('.text-xs');
                    if (arrow) arrow.textContent = '↕';
                });
                
                rows.sort((a, b) => {
                    let aVal, bVal;
                    
                    if (sortKey === 'forest' || sortKey === 'partner') {
                        aVal = a.cells[0].textContent.trim();
                        bVal = b.cells[0].textContent.trim();
                    } else if (sortKey === 'country') {
                        aVal = a.cells[1].textContent.trim();
                        bVal = b.cells[1].textContent.trim();
                    } else if (sortKey === 'trees') {
                        const cellIndex = dataClass === 'verified-data' ? 2 : 1;
                        aVal = parseInt(a.cells[cellIndex].textContent.replace(/,/g, ''));
                        bVal = parseInt(b.cells[cellIndex].textContent.replace(/,/g, ''));
                    }
                    
                    if (isNumeric) {
                        return isAscending ? aVal - bVal : bVal - aVal;
                    } else {
                        return isAscending ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
                    }
                });
                
                tbody.innerHTML = '';
                rows.forEach(row => tbody.appendChild(row));
                
                header.classList.add(newState === 'asc' ? 'sort-asc' : 'sort-desc');
                header.setAttribute('data-sort-state', newState);
                
                const arrow = header.querySelector('.text-xs');
                if (arrow) {
                    arrow.textContent = newState === 'asc' ? '↑' : '↓';
                }
            });
        });
    }

    setupSorting('#verified-table', 'verified-data');
    setupSorting('#legacy-table', 'legacy-data');
});

function animateImpactMetrics() {
    animateNumber('co2-simple', 0, TreeData.getCo2Captured(), 0, '');
    animateNumber('species-count', 0, TreeData.getSpeciesCount(), 0, '');
}

function animateNumber(elementId, start, end, decimals, suffix) {
    const element = document.getElementById(elementId);
    const duration = 2000;
    const startTime = performance.now();
    
    function updateNumber(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const current = start + (end - start) * progress;
        
        if (decimals > 0) {
            element.textContent = current.toFixed(decimals) + suffix;
        } else {
            element.textContent = Math.floor(current).toLocaleString() + suffix;
        }
        
        if (progress < 1) {
            requestAnimationFrame(updateNumber);
        }
    }
    
    requestAnimationFrame(updateNumber);
}

document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        animateImpactMetrics();
    }, 1500);
});

document.addEventListener('keydown', function(e) {
    if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        const currentActive = document.querySelector('.tab-button.text-brand-green, .tab-button.text-yellow-700');
        if (currentActive) {
            const newTab = e.key === 'ArrowLeft' ? 'verified' : 'legacy';
            if (currentActive.id !== newTab + '-tab') {
                switchTab(newTab);
            }
        }
    }
});
