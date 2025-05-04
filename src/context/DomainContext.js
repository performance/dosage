// DomainContext.js
import React, { createContext, useContext, useState } from 'react';

const DomainContext = createContext();

/**
 * DomainProvider Component
 * 
 * This context provider manages domain-related state throughout the application.
 * We're using the Context API rather than prop drilling for cleaner code and
 * to make state accessible anywhere in the component tree.
 * 
 * @see https://reactjs.org/docs/context.html - React Context Documentation
 */
export const DomainProvider = ({ children }) => {
    const [domains, setDomains] = useState([]);
    const [currentDomain, setCurrentDomain] = useState(null);
    const [valuationResults, setValuationResults] = useState(null);
    const [suggestions, setSuggestions] = useState([]);
    const [playbook, setPlaybook] = useState(null);
    const [prospects, setProspects] = useState([]);
    const [landingPageMockups, setLandingPageMockups] = useState([]);

    // Add a domain to the list
    const addDomain = (domain) => {
        setDomains(prev => [...prev, domain]);
    };

    // Value a domain (This would connect to your backend API)
    const valueDomain = async (domainName) => {
        // In a real implementation, this would be an API call
        // For demo purposes, we'll simulate a response
        try {
            // Simulate API call delay
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Create a mock valuation result
            const result = {
                domain: domainName,
                estimatedValue: Math.floor(Math.random() * 10000) + 500,
                factors: {
                    length: domainName.length,
                    keywords: domainName.includes('tech') ? 'tech (high value)' : 'standard',
                    tld: domainName.split('.').pop(),
                    brandability: Math.floor(Math.random() * 10)
                },
                timestamp: new Date().toISOString()
            };

            setValuationResults(result);
            setCurrentDomain(domainName);
            return result;
        } catch (error) {
            console.error('Error valuing domain:', error);
            throw error;
        }
    };

    // Generate domain suggestions based on keywords
    const generateSuggestions = async (keywords, filters = {}) => {
        try {
            // Simulate API call delay
            await new Promise(resolve => setTimeout(resolve, 1500));

            // Mock domain suggestions based on keywords
            const tlds = ['com', 'net', 'io', 'ai', 'co'];
            const keywordArray = keywords.split(' ');

            // Generate combinations of keywords + tlds
            let mockSuggestions = [];

            for (let i = 0; i < keywordArray.length; i++) {
                for (let j = 0; j < keywordArray.length; j++) {
                    if (i !== j) {
                        const base = `${keywordArray[i]}${keywordArray[j]}`;
                        const tld = tlds[Math.floor(Math.random() * tlds.length)];
                        mockSuggestions.push({
                            name: `${base}.${tld}`,
                            available: Math.random() > 0.3, // 70% chance of being available
                            estimatedValue: Math.floor(Math.random() * 5000) + 200,
                            brandability: Math.floor(Math.random() * 10) + 1
                        });
                    }
                }
            }

            // Apply filters if provided
            if (filters.tld) {
                mockSuggestions = mockSuggestions.filter(s => s.name.endsWith(`.${filters.tld}`));
            }

            if (filters.maxLength) {
                mockSuggestions = mockSuggestions.filter(s => s.name.length <= filters.maxLength);
            }

            if (filters.minValue) {
                mockSuggestions = mockSuggestions.filter(s => s.estimatedValue >= filters.minValue);
            }

            setSuggestions(mockSuggestions);
            return mockSuggestions;
        } catch (error) {
            console.error('Error generating suggestions:', error);
            throw error;
        }
    };

    // Generate a sales playbook for a domain
    const generatePlaybook = async (domainName) => {
        try {
            // Simulate API call delay
            await new Promise(resolve => setTimeout(resolve, 2000));

            // Mock playbook generation
            const industries = ['Tech', 'Health', 'Finance', 'Education', 'E-commerce'];
            const selectedIndustries = [];

            // Select 2-3 random industries that would be relevant
            const numIndustries = Math.floor(Math.random() * 2) + 2;
            for (let i = 0; i < numIndustries; i++) {
                const industry = industries[Math.floor(Math.random() * industries.length)];
                if (!selectedIndustries.includes(industry)) {
                    selectedIndustries.push(industry);
                }
            }

            const mockPlaybook = {
                domain: domainName,
                targetIndustries: selectedIndustries,
                priceRange: {
                    min: Math.floor(Math.random() * 1000) + 500,
                    max: Math.floor(Math.random() * 9000) + 2000
                },
                outreachStrategy: {
                    platforms: ['Email', 'LinkedIn', 'Domain Marketplaces'],
                    emailTemplate: `Subject: ${domainName} - Premium Domain Opportunity\n\nHello [Name],\n\nI noticed your company is growing in the ${selectedIndustries[0]} space and thought you might be interested in the premium domain ${domainName}.\n\nThis domain would be perfect for your brand because...\n\n[Your Name]`
                },
                pitchExamples: [
                    `${domainName} is perfect for your upcoming product launch because it's memorable and directly relates to your industry.`,
                    `Owning ${domainName} will give you an edge over competitors with less premium domain names.`
                ]
            };

            setPlaybook(mockPlaybook);
            return mockPlaybook;
        } catch (error) {
            console.error('Error generating playbook:', error);
            throw error;
        }
    };

    // Generate prospective buyers for a domain
    const generateProspects = async (domainName) => {
        try {
            // Simulate API call delay
            await new Promise(resolve => setTimeout(resolve, 1800));

            // Mock prospect generation
            const mockCompanies = [
                { name: 'TechNova', industry: 'Tech', website: 'technova.com', email: 'info@technova.com', relevance: 9.2 },
                { name: 'HealthPulse', industry: 'Health', website: 'healthpulse.com', email: 'contact@healthpulse.com', relevance: 8.7 },
                { name: 'EduLearn', industry: 'Education', website: 'edulearn.com', email: 'hello@edulearn.com', relevance: 7.9 },
                { name: 'FinEdge', industry: 'Finance', website: 'finedge.com', email: 'info@finedge.com', relevance: 8.5 },
                { name: 'ShopEase', industry: 'E-commerce', website: 'shopease.com', email: 'sales@shopease.com', relevance: 9.0 }
            ];

            // Select 3-5 random prospects
            const numProspects = Math.floor(Math.random() * 3) + 3;
            const selectedProspects = [];

            for (let i = 0; i < numProspects; i++) {
                const company = mockCompanies[Math.floor(Math.random() * mockCompanies.length)];

                // Add some randomization to relevance scores
                const relevanceVariation = (Math.random() * 2 - 1) * 0.5; // -0.5 to +0.5

                // Clone to avoid modifying the original
                const prospect = {
                    ...company,
                    relevance: Math.min(10, Math.max(1, company.relevance + relevanceVariation)).toFixed(1),
                    contactName: `${['John', 'Sarah', 'Michael', 'Emma', 'David'][Math.floor(Math.random() * 5)]} ${['Smith', 'Johnson', 'Williams', 'Brown', 'Jones'][Math.floor(Math.random() * 5)]}`,
                    contactTitle: `${['CEO', 'CMO', 'CTO', 'Marketing Director', 'Brand Manager'][Math.floor(Math.random() * 5)]}`
                };

                if (!selectedProspects.some(p => p.name === prospect.name)) {
                    selectedProspects.push(prospect);
                }
            }

            // Sort by relevance
            selectedProspects.sort((a, b) => b.relevance - a.relevance);

            setProspects(selectedProspects);
            return selectedProspects;
        } catch (error) {
            console.error('Error generating prospects:', error);
            throw error;
        }
    };

    // Generate landing page mockups for a domain
    const generateLandingPageMockups = async (domainName, industry) => {
        try {
            // Simulate API call delay
            await new Promise(resolve => setTimeout(resolve, 2000));

            // Mock landing page mockup generation
            const designStyles = ['Modern', 'Classic', 'Bold'];
            const mockups = [];

            // Generate mockups for each design style
            for (let i = 0; i < designStyles.length; i++) {
                const style = designStyles[i];
                mockups.push({
                    id: i + 1,
                    title: `${industry.charAt(0).toUpperCase() + industry.slice(1)} - ${style} Design`,
                    imageUrl: `https://via.placeholder.com/800x600?text=${style}+Design`,
                    description: `A ${style.toLowerCase()} landing page design for ${domainName} focused on ${industry}.`,
                    features: [
                        style === 'Modern' ? 'Responsive design' : (style === 'Classic' ? 'Traditional layout' : 'Striking visuals'),
                        style === 'Modern' ? 'Clear CTAs' : (style === 'Classic' ? 'Trust indicators' : 'Bold typography'),
                        style === 'Modern' ? 'Modern typography' : (style === 'Classic' ? 'Service highlights' : 'Strong CTAs')
                    ]
                });
            }

            setLandingPageMockups(mockups);
            setCurrentDomain(domainName);
            return mockups;
        } catch (error) {
            console.error('Error generating landing page mockups:', error);
            throw error;
        }
    };

    return (
        <DomainContext.Provider
            value={{
                domains,
                currentDomain,
                valuationResults,
                suggestions,
                playbook,
                prospects,
                landingPageMockups,
                addDomain,
                valueDomain,
                setCurrentDomain,
                generateSuggestions,
                generatePlaybook,
                generateProspects,
                generateLandingPageMockups
            }}
        >
            {children}
        </DomainContext.Provider>
    );
};

export const useDomain = () => useContext(DomainContext);
