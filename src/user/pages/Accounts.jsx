import { useEffect, useState } from "react";
import api from "../../services/api";

export default function Accounts() {
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    loadAccounts();
  }, []);

  const loadAccounts = async () => {
    try {
      const res = await api.get("/user/accounts");
      setAccounts(res.data);
    } catch {
      setAccounts([
        { type: "Savings", number: "XXXX 2634", amount: "₹23,345", status: "Active" },
        { type: "Current", number: "XXXX 6547", amount: "₹23,350", status: "Active" },
      ]);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow">
      <div className="bg-blue-500 text-white px-6 py-4 rounded-t-xl">
        My Accounts
      </div>

      <table className="w-full">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3">Type</th>
            <th>Account</th>
            <th>Amount</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {accounts.map((a, i) => (
            <tr key={i} className="border-t">
              <td className="p-3">{a.type}</td>
              <td>{a.number}</td>
              <td>{a.amount}</td>
              <td className="text-green-600">{a.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
