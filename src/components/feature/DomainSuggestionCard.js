import React from 'react';
import Card from '../common/Card';
import Button from '../common/Button';

/**
 * DomainSuggestionCard Component
 * 
 * Displays a single domain suggestion with availability and estimated value.
 * 
 * Design Decision: Each suggestion as a separate card provides clear visual 
 * separation and allows for individual actions on each suggestion.
 */
const DomainSuggestionCard = ({
    suggestion,
    onSelectDomain
}) => {
    // Format the estimated value as currency
    const formattedValue = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 0
    }).format(suggestion.estimatedValue);

    return (
        <Card className="h-full flex flex-col">
            <div className="flex-grow">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">{suggestion.name}</h3>

                <div className="mb-4">
                    <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${suggestion.available
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}>
                        {suggestion.available ? 'Available' : 'Unavailable'}
                    </span>
                </div>

                <div className="space-y-2">
                    <div className="flex justify-between items-center">
                        <span className="text-gray-600">Estimated Value</span>
                        <span className="font-medium text-indigo-600">{formattedValue}</span>
                    </div>

                    <div className="flex justify-between items-center">
                        <span className="text-gray-600">Brandability</span>
                        <div className="flex items-center">
                            {[...Array(10)].map((_, i) => (
                                <div
                                    key={i}
                                    className={`h-2 w-2 rounded-full mx-0.5 ${i < suggestion.brandability ? 'bg-indigo-600' : 'bg-gray-200'
                                        }`}
                                ></div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-4 pt-4 border-t flex">
                <Button
                    variant="primary"
                    size="sm"
                    fullWidth
                    onClick={() => onSelectDomain(suggestion)}
                >
                    Select Domain
                </Button>
            </div>
        </Card>
    );
};

export default DomainSuggestionCard;
