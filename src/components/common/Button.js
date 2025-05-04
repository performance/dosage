import React from 'react';

/**
 * Button Component
 * 
 * A reusable button component that supports different variants and sizes.
 * 
 * Design Decision: Creating a reusable button component helps maintain
 * consistency across the UI and makes it easier to update styles globally.
 * 
 * @param {object} props - The component props
 * @param {string} props.variant - The button variant (primary, secondary, outline)
 * @param {string} props.size - The button size (sm, md, lg)
 * @param {boolean} props.fullWidth - Whether the button should take full width
 * @param {function} props.onClick - The click handler function
 * @param {React.ReactNode} props.children - The button content
 */
const Button = ({
    variant = 'primary',
    size = 'md',
    fullWidth = false,
    onClick,
    children,
    ...props
}) => {
    // Base classes that apply to all buttons
    const baseClasses = 'rounded font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2';

    // Variant specific classes
    const variantClasses = {
        primary: 'bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500',
        secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-500',
        outline: 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 focus:ring-gray-500',
        danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
        success: 'bg-green-600 text-white hover:bg-green-700 focus:ring-green-500'
    };

    // Size specific classes
    const sizeClasses = {
        sm: 'py-1 px-3 text-sm',
        md: 'py-2 px-4 text-base',
        lg: 'py-3 px-6 text-lg'
    };

    // Width classes
    const widthClasses = fullWidth ? 'w-full' : '';

    // Disabled state
    const disabledClasses = props.disabled ? 'opacity-50 cursor-not-allowed' : '';

    // Combine all classes
    const classes = `
      ${baseClasses}
      ${variantClasses[variant] || variantClasses.primary}
      ${sizeClasses[size] || sizeClasses.md}
      ${widthClasses}
      ${disabledClasses}
    `;

    return (
        <button
            className={classes}
            onClick={onClick}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;
