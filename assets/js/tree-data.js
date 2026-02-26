const TreeData = {
    lastUpdated: "February 25th, 2026",
    fiscalYear: "2025-2026",
    totals: {
        totalTrees: 14881,
        verifiedTrees: 7143,
        legacyTrees: 7338,
        goalTrees: 10000,
        speciesCount: 14
    },
    
    verifiedProjects: [
        {
            id: "tanzania-mkussu",
            name: "Replanting the burnt Mkussu Forest",
            location: "Tanzania",
            trees: 7057,
            co2Offset: 352850,
            fundingStream: "CORE",
            species: "Afrocarpus usambarensis",
            url: "https://tree-nation.com"
        },
        {
            id: "canada-boreal",
            name: "Boreal Forest Habitat Restoration",
            location: "Canada",
            trees: 62,
            co2Offset: 3100,
            fundingStream: "GOV. GRANT + PILOT",
            species: "Pinus banksiana",
            url: "https://tree-nation.com"
        },
        {
            id: "bolivia-amazon",
            name: "Amazon Windshields",
            location: "Bolivia",
            trees: 2,
            co2Offset: 1000,
            fundingStream: "PILOT",
            species: "Ceiba speciosa",
            url: "https://tree-nation.com"
        },
        {
            id: "nigeria-ala",
            name: "Restoration of Ala Forest Reserve",
            location: "Nigeria",
            trees: 2,
            co2Offset: 500,
            fundingStream: "PILOT",
            species: "Acacia mangium",
            url: "https://tree-nation.com"
        },
        {
            id: "brazil-amazon",
            name: "Reforest the Amazon Basin",
            location: "Brazil",
            trees: 2,
            co2Offset: 500,
            fundingStream: "PILOT",
            species: "Schizolobium amazonicum",
            url: "https://tree-nation.com"
        },
        {
            id: "romania-bear",
            name: "Bear Groves in Transylvania",
            location: "Romania",
            trees: 2,
            co2Offset: 300,
            fundingStream: "PILOT",
            species: "Fagus sylvatica",
            url: "https://tree-nation.com"
        },
        {
            id: "zimbabwe-reforest",
            name: "Zimbabwe Reforestation Initiative",
            location: "Zimbabwe",
            trees: 2,
            co2Offset: 100,
            fundingStream: "PILOT",
            species: "Mangifera indica",
            url: "https://tree-nation.com"
        },
        {
            id: "ireland-community",
            name: "Ireland Community Tree Planting",
            location: "Ireland",
            trees: 2,
            co2Offset: 100,
            fundingStream: "PILOT",
            species: "Betula pendula",
            url: "https://tree-nation.com"
        },
        {
            id: "mexico-restoration",
            name: "Restoration and Social Empowerment",
            location: "Mexico",
            trees: 2,
            co2Offset: 40,
            fundingStream: "PILOT",
            species: "Prosopis laevigata",
            url: "https://tree-nation.com"
        },
        {
            id: "argentina-bosques",
            name: "Bosques de Agua",
            location: "Argentina",
            trees: 2,
            co2Offset: 40,
            fundingStream: "PILOT",
            species: "Polylepis australis",
            url: "https://tree-nation.com"
        },
        {
            id: "france-restauration",
            name: "Restauration Forêts dégradées",
            location: "France",
            trees: 2,
            co2Offset: 20,
            fundingStream: "PILOT",
            species: "Pinus nigra",
            url: "https://tree-nation.com"
        },
        {
            id: "australia-big-scrub",
            name: "Big Scrub Rainforest Restoration",
            location: "Australia",
            trees: 2,
            co2Offset: 20,
            fundingStream: "PILOT",
            species: "Homalanthus populifolius",
            url: "https://tree-nation.com"
        },
        {
            id: "uk-community",
            name: "Community Tree Planting",
            location: "United Kingdom",
            trees: 2,
            co2Offset: 20,
            fundingStream: "PILOT",
            species: "Prunus spinosa",
            url: "https://tree-nation.com"
        },
        {
            id: "spain-alvelal",
            name: "Alvelal",
            location: "Spain",
            trees: 2,
            co2Offset: 20,
            fundingStream: "PILOT",
            species: "Pistacia lentiscus",
            url: "https://tree-nation.com"
        }
    ],
    legacyProjects: [
        {
            id: "tero-partner",
            name: "Tero Partner",
            description: "Historical partnership program",
            trees: 4567,
            co2Offset: 68000,
            date: "2023-2024",
            source: "Legacy Partner (Tero)"
        },
        {
            id: "refoorest-partner",
            name: "Refoorest Partner", 
            description: "Legacy reforestation initiative",
            trees: 2771,
            co2Offset: 41500,
            date: "2023-2024",
            source: "Legacy Partner (Refoorest)"
        }
    ],
    sunsetProjects: [
        {
            id: "madagascar-2024-2025",
            name: "Madagascar",
            description: "Eden Reforestation Projects — contributed during 2024-2025 FY tree planting cycle. Project sunset in 2025-2026 FY.",
            trees: 675,
            co2Offset: 33750,
            date: "2024-2025 FY",
            country: "Madagascar"
        }
    ],
    certificates: [
        {
            id: "web-ready-2025-madagascar",
            title: "Web-Ready Forest Restoration (Madagascar)",
            certificate: "Eden Reforestation",
            location: "Madagascar",
            trees: 675,
            co2Offset: 33750,
            date: "February 26, 2025",
            fyNote: "2024-2025 FY — Madagascar project now sunset",
            filename: "2025-02-26_Web-Ready-Planting_Eden-Reforestation_Madagascar_675-Trees-33750kg-CO2.pdf"
        },
        {
            id: "spes-2024-tanzania",
            title: "Stanley Park Ecology Society (SPES)",
            certificate: "Usambara Biodiversity",
            location: "Tanzania",
            trees: 100,
            co2Offset: 15000,
            date: "January 26, 2024",
            filename: "2024-01-26_Stanley-Park-Ecology-Society_Usambara-Biodiversity_Tanzania_100-Trees-15000kg-CO2.pdf.pdf"
        },
        {
            id: "sustainable-www-2023-tanzania-1",
            title: "Sustainable WWW - Planting 1",
            certificate: "Usambara Biodiversity",
            location: "Tanzania",
            trees: 50,
            co2Offset: 6000,
            date: "December 29, 2023",
            filename: "2023-12-29_Sustainable-WWW_Usambara-Biodiversity_Tanzania_50-Trees-6000kg-CO2.pdf.pdf"
        },
        {
            id: "sustainable-www-2023-tanzania-2",
            title: "Sustainable WWW - Planting 2",
            certificate: "Usambara Biodiversity",
            location: "Tanzania",
            trees: 50,
            co2Offset: 7500,
            date: "December 29, 2023",
            filename: "2023-12-29_Sustainable-WWW_Usambara-Biodiversity_Tanzania_50-Trees-7500kg-CO2.pdf.pdf"
        },
        {
            id: "mst-2024-tanzania",
            title: "Mittler Senior Technology (MST)",
            certificate: "Usambara Biodiversity",
            location: "Tanzania",
            trees: 100,
            co2Offset: 15000,
            date: "January 17, 2024",
            filename: "2024-01-17_Mittler-Senior-Technology_Usambara-Biodiversity_Tanzania_100-Trees-15000kg-CO2.pdf.pdf"
        },
        {
            id: "ecosearch-2024-madagascar",
            title: "EcoSearch",
            certificate: "Eden Reforestation",
            location: "Madagascar",
            trees: 100,
            co2Offset: 5000,
            date: "June 26, 2024",
            fyNote: "2024-2025 FY — Madagascar project now sunset",
            filename: "2024-06-26_EcoSearch_Eden-Reforestation_Madagascar_100-Trees-5000kg-CO2.pdf.pdf"
        }
    ],
    mapSites: [
        {
            id: "madagascar",
            name: "Madagascar",
            country: "Madagascar",
            type: "sunset",
            source: "Sunset — 2024-2025 FY",
            trees: 2525,
            lat: -18.7669,
            lng: 46.8691,
            description: "Previously supported in 2024-2025 FY. Project sunset in 2025-2026 FY."
        },
        {
            id: "tanzania",
            name: "Tanzania",
            country: "Tanzania",
            type: "confirmed", 
            source: "Tree-Nation",
            trees: 7057,
            lat: -6.3690,
            lng: 34.8888,
            description: "2025-2026 FY — Replanting the burnt Mkussu Forest (CORE)"
        },
        {
            id: "canada",
            name: "Canada",
            country: "Canada",
            type: "confirmed",
            source: "Tree-Nation",
            trees: 62,
            lat: 56.1304,
            lng: -106.3468,
            description: "2025-2026 FY — Boreal Forest Habitat Restoration"
        },
        {
            id: "bolivia",
            name: "Bolivia",
            country: "Bolivia",
            type: "confirmed",
            source: "Tree-Nation",
            trees: 2,
            lat: -16.2902,
            lng: -63.5887,
            description: "2025-2026 FY — Amazon Windshields (PILOT)"
        },
        {
            id: "nigeria",
            name: "Nigeria",
            country: "Nigeria",
            type: "confirmed",
            source: "Tree-Nation",
            trees: 2,
            lat: 9.0820,
            lng: 8.6753,
            description: "2025-2026 FY — Restoration of Ala Forest Reserve (PILOT)"
        },
        {
            id: "brazil",
            name: "Brazil",
            country: "Brazil",
            type: "confirmed",
            source: "Tree-Nation",
            trees: 2,
            lat: -14.2350,
            lng: -51.9253,
            description: "2025-2026 FY — Reforest the Amazon Basin (PILOT)"
        },
        {
            id: "romania",
            name: "Romania",
            country: "Romania",
            type: "confirmed",
            source: "Tree-Nation",
            trees: 2,
            lat: 45.9432,
            lng: 24.9668,
            description: "2025-2026 FY — Bear Groves in Transylvania (PILOT)"
        },
        {
            id: "zimbabwe",
            name: "Zimbabwe",
            country: "Zimbabwe",
            type: "confirmed",
            source: "Tree-Nation",
            trees: 2,
            lat: -19.0154,
            lng: 29.1549,
            description: "2025-2026 FY — Zimbabwe Reforestation Initiative (PILOT)"
        },
        {
            id: "ireland",
            name: "Ireland",
            country: "Ireland",
            type: "confirmed",
            source: "Tree-Nation",
            trees: 2,
            lat: 53.1424,
            lng: -7.6921,
            description: "2025-2026 FY — Ireland Community Tree Planting (PILOT)"
        },
        {
            id: "mexico",
            name: "Mexico",
            country: "Mexico",
            type: "confirmed",
            source: "Tree-Nation",
            trees: 2,
            lat: 23.6345,
            lng: -102.5528,
            description: "2025-2026 FY — Restoration and Social Empowerment (PILOT)"
        },
        {
            id: "argentina",
            name: "Argentina",
            country: "Argentina",
            type: "confirmed",
            source: "Tree-Nation",
            trees: 2,
            lat: -38.4161,
            lng: -63.6167,
            description: "2025-2026 FY — Bosques de Agua (PILOT)"
        },
        {
            id: "france",
            name: "France",
            country: "France",
            type: "confirmed",
            source: "Tree-Nation",
            trees: 2,
            lat: 46.2276,
            lng: 2.2137,
            description: "2025-2026 FY — Restauration Forêts dégradées (PILOT)"
        },
        {
            id: "australia",
            name: "Australia",
            country: "Australia",
            type: "confirmed",
            source: "Tree-Nation",
            trees: 2,
            lat: -25.2744,
            lng: 133.7751,
            description: "2025-2026 FY — Big Scrub Rainforest Restoration (PILOT)"
        },
        {
            id: "uk",
            name: "United Kingdom",
            country: "United Kingdom",
            type: "confirmed",
            source: "Tree-Nation",
            trees: 2,
            lat: 55.3781,
            lng: -3.4360,
            description: "2025-2026 FY — Community Tree Planting (PILOT)"
        },
        {
            id: "spain",
            name: "Spain",
            country: "Spain",
            type: "confirmed",
            source: "Tree-Nation",
            trees: 2,
            lat: 40.4637,
            lng: -3.7492,
            description: "2025-2026 FY — Alvelal (PILOT)"
        },
        {
            id: "nepal",
            name: "Nepal",
            country: "Nepal",
            type: "mixed",
            source: "Mixed Sources",
            trees: 2000,
            lat: 28.3949,
            lng: 84.1240,
            description: "Mixed verified and legacy tree plantings"
        },
        {
            id: "kenya",
            name: "Kenya",
            country: "Kenya",
            type: "mixed",
            source: "Mixed Sources",
            trees: 0,
            lat: -0.0236,
            lng: 37.9062,
            description: "Mixed verified and legacy tree plantings"
        },
        {
            id: "uganda",
            name: "Uganda",
            country: "Uganda",
            type: "confirmed",
            source: "Tree-Nation",
            trees: 0,
            lat: 1.3733,
            lng: 32.2903,
            description: "Verified tree plantings"
        },
        {
            id: "united-states",
            name: "United States",
            country: "United States",
            type: "confirmed",
            source: "Tree-Nation",
            trees: 0,
            lat: 39.8283,
            lng: -98.5795,
            description: "Verified tree plantings"
        },
        {
            id: "india",
            name: "India",
            country: "India",
            type: "confirmed",
            source: "Tree-Nation",
            trees: 0,
            lat: 20.5937,
            lng: 78.9629,
            description: "Verified tree plantings"
        },
        {
            id: "indonesia",
            name: "Indonesia",
            country: "Indonesia",
            type: "mixed",
            source: "Mixed Sources",
            trees: 1000,
            lat: -0.7893,
            lng: 113.9213,
            description: "Mixed verified and legacy tree plantings"
        },
        {
            id: "haiti",
            name: "Haiti",
            country: "Haiti",
            type: "supported",
            source: "Legacy Partner (Refoorest)",
            trees: 1200,
            lat: 18.9712,
            lng: -72.2852,
            description: "Legacy reforestation initiative"
        },
        {
            id: "honduras",
            name: "Honduras",
            country: "Honduras",
            type: "supported",
            source: "Legacy Partner (Refoorest)",
            trees: 0,
            lat: 15.2000,
            lng: -86.2419,
            description: "Legacy reforestation initiative"
        },
        {
            id: "senegal",
            name: "Senegal",
            country: "Senegal",
            type: "confirmed",
            source: "Tree-Nation",
            trees: 0,
            lat: 14.4974,
            lng: -14.4524,
            description: "Verified tree plantings"
        },
        {
            id: "cameroon",
            name: "Cameroon",
            country: "Cameroon",
            type: "confirmed",
            source: "Tree-Nation",
            trees: 0,
            lat: 7.3697,
            lng: 12.3547,
            description: "Verified tree plantings"
        },
        {
            id: "mozambique",
            name: "Mozambique",
            country: "Mozambique",
            type: "supported",
            source: "Legacy Partner (Tero)",
            trees: 0,
            lat: -18.6657,
            lng: 35.5296,
            description: "Legacy reforestation initiative"
        },
        {
            id: "laos",
            name: "Laos",
            country: "Laos",
            type: "supported",
            source: "Legacy Partner (Tero)",
            trees: 0,
            lat: 19.8563,
            lng: 102.4955,
            description: "Legacy reforestation initiative"
        },
        {
            id: "drc",
            name: "Democratic Republic of the Congo",
            country: "Democratic Republic of the Congo",
            type: "supported",
            source: "Legacy Partner (Tero)",
            trees: 0,
            lat: -4.0383,
            lng: 21.7587,
            description: "Legacy reforestation initiative"
        },
        {
            id: "thailand",
            name: "Thailand",
            country: "Thailand",
            type: "supported",
            source: "Legacy Partner (Tero)",
            trees: 0,
            lat: 15.8700,
            lng: 100.9925,
            description: "Legacy reforestation initiative"
        },
        {
            id: "peru",
            name: "Peru",
            country: "Peru",
            type: "supported",
            source: "Legacy Partner (Tero)",
            trees: 0,
            lat: -9.1900,
            lng: -75.0152,
            description: "Legacy reforestation initiative"
        },
        {
            id: "nicaragua",
            name: "Nicaragua",
            country: "Nicaragua",
            type: "supported",
            source: "Legacy Partner (Refoorest)",
            trees: 0,
            lat: 12.8654,
            lng: -85.2072,
            description: "Legacy reforestation initiative"
        }
    ],
    
    species: {
        totalSpecies: 14,
        verifiedSpecies: [
            "Afrocarpus usambarensis",
            "Pinus banksiana",
            "Ceiba speciosa",
            "Acacia mangium",
            "Schizolobium amazonicum",
            "Fagus sylvatica",
            "Mangifera indica",
            "Betula pendula",
            "Prosopis laevigata",
            "Polylepis australis",
            "Pinus nigra",
            "Homalanthus populifolius",
            "Prunus spinosa",
            "Pistacia lentiscus"
        ],
        legacySpecies: {
            "Nepal": [
                "Acacia katechu", "Artocarpus heterophyllus", "Azadirachta indica",
                "Bauhinia variegata", "Citrus limon", "Coffea arabica",
                "Ficus cunia", "Ficus nemoralis", "Leuceana leucocephala",
                "Litsea monopetala", "Moringa oleifera", "Shorea robusta",
                "Tectona grandis", "Terminalia bellerica", "Rhododendron arboreum"
            ],
            "Madagascar": [
                "Anacardium occidentale", "Carica papaya", "Mangifera indica",
                "Adansonia sp", "Albizia saman", "Bismarckia nobilis",
                "Ceiba pentandra", "Khaya madagascariensis", "Moringa oleifera",
                "Tectona grandis", "Terminalia mantaly", "Avicennia marina",
                "Rhizophora mucronata"
            ],
            "Haiti": [
                "Annona muricata", "Avicennia marina", "Prosopis juliflora",
                "Artocarpus altilis", "Rhizophora mangle", "Carica papaya",
                "Cedrela odorata", "Citrus aurantifolia", "Coffea arabica",
                "Delonix regia", "Leucaena leucocephala", "Mangifera indica",
                "Theobroma cacao"
            ],
            "Indonesia": [
                "Avicennia marina", "Bruguiera gymnorhiza", "Nypa fruticans",
                "Rhizophora", "Sonneratia alba", "Xylocarpus granatum"
            ],
            "Mozambique": [
                "Avicennia marina", "Bruguiera gymnorhiza", "Rhizophora mucronata",
                "Acacia karroo", "Adansonia digitata", "Albizia lebbeck",
                "Anacardium occidentale", "Citrus sinensis", "Colophospermum mopane",
                "Mangifera indica", "Moringa oleifera", "Sclerocarya birrea"
            ],
            "Kenya": [
                "Acacia gerrardii", "Acacia kirkii", "Juniperus procera",
                "Avicennia marina", "Maesopsis eminii", "Markhamia lutea",
                "Bruguiera gymnorhiza", "Rhizophora mucronata", "Bridelia micrantha",
                "Calodendrum capense", "Olea africana", "Moringa oleifera",
                "Podocarpus falcatus", "Prunus africana", "Warburgia ugandensis"
            ],
            "Central America": [
                "Liquidambar styraciflua", "Pinus maximinoi", "Pinus oocarpa",
                "Acacia", "Samanea saman", "Swietenia macrophylla"
            ]
        }
    },
    getTotalTrees: function() {
        return this.totals.totalTrees;
    },
    
    getVerifiedTrees: function() {
        return this.totals.verifiedTrees;
    },
    
    getLegacyTrees: function() {
        return this.totals.legacyTrees;
    },
    
    getCo2Captured: function() {
        return this.verifiedProjects.reduce((sum, p) => sum + (p.co2Offset || 0), 0);
    },
    
    getSpeciesCount: function() {
        return this.totals.speciesCount;
    },
    
    getVerifiedProjects: function() {
        return this.verifiedProjects;
    },
    
    getLegacyProjects: function() {
        return this.legacyProjects;
    },
    
    getSunsetProjects: function() {
        return this.sunsetProjects || [];
    },
    
    getCertificates: function() {
        return this.certificates;
    },
    
    getMapSites: function() {
        return this.mapSites;
    },
    
    getSpeciesData: function() {
        return this.species;
    }
};

window.TreeData = TreeData;
