import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import Card from '../components/common/Card';
import Loader from '../components/common/Loader';
import DomainValueCard from '../components/feature/DomainValueCard';
import { useDomain } from '../context/DomainContext';

/**
 * ValuationPage Component
 * 
 * This page allows users to enter a domain name or upload a CSV file
 * with multiple domains to get valuations.
 * 
 * Design Decision: The page uses a simple form interface for single domain
 * valuation and a card-based result display. For bulk valuation, we provide
 * a file upload option and tabular results.
 */
const ValuationPage = () => {
    const { valueDomain, valuationResults, generatePlaybook } = useDomain();
    const [domain, setDomain] = useState('');
    const [bulkMode, setBulkMode] = useState(false);
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // Handle single domain valuation
    const handleSingleValuation = async (e) => {
        e.preventDefault();

        // Basic validation
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
            await valueDomain(domain);
        } catch (err) {
            setError('Error valuing domain. Please try again.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    // Handle bulk domain valuation (file upload)
    const handleBulkValuation = async (e) => {
        e.preventDefault();

        if (!file) {
            setError('Please select a CSV file');
            return;
        }

        setError('');
        setLoading(true);

        // In a real implementation, you would process the CSV file
        // and send it to the backend for valuation
        // For now, we'll just simulate a delay
        try {
            await new Promise(resolve => setTimeout(resolve, 2000));
            // Mock implementation - in a real app, this would process the CSV
            alert('Bulk valuation is a premium feature. Please upgrade your account.');
        } catch (err) {
            setError('Error processing file. Please try again.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    // Handle file input change
    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];

        if (selectedFile) {
            // Check if file is CSV
            if (selectedFile.type !== 'text/csv' && !selectedFile.name.endsWith('.csv')) {
                setError('Please upload a CSV file');
                setFile(null);
                return;
            }

            setFile(selectedFile);
            setError('');
        }
    };

    // Toggle between single and bulk mode
    const toggleMode = () => {
        setBulkMode(!bulkMode);
        setError('');
    };

    // Generate a playbook for the valued domain
    const handleGeneratePlaybook = async () => {
        if (!valuationResults) return;

        try {
            setLoading(true);
            await generatePlaybook(valuationResults.domain);
            // Navigate to playbook page
            // In a real app, you would use the navigate function from react-router
            window.location.href = '/playbook';
        } catch (err) {
            console.error('Error generating playbook:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">Domain Valuation</h1>

            {/* Mode Toggle */}
            <div className="mb-8 flex justify-center">
                <div className="inline-flex rounded-md shadow-sm" role="group">
                    <button
                        type="button"
                        className={`px-4 py-2 text-sm font-medium rounded-l-lg ${!bulkMode
                                ? 'bg-indigo-600 text-white'
                                : 'bg-white text-gray-700 hover:bg-gray-50'
                            } border border-gray-300`}
                        onClick={() => setBulkMode(false)}
                    >
                        Single Domain
                    </button>
                    <button
                        type="button"
                        className={`px-4 py-2 text-sm font-medium rounded-r-lg ${bulkMode
                                ? 'bg-indigo-600 text-white'
                                : 'bg-white text-gray-700 hover:bg-gray-50'
                            } border border-gray-300`}
                        onClick={() => setBulkMode(true)}
                    >
                        Bulk Upload
                    </button>
                </div>
            </div>

            {/* Valuation Form */}
            <Card>
                {!bulkMode ? (
                    <div>
                        <form onSubmit={handleSingleValuation}>
                            <div className="mb-6">
                                <label htmlFor="domain" className="block text-gray-700 font-medium mb-2">
                                    Enter a domain name:
                                </label>
                                <div className="flex">
                                    <Input
                                        id="domain"
                                        type="text"
                                        placeholder="example.com"
                                        value={domain}
                                        onChange={(e) => setDomain(e.target.value)}
                                        error={error}
                                        className="flex-grow"
                                    />
                                </div>
                            </div>

                            <Button
                                type="submit"
                                variant="primary"
                                fullWidth
                                disabled={loading}
                            >
                                {loading ? 'Valuing...' : 'Get Value'}
                            </Button>
                        </form>
                    </div>
                ) : (
                    <div>
                        <form onSubmit={handleBulkValuation}>
                            <div className="mb-6">
                                <label htmlFor="file" className="block text-gray-700 font-medium mb-2">
                                    Upload a CSV file with domains:
                                </label>
                                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                                    <div className="space-y-1 text-center">
                                        <svg
                                            className="mx-auto h-12 w-12 text-gray-400"
                                            stroke="currentColor"
                                            fill="none"
                                            viewBox="0 0 48 48"
                                            aria-hidden="true"
                                        >
                                            <path
                                                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                                strokeWidth={2}
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                        <div className="flex text-sm text-gray-600">
                                            <label
                                                htmlFor="file-upload"
                                                className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none"
                                            >
                                                <span>Upload a file</span>
                                                <input
                                                    id="file-upload"
                                                    name="file-upload"
                                                    type="file"
                                                    className="sr-only"
                                                    accept=".csv"
                                                    onChange={handleFileChange}
                                                />
                                            </label>
                                            <p className="pl-1">or drag and drop</p>
                                        </div>
                                        <p className="text-xs text-gray-500">CSV up to 10MB</p>
                                    </div>
                                </div>
                                {file && (
                                    <p className="mt-2 text-sm text-gray-600">
                                        Selected file: {file.name}
                                    </p>
                                )}
                                {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
                            </div>

                            <Button
                                type="submit"
                                variant="primary"
                                fullWidth
                                disabled={loading || !file}
                            >
                                {loading ? 'Processing...' : 'Value Domains'}
                            </Button>
                        </form>
                    </div>
                )}
            </Card>

            {/* Loading State */}
            {loading && (
                <div className="mt-8">
                    <Loader text="Analyzing domain factors..." />
                </div>
            )}

            {/* Valuation Results */}
            {!loading && valuationResults && !bulkMode && (
                <div className="mt-8">
                    <DomainValueCard valuation={valuationResults} />

                    <div className="mt-6 flex flex-wrap justify-center gap-4">
                        <Button
                            variant="primary"
                            onClick={handleGeneratePlaybook}
                        >
                            Generate Sales Playbook
                        </Button>

                        <Link to="/landing-page">
                            <Button variant="primary">
                                Create Landing Page Mockups
                            </Button>
                        </Link>

                        <Link to="/discovery">
                            <Button variant="outline">
                                Find Similar Domains
                            </Button>
                        </Link>
                    </div>
                </div>
            )}

            {/* Additional Information */}
            <div className="mt-12">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">How Domain Valuation Works</h2>
                <div className="bg-white rounded-lg shadow-md p-6">
                    <p className="text-gray-700 mb-4">
                        Our domain valuation algorithm considers multiple factors to determine the market value:
                    </p>
                    <ul className="list-disc pl-5 space-y-2 text-gray-700">
                        <li>
                            <span className="font-medium">Domain Length:</span> Shorter domains typically command higher values
                        </li>
                        <li>
                            <span className="font-medium">Keywords:</span> Domains containing popular or trending keywords may be worth more
                        </li>
                        <li>
                            <span className="font-medium">TLD Value:</span> Some TLDs (like .com, .io, .ai) are more valuable than others
                        </li>
                        <li>
                            <span className="font-medium">Brandability:</span> How suitable the domain is for building a brand
                        </li>
                        <li>
                            <span className="font-medium">Commercial Potential:</span> The domain's potential for commercial use
                        </li>
                        <li>
                            <span className="font-medium">Historical Sales:</span> Comparable domain sales data
                        </li>
                    </ul>

                    {/* Developer Notes - Educational Content */}
                    <div className="mt-6 p-4 bg-gray-50 rounded-md border border-gray-200">
                        <h3 className="text-md font-semibold text-gray-800 mb-2">Developer Notes:</h3>
                        <p className="text-sm text-gray-600 mb-2">
                            This valuation form demonstrates several React patterns:
                        </p>
                        <ul className="list-disc pl-5 space-y-1 text-sm text-gray-600">
                            <li>
                                Conditional rendering to switch between single and bulk valuation modes
                            </li>
                            <li>
                                Form handling with controlled components (value + onChange)
                            </li>
                            <li>
                                Client-side validation with regex pattern matching
                            </li>
                            <li>
                                Context API for state management (DomainContext)
                            </li>
                            <li>
                                File input handling for CSV uploads
                            </li>
                        </ul>
                        <p className="text-sm text-gray-600 mt-2">
                            <a
                                href="https://react.dev/learn/responding-to-events"
                                className="text-indigo-600 hover:text-indigo-800"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Learn more about React event handling →
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ValuationPage;
