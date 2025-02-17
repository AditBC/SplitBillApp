import React from 'react';

function BillForm({ onTaxChange }) {
  const handleTaxInputChange = (e) => {
    onTaxChange(e.target.value);
  };

  return (
    <div className="mb-4">
      <div>
        <label htmlFor="taxPercentage" className="block text-gray-700 text-sm font-bold mb-2">
          Tax Percentage:
        </label>
        <input
          type="number"
          id="taxPercentage"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="Enter tax percentage"
          defaultValue="10"
          onChange={handleTaxInputChange}
        />
      </div>
    </div>
  );
}

export default BillForm;
