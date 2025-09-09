const plantingData = {
  MG: { centroid: [-18.77, 46.87], type: 'confirmed', sites: [
    'Eden Reforestation Projects',
    'Kandrany 1', 'Akalamboro', 'Ampasimarine', 'Akalamboro Dry Deciduous',
    'Analamandreky', 'Ankarafantsika', 'Antsanitia Dry Deciduous',
    'Antanamarina', 'Antsanitia Mangrove', 'Aranta', 'Akotorery',
    'Farabe Lighthouse', 'Mahabana', 'Mariarano', 'Mataitraomby',
    'Mbararata', 'Namakia', 'Morangobe', 'Papamena 1', 'Sakoany', 'RN4',
    'Papamena 2', 'Vilamatsa', 'Marotaola', 'Ambonio 1', 'Boanamary 1',
    'Ankalahila Mangrove', 'Bemangoraka 1', 'Bestiboka Island 1',
    'Marotia 1', 'Bestiboka River – Island 2', 'Ambonio 2'
  ]},

  NP: { centroid: [28.39, 84.12], type: 'confirmed', sites: [
    'Eden Reforestation Projects',
    'Amaltari','Attarpur','Bachhauli','Bhadaure','Boch','Budhi Rapti',
    'Chetnagar','Deurali','Deuralitar','Dolansa','Hindi','Indrawati',
    'Jodhipur','Kamal Dhaap','Karthali','Lamahi','Lape','Lawati',
    'Laxmisthan','Mude','Paschim Deurali','Pokhara','Prasauni','Udayapur',
    'Ruchang','Shaktikhor','Sildhunga','Sirujhar','Sundarpur'
  ]},

  KE: { centroid: [-0.02, 37.91], type: 'confirmed', sites: [
    'Bore',
    'Save the Aberdare Forest',
    'Swahili Coast Mangrove Restoration',
    'Kilifi','Kiongwe','Kipini','Kwasasi/Magumba','Manda – Matondoni',
    'Manda Uwanjani','Marerenni & Kurawa','Mida Creek',
    'Milihoi/Kichwa cha Nyoka','Mokowe Mama','Mtwapa Creek','Mwamdudu',
    'Ngomeni','Pate Island','Port Reitz','Tsunza','Tudor Creek',
    'Amu Ranch Cut Line','Big Fig','Gatamaiyu','Gwasi','Imenti Forest',
    'Kass FM','Kenton Planting Site','Kitiligini','Monkey Corner',
    'Monkey Corner Expansion','Ngaya','Nyambene','Ol Mariko',
    'Old Kijabe Town – Arbor Day','Old Kijabe Town – Aspiration 1',
    'Old Kijabe Town – Aspiration 2','Old Kijabe Town – Verizon',
    'Olokurto','Turasha'
  ]},

  TZ: { centroid: [-6.37, 34.89], type:'confirmed', sites: [
    'Usambara Biodiversity Conservation',
    'Mlola Biodiversity Restoration', 
    'Replanting the burnt Mkussu Forest',
    'Plant to Stop Poverty'
  ]},
  UG: { centroid: [1.37, 32.29], type:'confirmed', sites: [
    'Preservation of Mt. Elgon Ecosystem',
    'Forest Gardens - Mount Elgon Region'
  ]},
  US: { centroid: [39.83,-98.58], type:'confirmed', sites: [
    'Lost Forests Recovery in California',
    'National Forest Recovery'
  ]},
  IN: { centroid: [20.59, 78.96], type:'confirmed', sites: [
    'Trees for Tribals',
    'Trees for Tigers'
  ]},
  
  SN: { centroid: [14.50,-14.45], type:'confirmed', sites: [
    'Forest Garden Program',
    'Senegal (additional sites - still gathering data)'
  ]},
  CM: { centroid: [7.37, 12.35], type:'confirmed', sites: [
    'Cocoa Farmer Agroforestry',
    'Cameroon (additional sites - still gathering data)'
  ]},
  MZ: { centroid: [-18.67,35.53], type:'partner',   sites:['Mozambique (partner)']},
  CF: { centroid: [ 6.61,20.94], type:'partner',   sites:['Central African Republic (partner)']},
  LA: { centroid: [19.86,102.50],type:'partner',   sites:['Laos (partner)']},
  CD: { centroid: [-4.04,21.76], type:'partner',   sites:['DR Congo (partner)']},
  TH: { centroid: [15.87,100.99],type:'partner',   sites:['Thailand (partner)']},
  PE: { centroid: [ -9.19,-75.02],type:'partner',  sites:['Peru (partner)']},
  ID: { centroid: [ -0.79,113.92],type:'confirmed',  sites: [
    'Community Reforestation in Java',
    'Biak Island - Korem (Refoorest partner)',
    'Biak Island - Mnurwar (Refoorest partner)', 
    'Biak Island - Padaidori (Refoorest partner)',
    'Numfor Island - Bawei (Refoorest partner)',
    'Numfor Island - Kameri (Refoorest partner)',
    'Yapen Island - Woinap (Refoorest partner)',
    'Yapen Island - Ansus (Refoorest partner)'
  ]},
  
  HT: { centroid: [18.97, -72.29], type:'partner', sites:['Refoorest partner (legacy)']},
  HN: { centroid: [15.20, -86.24], type:'partner', sites:['Refoorest partner (legacy)']},
  NI: { centroid: [12.87, -85.21], type:'partner', sites:['Refoorest partner (legacy)']}
};

