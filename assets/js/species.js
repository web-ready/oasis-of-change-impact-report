function initializeSpeciesData() {
    if (typeof TreeData !== 'undefined') {
        const speciesData = TreeData.getSpeciesData();
        
        const speciesCountElement = document.getElementById('species-count-display');
        if (speciesCountElement) {
            speciesCountElement.textContent = `${speciesData.totalSpecies} Species Combinations`;
        }
        
        console.log('Species data loaded:', speciesData);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    initializeSpeciesData();
    
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

    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', function () {
            document.querySelectorAll('.filter-btn').forEach(b => {
                b.classList.remove('active', 'bg-brand-green', 'text-white', 'border-brand-green');
                b.classList.add('bg-white', 'text-gray-700', 'border-gray-300');
            });
            this.classList.add('active', 'bg-brand-green', 'text-white', 'border-brand-green');
            this.classList.remove('bg-white', 'text-gray-700', 'border-gray-300');
        });
    });

    const filterBtns = document.querySelectorAll('.filter-btn');
    const speciesCards = document.querySelectorAll('.species-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            filterBtns.forEach(b => {
                b.classList.remove('active', 'bg-brand-green', 'text-white');
                b.classList.add('border-gray-300', 'text-gray-600');
            });

            this.classList.add('active', 'bg-brand-green', 'text-white');
            this.classList.remove('border-gray-300', 'text-gray-600');

            const filter = this.getAttribute('data-filter');

            speciesCards.forEach(card => {
                if (filter === 'all' || card.getAttribute('data-category') === filter) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
});
