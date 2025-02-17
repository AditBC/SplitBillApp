import React, { useState, useEffect } from 'react';
import BillForm from './components/BillForm';
import ParticipantList from './components/ParticipantList';
import SplitSummary from './components/SplitSummary';
import ItemForm from './components/ItemForm';
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [items, setItems] = useState([]);
  const [participants, setParticipants] = useState([]);
  const [taxPercentage, setTaxPercentage] = useState('10');
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    document.title = 'Bill Splitter';
  }, []);

  const handleAddItem = (newItem) => {
    setItems([...items, { id: uuidv4(), ...newItem, buyers: [] }]);
  };

  const handleRemoveItem = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const handleAddParticipant = (name) => {
    setParticipants([...participants, { id: uuidv4(), name }]);
  };

  const handleRemoveParticipant = (id) => {
    setParticipants(participants.filter((participant) => participant.id !== id));
  };

  const handleTaxChange = (tax) => {
    setTaxPercentage(tax);
  };

  const handleSelectItem = (item) => {
    setSelectedItem(item);
  };

  const handleAssignBuyer = (participantId) => {
    if (selectedItem) {
      setItems(
        items.map((item) => {
          if (item.id === selectedItem.id) {
            const isBuyerAssigned = item.buyers.includes(participantId);
            return {
              ...item,
              buyers: isBuyerAssigned
                ? item.buyers.filter((id) => id !== participantId)
                : [...item.buyers, participantId],
            };
          }
          return item;
        })
      );
    }
  };

  const calculateTotalBill = () => {
    return items.reduce((total, item) => total + (parseFloat(item.price) * parseInt(item.quantity)), 0);
  };

  const calculateSplit = () => {
    const totalBill = calculateTotalBill();
    const tax = parseFloat(taxPercentage);
    const taxAmount = (totalBill * tax) / 100;
    const grandTotal = totalBill + taxAmount;

    const individualSplits = {};

    participants.forEach((participant) => {
      individualSplits[participant.id] = {
        name: participant.name,
        amount: 0,
      };
    });

    items.forEach((item) => {
      const numBuyers = item.buyers.length > 0 ? item.buyers.length : participants.length;
      const itemCostPerBuyer = (parseFloat(item.price) * parseInt(item.quantity)) / numBuyers;

      if (item.buyers.length > 0) {
        item.buyers.forEach((buyerId) => {
          individualSplits[buyerId].amount += itemCostPerBuyer;
        });
      } else {
        participants.forEach((participant) => {
          individualSplits[participant.id].amount += itemCostPerBuyer;
        });
      }
    });

    const taxPerParticipant = taxAmount / participants.length;
    participants.forEach((participant) => {
      individualSplits[participant.id].amount += taxPerParticipant;
    });

    return {
      totalBill: totalBill,
      taxAmount: taxAmount,
      grandTotal: grandTotal,
      individualSplits: individualSplits,
    };
  };

  const splitResult = calculateSplit();

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-4xl">
        <h1 className="text-3xl font-semibold mb-4 text-center">Quanto</h1>
        <a
          href="/camera"
          className="text-blue-500 hover:text-blue-700 mb-4 block text-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6 inline-block mr-1"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h7.5"
            />
          </svg>
          Scan Bill
        </a>

        <div className="flex">
          <div className="w-1/3 pr-4 bg-gray-200 shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <ParticipantList
              participants={participants}
              onAddParticipant={handleAddParticipant}
              onRemoveParticipant={handleRemoveParticipant}
              onAssignBuyer={handleAssignBuyer}
              selectedItem={selectedItem}
            />
          </div>
          <div className="w-1/3 pr-4 bg-gray-300 shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <ItemForm onAddItem={handleAddItem} />
          </div>
          <div className="w-1/3 pl-4 bg-gray-400 shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <h2 className="text-xl font-semibold mb-2">Item List</h2>
            <ul>
              {items.map((item) => (
                <li
                  key={item.id}
                  className={`py-2 px-4 border-b border-gray-200 flex justify-between items-center ${
                    selectedItem?.id === item.id ? 'bg-blue-100' : ''
                  }`}
                  onClick={() => handleSelectItem(item)}
                >
                  <span>
                    {item.name} ({item.quantity} x Rp {parseFloat(item.price).toLocaleString()}) - Bought by:{' '}
                    {item.buyers
                      ? item.buyers
                          .map((buyer) => participants.find((p) => p.id === buyer)?.name)
                          .join(', ')
                      : 'Everyone'}
                  </span>
                  <button
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                    onClick={() => handleRemoveItem(item.id)}
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <BillForm onTaxChange={handleTaxChange} />
        <SplitSummary splitResult={splitResult} participants={participants} />
      </div>
    </div>
  );
}

export default App;
