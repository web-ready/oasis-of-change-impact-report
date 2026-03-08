function certificatePath(filename) {
    return 'assets/certificates/' + filename.split('/').map(encodeURIComponent).join('/');
}

function downloadCertificate(certificateId) {
    if (typeof TreeData === 'undefined') {
        console.error('[Oasis Certificates] TreeData not loaded');
        return;
    }
    
    const certificate = TreeData.getCertificates().find(cert => cert.id === certificateId);
    if (certificate) {
        const filePath = certificatePath(certificate.filename);
        const link = document.createElement('a');
        link.href = filePath;
        link.download = certificate.filename.split('/').pop() || 'certificate.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    } else {
        console.warn('[Oasis Certificates] Certificate not found:', certificateId);
        alert(`Certificate ${certificateId} not found.`);
    }
}

function populateCertificates(filterValue) {
    if (typeof TreeData === 'undefined') {
        console.error('[Oasis Certificates] TreeData not loaded');
        return;
    }
    
    const container = document.getElementById('certificates-container');
    if (!container) return;
    
    let certificates = [...TreeData.getCertificates()]
        .filter(cert => filterValue === 'all' || cert.category === filterValue)
        .sort((a, b) => (b.trees || 0) - (a.trees || 0));
    
    container.innerHTML = '';
    
    certificates.forEach(certificate => {
        const certificateCard = document.createElement('div');
        certificateCard.className = 'certificate-card';
        const filePath = certificatePath(certificate.filename);
        const treesDisplay = certificate.trees > 0 ? certificate.trees.toLocaleString() : '—';
        const co2Display = certificate.co2Offset > 0 ? certificate.co2Offset.toLocaleString() + ' kg' : '—';
        certificateCard.innerHTML = `
            <div class="space-y-4">
                <div>
                    <h3 class="text-lg font-semibold text-deep-forest mb-3">${certificate.title}</h3>
                    ${certificate.fyNote ? `<p class="text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded px-2 py-1.5 mb-2">${certificate.fyNote}</p>` : ''}
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-gray-600">
                        <p><strong>Certificate:</strong> ${certificate.certificate}</p>
                        <p><strong>Location:</strong> ${certificate.location}</p>
                        <p><strong>Trees Planted:</strong> ${treesDisplay}</p>
                        <p><strong>CO2 Offset:</strong> ${co2Display}</p>
                        <p class="sm:col-span-2"><strong>Date:</strong> ${certificate.date}</p>
                    </div>
                </div>
                <div class="pt-1 flex flex-wrap gap-3">
                    <a href="${filePath}" target="_blank" rel="noopener noreferrer" class="download-btn">
                        <svg xmlns="http://www.w3.org/2000/svg" class="download-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                        </svg>
                        <span>View PDF</span>
                    </a>
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
    if (typeof console !== 'undefined' && console.log) console.log('[Oasis Certificates] Ready');
    populateCertificates('all');
    
    const filterBtns = document.querySelectorAll('.cert-filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            populateCertificates(this.getAttribute('data-filter'));
        });
    });
    
    document.addEventListener('click', function(e) {
        if (e.target.closest('.download-btn')) {
            const button = e.target.closest('.download-btn');
            button.style.transform = 'scale(0.95)';
            setTimeout(() => {
                button.style.transform = '';
            }, 150);
        }
    });
});
