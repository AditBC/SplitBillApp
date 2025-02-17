import React from 'react';

function ParticipantList({
  participants,
  onAddParticipant,
  onRemoveParticipant,
  onAssignBuyer,
  selectedItem,
}) {
  const [newParticipantName, setNewParticipantName] = React.useState('');

  const handleAddParticipant = () => {
    if (newParticipantName.trim() !== '') {
      onAddParticipant(newParticipantName);
      setNewParticipantName('');
    }
  };

  return (
    <div className="mb-4">
      <h2 className="text-xl font-semibold mb-2">Participants</h2>
      <div className="flex mb-2">
        <input
          type="text"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mr-2"
          placeholder="Participant Name"
          value={newParticipantName}
          onChange={(e) => setNewParticipantName(e.target.value)}
        />
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          onClick={handleAddParticipant}
        >
          Add
        </button>
      </div>
      <ul>
        {participants.map((participant) => (
          <li
            key={participant.id}
            className={`py-2 px-4 border-b border-gray-200 flex justify-between items-center ${
              selectedItem?.buyers.includes(participant.id) ? 'bg-green-100' : ''
            }`}
            onClick={() => onAssignBuyer(participant.id)}
          >
            <span>{participant.name}</span>
            <button
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline"
              onClick={() => onRemoveParticipant(participant.id)}
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ParticipantList;
