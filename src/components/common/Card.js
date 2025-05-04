import React from 'react';

/**
 * Card Component
 * 
 * A reusable card component for consistent content containers throughout the application.
 * 
 * Design Decision: Cards provide visual separation of content and maintain
 * consistent spacing and styling across the application.
 */
const Card = ({
    title,
    children,
    footer,
    className = ''
}) => {
    return (
        <div className={`bg-white rounded-lg shadow-md overflow-hidden ${className}`}>
            {title && (
                <div className="px-6 py-4 bg-gray-50 border-b">
                    <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
                </div>
            )}
            <div className="px-6 py-4">
                {children}
            </div>
            {footer && (
                <div className="px-6 py-4 bg-gray-50 border-t">
                    {footer}
                </div>
            )}
        </div>
    );
};

export default Card;