const TreeData = {

    lastUpdated: "February 28th, 2026",

    /* ────────────────────────────────────────────────
       TOTALS
       Verified  = Oasis-funded (7,819) + Historical (70) + Partners (628) = 8,517
       Legacy    = Pre–Tree-Nation partners (fixed)       = 7,338
       Total     = 8,517 + 7,338                          = 15,855
       ──────────────────────────────────────────────── */
    totals: {
        verifiedTrees: 8517,    // all Tree-Nation (Oasis 7,819 + Historical 70 + Partners 628)
        legacyTrees:   7338,    // Tero 4,567 + Refoorest 2,771
        totalTrees:    15855,   // verified + legacy
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
        { id: "nepal-eden-historical", name: "Eden Reforestation Projects", location: "Nepal",           trees: 60,  co2Offset: 0, fy: "Historical", species: "Phyllanthus emblica", url: "https://tree-nation.com/projects/eden-reforestation-nepal" },
        { id: "usa-nfr-historical",     name: "National Forest Recovery",    location: "United States", trees: 10,  co2Offset: 0, fy: "Historical", species: "Pinus strobus",       url: "https://tree-nation.com/projects/shoshone-national-forest-wyoming" }
    ],


    /* ────────────────────────────────────────────────
       Trees planted through partner organization accounts.
       Subtotal: 628 trees
       ──────────────────────────────────────────────── */
    verifiedPartners: [
        { id: "spes",            name: "Stanley Park Ecology Society", baseLocation: "Canada",        trees: 233, co2Tonnes: 21.49, countries: "Madagascar, Tanzania, Senegal, Kenya" },
        { id: "sustainable-www", name: "The Sustainable WWW",          baseLocation: "Sweden",        trees: 170, co2Tonnes: 24.56, countries: "Tanzania, Kenya, Madagascar, Uganda, India, United States" },
        { id: "mst",             name: "Mittler Senior Technology",    baseLocation: "United States", trees: 124, co2Tonnes: 16.25, countries: "Tanzania, Senegal, Madagascar, Indonesia, Uganda, Nepal" },
        { id: "ecosearch",       name: "EcoSearch",                    baseLocation: "Canada",        trees: 101, co2Tonnes: 5.05,  countries: "Madagascar" }
    ],


    /* ────────────────────────────────────────────────
       LEGACY PARTNERS  (pre–Tree-Nation, fixed)
       Subtotal: 7,338 trees
       ──────────────────────────────────────────────── */
    legacyProjects: [
        { id: "tero-partner",     name: "Tero Partner",     trees: 4567, co2Offset: 68000,  date: "2023-2024", source: "Legacy Partner (Tero)" },
        { id: "refoorest-partner", name: "Refoorest Partner", trees: 2771, co2Offset: 41500, date: "2023-2024", source: "Legacy Partner (Refoorest)" }
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
        { id: "web-ready-2025-madagascar",     title: "Web-Ready Forest Restoration (Madagascar)", certificate: "Eden Reforestation",   location: "Madagascar", trees: 675, co2Offset: 33750, date: "February 26, 2025", fyNote: "2024-2025 FY — Madagascar project completed", filename: "2025-02-26_Web-Ready-Planting_Eden-Reforestation_Madagascar_675-Trees-33750kg-CO2.pdf" },
        { id: "spes-2024-tanzania",            title: "Stanley Park Ecology Society (SPES)",       certificate: "Usambara Biodiversity", location: "Tanzania",   trees: 100, co2Offset: 15000, date: "January 26, 2024",  filename: "2024-01-26_Stanley-Park-Ecology-Society_Usambara-Biodiversity_Tanzania_100-Trees-15000kg-CO2.pdf.pdf" },
        { id: "sustainable-www-2023-tanzania-1", title: "Sustainable WWW - Planting 1",            certificate: "Usambara Biodiversity", location: "Tanzania",   trees: 50,  co2Offset: 6000,  date: "December 29, 2023", filename: "2023-12-29_Sustainable-WWW_Usambara-Biodiversity_Tanzania_50-Trees-6000kg-CO2.pdf.pdf" },
        { id: "sustainable-www-2023-tanzania-2", title: "Sustainable WWW - Planting 2",            certificate: "Usambara Biodiversity", location: "Tanzania",   trees: 50,  co2Offset: 7500,  date: "December 29, 2023", filename: "2023-12-29_Sustainable-WWW_Usambara-Biodiversity_Tanzania_50-Trees-7500kg-CO2.pdf.pdf" },
        { id: "mst-2024-tanzania",             title: "Mittler Senior Technology (MST)",           certificate: "Usambara Biodiversity", location: "Tanzania",   trees: 100, co2Offset: 15000, date: "January 17, 2024",  filename: "2024-01-17_Mittler-Senior-Technology_Usambara-Biodiversity_Tanzania_100-Trees-15000kg-CO2.pdf.pdf" },
        { id: "ecosearch-2024-madagascar",     title: "EcoSearch",                                 certificate: "Eden Reforestation",   location: "Madagascar", trees: 100, co2Offset: 5000,  date: "June 26, 2024",     filename: "2024-06-26_EcoSearch_Eden-Reforestation_Madagascar_100-Trees-5000kg-CO2.pdf.pdf" }
    ],


    /* ────────────────────────────────────────────────
       MAP SITES  (drives Countries + Continents counts)
       Pre-incorporation: 60 trees Eden Reforestation (Nepal), 10 trees National Forest Recovery (USA), planted before Oasis of Change, Inc. was legally incorporated.
       ──────────────────────────────────────────────── */
    mapSites: [
        { id: "madagascar",  name: "Madagascar",  country: "Madagascar",  type: "mixed",     source: "Mixed Sources",             trees: 2525, lat: -18.7669, lng: 46.8691,   description: "Funded by Oasis of Change (2024-2025 FY), Stanley Park Ecology Society, The Sustainable WWW, Mittler Senior Technology, EcoSearch (planting partners), and Refoorest (legacy partner).", note: "Eden Reforestation Projects was sunset after the project reached full planting capacity. Oasis of Change redirected future allocations to new geographies.", noteLink: "/news.html#eden-sunset" },
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
        { id: "nepal",       name: "Nepal",        country: "Nepal",       type: "mixed",     source: "Mixed Sources",             trees: 2000, lat: 28.3949,  lng: 84.1240,  description: "Funded by Oasis of Change (historical), Mittler Senior Technology (planting partner), and Refoorest (legacy partner)." },
        { id: "kenya",       name: "Kenya",        country: "Kenya",       type: "mixed",     source: "Mixed Sources",             trees: 0,    lat: -0.0236,  lng: 37.9062,  description: "Planted by Stanley Park Ecology Society and The Sustainable WWW (planting partners), plus Tero (legacy partner)." },
        { id: "uganda",      name: "Uganda",       country: "Uganda",      type: "confirmed", source: "Tree-Nation",               trees: 0,    lat: 1.3733,   lng: 32.2903,  description: "Planted by The Sustainable WWW and Mittler Senior Technology (planting partners)." },
        { id: "united-states", name: "United States", country: "United States", type: "confirmed", source: "Tree-Nation",          trees: 0,    lat: 39.8283,  lng: -98.5795, description: "Funded by Oasis of Change (historical) and The Sustainable WWW (planting partner)." },
        { id: "india",       name: "India",        country: "India",       type: "confirmed", source: "Tree-Nation",               trees: 0,    lat: 20.5937,  lng: 78.9629,  description: "Planted by The Sustainable WWW (planting partner)." },
        { id: "indonesia",   name: "Indonesia",    country: "Indonesia",   type: "mixed",     source: "Mixed Sources",             trees: 1000, lat: -0.7893,  lng: 113.9213, description: "Planted by Mittler Senior Technology (planting partner), Tero and Refoorest (legacy partners)." },
        { id: "haiti",       name: "Haiti",        country: "Haiti",       type: "supported", source: "Legacy Partner (Refoorest)", trees: 1200, lat: 18.9712,  lng: -72.2852, description: "Funded by Refoorest (legacy partner)." },
        { id: "honduras",    name: "Honduras",     country: "Honduras",    type: "supported", source: "Legacy Partner (Refoorest)", trees: 0,    lat: 15.2000,  lng: -86.2419, description: "Funded by Refoorest (legacy partner)." },
        { id: "senegal",     name: "Senegal",      country: "Senegal",     type: "confirmed", source: "Tree-Nation",               trees: 0,    lat: 14.4974,  lng: -14.4524, description: "Planted by Stanley Park Ecology Society and Mittler Senior Technology (planting partners)." },
        { id: "cameroon",    name: "Cameroon",     country: "Cameroon",    type: "confirmed", source: "Tree-Nation",               trees: 0,    lat: 7.3697,   lng: 12.3547,  description: "Planting partner project via Tree-Nation." },
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
    getPartnerTrees: function() {
        return (this.verifiedPartners || []).reduce(function(sum, p) { return sum + (p.trees || 0); }, 0);
    },

    getCo2Captured: function() {
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