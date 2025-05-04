
import React, { useState } from 'react';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import Card from '../components/common/Card';
import Loader from '../components/common/Loader';
import ProspectCard from '../components/feature/ProspectCard';
import { useDomain } from '../context/DomainContext';

/**
 * ProspectPage Component
 * 
 * This page allows users to find potential buyers for a domain.
 * It displays a list of companies that might be interested in purchasing.
 * 
 * Design Decision: Using a responsive grid of prospect cards to clearly
 * display potential buyers with relevant information and contact options.
 */
const ProspectPage = () => {
    const { generateProspects, prospects, currentDomain } = useDomain();

    const [domain, setDomain] = useState(currentDomain || '');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [exported, setExported] = useState(false);

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!domain) {
            setError('Please enter a domain name');
            return;
        }

        // Domain format validation using regex
        const domainRegex = /^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9]\.[a-zA-Z]{2,}$/;
        if (!domainRegex.test(domain)) {
            setError('Please enter a valid domain name');
            return;
        }

        setError('');
        setLoading(true);

        try {
            await generateProspects(domain);
        } catch (err) {
            setError('Error finding prospects. Please try again.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    // Handle export to CSV
    const handleExport = () => {
        if (!prospects || prospects.length === 0) return;

        // Create CSV content
        const headers = ['Company', 'Industry', 'Website', 'Contact Name', 'Contact Title', 'Email', 'Relevance'];
        const rows = prospects.map(p => [
            p.name,
            p.industry,
            p.website,
            p.contactName,
            p.contactTitle,
            p.email,
            p.relevance
        ]);

        const csvContent = [
            headers.join(','),
            ...rows.map(row => row.join(','))
        ].join('\n');

        // Create a download link
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.setAttribute('href', url);
        link.setAttribute('download', `${domain}_prospects.csv`);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        // Show export confirmation
        setExported(true);
        setTimeout(() => setExported(false), 3000);
    };

    return (
        <div className="max-w-6xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">Prospective Buyers</h1>

            <Card className="mb-8">
                <form onSubmit={handleSubmit}>
                    <div className="mb-6">
                        <label htmlFor="domain" className="block text-gray-700 font-medium mb-2">
                            Enter a domain to find potential buyers:
                        </label>
                        <Input
                            id="domain"
                            type="text"
                            placeholder="example.com"
                            value={domain}
                            onChange={(e) => setDomain(e.target.value)}
                            error={error}
                        />
                        <p className="mt-2 text-sm text-gray-600">
                            We'll identify companies and individuals who might be interested in purchasing this domain.
                        </p>
                    </div>

                    <Button
                        type="submit"
                        variant="primary"
                        disabled={loading}
                    >
                        {loading ? 'Finding Prospects...' : 'Find Potential Buyers'}
                    </Button>
                </form>
            </Card>

            {/* Loading State */}
            {loading && (
                <div className="my-8">
                    <Loader text="Searching for relevant companies and contacts..." />
                </div>
            )}

            {/* Results Section */}
            {!loading && prospects && prospects.length > 0 && (
                <div className="my-8">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-semibold text-gray-800">
                            Potential Buyers for {domain}
                        </h2>
                        <div className="flex items-center">
                            <Button
                                variant="outline"
                                onClick={handleExport}
                                className="flex items-center"
                            >
                                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                </svg>
                                Export to CSV
                            </Button>

                            {exported && (
                                <span className="ml-3 text-green-600 text-sm">
                                    Exported successfully!
                                </span>
                            )}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {prospects.map((prospect, index) => (
                            <ProspectCard key={index} prospect={prospect} />
                        ))}
                    </div>
                </div>
            )}

            {/* No Results Message */}
            {!loading && prospects && prospects.length === 0 && domain && (
                <Card className="my-8 text-center py-8">
                    <svg
                        className="mx-auto h-12 w-12 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                    </svg>
                    <h3 className="mt-4 text-lg font-medium text-gray-900">No prospects found</h3>
                    <p className="mt-2 text-gray-600">
                        We couldn't find any potential buyers for this domain. Try another domain or check back later.
                    </p>
                </Card>
            )}

            {/* Informational Section */}
            <div className="mt-12">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">How We Find Potential Buyers</h2>
                <div className="bg-white rounded-lg shadow-md p-6">
                    <p className="text-gray-700 mb-4">
                        Our prospect finder uses multiple data sources and strategies to identify potential buyers for your domain:
                    </p>
                    <ul className="list-disc pl-5 space-y-2 text-gray-700">
                        <li>
                            <span className="font-medium">Industry Analysis:</span> We identify industries that align with your domain's keywords and themes
                        </li>
                        <li>
                            <span className="font-medium">Company Database:</span> We search through thousands of companies to find matching business models and needs
                        </li>
                        <li>
                            <span className="font-medium">Startup Monitoring:</span> We track new companies that might need a strong domain for their brand
                        </li>
                        <li>
                            <span className="font-medium">Expansion Tracking:</span> We identify established companies looking to expand into new product lines
                        </li>
                        <li>
                            <span className="font-medium">Decision-Maker Identification:</span> We find the right person to contact within each organization
                        </li>
                    </ul>

                    {/* Developer Notes - Educational Content */}
                    <div className="mt-6 p-4 bg-gray-50 rounded-md border border-gray-200">
                        <h3 className="text-md font-semibold text-gray-800 mb-2">Developer Notes:</h3>
                        <p className="text-sm text-gray-600 mb-2">
                            In a production environment, this component would connect to:
                        </p>
                        <ul className="list-disc pl-5 space-y-1 text-sm text-gray-600">
                            <li>Crunchbase API for company and startup data</li>
                            <li>LinkedIn API for professional contact information</li>
                            <li>Hunter.io or similar for email discovery</li>
                            <li>BuiltWith for technology stack identification</li>
                            <li>Clearbit for company enrichment data</li>
                        </ul>
                        <p className="text-sm text-gray-600 mt-2">
                            The CSV export functionality demonstrates:
                        </p>
                        <ul className="list-disc pl-5 space-y-1 text-sm text-gray-600">
                            <li>Client-side file generation using Blob objects</li>
                            <li>Programmatic file downloads without server involvement</li>
                            <li>Temporary UI feedback (exported confirmation)</li>
                        </ul>
                        <p className="text-sm text-gray-600 mt-2">
                            <a
                                href="https://developer.mozilla.org/en-US/docs/Web/API/Blob"
                                className="text-indigo-600 hover:text-indigo-800"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Learn more about Blob objects →
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProspectPage;