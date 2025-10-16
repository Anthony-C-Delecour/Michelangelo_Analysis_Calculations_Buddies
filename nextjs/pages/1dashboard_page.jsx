// dashboard_page.jsx

import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios'; // Assuming you use axios for API calls

// --- Constants ---
const BASE_API_URL = 'http://localhost:8000'; // Assuming FastAPI runs on 8000
const ITEMS_PER_PAGE = 7; // Fixed number of bars per page as requested

// --- Custom Components ---

// Component for a single bar of portfolio data
const PortfolioBar = ({ item, onDelete }) => {
  // Utility function to format amount to a local currency string
  const formatAmount = (amount) => new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'THB', // Using THB (Thai Baht) based on the image context
    minimumFractionDigits: 2,
  }).format(amount);

  // Handler for the delete button click
  const handleDelete = () => {
    onDelete(item.id, item.financial_choice);
  };

  return (
    <div className="flex items-center justify-between p-3 my-2 border-b border-gray-200">
      {/* Date & Time Column */}
      <div className="flex flex-col w-1/12 text-sm text-gray-700">
        <span className="font-semibold">{item.date}</span>
        <span className="text-xs">{item.time}</span>
      </div>

      {/* Financial Choice Column */}
      <div className="w-3/12 text-sm font-medium text-black">
        {item.financial_choice}
      </div>

      {/* Type Column */}
      <div className="w-2/12 text-sm text-gray-600">
        {item.type}
      </div>

      {/* Amount Column */}
      <div className="w-3/12 text-sm font-bold text-right">
        {formatAmount(item.amount)}
      </div>

      {/* Per Unit Column */}
      <div className="w-2/12 text-sm text-gray-600 text-right">
        {item.per_unit}
      </div>

      {/* Edit/Delete Icons Column */}
      <div className="flex justify-end w-1/12 space-x-2">
        <button className="text-gray-500 hover:text-blue-600" title="Edit">
          {/* SVG for Edit Icon (Placeholder) */}
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
        </button>
        <button onClick={handleDelete} className="text-gray-500 hover:text-red-600" title="Delete">
          {/* SVG for Delete Icon (Placeholder) */}
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
        </button>
      </div>
    </div>
  );
};


// Component for the Pagination controls
const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null; // Hide if only one page

  // Logic to generate an array of page numbers to display (max 7 pages visible)
  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 7;
    let start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    let end = Math.min(totalPages, start + maxVisible - 1);

    // Adjust start if we're at the end
    if (end - start + 1 < maxVisible) {
      start = Math.max(1, end - maxVisible + 1);
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="flex justify-center items-center py-4 space-x-1">
      {/* Previous Button */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-1 text-sm text-gray-700 bg-gray-100 rounded disabled:opacity-50 hover:bg-gray-200"
      >
        Prev
      </button>

      {/* Page Numbers */}
      {pageNumbers.map(number => (
        <button
          key={number}
          onClick={() => onPageChange(number)}
          className={`px-3 py-1 text-sm rounded transition-colors ${
            number === currentPage
              ? 'bg-green-700 text-white font-bold' // Active button style
              : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-100'
          }`}
        >
          {number}
        </button>
      ))}

      {/* Next Button */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-1 text-sm text-gray-700 bg-gray-100 rounded disabled:opacity-50 hover:bg-gray-200"
      >
        Next
      </button>
    </div>
  );
};

// --- Main Dashboard Page Component ---

const DashboardPage = () => {
  // State for holding the portfolio data for the current page
  const [portfolioData, setPortfolioData] = useState([]);
  // State for current page number
  const [currentPage, setCurrentPage] = useState(1);
  // State for total pages, calculated from API response
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Function to fetch data based on the current page
  const fetchPortfolio = useCallback(async (page) => {
    setIsLoading(true);
    setError(null);
    try {
      // API call with page and limit parameters
      const response = await axios.get(`${BASE_API_URL}/accounting/portfolio`, {
        params: { page: page, limit: ITEMS_PER_PAGE }
      });

      // The API response is structured with a 'data' array and total pages metadata
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

  // Initial data load on component mount and when currentPage changes
  useEffect(() => {
    fetchPortfolio(currentPage);
  }, [fetchPortfolio, currentPage]);

  // Handler for changing the page number
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // Handler for deleting a portfolio item
  const handleDeleteItem = async (id, choice) => {
    if (!window.confirm(`Are you sure you want to delete '${choice}' (ID: ${id})?`)) {
      return;
    }

    try {
      await axios.delete(`${BASE_API_URL}/accounting/delete/${id}`);
      alert(`Item '${choice}' deleted successfully!`);
      // After deletion, re-fetch the data for the current page
      // This ensures the view is updated and pagination is adjusted if needed.
      fetchPortfolio(currentPage);
    } catch (err) {
      console.error('Error deleting item:', err);
      alert('Failed to delete item.');
    }
  };


  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header and Filter/Catalogue bar - Keep existing structure/styling */}
      <header className="bg-white shadow">
        {/* Placeholder for header content: Logo, Dashboard/Manage links */}
      </header>
      
      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {/* Filter/Catalogue Bar - KEEP THIS SECTION AS IS (as requested) */}
        <div className="p-4 bg-white rounded-lg shadow-md mb-6">
          {/* ... existing filter components ... */}
          <div className="flex items-center space-x-2">
             {/* Date, Month, Year, Hour, Minute, Type filters... */}
             {/* ... */}
          </div>
        </div>

        {/* Portfolio List */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Portfolio Dashboard</h2>

          {isLoading && <p className="text-center text-blue-500 py-10">Loading portfolio data...</p>}
          {error && <p className="text-center text-red-500 py-10">Error: {error}</p>}
          
          {/* Data Bars */}
          {!isLoading && portfolioData.length === 0 && !error && (
            <p className="text-center text-gray-500 py-10">No portfolio data found.</p>
          )}

          {!isLoading && portfolioData.map(item => (
            <PortfolioBar key={item.id} item={item} onDelete={handleDeleteItem} />
          ))}

        </div>

        {/* -------------------- PAGINATION COMPONENT BAR -------------------- */}
        {/* Positioned above "SUMMARY" and "ALLOCATION" as requested */}
        <Pagination 
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />

        {/* Summary/Allocation Buttons - KEEP THIS SECTION AS IS (as requested) */}
        <div className="flex justify-center mt-6 space-x-4">
          <button className="px-6 py-2 font-bold text-white bg-green-700 rounded hover:bg-green-800">
            SUMMARY
          </button>
          <button className="px-6 py-2 font-bold text-white bg-green-700 rounded hover:bg-green-800">
            ALLOCATION
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;