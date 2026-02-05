import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

export default function UserDashboard() {
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const res = await api.get("/Accounts");
      setAccounts(res.data || []);
    } catch (err) {
      console.error("Failed to load accounts:", err);
      setAccounts([]);
    } finally {
      setLoading(false);
    }
  };

  const handleCardClick = (account) => {
    if (account === "ADD_NEW") {
      navigate("/account-creation");
    } else {
      navigate(`/account/${account.accountNumber}`);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-40">
        <p className="text-gray-500">Loading dashboard...</p>
      </div>
    );
  }

  return (
    <>
      <h2 className="text-xl font-semibold mb-4">Dashboard</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Existing Accounts */}
        {accounts.map((acc) => (
          <div
            key={acc.accountNumber}
            onClick={() => handleCardClick(acc)}
            className="cursor-pointer bg-gradient-to-br from-blue-200 to-blue-300
              p-6 rounded-2xl shadow hover:shadow-lg hover:-translate-y-1 transition"
          >
            <p className="text-sm text-gray-700">
              {acc.type} Account
            </p>

            <p className="text-2xl font-bold mt-2">
              ₹{acc.balance.toLocaleString("en-IN")}
            </p>

            <p className="text-xs text-gray-600 mt-1">
              Status: {acc.status}
            </p>
          </div>
        ))}

        {/* Add New Account Card */}
        <div
          onClick={() => handleCardClick("ADD_NEW")}
          className="cursor-pointer bg-gradient-to-br from-gray-200 to-gray-300
            p-6 rounded-2xl shadow hover:shadow-lg hover:-translate-y-1 transition
            flex flex-col items-center justify-center"
        >
          <p className="text-4xl font-bold text-gray-700">+</p>
          <p className="text-sm text-gray-700 mt-2">Add New Account</p>
        </div>
      </div>
    </>
  );
}
