import React, { useState } from 'react';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import Card from '../components/common/Card';
import Loader from '../components/common/Loader';
import PlaybookCard from '../components/feature/PlaybookCard';
import { useDomain } from '../context/DomainContext';
import { useNavigate } from 'react-router-dom';

/**
 * PlaybookPage Component
 * 
 * This page allows users to generate a sales playbook for a domain,
 * with strategies for selling and targeting potential buyers.
 * 
 * Design Decision: Using a straightforward workflow where users enter
 * a domain, generate a playbook, and then have clear options to take
 * next steps like finding prospects.
 */
const PlaybookPage = () => {
    const { generatePlaybook, playbook, generateProspects, currentDomain } = useDomain();
    const navigate = useNavigate();

    const [domain, setDomain] = useState(currentDomain || '');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

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
            await generatePlaybook(domain);
        } catch (err) {
            setError('Error generating playbook. Please try again.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    // Handle finding prospects
    const handleFindProspects = async () => {
        if (!playbook) return;

        try {
            setLoading(true);
            await generateProspects(playbook.domain);
            navigate('/prospects');
        } catch (err) {
            console.error('Error finding prospects:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">Sales Playbook Generator</h1>

            <Card className="mb-8">
                <form onSubmit={handleSubmit}>
                    <div className="mb-6">
                        <label htmlFor="domain" className="block text-gray-700 font-medium mb-2">
                            Enter a domain to generate a sales playbook:
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
                            We'll create a customized selling strategy with target industries and outreach templates.
                        </p>
                    </div>

                    <Button
                        type="submit"
                        variant="primary"
                        disabled={loading}
                    >
                        {loading ? 'Generating Playbook...' : 'Generate Sales Playbook'}
                    </Button>
                </form>
            </Card>

            {/* Loading State */}
            {loading && (
                <div className="my-8">
                    <Loader text="Creating your custom sales strategy..." />
                </div>
            )}

            {/* Playbook Display */}
            {!loading && playbook && (
                <div className="my-8">
                    <PlaybookCard
                        playbook={playbook}
                        onGenerateProspects={handleFindProspects}
                    />
                </div>
            )}

            {/* Informational Section */}
            <div className="mt-12">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">How Sales Playbooks Work</h2>
                <div className="bg-white rounded-lg shadow-md p-6">
                    <p className="text-gray-700 mb-4">
                        Our AI-powered sales playbooks help you maximize the value of your domains by:
                    </p>
                    <ul className="list-disc pl-5 space-y-2 text-gray-700">
                        <li>
                            <span className="font-medium">Identifying Target Industries:</span> Finding the sectors where your domain would be most valuable
                        </li>
                        <li>
                            <span className="font-medium">Setting Price Expectations:</span> Suggesting appropriate asking prices based on market data
                        </li>
                        <li>
                            <span className="font-medium">Creating Outreach Templates:</span> Providing customized email templates to approach potential buyers
                        </li>
                        <li>
                            <span className="font-medium">Crafting Sales Pitches:</span> Developing compelling value propositions for your domain
                        </li>
                    </ul>

                    {/* Developer Notes - Educational Content */}
                    <div className="mt-6 p-4 bg-gray-50 rounded-md border border-gray-200">
                        <h3 className="text-md font-semibold text-gray-800 mb-2">Developer Notes:</h3>
                        <p className="text-sm text-gray-600 mb-2">
                            Key React patterns demonstrated in this component:
                        </p>
                        <ul className="list-disc pl-5 space-y-1 text-sm text-gray-600">
                            <li>
                                Leveraging React Context for state sharing between components (playbook data)
                            </li>
                            <li>
                                Controlled form handling with validation
                            </li>
                            <li>
                                Conditional rendering based on loading and data states
                            </li>
                            <li>
                                Programmatic navigation using React Router's useNavigate hook
                            </li>
                            <li>
                                Component composition with props passing (PlaybookCard receives data and callbacks)
                            </li>
                        </ul>
                        <p className="text-sm text-gray-600 mt-2">
                            <a
                                href="https://react.dev/learn/reusing-logic-with-custom-hooks"
                                className="text-indigo-600 hover:text-indigo-800"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Learn more about React custom hooks →
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PlaybookPage;
