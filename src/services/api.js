
/**
 * API Service
 * 
 * This module handles all API interactions with the backend.
 * 
 * Design Decision: Centralizing API calls in a service module makes it easier
 * to manage endpoints, authentication, error handling, and caching consistently.
 */

// Base API URL - would come from environment variables in a real app
const API_BASE_URL = 'https://api.domainintel.com/v1';

// Helper function to handle API responses
const handleResponse = async (response) => {
    if (!response.ok) {
        // Get error message from the response body
        const errorData = await response.json().catch(() => ({}));
        const errorMessage = errorData.message || `Error: ${response.status} ${response.statusText}`;
        throw new Error(errorMessage);
    }

    return response.json();
};

// Helper function to make authenticated requests
const authRequest = async (endpoint, options = {}) => {
    // Get auth token from localStorage or similar storage
    const token = localStorage.getItem('authToken');

    if (!token) {
        throw new Error('Authentication required');
    }

    // Merge default options with provided options
    const mergedOptions = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
            ...(options.headers || {})
        },
        ...options
    };

    const url = `${API_BASE_URL}${endpoint}`;
    const response = await fetch(url, mergedOptions);
    return handleResponse(response);
};

// Helper function for non-authenticated requests
const publicRequest = async (endpoint, options = {}) => {
    const mergedOptions = {
        headers: {
            'Content-Type': 'application/json',
            ...(options.headers || {})
        },
        ...options
    };

    const url = `${API_BASE_URL}${endpoint}`;
    const response = await fetch(url, mergedOptions);
    return handleResponse(response);
};

/**
 * Authentication API
 */
export const authAPI = {
    login: async (email, password) => {
        return publicRequest('/auth/login', {
            method: 'POST',
            body: JSON.stringify({ email, password })
        });
    },
    
    register: async (userData) => {
        return publicRequest('/auth/register', {
            method: 'POST',
            body: JSON.stringify(userData)
        });
    },
    
    logout: async () => {
        return authRequest('/auth/logout', {
            method: 'POST'
        });
    },
    
    getCurrentUser: async () => {
        return authRequest('/auth/me');
    }
};

/**
 * Domains API
 */
export const domainsAPI = {
    search: async (query, filters = {}) => {
        const queryParams = new URLSearchParams({
            q: query,
            ...filters
        }).toString();
        
        return authRequest(`/domains/search?${queryParams}`);
    },
    
    getDetails: async (domainId) => {
        return authRequest(`/domains/${domainId}`);
    },
    
    getValuation: async (domain) => {
        return authRequest(`/domains/valuation`, {
            method: 'POST',
            body: JSON.stringify({ domain })
        });
    },
    
    getSuggestions: async (keywords, options = {}) => {
        return authRequest('/domains/suggestions', {
            method: 'POST',
            body: JSON.stringify({ keywords, ...options })
        });
    }
};

/**
 * Playbooks API
 */
export const playbooksAPI = {
    getAll: async () => {
        return authRequest('/playbooks');
    },
    
    getById: async (playbookId) => {
        return authRequest(`/playbooks/${playbookId}`);
    },
    
    create: async (playbookData) => {
        return authRequest('/playbooks', {
            method: 'POST',
            body: JSON.stringify(playbookData)
        });
    },
    
    update: async (playbookId, playbookData) => {
        return authRequest(`/playbooks/${playbookId}`, {
            method: 'PUT',
            body: JSON.stringify(playbookData)
        });
    },
    
    delete: async (playbookId) => {
        return authRequest(`/playbooks/${playbookId}`, {
            method: 'DELETE'
        });
    }
};

/**
 * Prospects API
 */
export const prospectsAPI = {
    getAll: async (filters = {}) => {
        const queryParams = new URLSearchParams(filters).toString();
        return authRequest(`/prospects?${queryParams}`);
    },
    
    getById: async (prospectId) => {
        return authRequest(`/prospects/${prospectId}`);
    },
    
    create: async (prospectData) => {
        return authRequest('/prospects', {
            method: 'POST',
            body: JSON.stringify(prospectData)
        });
    },
    
    update: async (prospectId, prospectData) => {
        return authRequest(`/prospects/${prospectId}`, {
            method: 'PUT',
            body: JSON.stringify(prospectData)
        });
    },
    
    delete: async (prospectId) => {
        return authRequest(`/prospects/${prospectId}`, {
            method: 'DELETE'
        });
    }
};

// Export a default API object with all endpoints
export default {
    auth: authAPI,
    domains: domainsAPI,
    playbooks: playbooksAPI,
    prospects: prospectsAPI
};
