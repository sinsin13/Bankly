import { useEffect, useState } from "react";
import api from "../../services/api";

export default function Accounts() {
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAccounts();
  }, []);

  const loadAccounts = async () => {
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

  const maskAccountNumber = (accountNumber) => {
    if (!accountNumber) return "XXXX";
    return `XXXX ${accountNumber.slice(-4)}`;
  };

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow p-6">
        <p className="text-gray-500">Loading accounts...</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow">
      <div className="bg-blue-500 text-white px-6 py-4 rounded-t-xl">
        My Accounts
      </div>

      {accounts.length === 0 ? (
        <div className="p-6 text-gray-500 text-center">
          No accounts found. Please open an account.
        </div>
      ) : (
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Type</th>
              <th className="text-left">Account</th>
              <th className="text-left">Amount</th>
              <th className="text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {accounts.map((a) => (
              <tr key={a.accountNumber} className="border-t">
                <td className="p-3">{a.type}</td>
                <td>{maskAccountNumber(a.accountNumber)}</td>
                <td>
                  ₹{a.balance.toLocaleString("en-IN")}
                </td>
                <td
                  className={
                    a.status === "Active"
                      ? "text-green-600"
                      : a.status === "Frozen"
                      ? "text-yellow-600"
                      : "text-red-600"
                  }
                >
                  {a.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
