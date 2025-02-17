import React from 'react';

function SplitSummary({ splitResult, participants }) {
  if (!splitResult.individualSplits) {
    return <p>Add items and participants to calculate the split.</p>;
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">Split Summary</h2>
      <p>Total Bill: Rp {isNaN(splitResult.totalBill) ? '0' : splitResult.totalBill.toLocaleString()}</p>
      <p>Tax Amount: Rp {isNaN(splitResult.taxAmount) ? '0' : splitResult.taxAmount.toLocaleString()}</p>
      <p>Grand Total: Rp {isNaN(splitResult.grandTotal) ? '0' : splitResult.grandTotal.toLocaleString()}</p>
      <ul>
        {splitResult.individualSplits && Object.entries(splitResult.individualSplits).map(([participantId, split]) => (
          <li key={participantId}>
            {split.name}: Rp {isNaN(split.amount) ? '0' : split.amount.toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SplitSummary;
