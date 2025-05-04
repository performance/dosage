import React from 'react';

/**
 * Select Component
 * 
 * A reusable select dropdown component with label and error support.
 * 
 * Design Decision: Consistent styling with other form elements
 * while providing dropdown functionality.
 */
const Select = ({
    id,
    label,
    value,
    onChange,
    options,
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
            <select
                id={id}
                value={value}
                onChange={onChange}
                className={`w-full px-4 py-2 border rounded-md bg-white focus:outline-none focus:ring-2 
            ${error ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-indigo-200'}`}
                {...props}
            >
                {placeholder && (
                    <option value="" disabled>
                        {placeholder}
                    </option>
                )}
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
            {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
        </div>
    );
};

export default Select;
