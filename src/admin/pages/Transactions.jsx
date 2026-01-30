import { useEffect, useState } from "react";
import api from "../../services/api";
import PageTransition from "../components/PageTransition";

export default function Transactions() {
  const [txns, setTxns] = useState([]);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  const fetchTxns = async () => {
    try {
      const res = await api.get("/admin/transactions", {
        params: { from, to },
      });
      setTxns(res.data);
    } catch {
      setTxns(
        Array.from({ length: 20 }, (_, i) => ({
          id: i,
          customer: `Customer ${i + 1}`,
          type: i % 2 === 0 ? "Credit" : "Debit",
          amount: Math.floor(Math.random() * 40000),
          date: "2026-01-15"
        }))
      );
    }
  };

  useEffect(() => {
    fetchTxns();
  }, [from, to]);

  return (
    <PageTransition>

<div className="flex flex-wrap items-center gap-4 mb-4">
  <div className="flex items-center gap-2">
    <label className="text-sm font-medium text-gray-600">From</label>
    <input
      type="date"
      className="border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
    />
  </div>

  <div className="flex items-center gap-2">
    <label className="text-sm font-medium text-gray-600">To</label>
    <input
      type="date"
      className="border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
    />
  </div>

  <button className="bg-blue-600 text-white px-5 py-2 rounded-lg text-sm hover:bg-blue-700 transition">
    Apply
  </button>
</div>

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

  {/* Rows */}
  {txns.map((tx) => (
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
        ₹{tx.amount}
      </span>

      <span className="text-gray-600">{tx.date}</span>
    </div>
  ))}
</div>


     </PageTransition>
  );
}
