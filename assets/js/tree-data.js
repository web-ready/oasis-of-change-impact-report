const TreeData = {

    lastUpdated: "March 7th, 2026",

    /* ────────────────────────────────────────────────
       TOTALS  (synced with Tree-Nation API – March 7, 2026)
       Web-Ready Forest = 8,068  (Oasis-funded 7,819 + Historical 70 + Seeds/other 179)
       Partners         = 628    (SPES 233 + SWWW 170 + MST 124 + EcoSearch 101)
       Verified         = 8,068 + 628  = 8,696
       Legacy           = 7,338        (Tero 4,567 + Refoorest 2,771)
       Total            = 8,696 + 7,338 = 16,034
       ──────────────────────────────────────────────── */
    totals: {
        webReadyTrees: 8068,    // full Tree-Nation count for web-ready forest
        verifiedTrees: 8696,    // Web-Ready (8,068) + Partners (628)
        legacyTrees:   7338,    // Tero 4,567 + Refoorest 2,771
        totalTrees:    16034,   // verified + legacy
        goalTrees:     10000
    },


    /* ────────────────────────────────────────────────
       VERIFIED PLANTING SITES  (Oasis-funded, via Tree-Nation)
       2024-2025 FY: 675 trees   |   2025-2026 FY: 7,144 trees
       Subtotal: 7,819 trees
       ──────────────────────────────────────────────── */
    verifiedProjects: [

        // ── 2024-2025 FY ──
        { id: "madagascar-eden",  name: "Eden Reforestation Projects",      location: "Madagascar",           trees: 675,  co2Offset: 33750,  fy: "2024-2025", fundingStream: "CORE",              species: "Rhizophora mucronata",      url: "https://tree-nation.com/projects/eden-reforestation-madagascar" },

        // ── 2025-2026 FY ──
        { id: "tanzania-mkussu",  name: "Replanting the burnt Mkussu Forest", location: "Tanzania",           trees: 7057, co2Offset: 352850, fy: "2025-2026", fundingStream: "CORE",              species: "Afrocarpus usambarensis",   url: "https://tree-nation.com/projects/replanting-the-burnt-mkussu-forest" },
        { id: "canada-boreal",    name: "Boreal Forest Habitat Restoration",  location: "Canada",             trees: 62,   co2Offset: 3100,   fy: "2025-2026", fundingStream: "GOV. GRANT + PILOT", species: "Pinus banksiana",           url: "https://tree-nation.com/projects/boreal-forest-habitat-restauration-canada" },
        { id: "mexico-restoration", name: "Restoration and Social Empowerment", location: "Mexico",           trees: 3,    co2Offset: 60,     fy: "2025-2026", fundingStream: "PILOT",             species: "Prosopis laevigata",        url: "https://tree-nation.com/projects/restoration-and-social-empowerment-mexico" },
        { id: "bolivia-amazon",   name: "Amazon Windshields",                 location: "Bolivia",            trees: 2,    co2Offset: 1000,   fy: "2025-2026", fundingStream: "PILOT",             species: "Ceiba speciosa",            url: "https://tree-nation.com/projects/ketrawe-bolivia" },
        { id: "nigeria-ala",      name: "Restoration of Ala Forest Reserve",  location: "Nigeria",            trees: 2,    co2Offset: 500,    fy: "2025-2026", fundingStream: "PILOT",             species: "Acacia mangium",            url: "https://tree-nation.com/projects/restoration-of-ala-forest-reserve" },
        { id: "brazil-amazon",    name: "Reforest the Amazon Basin",          location: "Brazil",             trees: 2,    co2Offset: 500,    fy: "2025-2026", fundingStream: "PILOT",             species: "Schizolobium amazonicum",   url: "https://tree-nation.com/projects/amazonia-rioterra-brazil" },
        { id: "romania-bear",     name: "Bear Groves in Transylvania",        location: "Romania",            trees: 2,    co2Offset: 300,    fy: "2025-2026", fundingStream: "PILOT",             species: "Fagus sylvatica",           url: "https://tree-nation.com/projects/climate-smart-forests-transylvania" },
        { id: "zimbabwe-reforest", name: "Zimbabwe Reforestation Initiative", location: "Zimbabwe",           trees: 2,    co2Offset: 100,    fy: "2025-2026", fundingStream: "PILOT",             species: "Mangifera indica",          url: "https://tree-nation.com/projects/zimbabwe-reforestation-initiative" },
        { id: "ireland-community", name: "Ireland Community Tree Planting",   location: "County Clare, Ireland", trees: 2, co2Offset: 200,    fy: "2025-2026", fundingStream: "PILOT",             species: "Quercus petraea",           url: "https://tree-nation.com/projects/ireland-community-tree-planting" },
        { id: "argentina-bosques", name: "Bosques de Agua",                   location: "Argentina",          trees: 2,    co2Offset: 40,     fy: "2025-2026", fundingStream: "PILOT",             species: "Polylepis australis",       url: "https://tree-nation.com/projects/bosques-de-agua" },
        { id: "france-restauration", name: "Restauration Forêts dégradées",   location: "France",             trees: 2,    co2Offset: 20,     fy: "2025-2026", fundingStream: "PILOT",             species: "Pinus nigra",               url: "https://tree-nation.com/projects/reboisement-grand-est" },
        { id: "australia-big-scrub", name: "Big Scrub Rainforest Restoration", location: "Australia",          trees: 2,    co2Offset: 40,     fy: "2025-2026", fundingStream: "PILOT",             species: "Solanum aviculare",         url: "https://tree-nation.com/projects/big-scrub-rainforest-australia" },
        { id: "uk-community",     name: "Community Tree Planting",            location: "United Kingdom",     trees: 2,    co2Offset: 20,     fy: "2025-2026", fundingStream: "PILOT",             species: "Prunus spinosa",            url: "https://tree-nation.com/projects/uk-community-tree-planting" },
        { id: "spain-alvelal",    name: "Alvelal",                            location: "Spain",              trees: 2,    co2Offset: 20,     fy: "2025-2026", fundingStream: "PILOT",             species: "Pistacia lentiscus",        url: "https://tree-nation.com/projects/alvelal" },

        // ── Historical (verified on Tree-Nation, before incorporation) ──
        { id: "nepal-eden-historical", name: "Eden Reforestation Projects", location: "Nepal",           trees: 60,  co2Offset: 10800, fy: "Historical", species: "Phyllanthus emblica", url: "https://tree-nation.com/projects/eden-reforestation-nepal" },
        { id: "usa-nfr-historical",     name: "National Forest Recovery",    location: "United States", trees: 10,  co2Offset: 150,   fy: "Historical", species: "Pinus strobus",       url: "https://tree-nation.com/projects/shoshone-national-forest-wyoming" }
    ],


    /* ────────────────────────────────────────────────
       Trees planted through partner organization accounts.
       Subtotal: 628 trees
       ──────────────────────────────────────────────── */
    verifiedPartners: [
        { id: "spes",            name: "Stanley Park Ecology Society", baseLocation: "Canada",        trees: 233, co2Tonnes: 21.49, countries: "Madagascar, Tanzania, Senegal, Kenya" },
        { id: "sustainable-www", name: "Sustainable WWW",          baseLocation: "Sweden",        trees: 170, co2Tonnes: 24.56, countries: "Tanzania, Kenya, Madagascar, Uganda, India, United States" },
        { id: "mst",             name: "Mittler Senior Technology",    baseLocation: "United States", trees: 124, co2Tonnes: 16.25, countries: "Tanzania, Senegal, Madagascar, Indonesia, Uganda, Nepal" },
        { id: "ecosearch",       name: "EcoSearch",                    baseLocation: "Canada",        trees: 101, co2Tonnes: 5.05,  countries: "Madagascar" }
    ],


    /* ────────────────────────────────────────────────
       LEGACY PARTNERS  (pre–Tree-Nation, fixed, tree counts only)
       Subtotal: 7,338 trees
       CO₂ data unavailable — unverified legacy sources
       ──────────────────────────────────────────────── */
    legacyProjects: [
        { id: "tero-partner",     name: "Tero Partner",     trees: 4567, date: "2023-2024", source: "Legacy Partner (Tero)" },
        { id: "refoorest-partner", name: "Refoorest Partner", trees: 2771, date: "2023-2024", source: "Legacy Partner (Refoorest)" }
    ],


    /* ────────────────────────────────────────────────
       CERTIFICATES
       Issued for batches of 50+ trees. Partner totals
       above may exceed certificate totals because
       additional trees are planted individually via
       Tree-Nation's Seeds game and are not separately
       certificated.
       ──────────────────────────────────────────────── */
    certificates: [
        // ── Historic ──
        { id: "nepal-eden-historical",        title: "Eden Reforestation (Nepal) — Historical",   certificate: "Eden Reforestation",   location: "Nepal",   trees: 60,  co2Offset: 10800, date: "June 18, 2023", category: "historic", fyNote: "Historical Planting", filename: "historical-plantings/2023-06-18_Eden-Reforestation_Nepal_60-Trees-10800kg-CO2.pdf" },
        { id: "usa-nfr-historical",           title: "National Forest Recovery (USA) — Historical", certificate: "Tree-Nation",         location: "United States", trees: 10, co2Offset: 150,  date: "May 13, 2023",  category: "historic", fyNote: "Historical Planting", filename: "historical-plantings/2023-05-13_National-Forest-Recovery_USA_10-Trees-150kg-CO2.pdf" },

        // ── 2024-2025 FY ──
        { id: "web-ready-2025-madagascar",     title: "Web-Ready Forest Restoration (Madagascar)", certificate: "Eden Reforestation",   location: "Madagascar", trees: 675, co2Offset: 33750, date: "February 26, 2025", category: "2024-2025", fyNote: "2024-2025 FY", filename: "2024-2025-fy/2025-02-26_Web-Ready-Planting_Eden-Reforestation_Madagascar_675-Trees-33750kg-CO2.pdf" },

        // ── 2025-2026 FY — Core & GOV Grant ──
        { id: "tanzania-2026-core",            title: "Replanting the burnt Mkussu Forest (Tanzania)", certificate: "Tree-Nation",        location: "Tanzania", trees: 7057, co2Offset: 352850, date: "2025-2026 FY", category: "2025-2026", fyNote: "2025-2026 FY", filename: "2025-2026-fy/Core/Tanzania_Planting_Proof.pdf" },
        { id: "gov-grant-contributions",       title: "Government Grant Contributions Summary",   certificate: "Tree-Nation",        location: "Multiple", trees: 52,  co2Offset: 2600,  date: "2025-2026 FY", category: "2025-2026", fyNote: "2025-2026 FY", filename: "2025-2026-fy/GOV-Grant/GOV-Grant-Contributions.pdf" },

        // ── 2025-2026 FY — Pilot (by country) ──
        { id: "canada-pilot-2026",             title: "Canada — Boreal Forest Habitat Restoration", certificate: "Tree-Nation",       location: "Canada",  trees: 10,  co2Offset: 500,   date: "2025-2026 FY", category: "2025-2026", fyNote: "2025-2026 FY", filename: "2025-2026-fy/Pilot/Canada/Canada_Planting_Proof.pdf" },
        { id: "argentina-pilot-2026",          title: "Argentina — Bosques de Agua",              certificate: "Tree-Nation",        location: "Argentina", trees: 2, co2Offset: 40,   date: "2025-2026 FY", category: "2025-2026", fyNote: "2025-2026 FY", filename: "2025-2026-fy/Pilot/Argentina/Argentina_Planting_Proof.pdf" },
        { id: "australia-pilot-2026",          title: "Australia — Big Scrub Rainforest Restoration", certificate: "Tree-Nation",     location: "Australia", trees: 2, co2Offset: 40,   date: "2025-2026 FY", category: "2025-2026", fyNote: "2025-2026 FY", filename: "2025-2026-fy/Pilot/Australia/Australia_Planting_Proof.pdf" },
        { id: "bolivia-pilot-2026",            title: "Bolivia — Amazon Windshields",            certificate: "Tree-Nation",        location: "Bolivia",  trees: 2,  co2Offset: 1000, date: "2025-2026 FY", category: "2025-2026", fyNote: "2025-2026 FY", filename: "2025-2026-fy/Pilot/Bolivia/Bolivia_Planting_Proof.pdf" },
        { id: "brazil-pilot-2026",             title: "Brazil — Reforest the Amazon Basin",     certificate: "Tree-Nation",        location: "Brazil",  trees: 2,  co2Offset: 500,  date: "2025-2026 FY", category: "2025-2026", fyNote: "2025-2026 FY", filename: "2025-2026-fy/Pilot/Brazil/Brazil_Planting_Proof.pdf" },
        { id: "france-pilot-2026",             title: "France — Restauration Forêts dégradées",  certificate: "Tree-Nation",        location: "France",  trees: 2,  co2Offset: 20,   date: "2025-2026 FY", category: "2025-2026", fyNote: "2025-2026 FY", filename: "2025-2026-fy/Pilot/France/France_Planting_Proof.pdf" },
        { id: "ireland-pilot-2026",            title: "Ireland — Community Tree Planting",      certificate: "Tree-Nation",        location: "County Clare, Ireland", trees: 2, co2Offset: 200, date: "2025-2026 FY", category: "2025-2026", fyNote: "2025-2026 FY", filename: "2025-2026-fy/Pilot/Ireland/Ireland_Planting_Proof.pdf" },
        { id: "mexico-pilot-2026",             title: "Mexico — Restoration and Social Empowerment", certificate: "Tree-Nation",     location: "Mexico",  trees: 3,  co2Offset: 60,   date: "2025-2026 FY", category: "2025-2026", fyNote: "2025-2026 FY", filename: "2025-2026-fy/Pilot/Mexico/Mexico_Planting_Proof.pdf" },
        { id: "nigeria-pilot-2026",            title: "Nigeria — Restoration of Ala Forest Reserve", certificate: "Tree-Nation",    location: "Nigeria", trees: 2,  co2Offset: 500,  date: "2025-2026 FY", category: "2025-2026", fyNote: "2025-2026 FY", filename: "2025-2026-fy/Pilot/Nigeria/Nigeria_Planting_Proof.pdf" },
        { id: "romania-pilot-2026",            title: "Romania — Bear Groves in Transylvania",   certificate: "Tree-Nation",        location: "Romania", trees: 2,  co2Offset: 300,  date: "2025-2026 FY", category: "2025-2026", fyNote: "2025-2026 FY", filename: "2025-2026-fy/Pilot/Romania/Romania_Planting_Proof.pdf" },
        { id: "spain-pilot-2026",               title: "Spain — Alvelal",                         certificate: "Tree-Nation",        location: "Spain",   trees: 2,  co2Offset: 20,   date: "2025-2026 FY", category: "2025-2026", fyNote: "2025-2026 FY", filename: "2025-2026-fy/Pilot/Spain/Spain_Planting_Proof.pdf" },
        { id: "uk-pilot-2026",                  title: "United Kingdom — Community Tree Planting", certificate: "Tree-Nation",       location: "United Kingdom", trees: 2, co2Offset: 20, date: "2025-2026 FY", category: "2025-2026", fyNote: "2025-2026 FY", filename: "2025-2026-fy/Pilot/United-Kingdom/United_Kingdom_Planting_Proof.pdf" },
        { id: "zimbabwe-pilot-2026",           title: "Zimbabwe — Reforestation Initiative",     certificate: "Tree-Nation",        location: "Zimbabwe", trees: 2, co2Offset: 100, date: "2025-2026 FY", category: "2025-2026", fyNote: "2025-2026 FY", filename: "2025-2026-fy/Pilot/Zimbabwe/Zimbabwe_Planting_Proof.pdf" },

        // ── Partners ──
        { id: "spes-2024-tanzania",            title: "Stanley Park Ecology Society (SPES)",       certificate: "Usambara Biodiversity", location: "Tanzania",   trees: 100, co2Offset: 15000, date: "January 26, 2024",  category: "partners", fyNote: "Partner Planting", filename: "Partners/Stanley Park Ecology Society (SPES)/2024-01-26_Stanley-Park-Ecology-Society_Usambara-Biodiversity_Tanzania_100-Trees-15000kg-CO2.pdf.pdf" },
        { id: "sustainable-www-2023-tanzania-1", title: "Sustainable WWW — Planting 1",            certificate: "Usambara Biodiversity", location: "Tanzania",   trees: 50,  co2Offset: 6000,  date: "December 29, 2023", category: "partners", fyNote: "Partner Planting", filename: "Partners/Sustainable WWW/2023-12-29_Sustainable-WWW_Usambara-Biodiversity_Tanzania_50-Trees-6000kg-CO2.pdf.pdf" },
        { id: "sustainable-www-2023-tanzania-2", title: "Sustainable WWW — Planting 2",            certificate: "Usambara Biodiversity", location: "Tanzania",   trees: 50,  co2Offset: 7500,  date: "December 29, 2023", category: "partners", fyNote: "Partner Planting", filename: "Partners/Sustainable WWW/2023-12-29_Sustainable-WWW_Usambara-Biodiversity_Tanzania_50-Trees-7500kg-CO2.pdf.pdf" },
        { id: "mst-2024-tanzania",             title: "Mittler Senior Technology (MST)",           certificate: "Usambara Biodiversity", location: "Tanzania",   trees: 100, co2Offset: 15000, date: "January 17, 2024",  category: "partners", fyNote: "Partner Planting", filename: "Partners/Mittler Senior Technology (MST)/2024-01-17_Mittler-Senior-Technology_Usambara-Biodiversity_Tanzania_100-Trees-15000kg-CO2.pdf.pdf" },
        { id: "ecosearch-2024-madagascar",     title: "EcoSearch",                                 certificate: "Eden Reforestation",   location: "Madagascar", trees: 100, co2Offset: 5000,  date: "June 26, 2024",     category: "partners", fyNote: "Partner Planting", filename: "Partners/EcoSearch/2024-06-26_EcoSearch_Eden-Reforestation_Madagascar_100-Trees-5000kg-CO2.pdf.pdf" }
    ],


    /* ────────────────────────────────────────────────
       MAP SITES  (drives Countries + Continents counts)
       Pre-incorporation: 60 trees Eden Reforestation (Nepal), 10 trees National Forest Recovery (USA), planted before Oasis of Change, Inc. was legally incorporated.
       ──────────────────────────────────────────────── */
    mapSites: [
        { id: "madagascar",  name: "Madagascar",  country: "Madagascar",  type: "mixed",     source: "Mixed Sources",             trees: 2525, lat: -16.272417, lng: 44.445938,   description: "Funded by Oasis of Change (2024-2025 FY), Stanley Park Ecology Society, Sustainable WWW, Mittler Senior Technology, EcoSearch (planting partners), and Refoorest (legacy partner).", note: "Eden Reforestation Projects was completed after the project reached full planting capacity. Oasis of Change redirected future allocations to new geographies.", noteLink: "/news.html#eden-completed" },
        { id: "tanzania",    name: "Tanzania",     country: "Tanzania",    type: "confirmed", source: "Tree-Nation",               trees: 7057, lat: -4.798667, lng: 38.290218, description: "2025-2026 FY — Replanting the burnt Mkussu Forest (CORE)" },
        { id: "canada",      name: "Canada",       country: "Canada",      type: "confirmed", source: "Tree-Nation",               trees: 62,   lat: 52.405426, lng: -98.917091, description: "2025-2026 FY — Boreal Forest Habitat Restoration" },
        { id: "bolivia",     name: "Bolivia",      country: "Bolivia",     type: "confirmed", source: "Tree-Nation",               trees: 2,    lat: -17.270603, lng: -62.805347, description: "2025-2026 FY — Amazon Windshields (PILOT)" },
        { id: "nigeria",     name: "Nigeria",      country: "Nigeria",     type: "confirmed", source: "Tree-Nation",               trees: 2,    lat: 7.550622, lng: 4.852035, description: "2025-2026 FY — Restoration of Ala Forest Reserve (PILOT)" },
        { id: "brazil",      name: "Brazil",       country: "Brazil",      type: "confirmed", source: "Tree-Nation",               trees: 2,    lat: -9.188258, lng: -63.175442, description: "2025-2026 FY — Reforest the Amazon Basin (PILOT)" },
        { id: "romania",     name: "Romania",      country: "Romania",     type: "confirmed", source: "Tree-Nation",               trees: 2,    lat: 46.168808, lng: 25.911007, description: "2025-2026 FY — Bear Groves in Transylvania (PILOT)" },
        { id: "zimbabwe",    name: "Zimbabwe",     country: "Zimbabwe",    type: "confirmed", source: "Tree-Nation",               trees: 2,    lat: -17.830269, lng: 31.026451, description: "2025-2026 FY — Zimbabwe Reforestation Initiative (PILOT)" },
        { id: "ireland",     name: "Ireland",      country: "Ireland",     type: "confirmed", source: "Tree-Nation",               trees: 2,    lat: 52.984489, lng: -9.269574, description: "2025-2026 FY — Ireland Community Tree Planting, County Clare (PILOT)" },
        { id: "mexico",      name: "Mexico",       country: "Mexico",      type: "confirmed", source: "Tree-Nation",               trees: 3,    lat: 17.976389, lng: -97.373886, description: "2025-2026 FY — Restoration and Social Empowerment (PILOT)" },
        { id: "argentina",   name: "Argentina",    country: "Argentina",   type: "confirmed", source: "Tree-Nation",               trees: 2,    lat: -31.491564, lng: -64.835419, description: "2025-2026 FY — Bosques de Agua (PILOT)" },
        { id: "france",      name: "France",       country: "France",      type: "confirmed", source: "Tree-Nation",               trees: 2,    lat: 47.267403, lng: 3.305741, description: "2025-2026 FY — Restauration Forêts dégradées (PILOT)" },
        { id: "australia",   name: "Australia",    country: "Australia",   type: "confirmed", source: "Tree-Nation",               trees: 2,    lat: -28.746443, lng: 153.450165, description: "2025-2026 FY — Big Scrub Rainforest Restoration (PILOT)" },
        { id: "uk",          name: "United Kingdom", country: "United Kingdom", type: "confirmed", source: "Tree-Nation",          trees: 2,    lat: 51.771252, lng: -1.324433, description: "2025-2026 FY — Community Tree Planting (PILOT)" },
        { id: "spain",       name: "Spain",        country: "Spain",       type: "confirmed", source: "Tree-Nation",               trees: 2,    lat: 38.102879, lng: -2.75392, description: "2025-2026 FY — Alvelal (PILOT)" },
        { id: "nepal-eden",      name: "Nepal - Eden Reforestation Projects", country: "Nepal", type: "confirmed", source: "Tree-Nation", trees: 0, lat: 27.775871, lng: 84.103767, projectName: "Eden Reforestation Projects", description: "Funded by Oasis of Change (historical) and Mittler Senior Technology (planting partner).", note: "Eden Reforestation Projects was completed after reaching full planting capacity. All trees planted through the project remain verified and tracked via Tree-Nation certificates.", noteLink: "/news.html#eden-completed" },
        { id: "nepal-refoorest", name: "Nepal - Refoorest",                  country: "Nepal", type: "supported", source: "Legacy Partner (Refoorest)", trees: 2000, lat: 28.3949, lng: 84.1240, description: "Funded by Refoorest (legacy partner)." },
        { id: "kenya",       name: "Kenya",        country: "Kenya",       type: "mixed",     source: "Mixed Sources",             trees: 0,    lat: -0.0236,  lng: 37.9062,  description: "Planted by Stanley Park Ecology Society and Sustainable WWW (planting partners), plus Tero (legacy partner)." },
        { id: "uganda-forest-gardens", name: "Forest Gardens - Mount Elgon Region", country: "Uganda", type: "confirmed", source: "Tree-Nation", trees: 0, lat: 0.826785, lng: 34.38345, description: "Planted by Mittler Senior Technology and Sustainable WWW (planting partners)." },
        { id: "uganda-mt-elgon",       name: "Preservation of Mt. Elgon Ecosystem",  country: "Uganda", type: "confirmed", source: "Tree-Nation", trees: 0, lat: 1.272721, lng: 34.048634, description: "Planted by Sustainable WWW (planting partner)." },
        { id: "usa-montana",    name: "USA - National Forest Recovery (Montana)",       country: "United States", type: "confirmed", source: "Tree-Nation", trees: 0, lat: 46.89217,  lng: -114.340752, description: "Funded by Oasis of Change (historical planting)." },
        { id: "usa-california", name: "USA - Lost Forests Recovery (California)", country: "United States", type: "confirmed", source: "Tree-Nation", trees: 0, lat: 41.490704, lng: -123.247726, description: "Funded by Sustainable WWW (planting partner project)." },
        { id: "india-tigers",  name: "India - Trees for Tigers",  country: "India", type: "confirmed", source: "Tree-Nation", trees: 0, lat: 22.006382, lng: 86.039948, projectName: "Trees for Tigers", description: "Planted by Oasis of Change." },
        { id: "india-tribals", name: "India - Trees for Tribals", country: "India", type: "confirmed", source: "Tree-Nation", trees: 0, lat: 19.055958, lng: 81.986229, projectName: "Trees for Tribals", description: "Planted by Sustainable WWW (planting partner)." },
        { id: "indonesia",   name: "Indonesia",    country: "Indonesia",   type: "mixed",     source: "Mixed Sources",             trees: 1000, lat: -0.7893,  lng: 113.9213, description: "Planted by Mittler Senior Technology (planting partner), Tero and Refoorest (legacy partners)." },
        { id: "haiti",       name: "Haiti",        country: "Haiti",       type: "supported", source: "Legacy Partner (Refoorest)", trees: 1200, lat: 18.9712,  lng: -72.2852, description: "Funded by Refoorest (legacy partner)." },
        { id: "honduras",    name: "Honduras",     country: "Honduras",    type: "supported", source: "Legacy Partner (Refoorest)", trees: 0,    lat: 15.2000,  lng: -86.2419, description: "Funded by Refoorest (legacy partner)." },
        { id: "senegal",     name: "Senegal",      country: "Senegal",     type: "confirmed", source: "Tree-Nation",               trees: 0,    lat: 14.190073, lng: -16.096897, description: "Planted by Stanley Park Ecology Society and Mittler Senior Technology (planting partners)." },
        { id: "cameroon",    name: "Cameroon",     country: "Cameroon",    type: "confirmed", source: "Tree-Nation",               trees: 0,    lat: 5.139279, lng: 10.275938, description: "Planting partner project via Tree-Nation." },
        { id: "mozambique",  name: "Mozambique",   country: "Mozambique",  type: "supported", source: "Legacy Partner (Tero)",     trees: 0,    lat: -18.6657, lng: 35.5296,  description: "Funded by Tero (legacy partner)." },
        { id: "laos",        name: "Laos",         country: "Laos",        type: "supported", source: "Legacy Partner (Tero)",     trees: 0,    lat: 19.8563,  lng: 102.4955, description: "Funded by Tero (legacy partner)." },
        { id: "drc",         name: "Democratic Republic of the Congo", country: "Democratic Republic of the Congo", type: "supported", source: "Legacy Partner (Tero)", trees: 0, lat: -4.0383, lng: 21.7587, description: "Funded by Tero (legacy partner)." },
        { id: "thailand",    name: "Thailand",     country: "Thailand",    type: "supported", source: "Legacy Partner (Tero)",     trees: 0,    lat: 15.8700,  lng: 100.9925, description: "Funded by Tero (legacy partner)." },
        { id: "peru",        name: "Peru",         country: "Peru",        type: "supported", source: "Legacy Partner (Tero)",     trees: 0,    lat: -9.1900,  lng: -75.0152, description: "Funded by Tero (legacy partner)." },
        { id: "nicaragua",   name: "Nicaragua",    country: "Nicaragua",   type: "supported", source: "Legacy Partner (Refoorest)", trees: 0,   lat: 12.8654,  lng: -85.2072, description: "Funded by Refoorest (legacy partner)." },
        { id: "central-african-republic", name: "Central African Republic", country: "Central African Republic", type: "supported", source: "Legacy Partner (Tero)", trees: 0, lat: 6.6111, lng: 20.9394, description: "Funded by Tero (legacy partner)." }
    ],


    /* ────────────────────────────────────────────────
       GEOGRAPHY
       ──────────────────────────────────────────────── */
    countryToContinent: {
        "Madagascar": "Africa", "Tanzania": "Africa", "Nigeria": "Africa", "Zimbabwe": "Africa",
        "Kenya": "Africa", "Uganda": "Africa", "Senegal": "Africa", "Cameroon": "Africa",
        "Mozambique": "Africa", "Democratic Republic of the Congo": "Africa", "Central African Republic": "Africa",
        "Canada": "North America", "United States": "North America", "Mexico": "North America",
        "Haiti": "North America", "Honduras": "North America", "Nicaragua": "North America",
        "Bolivia": "South America", "Brazil": "South America", "Argentina": "South America", "Peru": "South America",
        "Romania": "Europe", "Ireland": "Europe", "France": "Europe", "United Kingdom": "Europe", "Spain": "Europe", "Sweden": "Europe",
        "Nepal": "Asia", "India": "Asia", "Indonesia": "Asia", "Laos": "Asia", "Thailand": "Asia",
        "Australia": "Oceania"
    },


    /* ────────────────────────────────────────────────
       SPECIES
       ──────────────────────────────────────────────── */
    species: {
        verifiedSpecies: [
            "Afrocarpus usambarensis", "Pinus banksiana", "Ceiba speciosa",
            "Acacia mangium", "Schizolobium amazonicum", "Fagus sylvatica",
            "Mangifera indica", "Quercus petraea", "Prosopis laevigata",
            "Polylepis australis", "Pinus nigra", "Solanum aviculare",
            "Prunus spinosa", "Pistacia lentiscus", "Rhizophora mucronata"
        ],
        legacySpecies: {
            "Nepal":          ["Acacia katechu","Artocarpus heterophyllus","Azadirachta indica","Bauhinia variegata","Citrus limon","Coffea arabica","Ficus cunia","Ficus nemoralis","Leuceana leucocephala","Litsea monopetala","Moringa oleifera","Shorea robusta","Tectona grandis","Terminalia bellerica","Rhododendron arboreum"],
            "Madagascar":     ["Anacardium occidentale","Carica papaya","Mangifera indica","Adansonia sp","Albizia saman","Bismarckia nobilis","Ceiba pentandra","Khaya madagascariensis","Moringa oleifera","Tectona grandis","Terminalia mantaly","Avicennia marina","Rhizophora mucronata"],
            "Haiti":          ["Annona muricata","Avicennia marina","Prosopis juliflora","Artocarpus altilis","Rhizophora mangle","Carica papaya","Cedrela odorata","Citrus aurantifolia","Coffea arabica","Delonix regia","Leucaena leucocephala","Mangifera indica","Theobroma cacao"],
            "Indonesia":      ["Avicennia marina","Bruguiera gymnorhiza","Nypa fruticans","Rhizophora","Sonneratia alba","Xylocarpus granatum"],
            "Mozambique":     ["Avicennia marina","Bruguiera gymnorhiza","Rhizophora mucronata","Acacia karroo","Adansonia digitata","Albizia lebbeck","Anacardium occidentale","Citrus sinensis","Colophospermum mopane","Mangifera indica","Moringa oleifera","Sclerocarya birrea"],
            "Kenya":          ["Acacia gerrardii","Acacia kirkii","Juniperus procera","Avicennia marina","Maesopsis eminii","Markhamia lutea","Bruguiera gymnorhiza","Rhizophora mucronata","Bridelia micrantha","Calodendrum capense","Olea africana","Moringa oleifera","Podocarpus falcatus","Prunus africana","Warburgia ugandensis"],
            "Central America":["Liquidambar styraciflua","Pinus maximinoi","Pinus oocarpa","Acacia","Samanea saman","Swietenia macrophylla"]
        }
    },


    /* ────────────────────────────────────────────────
       GETTERS
       ──────────────────────────────────────────────── */

    getTotalTrees:    function() { return this.totals.totalTrees; },
    getVerifiedTrees: function() { return this.totals.verifiedTrees; },
    getLegacyTrees:   function() { return this.totals.legacyTrees; },
    getWebReadyTrees: function() { return this.totals.webReadyTrees; },

    getOasisFundedTrees: function() {
        return this.verifiedProjects.reduce(function(sum, p) {
            if (p.fy === 'Historical') return sum;
            return sum + (p.trees || 0);
        }, 0);
    },
    getHistoricalTrees: function() {
        return this.verifiedProjects.reduce(function(sum, p) {
            return p.fy === 'Historical' ? sum + (p.trees || 0) : sum;
        }, 0);
    },
    getProjectTrees: function() {
        return this.verifiedProjects.reduce(function(sum, p) { return sum + (p.trees || 0); }, 0);
    },
    getSeedsTrees: function() {
        return this.totals.webReadyTrees - this.getProjectTrees();
    },
    getPartnerTrees: function() {
        return (this.verifiedPartners || []).reduce(function(sum, p) { return sum + (p.trees || 0); }, 0);
    },

    getCo2Captured: function() {
        var projectKg = this.verifiedProjects.reduce(function(sum, p) { return sum + (p.co2Offset || 0); }, 0);
        var partnerKg = (this.verifiedPartners || []).reduce(function(sum, p) { return sum + ((p.co2Tonnes || 0) * 1000); }, 0);
        return projectKg + partnerKg;
    },

    getWebReadyCo2Kg: function() {
        return this.verifiedProjects.reduce(function(sum, p) { return sum + (p.co2Offset || 0); }, 0);
    },

    getSpeciesCount: function() {
        var all = [].concat(this.species.verifiedSpecies);
        var legacy = this.species.legacySpecies;
        for (var key in legacy) { all = all.concat(legacy[key]); }
        return new Set(all).size;
    },

    getContinentsCount: function() {
        var countries = [...new Set(this.mapSites.map(function(s) { return s.country; }))];
        var map = this.countryToContinent;
        return new Set(countries.map(function(c) { return map[c] || "Other"; })).size;
    },

    getVerifiedProjects:  function() { return this.verifiedProjects; },
    getVerifiedPartners:  function() { return this.verifiedPartners; },
    getLegacyProjects:    function() { return this.legacyProjects; },
    getCertificates:      function() { return this.certificates; },
    getMapSites:          function() { return this.mapSites; },
    getSpeciesData:       function() { return this.species; },

    getPlantingSitesCount: function() {
        if (typeof plantingData !== 'undefined') {
            var total = 0;
            Object.values(plantingData).forEach(function(cfg) {
                if (cfg.type === 'mixed') {
                    total += cfg.sites ? cfg.sites.length : 0;
                } else {
                    total += Array.isArray(cfg.sites) && cfg.sites.length > 0 ? cfg.sites.length : 1;
                }
            });
            return total;
        }
        return this.mapSites.length;
    }
};

window.TreeData = TreeData;