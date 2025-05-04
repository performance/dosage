import React from 'react';

/**
 * Loader Component
 * 
 * A reusable loading spinner component with optional text.
 * 
 * Design Decision: Creating a consistent loading experience for asynchronous operations.
 * Using a spinner with optional text provides feedback to users during network requests.
 */
const Loader = ({ text = 'Loading...' }) => {
    return (
        <div className="flex flex-col items-center justify-center p-4">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-600 mb-4"></div>
            {text && <p className="text-gray-600">{text}</p>}
        </div>
    );
};

export default Loader;
