import { useEffect, useState } from "react";
import api from "../../services/api";

export default function FundTransfer() {
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const [formData, setFormData] = useState({
    fromAccountNumber: "",
    toAccountNumber: "",
    amount: "",
  });

  useEffect(() => {
    loadAccounts();
  }, []);

  const loadAccounts = async () => {
    try {
      const res = await api.get("/Accounts");
      const activeAccounts = (res.data || []).filter(
        (acc) => acc.status === "Active"
      );
      setAccounts(activeAccounts);

      // Auto-select first account
      if (activeAccounts.length > 0) {
        setFormData((prev) => ({
          ...prev,
          fromAccountNumber: activeAccounts[0].accountNumber,
        }));
      }
    } catch (err) {
      console.error("Failed to load accounts:", err);
      setAccounts([]);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setMessage({ type: "", text: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ type: "", text: "" });

    // Validation
    if (!formData.fromAccountNumber) {
      setMessage({ type: "error", text: "Please select a source account" });
      return;
    }

    if (!formData.toAccountNumber) {
      setMessage({ type: "error", text: "Please enter destination account number" });
      return;
    }

    if (formData.fromAccountNumber === formData.toAccountNumber) {
      setMessage({ type: "error", text: "Cannot transfer to the same account" });
      return;
    }

    const amount = parseFloat(formData.amount);
    if (!amount || amount <= 0) {
      setMessage({ type: "error", text: "Please enter a valid amount" });
      return;
    }

    setSubmitting(true);

    try {
      const res = await api.post("/transfers", {
        fromAccountNumber: formData.fromAccountNumber,
        toAccountNumber: formData.toAccountNumber,
        amount: amount,
      });

      setMessage({
        type: "success",
        text: `Transfer successful! Reference: ${res.data.referenceNumber}`,
      });

      // Reset form
      setFormData({
        fromAccountNumber: accounts[0]?.accountNumber || "",
        toAccountNumber: "",
        amount: "",
      });

      // Reload accounts to update balances
      loadAccounts();
    } catch (err) {
      setMessage({
        type: "error",
        text: err.response?.data || "Transfer failed. Please try again.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-white p-6 rounded-xl shadow max-w-md">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  if (accounts.length === 0) {
    return (
      <div className="bg-white p-6 rounded-xl shadow max-w-md text-center">
        <p className="text-gray-500">
          No active accounts available. Please create an account first.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow max-w-lg">
      <h2 className="text-xl font-semibold mb-6 text-gray-800">
        Transfer Funds
      </h2>

      {/* Message Display */}
      {message.text && (
        <div
          className={`mb-4 p-3 rounded-lg ${
            message.type === "success"
              ? "bg-green-100 text-green-700 border border-green-300"
              : "bg-red-100 text-red-700 border border-red-300"
          }`}
        >
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        {/* From Account */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            From Account
          </label>
          <select
            name="fromAccountNumber"
            value={formData.fromAccountNumber}
            onChange={handleChange}
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {accounts.map((acc) => (
              <option key={acc.accountNumber} value={acc.accountNumber}>
                {acc.type} - {acc.accountNumber} (₹
                {acc.balance.toLocaleString("en-IN")})
              </option>
            ))}
          </select>
        </div>

        {/* To Account */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            To Account Number
          </label>
          <input
            type="text"
            name="toAccountNumber"
            value={formData.toAccountNumber}
            onChange={handleChange}
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter destination account number"
            disabled={submitting}
          />
        </div>

        {/* Amount */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Amount
          </label>
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter amount"
            step="0.01"
            min="0.01"
            disabled={submitting}
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={submitting}
          className={`w-full py-3 rounded-lg font-semibold transition ${
            submitting
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600 text-white"
          }`}
        >
          {submitting ? "Processing..." : "Transfer Funds"}
        </button>
      </form>
    </div>
  );
}
