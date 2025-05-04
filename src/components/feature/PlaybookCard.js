
import React from 'react';
import Card from '../common/Card';
import Button from '../common/Button';

/**
 * PlaybookCard Component
 * 
 * Displays the sales playbook for a domain.
 * 
 * Design Decision: Organizing the playbook content into distinct sections
 * to make it easier to read and navigate.
 */
const PlaybookCard = ({
    playbook,
    onGenerateProspects
}) => {
    if (!playbook) return null;

    // Format the price range as currency
    const formatCurrency = (value) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            maximumFractionDigits: 0
        }).format(value);
    };

    return (
        <Card title="Sales Playbook">
            <div className="mb-6">
                <h2 className="text-xl font-bold text-gray-800 mb-1">{playbook.domain}</h2>
            </div>

            {/* Target Industries */}
            <div className="mb-6">
                <h3 className="text-gray-800 font-semibold mb-3">Target Industries</h3>
                <div className="flex flex-wrap gap-2">
                    {playbook.targetIndustries.map((industry, index) => (
                        <span
                            key={index}
                            className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm"
                        >
                            {industry}
                        </span>
                    ))}
                </div>
            </div>

            {/* Price Range */}
            <div className="mb-6">
                <h3 className="text-gray-800 font-semibold mb-3">Suggested Price Range</h3>
                <div className="flex items-center justify-between px-4 py-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-600">Minimum</span>
                    <span className="font-medium text-gray-800">{formatCurrency(playbook.priceRange.min)}</span>
                </div>
                <div className="h-1 bg-indigo-100 my-2 rounded">
                    <div
                        className="h-1 bg-indigo-600 rounded"
                        style={{ width: '60%' }}
                    ></div>
                </div>
                <div className="flex items-center justify-between px-4 py-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-600">Maximum</span>
                    <span className="font-medium text-gray-800">{formatCurrency(playbook.priceRange.max)}</span>
                </div>
            </div>

            {/* Outreach Strategy */}
            <div className="mb-6">
                <h3 className="text-gray-800 font-semibold mb-3">Outreach Strategy</h3>

                <div className="mb-3">
                    <h4 className="text-gray-700 text-sm font-medium mb-2">Recommended Platforms</h4>
                    <div className="flex flex-wrap gap-2">
                        {playbook.outreachStrategy.platforms.map((platform, index) => (
                            <span
                                key={index}
                                className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm"
                            >
                                {platform}
                            </span>
                        ))}
                    </div>
                </div>

                <div>
                    <h4 className="text-gray-700 text-sm font-medium mb-2">Email Template</h4>
                    <div className="p-4 bg-gray-50 rounded-lg text-gray-700 whitespace-pre-line">
                        {playbook.outreachStrategy.emailTemplate}
                    </div>
                </div>
            </div>

            {/* Pitch Examples */}
            <div className="mb-6">
                <h3 className="text-gray-800 font-semibold mb-3">Pitch Examples</h3>
                <ul className="space-y-3">
                    {playbook.pitchExamples.map((pitch, index) => (
                        <li key={index} className="flex">
                            <span className="mr-2 text-indigo-600">•</span>
                            <span className="text-gray-700">{pitch}</span>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Action Buttons */}
            <div className="mt-6 pt-4 border-t">
                <Button
                    variant="primary"
                    onClick={onGenerateProspects}
                    fullWidth
                >
                    Find Potential Buyers
                </Button>
            </div>
        </Card>
    );
};

export default PlaybookCard;
