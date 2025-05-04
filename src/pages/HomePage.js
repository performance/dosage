import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/common/Button';

/**
 * HomePage Component
 * 
 * The landing page of the application featuring a hero section and feature highlights.
 * 
 * Design Decision: Using a clean, modern landing page design with clear sections
 * and prominent call-to-action buttons to guide users to key features.
 */
const HomePage = () => {
    return (
        <div>
            {/* Hero Section */}
            <section className="py-16 md:py-24">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row items-center">
                        <div className="md:w-1/2 mb-10 md:mb-0">
                            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                                Discover, Value, and Sell Domains with AI-Powered Insights
                            </h1>
                            <p className="text-xl text-gray-600 mb-8">
                                DomainIntel helps domain investors, startups, and marketers find,
                                value, and sell domain names with data-driven strategies.
                            </p>
                            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                                <Link to="/valuation">
                                    <Button size="lg" variant="primary">
                                        Value a Domain
                                    </Button>
                                </Link>
                                <Link to="/discovery">
                                    <Button size="lg" variant="outline">
                                        Discover Domains
                                    </Button>
                                </Link>
                            </div>
                        </div>
                        <div className="md:w-1/2 md:pl-10">
                            <div className="bg-gray-100 p-6 rounded-lg shadow-md">
                                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Quick Domain Valuation</h2>
                                <p className="text-gray-600 mb-4">Enter a domain to get its estimated market value:</p>

                                <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-2">
                                    <input
                                        type="text"
                                        placeholder="example.com"
                                        className="flex-grow px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-200"
                                    />
                                    <Link to="/valuation">
                                        <Button>Value It</Button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Key Features</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {/* Feature 1 */}
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <div className="w-14 h-14 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
                                <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">Domain Valuation</h3>
                            <p className="text-gray-600">
                                Get accurate market valuations for any domain based on multiple factors including length, keywords, and TLD.
                            </p>
                        </div>

                        {/* Feature 2 */}
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <div className="w-14 h-14 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
                                <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">Domain Discovery</h3>
                            <p className="text-gray-600">
                                Find available, brandable domains that match your business, project, or campaign requirements.
                            </p>
                        </div>

                        {/* Feature 3 */}
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <div className="w-14 h-14 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
                                <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">Sales Playbook</h3>
                            <p className="text-gray-600">
                                Generate customized selling strategies for each domain with target industries and outreach templates.
                            </p>
                        </div>

                        {/* Feature 4 */}
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <div className="w-14 h-14 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
                                <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">Prospect Finder</h3>
                            <p className="text-gray-600">
                                Identify potential buyers for your domains with relevance scores and contact information.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* How It Works Section */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">How It Works</h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Step 1 */}
                        <div className="flex flex-col items-center text-center">
                            <div className="w-16 h-16 bg-indigo-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mb-4">
                                1
                            </div>
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">Value Your Domain</h3>
                            <p className="text-gray-600">
                                Enter your domain name to get an instant market valuation based on multiple factors.
                            </p>
                        </div>

                        {/* Step 2 */}
                        <div className="flex flex-col items-center text-center">
                            <div className="w-16 h-16 bg-indigo-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mb-4">
                                2
                            </div>
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">Get Your Playbook</h3>
                            <p className="text-gray-600">
                                Receive a customized selling strategy with target industries and outreach templates.
                            </p>
                        </div>

                        {/* Step 3 */}
                        <div className="flex flex-col items-center text-center">
                            <div className="w-16 h-16 bg-indigo-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mb-4">
                                3
                            </div>
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">Connect with Buyers</h3>
                            <p className="text-gray-600">
                                Find and contact potential buyers who are most likely to be interested in your domain.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 bg-indigo-600">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold text-white mb-6">Ready to Get Started?</h2>
                    <p className="text-xl text-indigo-100 mb-8 max-w-2xl mx-auto">
                        Join thousands of domain investors and businesses who use DomainIntel to find, value, and sell domains.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                        <Link to="/register">
                            <Button size="lg" variant="secondary">
                                Sign Up for Free
                            </Button>
                        </Link>
                        <Link to="/valuation">
                            <Button size="lg" variant="outline" className="bg-transparent text-white border-white hover:bg-indigo-700">
                                Try Domain Valuation
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default HomePage;
