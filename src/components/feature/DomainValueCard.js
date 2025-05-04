import React from 'react';
import { Link } from 'react-router-dom';
import Card from '../common/Card';
import Button from '../common/Button';

/**
 * DomainValueCard Component
 * 
 * Displays the valuation results for a domain name.
 * 
 * Design Decision: Using a card layout to clearly present the domain valuation
 * with supporting details and factors that influence the value.
 */
const DomainValueCard = ({ valuation }) => {
    if (!valuation) return null;

    // Format the estimated value as currency
    const formattedValue = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 0
    }).format(valuation.estimatedValue);

    // Helper function to render a factor with a rating system
    const renderFactor = (label, value, rating) => {
        let ratingDisplay;

        if (typeof rating === 'number') {
            // Numeric rating (e.g., 1-10)
            ratingDisplay = (
                <div className="flex items-center">
                    {[...Array(10)].map((_, i) => (
                        <div
                            key={i}
                            className={`h-2 w-2 rounded-full mx-0.5 ${i < rating ? 'bg-indigo-600' : 'bg-gray-200'
                                }`}
                        ></div>
                    ))}
                </div>
            );
        } else {
            // Text value
            ratingDisplay = <span className="text-gray-700">{value}</span>;
        }

        return (
            <div className="flex justify-between items-center mb-2">
                <span className="text-gray-600">{label}</span>
                {ratingDisplay}
            </div>
        );
    };

    return (
        <Card title="Domain Valuation Results">
            <div className="mb-6 text-center">
                <h2 className="text-xl font-bold text-gray-800 mb-1">{valuation.domain}</h2>
                <div className="text-3xl font-bold text-indigo-600">{formattedValue}</div>
            </div>

            <div className="border-t pt-4">
                <h3 className="text-gray-800 font-semibold mb-3">Value Factors</h3>

                {renderFactor('Domain Length', valuation.factors.length,
                    10 - Math.min(9, valuation.factors.length - 1))}

                {renderFactor('TLD Value', valuation.factors.tld,
                    valuation.factors.tld === 'com' ? 10 :
                        valuation.factors.tld === 'io' || valuation.factors.tld === 'ai' ? 8 :
                            valuation.factors.tld === 'net' || valuation.factors.tld === 'org' ? 7 : 5)}

                {renderFactor('Keyword Value', valuation.factors.keywords, null)}

                {renderFactor('Brandability', 'Score', valuation.factors.brandability)}
            </div>

            <div className="mt-6 pt-4 border-t border-gray-200">
                <h3 className="text-gray-800 font-semibold mb-3">Landing Page Preview</h3>
                <div className="bg-gray-100 p-4 rounded-md text-center">
                    <p className="text-gray-600 mb-3">See how this domain could look as a website</p>
                    <div className="relative mb-4 bg-white rounded-md shadow-sm overflow-hidden" style={{ paddingBottom: '56.25%' }}>
                        <div className="absolute inset-0 p-4 flex flex-col items-center justify-center">
                            <div className="w-full h-8 bg-indigo-600 mb-4 rounded-md"></div>
                            <div className="w-3/4 h-16 bg-gray-200 mb-4 rounded-md"></div>
                            <div className="w-1/2 h-10 bg-indigo-500 mb-4 rounded-md"></div>
                            <div className="w-full flex justify-between">
                                <div className="w-[30%] h-24 bg-gray-200 rounded-md"></div>
                                <div className="w-[30%] h-24 bg-gray-200 rounded-md"></div>
                                <div className="w-[30%] h-24 bg-gray-200 rounded-md"></div>
                            </div>
                        </div>
                    </div>
                    <Link to="/landing-page">
                        <Button size="sm" variant="primary">Generate Landing Pages</Button>
                    </Link>
                </div>
            </div>

            <div className="mt-4 text-sm text-gray-500">
                Last updated: {new Date(valuation.timestamp).toLocaleString()}
            </div>
        </Card>
    );
};

export default DomainValueCard;
