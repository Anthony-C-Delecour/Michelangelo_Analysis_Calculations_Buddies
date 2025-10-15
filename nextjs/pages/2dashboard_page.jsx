// dashboard_page.jsx (Updated to include Modals)

import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios'; 
// NOTE: PortfolioBar and Pagination components are assumed to be included here 
// from the previous response or imported from their own files.

const BASE_API_URL = 'http://localhost:8000';
const ITEMS_PER_PAGE = 7; 

// --- MODAL COMPONENTS ---

// 1. Summary Modal Component
const SummaryModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-2xl transform transition-all">
                <div className="flex justify-between items-center border-b pb-3 mb-4">
                    <h2 className="text-2xl font-bold text-green-700">Portfolio Summary</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-red-600 text-3xl leading-none">
                        &times; {/* Close button (X) */}
                    </button>
                </div>
                
                {/* // --- FUTURE IMPLEMENTATION AREA ---
                // This section will contain the summarized chart data and text descriptions.
                */}
                <div className="min-h-64 flex flex-col justify-center items-center p-4 bg-gray-50 border rounded">
                    <p className="text-lg text-gray-700">
                        **Summary Content Placeholder:** All costs summarized into charts and words.
                    </p>
                    <p className="text-sm text-gray-500 mt-2">
                        (Implementation for fetching summary data and rendering charts goes here.)
                    </p>
                </div>
                
            </div>
        </div>
    );
};

// 2. Allocation Modal Component
const AllocationModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-2xl transform transition-all">
                <div className="flex justify-between items-center border-b pb-3 mb-4">
                    <h2 className="text-2xl font-bold text-green-700">Portfolio Allocation by Type</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-red-600 text-3xl leading-none">
                        &times; {/* Close button (X) */}
                    </button>
                </div>
                
                {/* // --- FUTURE IMPLEMENTATION AREA ---
                // This section will contain the allocation chart (e.g., pie chart) and percentage breakdowns.
                */}
                <div className="min-h-64 flex flex-col justify-center items-center p-4 bg-gray-50 border rounded">
                    <p className="text-lg text-gray-700">
                        **Allocation Content Placeholder:** All costs summarized by type (Stocks, Bonds, etc.).
                    </p>
                    <p className="text-sm text-gray-500 mt-2">
                        (Implementation for fetching allocation data and rendering charts goes here.)
                    </p>
                </div>

            </div>
        </div>
    );
};


// --- Main Dashboard Page Component ---
const DashboardPage = () => {
    // Existing states for data, pagination, and loading
    const [portfolioData, setPortfolioData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    // NEW STATES to manage modal visibility
    const [isSummaryOpen, setIsSummaryOpen] = useState(false);
    const [isAllocationOpen, setIsAllocationOpen] = useState(false);

    // --- Data Fetching Logic (Same as before) ---
    const fetchPortfolio = useCallback(async (page) => {
        // ... (existing fetch logic) ...
        setIsLoading(true);
        setError(null);
        try {
          const response = await axios.get(`${BASE_API_URL}/accounting/portfolio`, {
            params: { page: page, limit: ITEMS_PER_PAGE }
          });
    
          setPortfolioData(response.data.data);
          setTotalPages(response.data.total_pages);
          setCurrentPage(page);
        } catch (err) {
          console.error('Error fetching portfolio data:', err);
          setError('Failed to load portfolio data.');
          setPortfolioData([]);
          setTotalPages(1);
        } finally {
          setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchPortfolio(currentPage);
    }, [fetchPortfolio, currentPage]);

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };
    
    // Deletion logic is also unchanged

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header and Filter/Catalogue bar - Keep existing structure/styling */}
            <header className="bg-white shadow">
                {/* ... Header content ... */}
            </header>
            
            <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                {/* Filter/Catalogue Bar (unchanged) */}
                <div className="p-4 bg-white rounded-lg shadow-md mb-6">
                    {/* ... existing filter components ... */}
                </div>

                {/* Portfolio List (unchanged) */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-4">Portfolio Dashboard</h2>
                    
                    {/* Data rendering */}
                    {/* ... (isLoading/error/data mapping logic) ... */}
                    {!isLoading && portfolioData.map(item => (
                        <PortfolioBar key={item.id} item={item} onDelete={() => { /* ... */ }} />
                    ))}
                </div>

                {/* Pagination Component Bar (unchanged) */}
                <Pagination 
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                />

                {/* --- UPDATED Summary/Allocation Buttons --- */}
                <div className="flex justify-center mt-6 space-x-4">
                    {/* On click, open the Summary Modal */}
                    <button 
                        onClick={() => setIsSummaryOpen(true)}
                        className="px-6 py-2 font-bold text-white bg-green-700 rounded hover:bg-green-800"
                    >
                        SUMMARY
                    </button>
                    {/* On click, open the Allocation Modal */}
                    <button 
                        onClick={() => setIsAllocationOpen(true)}
                        className="px-6 py-2 font-bold text-white bg-green-700 rounded hover:bg-green-800"
                    >
                        ALLOCATION
                    </button>
                </div>
            </div>

            {/* Render the Modals */}
            <SummaryModal 
                isOpen={isSummaryOpen} 
                onClose={() => setIsSummaryOpen(false)} 
            />
            <AllocationModal 
                isOpen={isAllocationOpen} 
                onClose={() => setIsAllocationOpen(false)} 
            />
        </div>
    );
};

export default DashboardPage;