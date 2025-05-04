import React from 'react';

/**
 * Input Component
 * 
 * A reusable input component with built-in label and error display.
 * 
 * Design Decision: Creating a reusable input component with consistent styling
 * and behavior to maintain UI consistency and simplify form creation.
 * 
 * @param {object} props - Component props
 * @param {string} props.id - Input ID (required for label association)
 * @param {string} props.label - Input label text
 * @param {string} props.type - Input type (text, email, password, etc.)
 * @param {string} props.value - Input value
 * @param {function} props.onChange - Change handler function
 * @param {string} props.error - Error message to display
 * @param {string} props.placeholder - Input placeholder text
 */
const Input = ({
    id,
    label,
    type = 'text',
    value,
    onChange,
    error,
    placeholder,
    ...props
}) => {
    return (
        <div className="mb-4">
            {label && (
                <label htmlFor={id} className="block text-gray-700 font-medium mb-2">
                    {label}
                </label>
            )}
            <input
                id={id}
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 
            ${error ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-indigo-200'}`}
                {...props}
            />
            {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
        </div>
    );
};

export default Input;
