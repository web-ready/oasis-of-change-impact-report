function scrollToDetails() {
    document.getElementById('detailed-info').scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
    });
}

function downloadCertificate(certificateId) {
    const certificatePaths = {
        'web-ready-2025-madagascar': 'assets/certificates/Web-Ready/2025 Planting/2025-02-26_Web-Ready-Planting_Eden-Reforestation_Madagascar_675-Trees-33750kg-CO2.pdf',
        'spes-2024-tanzania': 'assets/certificates/Stanley Park Ecology Society (SPES)/2024-01-26_Stanley-Park-Ecology-Society_Usambara-Biodiversity_Tanzania_100-Trees-15000kg-CO2.pdf.pdf',
        'sustainable-www-2023-tanzania-1': 'assets/certificates/Sustainable WWW/2023-12-29_Sustainable-WWW_Usambara-Biodiversity_Tanzania_50-Trees-6000kg-CO2.pdf.pdf',
        'sustainable-www-2023-tanzania-2': 'assets/certificates/Sustainable WWW/2023-12-29_Sustainable-WWW_Usambara-Biodiversity_Tanzania_50-Trees-7500kg-CO2.pdf.pdf',
        'mst-2024-tanzania': 'assets/certificates/Mittler Senior Technology (MST)/2024-01-17_Mittler-Senior-Technology_Usambara-Biodiversity_Tanzania_100-Trees-15000kg-CO2.pdf.pdf',
        'ecosearch-2024-madagascar': 'assets/certificates/EcoSearch/2024-06-26_EcoSearch_Eden-Reforestation_Madagascar_100-Trees-5000kg-CO2.pdf.pdf'
    };
    
    const filePath = certificatePaths[certificateId];
    if (filePath) {
        const link = document.createElement('a');
        link.href = filePath;
        link.download = filePath.split('/').pop();
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    } else {
        alert(`Certificate ${certificateId} not found.`);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const downloadButtons = document.querySelectorAll('.download-btn');
    
    downloadButtons.forEach(button => {
        button.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });

    const toggleBtn = document.getElementById('mobile-menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const closeBtn = document.getElementById('mobile-menu-close');
    if (toggleBtn && mobileMenu) {
        const toggleMenu = () => {
            const isOpen = !mobileMenu.classList.contains('hidden');
            mobileMenu.classList.toggle('hidden');
            document.documentElement.style.overflow = isOpen ? '' : 'hidden';
            document.body.style.overflow = isOpen ? '' : 'hidden';
            toggleBtn.setAttribute('aria-expanded', String(!isOpen));
        };
        toggleBtn.addEventListener('click', toggleMenu);
        if (closeBtn) closeBtn.addEventListener('click', toggleMenu);
    }
});
