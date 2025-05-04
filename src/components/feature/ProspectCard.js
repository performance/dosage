import React from 'react';
import Card from '../common/Card';

/**
 * ProspectCard Component
 * 
 * Displays information about a potential buyer for a domain.
 * 
 * Design Decision: Each prospect as a separate card provides clear visual
 * differentiation and allows for focused presentation of contact details.
 */
const ProspectCard = ({ prospect }) => {
    return (
        <Card className="h-full flex flex-col">
            <div className="flex-grow">
                <div className="flex justify-between items-start mb-4">
                    <h3 className="text-lg font-semibold text-gray-800">{prospect.name}</h3>
                    <span className="px-2 py-1 bg-indigo-100 text-indigo-800 rounded text-sm font-medium">
                        {prospect.relevance} / 10
                    </span>
                </div>

                <div className="space-y-3">
                    <div>
                        <span className="text-gray-600 text-sm">Industry</span>
                        <p className="text-gray-800">{prospect.industry}</p>
                    </div>

                    <div>
                        <span className="text-gray-600 text-sm">Website</span>
                        <p className="text-gray-800">{prospect.website}</p>
                    </div>

                    <div>
                        <span className="text-gray-600 text-sm">Contact Person</span>
                        <p className="text-gray-800">{prospect.contactName}</p>
                        <p className="text-gray-600 text-sm">{prospect.contactTitle}</p>
                    </div>

                    <div>
                        <span className="text-gray-600 text-sm">Contact Email</span>
                        <p className="text-gray-800">{prospect.email}</p>
                    </div>
                </div>
            </div>

            <div className="mt-4 pt-4 border-t flex space-x-2">
                <a
                    href={`mailto:${prospect.email}`}
                    className="flex-1 py-2 px-3 bg-indigo-600 text-white rounded hover:bg-indigo-700 text-center text-sm"
                >
                    Send Email
                </a>
                <a
                    href={`https://${prospect.website}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-2 px-3 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 text-center text-sm"
                >
                    Visit Website
                </a>
            </div>
        </Card>
    );
};

export default ProspectCard;
