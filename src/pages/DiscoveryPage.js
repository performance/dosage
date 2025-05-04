import React, { useState } from 'react';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import Select from '../components/common/Select';
import Card from '../components/common/Card';
import Loader from '../components/common/Loader';
import DomainSuggestionCard from '../components/feature/DomainSuggestionCard';
import { useDomain } from '../context/DomainContext';
import { useNavigate } from 'react-router-dom';

/**
 * DiscoveryPage Component
 * 
 * This page allows users to discover available domain names based on keywords,
 * with filtering options for TLD, length, etc.
 * 
 * Design Decision: Using a responsive grid layout for domain suggestions
 * to efficiently display multiple options with clear visual separation.
 */
const DiscoveryPage = () => {
    const { generateSuggestions, suggestions, setCurrentDomain, valueDomain } = useDomain();
    const navigate = useNavigate();

    const [keywords, setKeywords] = useState('');
    const [filters, setFilters] = useState({
        tld: '',
        maxLength: '',
        minValue: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // TLD options for dropdown
    const tldOptions = [
        { value: '', label: 'All TLDs' },
        { value: 'com', label: '.com' },
        { value: 'net', label: '.net' },
        { value: 'org', label: '.org' },
        { value: 'io', label: '.io' },
        { value: 'ai', label: '.ai' },
        { value: 'co', label: '.co' }
    ];

    // Length options for dropdown
    const lengthOptions = [
        { value: '', label: 'Any Length' },
        { value: '10', label: '10 characters or less' },
        { value: '15', label: '15 characters or less' },
        { value: '20', label: '20 characters or less' }
    ];

    // Value options for dropdown
    const valueOptions = [
        { value: '', label: 'Any Value' },
        { value: '500', label: '$500 or more' },
        { value: '1000', label: '$1,000 or more' },
        { value: '5000', label: '$5,000 or more' }
    ];

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!keywords.trim()) {
            setError('Please enter keywords to search');
            return;
        }

        setError('');
        setLoading(true);

        try {
            await generateSuggestions(keywords, {
                tld: filters.tld,
                maxLength: filters.maxLength ? parseInt(filters.maxLength) : null,
                minValue: filters.minValue ? parseInt(filters.minValue) : null
            });
        } catch (err) {
            setError('Error generating suggestions. Please try again.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    // Handle filter changes
    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({ ...prev, [name]: value }));
    };

    // Handle domain selection
    const handleSelectDomain = async (suggestion) => {
        try {
            setLoading(true);
            setCurrentDomain(suggestion.name);
            await valueDomain(suggestion.name);
            navigate('/valuation');
        } catch (err) {
            console.error('Error selecting domain:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-6xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">Domain Discovery</h1>

            <Card className="mb-8">
                <form onSubmit={handleSubmit}>
                    <div className="mb-6">
                        <label htmlFor="keywords" className="block text-gray-700 font-medium mb-2">
                            Enter keywords or themes:
                        </label>
                        <Input
                            id="keywords"
                            type="text"
                            placeholder="e.g., tech startup ai, health wellness"
                            value={keywords}
                            onChange={(e) => setKeywords(e.target.value)}
                            error={error}
                        />
                        <p className="mt-2 text-sm text-gray-600">
                            Enter multiple keywords separated by spaces. We'll generate domain suggestions based on these themes.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                        <Select
                            id="tld"
                            name="tld"
                            label="TLD Filter"
                            value={filters.tld}
                            onChange={handleFilterChange}
                            options={tldOptions}
                        />

                        <Select
                            id="maxLength"
                            name="maxLength"
                            label="Length Filter"
                            value={filters.maxLength}
                            onChange={handleFilterChange}
                            options={lengthOptions}
                        />

                        <Select
                            id="minValue"
                            name="minValue"
                            label="Value Filter"
                            value={filters.minValue}
                            onChange={handleFilterChange}
                            options={valueOptions}
                        />
                    </div>

                    <Button
                        type="submit"
                        variant="primary"
                        disabled={loading}
                    >
                        {loading ? 'Generating Suggestions...' : 'Find Domains'}
                    </Button>
                </form>
            </Card>

            {/* Loading State */}
            {loading && (
                <div className="my-8">
                    <Loader text="Discovering available domains..." />
                </div>
            )}

            {/* Results Section */}
            {!loading && suggestions.length > 0 && (
                <div>
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">
                        Domain Suggestions
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {suggestions.map((suggestion, index) => (
                            <DomainSuggestionCard
                                key={index}
                                suggestion={suggestion}
                                onSelectDomain={handleSelectDomain}
                            />
                        ))}
                    </div>
                </div>
            )}

            {/* No Results Message */}
            {!loading && suggestions.length === 0 && keywords && (
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
                    <h3 className="mt-4 text-lg font-medium text-gray-900">No domains found</h3>
                    <p className="mt-2 text-gray-600">
                        Try different keywords or relaxing your filters to see more results.
                    </p>
                </Card>
            )}

            {/* Developer Notes - Educational Content */}
            <div className="mt-12">
                <div className="bg-white rounded-lg shadow-md p-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Developer Notes: Domain Generation Algorithm</h3>
                    <p className="text-gray-700 mb-4">
                        In a production application, domain generation would involve:
                    </p>
                    <ul className="list-disc pl-5 space-y-2 text-gray-700">
                        <li>
                            <span className="font-medium">Keyword Analysis:</span> Processing user input to identify primary themes and semantically related terms
                        </li>
                        <li>
                            <span className="font-medium">Pattern Generation:</span> Creating various combinations (prefix, suffix, compound words)
                        </li>
                        <li>
                            <span className="font-medium">Availability Check:</span> Querying WHOIS databases or registrar APIs to verify domain availability
                        </li>
                        <li>
                            <span className="font-medium">Valuation Model:</span> Applying machine learning models to estimate market value based on factors like length, keywords, etc.
                        </li>
                        <li>
                            <span className="font-medium">Brandability Score:</span> Evaluating pronounceability, memorability, and uniqueness
                        </li>
                    </ul>

                    <div className="mt-6 p-4 bg-gray-50 rounded-md border border-gray-200">
                        <h4 className="text-md font-semibold text-gray-800 mb-2">Implementation Note:</h4>
                        <p className="text-sm text-gray-600">
                            This example uses a simplified mock implementation. In a real application, you would:
                        </p>
                        <ul className="list-disc pl-5 space-y-1 text-sm text-gray-600">
                            <li>Connect to domain registrar APIs (like Namecheap, GoDaddy) to check real-time availability</li>
                            <li>Implement more sophisticated NLP for keyword processing and suggestion generation</li>
                            <li>Cache results to improve performance and reduce API calls</li>
                            <li>Add pagination for managing large result sets</li>
                        </ul>
                        <p className="text-sm text-gray-600 mt-2">
                            <a
                                href="https://github.com/domainr/domainr-search-box"
                                className="text-indigo-600 hover:text-indigo-800"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Explore domain search implementations →
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DiscoveryPage;
