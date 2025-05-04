// AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

/**
 * AuthProvider Component
 * 
 * This context provider manages authentication state throughout the application.
 * It provides login, logout functionality and stores user information.
 * 
 * For a production app, you'd want to implement JWT token management,
 * refresh tokens, and secure storage solutions.
 * 
 * @see https://auth0.com/blog/complete-guide-to-react-user-authentication/ - Auth Guide
 */
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Check for existing user session on initial load
    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);

    // Login function
    const login = async (email, password) => {
        try {
            // This would be an API call in a real app
            // Simulating authentication
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Mock successful login
            const userData = {
                id: '123',
                email,
                name: email.split('@')[0],
                plan: 'Pro',
                createdAt: new Date().toISOString()
            };

            setUser(userData);
            localStorage.setItem('user', JSON.stringify(userData));
            return userData;
        } catch (error) {
            console.error('Login error:', error);
            throw error;
        }
    };

    // Logout function
    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
    };

    // Register function
    const register = async (email, password, name) => {
        try {
            // This would be an API call in a real app
            // Simulating registration
            await new Promise(resolve => setTimeout(resolve, 1500));

            // Mock successful registration
            const userData = {
                id: '123',
                email,
                name: name || email.split('@')[0],
                plan: 'Free',
                createdAt: new Date().toISOString()
            };

            setUser(userData);
            localStorage.setItem('user', JSON.stringify(userData));
            return userData;
        } catch (error) {
            console.error('Registration error:', error);
            throw error;
        }
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                loading,
                login,
                logout,
                register,
                isAuthenticated: !!user
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
