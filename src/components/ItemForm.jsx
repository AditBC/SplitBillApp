import React, { useState } from 'react';

function ItemForm({ onAddItem }) {
  const [itemName, setItemName] = useState('');
  const [itemQuantity, setItemQuantity] = useState('');
  const [itemPrice, setItemPrice] = useState('');

  const handleAddItem = () => {
    if (itemName.trim() !== '' && itemQuantity !== '' && itemPrice !== '') {
      onAddItem({
        name: itemName,
        quantity: itemQuantity,
        price: itemPrice,
      });
      setItemName('');
      setItemQuantity('');
      setItemPrice('');
    }
  };

  return (
    <div className="mb-4">
      <h2 className="text-xl font-semibold mb-2">Add Item</h2>
      <div className="flex flex-col mb-2">
        <label htmlFor="itemName" className="block text-gray-700 text-sm font-bold mb-1">
          Item Name:
        </label>
        <input
          type="text"
          id="itemName"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="Enter item name"
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
        />
      </div>
      <div className="flex flex-col mb-2">
        <label htmlFor="itemQuantity" className="block text-gray-700 text-sm font-bold mb-1">
          Quantity:
        </label>
        <input
          type="number"
          id="itemQuantity"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="Enter quantity"
          value={itemQuantity}
          onChange={(e) => setItemQuantity(e.target.value)}
        />
      </div>
      <div className="flex flex-col mb-2">
        <label htmlFor="itemPrice" className="block text-gray-700 text-sm font-bold mb-1">
          Price:
        </label>
        <input
          type="number"
          id="itemPrice"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="Enter price"
          value={itemPrice}
          onChange={(e) => setItemPrice(e.target.value)}
        />
      </div>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        onClick={handleAddItem}
      >
        Add Item
      </button>
    </div>
  );
}

export default ItemForm;
