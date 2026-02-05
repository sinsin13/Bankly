import { useEffect, useState } from "react";
import api from "../../services/api";
import PageTransition from "../components/PageTransition";
import LoadingSpinner from "../../components/LoadingSpinner";

export default function Approvals() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [processingId, setProcessingId] = useState(null);

  // FETCH PENDING KYCs
  const fetchApprovals = async () => {
    setLoading(true);
    try {
      const res = await api.get("/admin/kyc?status=Submitted");
      setRequests(res.data);
    } catch (err) {
      console.error("Failed to fetch KYC approvals:", err);

      // UI fallback (safe)
      setRequests([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApprovals();
  }, []);

  // APPROVE / REJECT
  const handleAction = async (customerId, action) => {
    setProcessingId(customerId);
    try {
      if (action === "approve") {
        await api.put(`/kyc/admin/approve/${customerId}`);
      } else {
        await api.put(`/kyc/admin/reject/${customerId}`, "Rejected by admin");
      }

      // Remove approved/rejected entry from UI
      setRequests((prev) =>
        prev.filter((r) => r.customerId !== customerId)
      );
    } catch (err) {
      console.error(`Failed to ${action} KYC:`, err);
    } finally {
      setProcessingId(null);
    }
  };

  if (loading) return <LoadingSpinner fullScreen />;

  return (
    <PageTransition>
      <div className="bg-white rounded-xl shadow border overflow-hidden">
        {/* HEADER */}
        <div className="bg-blue-500 text-white px-6 py-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold">Pending KYC Approvals</h2>
          <div className="bg-white text-blue-600 px-3 py-1 rounded-full text-sm font-bold">
            {requests.length} pending
          </div>
        </div>

        {/* TABLE */}
        <div className="p-6">
          {requests.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">✅</div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                All caught up!
              </h3>
              <p className="text-gray-500">
                No pending KYC requests.
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
                    <th className="py-3 font-semibold">Submitted</th>
                    <th className="py-3 font-semibold">Action</th>
                  </tr>
                </thead>

                <tbody>
                  {requests.map((r) => (
                    <tr
                      key={r.customerId}
                      className="border-b last:border-b-0 hover:bg-gray-50 transition"
                    >
                      <td className="py-3 font-medium">{r.customerName}</td>
                      <td className="py-3 text-gray-600">{r.customerEmail}</td>
                      <td className="py-3 text-gray-600">{r.phoneNumber}</td>
                      <td className="py-3 text-gray-600 text-sm">
                        {new Date(r.submittedAt).toLocaleDateString()}
                      </td>
                      <td className="py-3 space-x-3">
                        <button
                          className="bg-green-500 text-white px-4 py-1.5 rounded-lg text-sm font-medium hover:bg-green-600 transition disabled:opacity-50"
                          onClick={() =>
                            handleAction(r.customerId, "approve")
                          }
                          disabled={processingId === r.customerId}
                        >
                          {processingId === r.customerId
                            ? "Processing..."
                            : "Approve"}
                        </button>

                        <button
                          className="bg-red-500 text-white px-4 py-1.5 rounded-lg text-sm font-medium hover:bg-red-600 transition disabled:opacity-50"
                          onClick={() =>
                            handleAction(r.customerId, "reject")
                          }
                          disabled={processingId === r.customerId}
                        >
                          {processingId === r.customerId
                            ? "Processing..."
                            : "Reject"}
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
