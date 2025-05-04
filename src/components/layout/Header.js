// Header.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

/**
 * Header Component
 * 
 * This component renders the application header with navigation links
 * and user authentication controls.
 * 
 * Design Decision: Using a responsive design pattern with a hamburger menu
 * for mobile screens to ensure usability across devices.
 */
const Header = () => {
    const { user, logout, isAuthenticated } = useAuth();
    const navigate = useNavigate();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen);
    };

    return (
        <header className="bg-white shadow-md">
            <div className="container mx-auto px-4 py-4">
                <div className="flex justify-between items-center">
                    {/* Logo and Brand */}
                    <div className="flex items-center">
                        <Link to="/" className="text-2xl font-bold text-gray-900">DomainIntel</Link>
                    </div>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex space-x-8">
                        <Link to="/valuation" className="text-gray-700 hover:text-indigo-600">Valuation</Link>
                        <Link to="/discovery" className="text-gray-700 hover:text-indigo-600">Discovery</Link>
                        <Link to="/playbook" className="text-gray-700 hover:text-indigo-600">Playbook</Link>
                        <Link to="/landing-page" className="text-gray-700 hover:text-indigo-600">Landing Pages</Link>
                        <Link to="/prospects" className="text-gray-700 hover:text-indigo-600">Prospects</Link>
                        {isAuthenticated && (
                            <Link to="/dashboard" className="text-gray-700 hover:text-indigo-600">Dashboard</Link>
                        )}
                    </nav>

                    {/* User Authentication */}
                    <div className="hidden md:flex items-center space-x-4">
                        {isAuthenticated ? (
                            <>
                                <span className="text-gray-700">{user.name}</span>
                                <button
                                    onClick={handleLogout}
                                    className="py-2 px-4 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link to="/login" className="text-gray-700 hover:text-indigo-600">Login</Link>
                                <Link
                                    to="/register"
                                    className="py-2 px-4 bg-indigo-600 text-white rounded hover:bg-indigo-700"
                                >
                                    Sign Up
                                </Link>
                            </>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <button
                            onClick={toggleMobileMenu}
                            className="text-gray-700 hover:text-indigo-600 focus:outline-none"
                        >
                            <svg
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                {mobileMenuOpen ? (
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                ) : (
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {mobileMenuOpen && (
                    <div className="md:hidden mt-4 py-2 border-t border-gray-200">
                        <Link
                            to="/valuation"
                            className="block py-2 text-gray-700 hover:text-indigo-600"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Valuation
                        </Link>
                        <Link
                            to="/discovery"
                            className="block py-2 text-gray-700 hover:text-indigo-600"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Discovery
                        </Link>
                        <Link
                            to="/playbook"
                            className="block py-2 text-gray-700 hover:text-indigo-600"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Playbook
                        </Link>
                        <Link
                            to="/landing-page"
                            className="block py-2 text-gray-700 hover:text-indigo-600"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Landing Pages
                        </Link>
                        <Link
                            to="/prospects"
                            className="block py-2 text-gray-700 hover:text-indigo-600"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Prospects
                        </Link>
                        {isAuthenticated && (
                            <Link
                                to="/dashboard"
                                className="block py-2 text-gray-700 hover:text-indigo-600"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                Dashboard
                            </Link>
                        )}

                        {/* Mobile Authentication */}
                        <div className="pt-4 mt-2 border-t border-gray-200">
                            {isAuthenticated ? (
                                <>
                                    <div className="py-2 text-gray-700">{user.name}</div>
                                    <button
                                        onClick={() => {
                                            handleLogout();
                                            setMobileMenuOpen(false);
                                        }}
                                        className="py-2 px-4 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
                                    >
                                        Logout
                                    </button>
                                </>
                            ) : (
                                <>
                                    <Link
                                        to="/login"
                                        className="block py-2 text-gray-700 hover:text-indigo-600"
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        Login
                                    </Link>
                                    <Link
                                        to="/register"
                                        className="mt-2 block py-2 px-4 bg-indigo-600 text-white rounded hover:bg-indigo-700 text-center"
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        Sign Up
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </header>
    );
};

export default Header;
