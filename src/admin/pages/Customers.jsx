import { useEffect, useState } from "react";
import api from "../../services/api";
import PageTransition from "../components/PageTransition";
import LoadingSpinner from "../../components/LoadingSpinner";

export default function Customers() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  // FETCH CUSTOMERS
  const fetchCustomers = async () => {
    setLoading(true);
    try {
      const res = await api.get("/admin/customers");
      setCustomers(res.data);
    } catch (err) {
      console.error('Failed to fetch customers:', err);
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

  // Filter customers based on search
  const filteredCustomers = customers.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <LoadingSpinner fullScreen />;

  return (
    <PageTransition>
      <div className="bg-white rounded-xl shadow border overflow-hidden">
        {/* HEADER */}
        <div className="bg-blue-500 text-white px-6 py-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold">All Customers</h2>
          <div className="text-sm">
            Total: <span className="font-bold">{customers.length}</span>
          </div>
        </div>

        {/* SEARCH BAR */}
        <div className="p-6 border-b">
          <input
            type="text"
            placeholder="Search by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        {/* TABLE WRAPPER */}
        <div className="p-6 overflow-x-auto">
          {filteredCustomers.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No customers found matching "{searchTerm}"
            </div>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-left text-gray-600">
                  <th className="py-3 font-semibold">Name</th>
                  <th className="py-3 font-semibold">Email</th>
                  <th className="py-3 font-semibold">Status</th>
                  <th className="py-3 font-semibold">Action</th>
                </tr>
              </thead>

              <tbody>
                {filteredCustomers.map((c) => (
                  <tr
                    key={c.id}
                    className="border-b last:border-b-0 hover:bg-gray-50 transition"
                  >
                    <td className="py-3">{c.name}</td>
                    <td className="py-3">{c.email}</td>
                    <td className="py-3">
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                          c.status === "Active"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {c.status}
                      </span>
                    </td>
                    <td className="py-3">
                      <button
                        onClick={() => toggleStatus(c.id, c.status)}
                        className={`px-4 py-1.5 rounded text-xs font-medium transition ${
                          c.status === "Active"
                            ? "bg-red-100 text-red-700 hover:bg-red-200"
                            : "bg-green-100 text-green-700 hover:bg-green-200"
                        }`}
                      >
                        {c.status === "Active" ? "Freeze" : "Unfreeze"}
                      </button>
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