const countryName = {
  MG: 'Madagascar',
  NP: 'Nepal',
  KE: 'Kenya',
  TZ: 'Tanzania',
  UG: 'Uganda',
  SN: 'Senegal',
  US: 'United States',
  CM: 'Cameroon',
  IN: 'India',
  MZ: 'Mozambique',
  CF: 'Central African Republic',
  LA: 'Laos',
  CD: 'DR Congo',
  TH: 'Thailand',
  PE: 'Peru',
  ID: 'Indonesia',
  HT: 'Haiti',
  HN: 'Honduras',
  NI: 'Nicaragua'
};

function countLabel(arr) {
  if (Array.isArray(arr) && arr.length > 1) {
    return `${arr.length} planting site${arr.length === 1 ? '' : 's'}`;
  }
  return 'site count pending';
}

function initializeMap() {
  const map = L.map('map', { scrollWheelZoom: true }).setView([11, 16], 2);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    { attribution: '&copy; OpenStreetMap contributors' }
  ).addTo(map);

  const clusterGroup = L.markerClusterGroup();

  Object.entries(plantingData).forEach(([cc, cfg]) => {
    const [lat, lng] = cfg.centroid;

    const marker = L.circleMarker([lat, lng], {
      radius: 7,
      color: cfg.type === 'confirmed' ? '#16a34a' : '#ca8a04',
      weight: 2,
      fillOpacity: 0.9
    });

    const title = `${countryName[cc] || cc} (${countLabel(cfg.sites)})`;

    const popupHTML = `
      <div class="popup-h1">${title}</div>
      <div class="text-xs">
        ${cfg.type === 'confirmed'
          ? '<span class="text-green-700 font-semibold">Confirmed</span>'
          : `<span class="text-yellow-700 font-semibold">${cfg.sites[0]}</span>`
        }<br>
        Country code: <b>${cc}</b>
      </div>
    `;

    marker.bindPopup(popupHTML);
    clusterGroup.addLayer(marker);
  });

  clusterGroup.addTo(map);
  return map;
}

function renderSiteLists() {
  const siteLists = document.getElementById('site-lists');

  Object.entries(plantingData)
    .sort((a, b) => {
      const aHas = a[1].sites.length > 1;
      const bHas = b[1].sites.length > 1;
      return (aHas === bHas) ? 0 : (aHas ? -1 : 1);
    })
    .forEach(([cc, cfg]) => {
      const name = countryName[cc] || cc;
      const hasList = Array.isArray(cfg.sites) && cfg.sites.length > 1;

      const details = document.createElement('details');
      details.className = 'site-accordion border border-gray-200 rounded-xl bg-white shadow-sm hover:shadow-md transition-all duration-200';

      const summary = document.createElement('summary');
      summary.className = 'cursor-pointer px-6 py-4 font-medium flex items-center justify-between text-deep-forest hover:bg-gray-50 rounded-xl transition-colors duration-200';
      summary.innerHTML = `
        <div class="flex items-center gap-3">
          <div class="w-3 h-3 rounded-full ${cfg.type==='confirmed' ? 'bg-brand-green' : 'bg-legacy-gold'}"></div>
          <span class="text-lg">${name}</span>
          <span class="text-sm text-gray-500">— ${hasList ? `${cfg.sites.length} site${cfg.sites.length===1?'':'s'}` : 'site count pending'}</span>
        </div>
        <div class="flex items-center gap-3">
          <span class="text-xs px-3 py-1 rounded-full font-medium ${cfg.type==='confirmed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}">
            ${cfg.type==='confirmed' ? 'Confirmed' : 'Partner'}
          </span>
          <svg class="w-5 h-5 text-gray-400 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
          </svg>
        </div>
      `;

      details.appendChild(summary);

      const body = document.createElement('div');
      body.className = 'px-6 pb-6 pt-2 border-t border-gray-100';

      if (hasList) {
        const ul = document.createElement('ul');
        ul.className = 'grid grid-cols-1 md:grid-cols-2 gap-2 text-sm';
        cfg.sites.forEach(s => {
          const li = document.createElement('li');
          li.className = 'flex items-center gap-2 text-gray-700';
          li.innerHTML = `
            <div class="w-1.5 h-1.5 rounded-full bg-brand-green flex-shrink-0"></div>
            <span>${s}</span>
          `;
          ul.appendChild(li);
        });
        body.appendChild(ul);
      } else {
        const p = document.createElement('p');
        p.className = 'text-sm text-gray-600 italic';
        p.textContent = 'Full site list not yet available.';
        body.appendChild(p);
      }

      details.appendChild(body);
      siteLists.appendChild(details);
    });
}

function initializeMobileMenu() {
  const toggleBtn = document.getElementById('mobile-menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  const closeBtn = document.getElementById('mobile-menu-close');
  
  function toggleMenu() {
    const isOpen = !mobileMenu.classList.contains('hidden');
    mobileMenu.classList.toggle('hidden');
    document.documentElement.style.overflow = isOpen ? '' : 'hidden';
    document.body.style.overflow = isOpen ? '' : 'hidden';
    toggleBtn.setAttribute('aria-expanded', String(!isOpen));
  }
  
  if (toggleBtn && mobileMenu) {
    toggleBtn.addEventListener('click', toggleMenu);
  }
  if (closeBtn) {
    closeBtn.addEventListener('click', toggleMenu);
  }
}

document.addEventListener('DOMContentLoaded', function() {
  initializeMap();
  renderSiteLists();
  initializeMobileMenu();
});
