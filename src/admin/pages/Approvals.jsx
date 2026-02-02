import { useEffect, useState } from "react";
import api from "../../services/api";
import PageTransition from "../components/PageTransition";
import LoadingSpinner from "../../components/LoadingSpinner";

export default function Approvals() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(null);

  const fetchApprovals = async () => {
    setLoading(true);
    try {
      const res = await api.get("/admin/pending-customers");
      setRequests(res.data);
    } catch {
      // Fallback data for frontend testing
      setRequests(
        Array.from({ length: 10 }, (_, i) => ({
          id: i + 1,
          name: `New User ${i + 1}`,
          email: `newuser${i + 1}@gmail.com`,
          phone: `98765${43210 + i}`,
          requestedAt: new Date(2026, 1, Math.floor(Math.random() * 28) + 1)
            .toISOString()
            .split('T')[0]
        }))
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApprovals();
  }, []);

  const handleAction = async (id, action) => {
    setProcessing(id);
    try {
      await api.post(`/admin/customers/${id}/${action}`);
      // Remove from list after successful action
      setRequests((prev) => prev.filter((r) => r.id !== id));
    } catch {
      // Frontend-only fallback
      setRequests((prev) => prev.filter((r) => r.id !== id));
    } finally {
      setProcessing(null);
    }
  };

  if (loading) return <LoadingSpinner fullScreen />;

  return (
    <PageTransition>
      <div className="bg-white rounded-xl shadow border overflow-hidden">
        {/* HEADER */}
        <div className="bg-blue-500 text-white px-6 py-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold">Pending Approvals</h2>
          <div className="bg-white text-blue-600 px-3 py-1 rounded-full text-sm font-bold">
            {requests.length} pending
          </div>
        </div>

        {/* TABLE WRAPPER */}
        <div className="p-6">
          {requests.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">✅</div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                All caught up!
              </h3>
              <p className="text-gray-500">
                No pending approval requests at the moment.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-base">
                <thead>
                  <tr className="border-b text-left text-gray-600">
                    <th className="py-3 font-semibold">Name</th>
                    <th className="py-3 font-semibold">Email</th>
                    <th className="py-3 font-semibold">Phone</th>
                    <th className="py-3 font-semibold">Requested</th>
                    <th className="py-3 font-semibold">Action</th>
                  </tr>
                </thead>

                <tbody>
                  {requests.map((r) => (
                    <tr
                      key={r.id}
                      className="border-b last:border-b-0 hover:bg-gray-50 transition"
                    >
                      <td className="py-3 font-medium">{r.name}</td>
                      <td className="py-3 text-gray-600">{r.email}</td>
                      <td className="py-3 text-gray-600">{r.phone || 'N/A'}</td>
                      <td className="py-3 text-gray-600 text-sm">{r.requestedAt || 'Recent'}</td>
                      <td className="py-3 space-x-3">
                        <button
                          className="bg-green-500 text-white px-4 py-1.5 rounded-lg text-sm font-medium hover:bg-green-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
                          onClick={() => handleAction(r.id, "approve")}
                          disabled={processing === r.id}
                        >
                          {processing === r.id ? 'Processing...' : 'Approve'}
                        </button>
                        <button
                          className="bg-red-500 text-white px-4 py-1.5 rounded-lg text-sm font-medium hover:bg-red-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
                          onClick={() => handleAction(r.id, "reject")}
                          disabled={processing === r.id}
                        >
                          {processing === r.id ? 'Processing...' : 'Reject'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </PageTransition>
  );
}