import { useEffect, useState } from "react";
import api from "../../services/api";
import PageTransition from "../components/PageTransition";

export default function Customers() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);

  // FETCH CUSTOMERS
  const fetchCustomers = async () => {
    try {
      const res = await api.get("/admin/customers");
      setCustomers(res.data);
    } catch (err) {
      // BACKEND NOT READY → fallback data
      setCustomers(
        Array.from({ length: 30 }, (_, i) => ({
          id: i + 1,
          name: `Customer ${i + 1}`,
          email: `customer${i + 1}@gmail.com`,
          status: i % 3 === 0 ? "Frozen" : "Active",
        }))
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  // FREEZE / UNFREEZE
  const toggleStatus = async (id, status) => {
    try {
      if (status === "Active") {
        await api.post(`/admin/customers/${id}/freeze`);
      } else {
        await api.post(`/admin/customers/${id}/unfreeze`);
      }
      fetchCustomers();
    } catch {
      // frontend-only fallback
      setCustomers((prev) =>
        prev.map((c) =>
          c.id === id
            ? { ...c, status: c.status === "Active" ? "Frozen" : "Active" }
            : c
        )
      );
    }
  };

  if (loading) return <p>Loading customers...</p>;

  return (
    <PageTransition>
    <div className="bg-white rounded-xl shadow border overflow-hidden">
  
      {/* HEADER */}
      <div className="bg-blue-500 text-white px-6 py-4">
        <h2 className="text-lg font-semibold">All Customers</h2>
      </div>
  
      {/* //TABLE WRAPPER */}
      <div className="p-6">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b text-left text-gray-600">
              <th className="py-3">Name</th>
              <th className="py-3">Email</th>
              <th className="py-3">Status</th>
              <th className="py-3">Action</th>
            </tr>
          </thead>
  
          <tbody>
            {customers.map((c) => (
              <tr
                key={c.id}
                className="border-b last:border-b-0 hover:bg-gray-50"
              >
                <td className="py-3">{c.name}</td>
                <td className="py-3">{c.email}</td>
                <td
                  className={`py-3 font-medium ${
                    c.status === "Active"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {c.status}
                </td>
                <td className="py-3">
                  <button
                    onClick={() => toggleStatus(c.id, c.status)}
                    className="px-3 py-1 rounded text-xs font-medium
                               bg-gray-200 hover:bg-gray-300 transition"
                  >
                    {c.status === "Active" ? "Freeze" : "Unfreeze"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
  
    </div>
  </PageTransition>
  
  );
}
