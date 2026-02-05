import { useEffect, useState } from "react";
import api from "../../services/api";
import PageTransition from "../components/PageTransition";
import LoadingSpinner from "../../components/LoadingSpinner";

export default function Customers() {
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  // FETCH ALL ACCOUNTS (ADMIN)
  const fetchAccounts = async () => {
    setLoading(true);
    try {
      const res = await api.get("/admin/accounts");
      setAccounts(res.data);
    } catch (err) {
      console.error("Failed to fetch accounts:", err);

      // Fallback (UI only)
      setAccounts(
        Array.from({ length: 10 }, (_, i) => ({
          accountNumber: `XXXX-${1000 + i}`,
          type: i % 2 === 0 ? "Savings" : "Current",
          balance: 20000 + i * 1000,
          status: "Active",
          createdDate: new Date().toISOString(),
          accountHolderName: `Customer ${i + 1}`,
        }))
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAccounts();
  }, []);

  // SEARCH FILTER
  const filteredAccounts = accounts.filter(
    (a) =>
      a.accountHolderName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.accountNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <LoadingSpinner fullScreen />;

  return (
    <PageTransition>
      <div className="bg-white rounded-xl shadow border overflow-hidden">
        {/* HEADER */}
        <div className="bg-blue-500 text-white px-6 py-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold">All Accounts</h2>
          <div className="text-sm">
            Total: <span className="font-bold">{accounts.length}</span>
          </div>
        </div>

        {/* SEARCH */}
        <div className="p-6 border-b">
          <input
            type="text"
            placeholder="Search by account number or holder name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        {/* TABLE */}
        <div className="p-6 overflow-x-auto">
          {filteredAccounts.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No accounts found
            </div>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-left text-gray-600">
                  <th className="py-3 font-semibold">Account Holder</th>
                  <th className="py-3 font-semibold">Account Number</th>
                  <th className="py-3 font-semibold">Type</th>
                  <th className="py-3 font-semibold">Balance</th>
                  <th className="py-3 font-semibold">Status</th>
                  <th className="py-3 font-semibold">Created</th>
                </tr>
              </thead>

              <tbody>
                {filteredAccounts.map((a, i) => (
                  <tr
                    key={i}
                    className="border-b last:border-b-0 hover:bg-gray-50 transition"
                  >
                    <td className="py-3">{a.accountHolderName}</td>
                    <td className="py-3">{a.accountNumber}</td>
                    <td className="py-3">{a.type}</td>
                    <td className="py-3">₹{a.balance.toLocaleString()}</td>
                    <td className="py-3">
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                          a.status === "Active"
                            ? "bg-green-100 text-green-700"
                            : a.status === "Frozen"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {a.status}
                      </span>
                    </td>
                    <td className="py-3">
                      {new Date(a.createdDate).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </PageTransition>
  );
}
