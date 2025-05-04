import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import Card from '../components/common/Card';
import Select from '../components/common/Select';
import Loader from '../components/common/Loader';
import { useDomain } from '../context/DomainContext';
import { isValidDomain } from '../utils/validation';

/**
 * LandingPageGenerator Component
 * 
 * This page allows users to generate sample landing page designs
 * for a domain across different industries.
 * 
 * Design Decision: The page uses a simple form interface for domain input
 * and industry selection, followed by a gallery of generated landing page
 * mockups that can be downloaded or shared.
 */
const LandingPageGenerator = () => {
    const { currentDomain, setCurrentDomain, landingPageMockups, generateLandingPageMockups } = useDomain();
    const [domain, setDomain] = useState(currentDomain || '');
    const [selectedIndustry, setSelectedIndustry] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // Industry options
    const industries = [
        { value: 'healthcare', label: 'Healthcare' },
        { value: 'technology', label: 'Technology' },
        { value: 'finance', label: 'Finance & Banking' },
        { value: 'education', label: 'Education' },
        { value: 'ecommerce', label: 'E-Commerce' },
        { value: 'realestate', label: 'Real Estate' },
        { value: 'travel', label: 'Travel & Hospitality' },
        { value: 'food', label: 'Food & Restaurant' }
    ];

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Basic validation
        if (!domain) {
            setError('Please enter a domain name');
            return;
        }

        // Domain format validation
        if (!isValidDomain(domain)) {
            setError('Please enter a valid domain name');
            return;
        }

        if (!selectedIndustry) {
            setError('Please select an industry');
            return;
        }

        setError('');
        setLoading(true);

        try {
            await generateLandingPageMockups(domain, selectedIndustry);
        } catch (err) {
            setError('Error generating landing page mockups. Please try again.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    // Handle download mockup
    const handleDownload = (mockupId) => {
        // In a real implementation, this would download the mockup
        alert(`Downloading mockup ${mockupId}. This would be a real download in the production version.`);
    };

    // Handle share mockup
    const handleShare = (mockupId) => {
        // In a real implementation, this would open a share dialog
        alert(`Sharing mockup ${mockupId}. This would open a share dialog in the production version.`);
    };

    return (
        <div className="max-w-6xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">Landing Page Generator</h1>
            <p className="text-lg text-gray-600 mb-8">
                Visualize how your domain could look as a website across different industries.
                Generate professional landing page mockups to help sell or develop your domain.
            </p>

            {/* Generator Form */}
            <Card className="mb-8">
                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div>
                            <label htmlFor="domain" className="block text-gray-700 font-medium mb-2">
                                Domain Name:
                            </label>
                            <Input
                                id="domain"
                                type="text"
                                placeholder="example.com"
                                value={domain}
                                onChange={(e) => setDomain(e.target.value)}
                                error={error && error.includes('domain') ? error : ''}
                            />
                        </div>
                        <div>
                            <label htmlFor="industry" className="block text-gray-700 font-medium mb-2">
                                Target Industry:
                            </label>
                            <Select
                                id="industry"
                                options={industries}
                                value={selectedIndustry}
                                onChange={(e) => setSelectedIndustry(e.target.value)}
                                placeholder="Select an industry"
                                error={error && error.includes('industry') ? error : ''}
                            />
                        </div>
                    </div>

                    <Button
                        type="submit"
                        variant="primary"
                        fullWidth
                        disabled={loading}
                    >
                        {loading ? 'Generating Mockups...' : 'Generate Landing Page Mockups'}
                    </Button>
                </form>
            </Card>

            {/* Loading State */}
            {loading && (
                <div className="my-12 text-center">
                    <Loader text="Generating landing page designs..." />
                    <p className="mt-4 text-gray-600">
                        This may take a moment as we create custom designs for your domain.
                    </p>
                </div>
            )}

            {/* Results - Mockup Gallery */}
            {!loading && landingPageMockups.length > 0 && (
                <div className="mt-12">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">
                        Landing Page Mockups for {currentDomain}
                    </h2>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
                        {landingPageMockups.map((mockup) => (
                            <Card key={mockup.id} className="overflow-hidden">
                                <div className="relative mb-4" style={{ paddingBottom: '56.25%' }}>
                                    <img
                                        src={mockup.imageUrl}
                                        alt={mockup.title}
                                        className="absolute inset-0 object-cover w-full h-full rounded-md"
                                    />
                                </div>
                                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                                    {mockup.title}
                                </h3>
                                <p className="text-gray-600 mb-4">
                                    {mockup.description}
                                </p>
                                <div className="mb-4">
                                    <h4 className="text-sm font-medium text-gray-700 mb-2">Features:</h4>
                                    <ul className="list-disc pl-5 text-sm text-gray-600">
                                        {mockup.features.map((feature, index) => (
                                            <li key={index}>{feature}</li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="flex space-x-2">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => handleDownload(mockup.id)}
                                        className="flex-1"
                                    >
                                        Download
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => handleShare(mockup.id)}
                                        className="flex-1"
                                    >
                                        Share
                                    </Button>
                                </div>
                            </Card>
                        ))}
                    </div>

                    <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">
                            What's Next?
                        </h3>
                        <p className="text-gray-600 mb-4">
                            Use these mockups to visualize the potential of your domain or to help sell it to prospective buyers.
                        </p>
                        <div className="flex flex-wrap gap-3">
                            <Link to="/valuation">
                                <Button variant="outline" size="sm">
                                    Get Domain Valuation
                                </Button>
                            </Link>
                            <Link to="/playbook">
                                <Button variant="outline" size="sm">
                                    Create Sales Playbook
                                </Button>
                            </Link>
                            <Link to="/prospects">
                                <Button variant="outline" size="sm">
                                    Find Potential Buyers
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            )}

            {/* Educational Content */}
            <div className="mt-12">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                    Why Landing Page Mockups Matter
                </h2>
                <div className="bg-white rounded-lg shadow-md p-6">
                    <p className="text-gray-700 mb-4">
                        Landing page mockups help in several ways:
                    </p>
                    <ul className="list-disc pl-5 space-y-2 text-gray-700">
                        <li>
                            <span className="font-medium">Visualize Potential:</span> Help buyers see the domain's potential in their industry
                        </li>
                        <li>
                            <span className="font-medium">Increase Perceived Value:</span> Professional mockups can increase a domain's perceived value
                        </li>
                        <li>
                            <span className="font-medium">Inspire Development:</span> Provide a starting point for actual website development
                        </li>
                        <li>
                            <span className="font-medium">Marketing Material:</span> Use in sales presentations and outreach emails
                        </li>
                        <li>
                            <span className="font-medium">Cross-Industry Appeal:</span> Demonstrate versatility across different industries
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default LandingPageGenerator;
