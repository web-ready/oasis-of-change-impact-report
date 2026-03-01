function scrollToDetails() {
    document.getElementById('detailed-info').scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
    });
}

function downloadCertificate(certificateId) {
    if (typeof TreeData === 'undefined') {
        console.error('TreeData not loaded');
        return;
    }
    
    const certificate = TreeData.getCertificates().find(cert => cert.id === certificateId);
    if (certificate) {
        const filePath = `assets/certificates/${certificate.filename}`;
        const link = document.createElement('a');
        link.href = filePath;
        link.download = certificate.filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    } else {
        alert(`Certificate ${certificateId} not found.`);
    }
}

function populateCertificates() {
    if (typeof TreeData === 'undefined') {
        console.error('TreeData not loaded');
        return;
    }
    
    const container = document.getElementById('certificates-container');
    if (!container) return;
    
    container.innerHTML = '';
    
    TreeData.getCertificates().forEach(certificate => {
        const certificateCard = document.createElement('div');
        certificateCard.className = 'certificate-card';
        certificateCard.innerHTML = `
            <div class="space-y-4">
                <div>
                    <h3 class="text-lg font-semibold text-deep-forest mb-3">${certificate.title}</h3>
                    ${certificate.fyNote ? `<p class="text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded px-2 py-1.5 mb-2">${certificate.fyNote}</p>` : ''}
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-gray-600">
                        <p><strong>Certificate:</strong> ${certificate.certificate}</p>
                        <p><strong>Location:</strong> ${certificate.location}</p>
                        <p><strong>Trees Planted:</strong> ${certificate.trees.toLocaleString()}</p>
                        <p><strong>CO2 Offset:</strong> ${certificate.co2Offset.toLocaleString()} kg</p>
                        <p class="sm:col-span-2"><strong>Date:</strong> ${certificate.date}</p>
                    </div>
                </div>
                <div class="pt-1">
                    <button class="download-btn" onclick="downloadCertificate('${certificate.id}')">
                        <svg xmlns="http://www.w3.org/2000/svg" class="download-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                        </svg>
                        <span>Download PDF</span>
                    </button>
                </div>
            </div>
        `;
        container.appendChild(certificateCard);
    });
}

document.addEventListener('DOMContentLoaded', function() {
    populateCertificates();
    
    document.addEventListener('click', function(e) {
        if (e.target.closest('.download-btn')) {
            const button = e.target.closest('.download-btn');
            button.style.transform = 'scale(0.95)';
            setTimeout(() => {
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
