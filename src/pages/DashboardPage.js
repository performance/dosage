import React from 'react';
import { Link } from 'react-router-dom';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import { useAuth } from '../context/AuthContext';
import { useDomain } from '../context/DomainContext';

/**
 * DashboardPage Component
 * 
 * This page displays the user's domain portfolio, recent activities,
 * and account information.
 * 
 * Design Decision: Using a multi-section dashboard layout to provide
 * quick access to key information and actions, with clear visual hierarchy.
 */
const DashboardPage = () => {
    const { user } = useAuth();
    const { domains, valuationResults } = useDomain();

    // Mock recent activity data
    const recentActivity = [
        { type: 'valuation', domain: 'techinnovate.ai', date: new Date(2025, 4, 1) },
        { type: 'prospect', domain: 'healthplus.com', date: new Date(2025, 3, 29) },
        { type: 'playbook', domain: 'ecotravel.org', date: new Date(2025, 3, 27) },
        { type: 'discovery', query: 'finance tech', date: new Date(2025, 3, 25) }
    ];

    // Mock portfolio data
    const portfolio = domains.length > 0 ? domains : [
        { name: 'techinnovate.ai', value: 4500, addedDate: new Date(2025, 2, 15) },
        { name: 'healthplus.com', value: 12000, addedDate: new Date(2025, 1, 20) },
        { name: 'ecotravel.org', value: 2800, addedDate: new Date(2025, 0, 10) }
    ];

    // Format date to display
    const formatDate = (date) => {
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    };

    // Get activity icon based on type
    const getActivityIcon = (type) => {
        switch (type) {
            case 'valuation':
                return (
                    <div className="p-2 rounded-full bg-indigo-100 text-indigo-600">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                        </svg>
                    </div>
                );
            case 'prospect':
                return (
                    <div className="p-2 rounded-full bg-green-100 text-green-600">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                    </div>
                );
            case 'playbook':
                return (
                    <div className="p-2 rounded-full bg-blue-100 text-blue-600">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                    </div>
                );
            case 'discovery':
                return (
                    <div className="p-2 rounded-full bg-purple-100 text-purple-600">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="max-w-6xl mx-auto">
            <div className="md:flex md:items-center md:justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
                    <p className="mt-1 text-gray-600">Welcome back, {user?.name || 'User'}!</p>
                </div>
                <div className="mt-4 md:mt-0 flex">
                    <Link to="/valuation">
                        <Button variant="primary" className="mr-3">Value a Domain</Button>
                    </Link>
                    <Link to="/discovery">
                        <Button variant="outline">Discover Domains</Button>
                    </Link>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {/* Stats Card 1 */}
                <Card>
                    <div className="text-center">
                        <h3 className="text-lg font-medium text-gray-500">Domains in Portfolio</h3>
                        <p className="mt-2 text-3xl font-bold text-gray-900">{portfolio.length}</p>
                    </div>
                </Card>

                {/* Stats Card 2 */}
                <Card>
                    <div className="text-center">
                        <h3 className="text-lg font-medium text-gray-500">Total Portfolio Value</h3>
                        <p className="mt-2 text-3xl font-bold text-indigo-600">
                            {new Intl.NumberFormat('en-US', {
                                style: 'currency',
                                currency: 'USD',
                                maximumFractionDigits: 0
                            }).format(portfolio.reduce((sum, domain) => sum + domain.value, 0))}
                        </p>
                    </div>
                </Card>

                {/* Stats Card 3 */}
                <Card>
                    <div className="text-center">
                        <h3 className="text-lg font-medium text-gray-500">Account Type</h3>
                        <p className="mt-2 text-3xl font-bold text-gray-900">{user?.plan || 'Free'}</p>
                        <Link to="/pricing" className="text-sm text-indigo-600 hover:text-indigo-800 mt-2 inline-block">
                            Upgrade Plan →
                        </Link>
                    </div>
                </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                {/* Recent Activity */}
                <div className="lg:col-span-1">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Activity</h2>
                    <Card>
                        <ul className="divide-y divide-gray-200">
                            {recentActivity.map((activity, index) => (
                                <li key={index} className="py-4">
                                    <div className="flex items-center">
                                        {getActivityIcon(activity.type)}
                                        <div className="ml-3">
                                            <p className="text-sm font-medium text-gray-900">
                                                {activity.type === 'valuation' && `Valued ${activity.domain}`}
                                                {activity.type === 'prospect' && `Found prospects for ${activity.domain}`}
                                                {activity.type === 'playbook' && `Created playbook for ${activity.domain}`}
                                                {activity.type === 'discovery' && `Searched for "${activity.query}"`}
                                            </p>
                                            <p className="text-sm text-gray-500">{formatDate(activity.date)}</p>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                        <div className="mt-4 pt-4 border-t">
                            <Link to="/history" className="text-sm text-indigo-600 hover:text-indigo-800">
                                View all activity →
                            </Link>
                        </div>
                    </Card>
                </div>

                {/* Domain Portfolio */}
                <div className="lg:col-span-2">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">Domain Portfolio</h2>
                    <Card>
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Domain
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Estimated Value
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Added
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {portfolio.map((domain, index) => (
                                        <tr key={index}>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                {domain.name}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {new Intl.NumberFormat('en-US', {
                                                    style: 'currency',
                                                    currency: 'USD',
                                                    maximumFractionDigits: 0
                                                }).format(domain.value)}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {formatDate(domain.addedDate)}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                                                <div className="flex space-x-2">
                                                    <Link to={`/playbook?domain=${domain.name}`} className="text-indigo-600 hover:text-indigo-900">
                                                        Playbook
                                                    </Link>
                                                    <Link to={`/prospects?domain=${domain.name}`} className="text-indigo-600 hover:text-indigo-900">
                                                        Prospects
                                                    </Link>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="mt-4 pt-4 border-t flex justify-between items-center">
                            <Link to="/portfolio" className="text-sm text-indigo-600 hover:text-indigo-800">
                                Manage portfolio →
                            </Link>
                            <Button
                                variant="outline"
                                size="sm"
                            >
                                Add Domain
                            </Button>
                        </div>
                    </Card>
                </div>
            </div>

            {/* Developer Notes - Educational Content */}
            <div className="mt-8 p-6 bg-white rounded-lg shadow-md">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Developer Notes: Dashboard Design Principles</h3>
                <p className="text-gray-700 mb-4">
                    The dashboard is designed with several important UX principles in mind:
                </p>
                <ul className="list-disc pl-5 space-y-2 text-gray-700">
                    <li>
                        <span className="font-medium">Information Hierarchy:</span> Most important stats are top-level, with detailed information available in cards below
                    </li>
                    <li>
                        <span className="font-medium">Progressive Disclosure:</span> Only showing essential information at first, with options to drill down via links
                    </li>
                    <li>
                        <span className="font-medium">Task-Oriented Layout:</span> Providing quick access to common actions from the dashboard
                    </li>
                    <li>
                        <span className="font-medium">Visual Consistency:</span> Using the same card components, typography, and spacing throughout the interface
                    </li>
                    <li>
                        <span className="font-medium">Responsive Design:</span> Adapting the layout for different screen sizes while maintaining usability
                    </li>
                </ul>
                <div className="mt-6 p-4 bg-gray-50 rounded-md border border-gray-200">
                    <h4 className="text-md font-semibold text-gray-800 mb-2">Implementation Notes:</h4>
                    <p className="text-sm text-gray-600">
                        This dashboard demonstrates several important React and UI patterns:
                    </p>
                    <ul className="list-disc pl-5 space-y-1 text-sm text-gray-600">
                        <li>Grid-based layout using Tailwind CSS grid utilities for responsive design</li>
                        <li>Consistent use of Card components to create visual grouping</li>
                        <li>Conditional rendering based on user data and authentication state</li>
                        <li>Data formatting for dates and currency values</li>
                        <li>Icon-based visual indicators for different activity types</li>
                    </ul>
                    <p className="text-sm text-gray-600 mt-2">
                        <a
                            href="https://tailwindcss.com/docs/grid-template-columns"
                            className="text-indigo-600 hover:text-indigo-800"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Learn more about Tailwind grid layouts →
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;
