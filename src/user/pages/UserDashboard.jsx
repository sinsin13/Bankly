import { useEffect, useState } from "react";
import api from "../../services/api";

export default function UserDashboard() {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const res = await api.get("/user/dashboard");
      setCards(res.data);
    } catch {
      setCards([
        { title: "Savings Account", value: "₹23,345" },
        { title: "Current Account", value: "₹23,350" },
        { title: "Add New Account", value: "+" },
      ]);
    }
  };

  return (
    <>
      <h2 className="text-xl font-semibold mb-4">Dashboard</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {cards.map((c, i) => (
          <div
            key={i}
            className="cursor-pointer bg-gradient-to-br from-blue-200 to-blue-300
              p-6 rounded-2xl shadow hover:shadow-lg hover:-translate-y-1 transition"
          >
            <p className="text-sm text-gray-700">{c.title}</p>
            <p className="text-2xl font-bold mt-2">{c.value}</p>
          </div>
        ))}
      </div>
    </>
  );
}
