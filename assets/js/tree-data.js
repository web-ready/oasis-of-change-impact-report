const TreeData = {
    lastUpdated: "September 10th, 2025",
    totals: {
        totalTrees: 8870,
        verifiedTrees: 1532,
        legacyTrees: 7338,
        goalTrees: 10000,
        speciesCount: 67,
        co2Captured: 0,
        co2PerTree: 14.93
    },
    
    verifiedProjects: [
        {
            id: "web-ready",
            name: "Web-Ready",
            description: "Forest restoration project",
            location: "Canada",
            trees: 924,
            co2Offset: 71500,
            url: "https://tree-nation.com/profile/impact/web-ready"
        },
        {
            id: "spes",
            name: "Stanley Park Ecology Society (SPES)",
            description: "Urban forest restoration",
            location: "Canada", 
            trees: 232,
            co2Offset: 21440,
            url: "https://tree-nation.com/profile/impact/stanley-park-ecology-society"
        },
        {
            id: "sustainable-www",
            name: "Sustainable WWW",
            description: "Digital sustainability initiative",
            location: "Sweden",
            trees: 170,
            co2Offset: 24560, 
            url: "https://tree-nation.com/profile/impact/sustainable-www"
        },
        {
            id: "mst",
            name: "Mittler Senior Technology (MST)",
            description: "Corporate sustainability program",
            location: "United States",
            trees: 124,
            co2Offset: 16250,
            url: "https://tree-nation.com/profile/impact/mittler-senior-technology"
        },
        {
            id: "ecosearch",
            name: "EcoSearch",
            description: "Search engine carbon offset",
            location: "Canada",
            trees: 101,
            co2Offset: 5050,
            date: "2024-06-26",
            certificate: "Eden Reforestation",
            url: "https://tree-nation.com/profile/impact/ecosearch"
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
    certificates: [
        {
            id: "web-ready-2025-madagascar",
            title: "Web-Ready Forest Restoration",
            certificate: "Eden Reforestation",
            location: "Madagascar",
            trees: 675,
            co2Offset: 33750,
            date: "February 26, 2025",
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
            filename: "2024-06-26_EcoSearch_Eden-Reforestation_Madagascar_100-Trees-5000kg-CO2.pdf.pdf"
        }
    ],
    mapSites: [
        {
            id: "madagascar",
            name: "Madagascar",
            country: "Madagascar",
            type: "mixed",
            source: "Mixed Sources",
            trees: 2525,
            lat: -18.7669,
            lng: 46.8691,
            description: "Mixed verified and legacy tree plantings"
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
            id: "tanzania",
            name: "Tanzania",
            country: "Tanzania",
            type: "confirmed", 
            source: "Tree-Nation",
            trees: 512,
            lat: -6.3690,
            lng: 34.8888,
            description: "Verified tree plantings"
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
        totalSpecies: 12,
        verifiedSpecies: [
            "Syzygium cumini",
            "Rhizophora mucronata", 
            "Ceriops tagal",
            "Azadirachta indica",
            "Albizia gummifera",
            "Albizia schimperiana",
            "Phyllanthus emblica",
            "Citrus limon"
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
    
    getProgressPercentage: function() {
        return Math.round((this.totals.totalTrees / this.totals.goalTrees) * 100 * 10) / 10;
    },
    
    getRemainingTrees: function() {
        return this.totals.goalTrees - this.totals.totalTrees;
    },
    
    getVerifiedPercentage: function() {
        return Math.round((this.totals.verifiedTrees / this.totals.totalTrees) * 100);
    },
    
    getLegacyPercentage: function() {
        return Math.round((this.totals.legacyTrees / this.totals.totalTrees) * 100);
    },
    
    getCo2Captured: function() {
        return Math.round(this.totals.totalTrees * 80);
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
    
    getCertificates: function() {
        return this.certificates;
    },
    
    getMapSites: function() {
        return this.mapSites;
    },
    
    getSpeciesData: function() {
        return this.species;
    },
    updateTotalTrees: function(newTotal) {
        this.totals.totalTrees = newTotal;
        this.recalculateTotals();
    },
    
    updateVerifiedTrees: function(newVerified) {
        this.totals.verifiedTrees = newVerified;
        this.totals.legacyTrees = this.totals.totalTrees - newVerified;
    },
    
    updateProjectTrees: function(projectId, newTreeCount) {
        const verifiedProject = this.verifiedProjects.find(p => p.id === projectId);
        if (verifiedProject) {
            verifiedProject.trees = newTreeCount;
            verifiedProject.co2Offset = Math.round(newTreeCount * 250);
            this.recalculateTotals();
            return;
        }
        const legacyProject = this.legacyProjects.find(p => p.id === projectId);
        if (legacyProject) {
            legacyProject.trees = newTreeCount;
            legacyProject.co2Offset = Math.round(newTreeCount * 250);
            this.recalculateTotals();
            return;
        }
    },
    
    recalculateTotals: function() {
        this.totals.verifiedTrees = this.verifiedProjects.reduce((sum, project) => sum + project.trees, 0);
        this.totals.legacyTrees = this.legacyProjects.reduce((sum, project) => sum + project.trees, 0);
        this.totals.totalTrees = this.totals.verifiedTrees + this.totals.legacyTrees;
    }
};

window.TreeData = TreeData;
