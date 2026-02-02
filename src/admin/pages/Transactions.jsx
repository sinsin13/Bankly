import { useEffect, useState } from "react";
import api from "../../services/api";
import PageTransition from "../components/PageTransition";

export default function Transactions() {
  const [txns, setTxns] = useState([]);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchTxns = async () => {
    setLoading(true);
    try {
      const res = await api.get("/admin/transactions", {
        params: { from, to },
      });
      setTxns(res.data);
    } catch {
      // Fallback data for frontend testing
      setTxns(
        Array.from({ length: 30 }, (_, i) => ({
          id: i,
          customer: `Customer ${i + 1}`,
          type: i % 2 === 0 ? "Credit" : "Debit",
          amount: Math.floor(Math.random() * 40000) + 1000,
          date: new Date(2026, 0, Math.floor(Math.random() * 31) + 1)
            .toISOString()
            .split('T')[0]
        }))
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTxns();
  }, []); // Only fetch on mount

  const handleApplyFilter = () => {
    fetchTxns();
  };

  const handleReset = () => {
    setFrom("");
    setTo("");
    // Will trigger a fetch with empty filters
    setTimeout(() => fetchTxns(), 0);
  };

  return (
    <PageTransition>
      {/* Filter Controls */}
      <div className="flex flex-wrap items-center gap-4 mb-6">
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-gray-600">From</label>
          <input
            type="date"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            className="border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-gray-600">To</label>
          <input
            type="date"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            className="border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        <button 
          onClick={handleApplyFilter}
          disabled={loading}
          className="bg-blue-600 text-white px-5 py-2 rounded-lg text-sm hover:bg-blue-700 transition disabled:opacity-50"
        >
          {loading ? 'Loading...' : 'Apply'}
        </button>

        <button 
          onClick={handleReset}
          disabled={loading}
          className="bg-gray-200 text-gray-700 px-5 py-2 rounded-lg text-sm hover:bg-gray-300 transition disabled:opacity-50"
        >
          Reset
        </button>
      </div>

      {/* Transactions Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
          <div className="grid grid-cols-4 px-6 py-3 font-medium text-sm">
            <span>Customer</span>
            <span>Type</span>
            <span>Amount</span>
            <span>Date</span>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="px-6 py-8 text-center text-gray-500">
            Loading transactions...
          </div>
        )}

        {/* Empty State */}
        {!loading && txns.length === 0 && (
          <div className="px-6 py-8 text-center text-gray-500">
            No transactions found for the selected date range.
          </div>
        )}

        {/* Rows */}
        {!loading && txns.map((tx) => (
          <div
            key={tx.id}
            className="grid grid-cols-4 px-6 py-4 text-sm border-b last:border-none hover:bg-gray-50 transition"
          >
            <span className="font-medium text-gray-800">{tx.customer}</span>

            <span
              className={`font-semibold ${
                tx.type === "Credit" ? "text-green-600" : "text-red-500"
              }`}
            >
              {tx.type}
            </span>

            <span
              className={`font-semibold ${
                tx.type === "Credit" ? "text-green-600" : "text-red-500"
              }`}
            >
              ₹{tx.amount.toLocaleString()}
            </span>

            <span className="text-gray-600">{tx.date}</span>
          </div>
        ))}
      </div>
    </PageTransition>
  );
}