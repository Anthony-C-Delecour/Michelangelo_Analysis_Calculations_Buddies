// insert_extract_page.jsx

import React, { useState } from 'react';
import axios from 'axios'; // Assuming you use axios for API calls

const BASE_API_URL = 'http://localhost:8000'; // FastAPI URL

// A list of hardcoded types for the dropdown, based on the image
const ASSET_TYPES = [
    'Real Estate',
    'Commodities',
    'Stocks',
    'Cash Equivalents',
    // Add other types as necessary
];

const InsertExtractPage = () => {
    // State to hold the form data
    const [formData, setFormData] = useState({
        date: '',
        time: '', // Note: Time is separate in the dashboard, but we'll combine/format it on save
        financial_choice: '',
        type: '',
        amount: '',
        per_unit: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Handler for all input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    // Handler for form submission (IMPORT/INSERT button)
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        // --- Data Formatting for API ---
        // 1. Combine Date and Time into the formats expected by the dashboard (and the dummy DB)
        // NOTE: In a production app, you'd send ISO format and let the backend format it.
        // We'll use simple string manipulation for this specific request.
        const [year, month, day] = formData.date.split('-');
        const formattedDate = `${new Date(formData.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).replace(',', '')}`; // e.g., "Jun 10 2023"
        
        // 2. Determine a simple formatted time (e.g., 8:11 AM) - assuming input is HH:MM
        const [hour, minute] = formData.time.split(':');
        const d = new Date(2000, 0, 1, parseInt(hour), parseInt(minute));
        const formattedTime = d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });

        const dataToSend = {
            // Using the formatted strings
            date: formattedDate,
            time: formattedTime, 
            financial_choice: formData.financial_choice,
            type: formData.type,
            amount: parseFloat(formData.amount), // Convert to float/number for API
            per_unit: formData.per_unit,
        };
        // ---------------------------------

        try {
            const response = await axios.post(`${BASE_API_URL}/accounting/insert`, dataToSend);
            alert(`Data imported successfully! ID: ${response.data.id}`);
            // Clear form after successful submission
            setFormData({
                date: '', time: '', financial_choice: '', type: '', amount: '', per_unit: '',
            });
        } catch (error) {
            console.error('Error importing data:', error.response ? error.response.data : error.message);
            alert('Failed to import data. Check console for details.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center">
            {/* Header placeholder */}
            <header className="w-full bg-green-700 text-white shadow-lg">
                <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
                    {/* Placeholder for Logo/Title */}
                    <h1 className="text-2xl font-bold">M.A.C.B.</h1>
                    <nav>
                        <a href="/dashboard_page" className="mx-2 hover:underline">Dashboard</a>
                        <a href="/insert_extract_page" className="mx-2 font-bold underline">Manage</a>
                    </nav>
                </div>
            </header>

            <div className="bg-white p-8 rounded-lg shadow-xl mt-10 w-full max-w-md">
                <h2 className="text-3xl font-bold text-center text-green-800 mb-6">M.A.C.B.</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Date and Time Input */}
                    <div className="flex space-x-4">
                        <div className="flex-1">
                            <label className="block text-sm font-medium text-gray-700">Date</label>
                            {/* NOTE: We use two separate inputs for date and time to capture both elements needed for the API */}
                            <input
                                type="date"
                                name="date"
                                required
                                value={formData.date}
                                onChange={handleChange}
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                            />
                        </div>
                        <div className="flex-1">
                            <label className="block text-sm font-medium text-gray-700">Time</label>
                            <input
                                type="time"
                                name="time"
                                required
                                value={formData.time}
                                onChange={handleChange}
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                            />
                        </div>
                    </div>

                    {/* Financial Choice Input */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Financial Choice</label>
                        <input
                            type="text"
                            name="financial_choice"
                            placeholder="e.g., 1-Bedroom Condo (Bangkok)"
                            required
                            value={formData.financial_choice}
                            onChange={handleChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                        />
                    </div>

                    {/* Type Dropdown */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Type</label>
                        <select
                            name="type"
                            required
                            value={formData.type}
                            onChange={handleChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 appearance-none"
                        >
                            <option value="" disabled>-- Select --</option>
                            {ASSET_TYPES.map(assetType => (
                                <option key={assetType} value={assetType}>{assetType}</option>
                            ))}
                        </select>
                    </div>

                    {/* Amount Input */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Amount (Baht)</label>
                        <input
                            type="number"
                            step="0.01"
                            name="amount"
                            placeholder="0.00"
                            required
                            value={formData.amount}
                            onChange={handleChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                        />
                    </div>

                    {/* Per Unit Input */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Per (Unit)</label>
                        <input
                            type="text"
                            name="per_unit"
                            placeholder="Unit, Share, Barrel, etc."
                            required
                            value={formData.per_unit}
                            onChange={handleChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                        />
                    </div>

                    {/* IMPORT Button */}
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full mt-6 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50"
                    >
                        {isSubmitting ? 'IMPORTING...' : 'IMPORT'}
                    </button>
                </form>
            </div>
            
            <footer className="mt-8 text-xs text-gray-500">
                © 2025 M.A.C.B. Inc. All Rights Reserved.
            </footer>
        </div>
    );
};

export default InsertExtractPage;