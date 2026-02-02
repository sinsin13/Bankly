export default function FundTransfer() {
  return (
    <div className="bg-white p-6 rounded-xl shadow max-w-md">
      <h2 className="text-lg font-semibold mb-4">Transfer Funds</h2>

      <input className="w-full border p-2 mb-3 rounded" placeholder="From Account" />
      <input className="w-full border p-2 mb-3 rounded" placeholder="To Account" />
      <input className="w-full border p-2 mb-3 rounded" placeholder="Amount" />
      <textarea className="w-full border p-2 mb-3 rounded" placeholder="Remark (optional)" />

      <button className="bg-blue-500 text-white w-full py-2 rounded hover:bg-blue-600 transition">
        Transfer
      </button>
    </div>
  );
}
