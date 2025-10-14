/**
 * Centralized Tree Data Management System
 * Oasis of Change, Inc. - Tree Planting Impact Report
 * 
 * This file contains all tree statistics, project details, and verification data.
 * Update values here to automatically update across all pages of the website.
 */

const TreeData = {
    // Last updated date
    lastUpdated: "September 10th, 2025",
    
    // Overall Statistics
    totals: {
        totalTrees: 8870,
        verifiedTrees: 1532,
        legacyTrees: 7338,
        goalTrees: 10000,
        speciesCount: 12,
        co2Captured: 5297164, // kg CO2 over 40-year lifespan (8,870 trees × 14.93 kg/year × 40 years)
        co2PerTree: 14.93 // kg CO2 per tree per year average
    },
    
    // Verified Projects (Tree-Nation Certified)
    verifiedProjects: [
        {
            id: "web-ready",
            name: "Web-Ready",
            description: "Forest restoration project",
            location: "Canada",
            trees: 924,
            url: "https://tree-nation.com/profile/impact/web-ready"
        },
        {
            id: "spes",
            name: "Stanley Park Ecology Society (SPES)",
            description: "Urban forest restoration",
            location: "Canada", 
            trees: 230,
            co2Offset: 21380, // kg CO2
            url: "https://tree-nation.com/profile/impact/stanley-park-ecology-society"
        },
        {
            id: "sustainable-www",
            name: "Sustainable WWW",
            description: "Digital sustainability initiative",
            location: "Sweden",
            trees: 159,
            co2Offset: 13500, 
            url: "https://tree-nation.com/profile/impact/sustainable-www"
        },
        {
            id: "mst",
            name: "Mittler Senior Technology (MST)",
            description: "Corporate sustainability program",
            location: "United States",
            trees: 123,
            co2Offset: 15000, // kg CO2
            url: "https://tree-nation.com/profile/impact/mittler-senior-technology"
        },
        {
            id: "ecosearch",
            name: "EcoSearch",
            description: "Search engine carbon offset",
            location: "Canada",
            trees: 101,
            co2Offset: 5000, // kg CO2
            date: "2024-06-26",
            certificate: "Eden Reforestation",
            url: "https://tree-nation.com/profile/impact/ecosearch"
        }
    ],
    
    // Legacy Partner Projects
    legacyProjects: [
        {
            id: "tero-partner",
            name: "Tero Partner",
            description: "Historical partnership program",
            trees: 4567,
            co2Offset: 68000, // kg CO2 estimated
            date: "2023-2024",
            source: "Legacy Partner (Tero)"
        },
        {
            id: "refoorest-partner",
            name: "Refoorest Partner", 
            description: "Legacy reforestation initiative",
            trees: 2771,
            co2Offset: 41500, // kg CO2 estimated
            date: "2023-2024",
            source: "Legacy Partner (Refoorest)"
        }
    ],
    
    // Certificate Details (for certificates.html)
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
    
    // Map Data (for map.js) - All countries with tree plantings
    mapSites: [
        // Madagascar - Mixed (33 sites)
        {
            id: "madagascar",
            name: "Madagascar",
            country: "Madagascar",
            type: "mixed",
            source: "Mixed Sources",
            trees: 2525, // Web-Ready (924) + EcoSearch (101) + Tero (1500)
            lat: -18.7669,
            lng: 46.8691,
            description: "Mixed verified and legacy tree plantings"
        },
        // Nepal - Mixed (30 sites)
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
        // Kenya - Mixed (39 sites)
        {
            id: "kenya",
            name: "Kenya",
            country: "Kenya",
            type: "mixed",
            source: "Mixed Sources",
            trees: 0, // Legacy partner data
            lat: -0.0236,
            lng: 37.9062,
            description: "Mixed verified and legacy tree plantings"
        },
        // Tanzania - Confirmed (4 sites)
        {
            id: "tanzania",
            name: "Tanzania",
            country: "Tanzania",
            type: "confirmed", 
            source: "Tree-Nation",
            trees: 512, // SPES (230) + Sustainable WWW (159) + MST (123)
            lat: -6.3690,
            lng: 34.8888,
            description: "Verified tree plantings"
        },
        // Uganda - Confirmed (2 sites)
        {
            id: "uganda",
            name: "Uganda",
            country: "Uganda",
            type: "confirmed",
            source: "Tree-Nation",
            trees: 0, // Tree-Nation data
            lat: 1.3733,
            lng: 32.2903,
            description: "Verified tree plantings"
        },
        // United States - Confirmed (2 sites)
        {
            id: "united-states",
            name: "United States",
            country: "United States",
            type: "confirmed",
            source: "Tree-Nation",
            trees: 0, // Tree-Nation data
            lat: 39.8283,
            lng: -98.5795,
            description: "Verified tree plantings"
        },
        // India - Confirmed (2 sites)
        {
            id: "india",
            name: "India",
            country: "India",
            type: "confirmed",
            source: "Tree-Nation",
            trees: 0, // Tree-Nation data
            lat: 20.5937,
            lng: 78.9629,
            description: "Verified tree plantings"
        },
        // Indonesia - Mixed (9 sites)
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
        // Haiti - Supported (10 sites)
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
        // Honduras - Supported (6 sites)
        {
            id: "honduras",
            name: "Honduras",
            country: "Honduras",
            type: "supported",
            source: "Legacy Partner (Refoorest)",
            trees: 0, // Legacy partner data
            lat: 15.2000,
            lng: -86.2419,
            description: "Legacy reforestation initiative"
        },
        // Senegal - Confirmed (1 site)
        {
            id: "senegal",
            name: "Senegal",
            country: "Senegal",
            type: "confirmed",
            source: "Tree-Nation",
            trees: 0, // Tree-Nation data
            lat: 14.4974,
            lng: -14.4524,
            description: "Verified tree plantings"
        },
        // Cameroon - Confirmed (1 site)
        {
            id: "cameroon",
            name: "Cameroon",
            country: "Cameroon",
            type: "confirmed",
            source: "Tree-Nation",
            trees: 0, // Tree-Nation data
            lat: 7.3697,
            lng: 12.3547,
            description: "Verified tree plantings"
        },
        // Mozambique - Supported (1 site)
        {
            id: "mozambique",
            name: "Mozambique",
            country: "Mozambique",
            type: "supported",
            source: "Legacy Partner (Tero)",
            trees: 0, // Legacy partner data
            lat: -18.6657,
            lng: 35.5296,
            description: "Legacy reforestation initiative"
        },
        // Laos - Supported (1 site)
        {
            id: "laos",
            name: "Laos",
            country: "Laos",
            type: "supported",
            source: "Legacy Partner (Tero)",
            trees: 0, // Legacy partner data
            lat: 19.8563,
            lng: 102.4955,
            description: "Legacy reforestation initiative"
        },
        // Democratic Republic of the Congo - Supported (1 site)
        {
            id: "drc",
            name: "Democratic Republic of the Congo",
            country: "Democratic Republic of the Congo",
            type: "supported",
            source: "Legacy Partner (Tero)",
            trees: 0, // Legacy partner data
            lat: -4.0383,
            lng: 21.7587,
            description: "Legacy reforestation initiative"
        },
        // Thailand - Supported (1 site)
        {
            id: "thailand",
            name: "Thailand",
            country: "Thailand",
            type: "supported",
            source: "Legacy Partner (Tero)",
            trees: 0, // Legacy partner data
            lat: 15.8700,
            lng: 100.9925,
            description: "Legacy reforestation initiative"
        },
        // Peru - Supported (1 site)
        {
            id: "peru",
            name: "Peru",
            country: "Peru",
            type: "supported",
            source: "Legacy Partner (Tero)",
            trees: 0, // Legacy partner data
            lat: -9.1900,
            lng: -75.0152,
            description: "Legacy reforestation initiative"
        },
        // Nicaragua - Supported (1 site)
        {
            id: "nicaragua",
            name: "Nicaragua",
            country: "Nicaragua",
            type: "supported",
            source: "Legacy Partner (Refoorest)",
            trees: 0, // Legacy partner data
            lat: 12.8654,
            lng: -85.2072,
            description: "Legacy reforestation initiative"
        }
    ],
    
    // Species Data
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
    
    // Utility Functions
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
        return this.totals.co2Captured;
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
    
    // Update functions for easy data management
    updateTotalTrees: function(newTotal) {
        this.totals.totalTrees = newTotal;
        this.totals.co2Captured = Math.round(newTotal * this.totals.co2PerTree * 40); // 40-year lifespan
        this.recalculateTotals(); // Ensure all totals are consistent
    },
    
    updateVerifiedTrees: function(newVerified) {
        this.totals.verifiedTrees = newVerified;
        this.totals.legacyTrees = this.totals.totalTrees - newVerified;
    },
    
    updateProjectTrees: function(projectId, newTreeCount) {
        // Update verified project
        const verifiedProject = this.verifiedProjects.find(p => p.id === projectId);
        if (verifiedProject) {
            verifiedProject.trees = newTreeCount;
            verifiedProject.co2Offset = Math.round(newTreeCount * this.totals.co2PerTree * 40);
            this.recalculateTotals();
            return;
        }
        
        // Update legacy project
        const legacyProject = this.legacyProjects.find(p => p.id === projectId);
        if (legacyProject) {
            legacyProject.trees = newTreeCount;
            legacyProject.co2Offset = Math.round(newTreeCount * this.totals.co2PerTree * 40);
            this.recalculateTotals();
            return;
        }
    },
    
    recalculateTotals: function() {
        // Recalculate verified trees from projects
        this.totals.verifiedTrees = this.verifiedProjects.reduce((sum, project) => sum + project.trees, 0);
        
        // Recalculate legacy trees from projects  
        this.totals.legacyTrees = this.legacyProjects.reduce((sum, project) => sum + project.trees, 0);
        
        // Update total
        this.totals.totalTrees = this.totals.verifiedTrees + this.totals.legacyTrees;
        
        // Update CO2 captured
        this.totals.co2Captured = Math.round(this.totals.totalTrees * this.totals.co2PerTree * 40);
    }
};

// Make TreeData globally available
window.TreeData = TreeData;