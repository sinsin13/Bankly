import { useEffect, useState } from "react";
import api from "../../services/api";

export default function Transactions() {
  const [accounts, setAccounts] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [txns, setTxns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingTxns, setLoadingTxns] = useState(false);

  useEffect(() => {
    loadAccounts();
  }, []);

  const loadAccounts = async () => {
    try {
      const res = await api.get("/Accounts");
      const accountList = res.data || [];
      setAccounts(accountList);
      
      // Auto-select first account if available
      if (accountList.length > 0) {
        setSelectedAccount(accountList[0].accountNumber);
        loadTransactions(accountList[0].accountNumber);
      }
    } catch (err) {
      console.error("Failed to load accounts:", err);
      setAccounts([]);
    } finally {
      setLoading(false);
    }
  };

  const loadTransactions = async (accountNumber) => {
    setLoadingTxns(true);
    try {
      const res = await api.get(`/transactions/statement/${accountNumber}`);
      setTxns(res.data || []);
    } catch (err) {
      console.error("Failed to load transactions:", err);
      setTxns([]);
    } finally {
      setLoadingTxns(false);
    }
  };

  const handleAccountChange = (accountNumber) => {
    setSelectedAccount(accountNumber);
    loadTransactions(accountNumber);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow p-6">
        <p className="text-gray-500">Loading transactions...</p>
      </div>
    );
  }

  if (accounts.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow p-6 text-center">
        <p className="text-gray-500">
          No accounts found. Please open an account first.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow">
      <div className="bg-blue-500 text-white px-6 py-4 rounded-t-xl flex items-center justify-between">
        <span>Transaction History</span>
        
        {/* Account Selector */}
        <select
          value={selectedAccount || ""}
          onChange={(e) => handleAccountChange(e.target.value)}
          className="bg-white text-gray-700 px-4 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
        >
          {accounts.map((acc) => (
            <option key={acc.accountNumber} value={acc.accountNumber}>
              {acc.type} - {acc.accountNumber}
            </option>
          ))}
        </select>
      </div>

      {loadingTxns ? (
        <div className="p-6 text-gray-500 text-center">
          Loading transactions...
        </div>
      ) : txns.length === 0 ? (
        <div className="p-6 text-gray-500 text-center">
          No transactions found for this account.
        </div>
      ) : (
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Type</th>
              <th className="text-left">Date</th>
              <th className="text-left">Reference No.</th>
              <th className="text-left">Amount</th>
              <th className="text-left">Balance</th>
            </tr>
          </thead>
          <tbody>
            {txns.map((t, i) => (
              <tr key={i} className="border-t">
                <td className="p-3">
                  <span
                    className={`px-2 py-1 rounded text-xs font-semibold ${
                      t.transactionType === "Credit"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {t.transactionType}
                  </span>
                </td>
                <td className="text-sm text-gray-600">
                  {formatDate(t.createdDate)}
                </td>
                <td className="text-xs text-gray-500 font-mono">
                  {t.referenceNumber.substring(0, 8)}...
                </td>
                <td
                  className={`font-semibold ${
                    t.transactionType === "Credit"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {t.transactionType === "Credit" ? "+" : "-"}₹
                  {t.amount.toLocaleString("en-IN")}
                </td>
                <td className="text-gray-700">
                  ₹{t.balanceAfterTransaction?.toLocaleString("en-IN") || "N/A"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
