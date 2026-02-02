import { useEffect, useState } from "react";
import api from "../../services/api";

export default function Transactions() {
  const [txns, setTxns] = useState([]);

  useEffect(() => {
    loadTxns();
  }, []);

  const loadTxns = async () => {
    try {
      const res = await api.get("/user/transactions");
      setTxns(res.data);
    } catch {
      setTxns([
        { type: "Debit", date: "1/20/26", details: "Sub Box", amount: "-₹500" },
        { type: "Credit", date: "1/18/26", details: "Deposit", amount: "+₹2,500" },
      ]);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow">
      <div className="bg-blue-500 text-white px-6 py-4 rounded-t-xl">
        Transactions
      </div>

      <table className="w-full">
        <thead className="bg-blue-100">
          <tr>
            <th className="p-3">Type</th>
            <th>Date</th>
            <th>Details</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {txns.map((t, i) => (
            <tr key={i} className="border-t">
              <td className="p-3">{t.type}</td>
              <td>{t.date}</td>
              <td>{t.details}</td>
              <td className={t.amount.startsWith("-") ? "text-red-500" : "text-green-500"}>
                {t.amount}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
