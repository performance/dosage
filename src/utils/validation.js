

/**
 * Utility functions for validation throughout the application
 * 
 * Design Decision: Centralizing validation logic makes it easier to maintain
 * consistent validation rules across the application.
 */

/**
 * Validates if a string is a valid domain name
 * 
 * @param {string} domain - The domain name to validate
 * @returns {boolean} Whether the domain is valid
 */
export const isValidDomain = (domain) => {
    const domainRegex = /^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9]\.[a-zA-Z]{2,}$/;
    return domainRegex.test(domain);
};

/**
 * Validates if a string is a valid email address
 * 
 * @param {string} email - The email address to validate
 * @returns {boolean} Whether the email is valid
 */
export const isValidEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
};

/**
 * Validates if a password meets minimum strength requirements
 * 
 * @param {string} password - The password to validate
 * @returns {object} Validation result and feedback
 */
export const validatePassword = (password) => {
    const result = {
        valid: false,
        feedback: []
    };

    // Check minimum length
    if (password.length < 8) {
        result.feedback.push('Password must be at least 8 characters long');
    }

    // Check for uppercase letter
    if (!/[A-Z]/.test(password)) {
        result.feedback.push('Password must contain at least one uppercase letter');
    }

    // Check for lowercase letter
    if (!/[a-z]/.test(password)) {
        result.feedback.push('Password must contain at least one lowercase letter');
    }

    // Check for a number
    if (!/\d/.test(password)) {
        result.feedback.push('Password must contain at least one number');
    }

    // Check for a special character
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
        result.feedback.push('Password must contain at least one special character');
    }

    // Valid if no feedback items
    result.valid = result.feedback.length === 0;

    return result;
};

/**
 * Format a number as currency
 * 
 * @param {number} value - The value to format
 * @param {string} currency - The currency code (default: 'USD')
 * @returns {string} Formatted currency string
 */
export const formatCurrency = (value, currency = 'USD') => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency,
        maximumFractionDigits: 0
    }).format(value);
};

/**
 * Format a date to a readable string
 * 
 * @param {Date} date - The date to format
 * @returns {string} Formatted date string
 */
export const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
    });
};
