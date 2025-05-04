// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage';
import ValuationPage from './pages/ValuationPage';
import DiscoveryPage from './pages/DiscoveryPage';
import PlaybookPage from './pages/PlaybookPage';
import ProspectPage from './pages/ProspectPage';
import DashboardPage from './pages/DashboardPage';
import { DomainProvider } from './context/DomainContext';
import { AuthProvider } from './context/AuthContext';
import './styles/globals.css';

/**
 * Main App component
 * 
 * This component sets up the application routing and wraps the entire app
 * with necessary context providers for state management.
 * 
 * We're using:
 * - React Router for navigation
 * - Context API for state management
 * - A consistent layout with Header and Footer
 */
function App() {
    return (
        <AuthProvider>
            <DomainProvider>
                <Router>
                    <div className="flex flex-col min-h-screen">
                        <Header />
                        <main className="flex-grow container mx-auto px-4 py-8">
                            <Routes>
                                <Route path="/" element={<HomePage />} />
                                <Route path="/valuation" element={<ValuationPage />} />
                                <Route path="/discovery" element={<DiscoveryPage />} />
                                <Route path="/playbook" element={<PlaybookPage />} />
                                <Route path="/prospects" element={<ProspectPage />} />
                                <Route path="/dashboard" element={<DashboardPage />} />
                            </Routes>
                        </main>
                        <Footer />
                    </div>
                </Router>
            </DomainProvider>
        </AuthProvider>
    );
}

export default App;
