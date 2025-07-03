<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <title>Tree-Planting Locations</title>

  <!-- Tailwind for quick styling (optional) -->
  <link href="https://cdn.jsdelivr.net/npm/tailwindcss@^2/dist/tailwind.min.css" rel="stylesheet" />

  <!-- Leaflet & MarkerCluster -->
  <link
    rel="stylesheet"
    href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
    integrity="sha512-sA+e3r0u1j3JY+gEwHIcN2eHn9VuDiTMS1i/gXo6upItQ1DkBNwP1x0ZeAKYc5mR9fRXp1RZZYUpGYeGzuUkxw=="
    crossorigin=""
  />
  <link
    rel="stylesheet"
    href="https://unpkg.com/leaflet.markercluster@1.5.3/dist/MarkerCluster.Default.css"
  />
  <style>
    #map       { height: 540px; }
    .popup-h1  { font-weight: 600; font-size: 1rem; margin-bottom: .25rem; }
  </style>
</head>

<body class="bg-gray-50 p-6">
  <h1 class="text-2xl font-bold mb-4">Tree-Planting Locations (Site-Level)</h1>
  <div id="map" class="w-full rounded-lg shadow-lg border"></div>

  <!-- JS libs -->
  <script
    src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"
    integrity="sha512-GZC+gGvunG8Mlnk6CrlOnqmtRXpbeew3zaVmo0BQVvktNaiJgH7YAyz3y80PRz0WlXW9pHUjF4/wWcT6hni2Vg=="
    crossorigin=""
  ></script>
  <script src="https://unpkg.com/leaflet.markercluster@1.5.3/dist/leaflet.markercluster.js"></script>

  <script>
    /* ---------- source data (trimmed for brevity) ---------- */
    const plantingData = {
      /* countryCode : { centroid:[lat,lng], type:'confirmed'|'partner', sites:[...] } */

      MG: { centroid: [-18.77, 46.87], type: 'confirmed', sites: [
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
        'Amaltari','Attarpur','Bachhauli','Bhadaure','Boch','Budhi Rapti',
        'Chetnagar','Deurali','Deuralitar','Dolansa','Hindi','Indrawati',
        'Jodhipur','Kamal Dhaap','Karthali','Lamahi','Lape','Lawati',
        'Laxmisthan','Mude','Paschim Deurali','Pokhara','Prasauni','Udayapur',
        'Ruchang','Shaktikhor','Sildhunga','Sirujhar','Sundarpur'
      ]},

      KE: { centroid: [-0.02, 37.91], type: 'confirmed', sites: [
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

      /* countries without explicit site arrays → single marker */
      TZ: { centroid: [-6.37, 34.89], type:'confirmed', sites:['Tanzania (sites TBD)']},
      SN: { centroid: [14.50,-14.45], type:'confirmed', sites:['Senegal (sites TBD)']},
      US: { centroid: [39.83,-98.58], type:'confirmed', sites:['United States (sites TBD)']},
      CM: { centroid: [7.37, 12.35], type:'confirmed', sites:['Cameroon (sites TBD)']},
      IN: { centroid: [20.59, 78.96], type:'confirmed', sites:['India (sites TBD)']},
      MZ: { centroid: [-18.67,35.53], type:'partner',   sites:['Mozambique (partner)']},
      CF: { centroid: [ 6.61,20.94], type:'partner',   sites:['Central African Republic (partner)']},
      LA: { centroid: [19.86,102.50],type:'partner',   sites:['Laos (partner)']},
      CD: { centroid: [-4.04,21.76], type:'partner',   sites:['DR Congo (partner)']},
      TH: { centroid: [15.87,100.99],type:'partner',   sites:['Thailand (partner)']},
      PE: { centroid: [ -9.19,-75.02],type:'partner',  sites:['Peru (partner)']},
      ID: { centroid: [ -0.79,113.92],type:'partner',  sites:['Indonesia (partner)']}
    };

    /* ---------- helper to jitter sites around centroid ---------- */
    function randomOffset(d = 0.8) {     // ±0.8°
      return (Math.random() - 0.5) * d;
    }

    /* ---------- set up leaflet map ---------- */
    const map = L.map('map', { scrollWheelZoom:true }).setView([11, 16], 2);

    L.tileLayer(
      'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      { attribution: '&copy; OpenStreetMap contributors' }
    ).addTo(map);

    const clusterGroup = L.markerClusterGroup();

    /* ---------- create a marker per site ---------- */
    Object.entries(plantingData).forEach(([cc, cfg]) => {
      const [lat0, lng0] = cfg.centroid;

      cfg.sites.forEach(siteName => {
        // jitter so overlapping sites separate visually
        const lat = lat0 + randomOffset();
        const lng = lng0 + randomOffset();

        const marker = L.circleMarker([lat, lng], {
          radius: 5,
          color: cfg.type === 'confirmed' ? '#16a34a' : '#ca8a04',
          weight: 1,
          fillOpacity: 0.9
        });

        const popupHTML = `
          <div class="popup-h1">${siteName}</div>
          <div class="text-xs">
            ${cfg.type === 'confirmed'
              ? '<span class="text-green-700 font-semibold">Confirmed site</span>'
              : '<span class="text-yellow-700 font-semibold">Partner / legacy region</span>'
            }<br>
            Country: <b>${cc}</b>
          </div>
        `;

        marker.bindPopup(popupHTML);
        clusterGroup.addLayer(marker);
      });
    });

    clusterGroup.addTo(map);
  </script>
</body>
</html>
