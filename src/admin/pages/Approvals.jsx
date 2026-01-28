import { useEffect, useState } from "react";
import api from "../../services/api";
import PageTransition from "../components/PageTransition";

export default function Approvals() {
  const [requests, setRequests] = useState([]);

  const fetchApprovals = async () => {
    try {
      const res = await api.get("/admin/pending-customers");
      setRequests(res.data);
    } catch {
      setRequests(
        Array.from({ length: 10 }, (_, i) => ({
          id: i + 1,
          name: `New User ${i + 1}`,
          email: `newuser${i + 1}@gmail.com`,
        }))
      );
    }
  };

  useEffect(() => {
    fetchApprovals();
  }, []);

  const handleAction = async (id, action) => {
    try {
      await api.post(`/admin/customers/${id}/${action}`);
      fetchApprovals();
    } catch {
      setRequests((prev) => prev.filter((r) => r.id !== id));
    }
  };

  return (
    <PageTransition>
  <div className="bg-white rounded-xl shadow border overflow-hidden">

    {/* HEADER */}
    <div className="bg-blue-500 text-white px-6 py-4">
      <h2 className="text-lg font-semibold">Pending Approvals</h2>
    </div>

    {/* TABLE WRAPPER */}
    <div className="p-6">
      <table className="w-full text-base">
        <thead>
          <tr className="border-b text-left text-gray-600">
            <th className="py-3">Name</th>
            <th className="py-3">Email</th>
            <th className="py-3">Action</th>
          </tr>
        </thead>

        <tbody>
          {requests.map((r) => (
            <tr
              key={r.id}
              className="border-b last:border-b-0 hover:bg-gray-50 transition"
            >
              <td className="py-3">{r.name}</td>
              <td className="py-3">{r.email}</td>
              <td className="py-3 space-x-4">
                <button
                  className="text-green-600 font-medium hover:underline"
                  onClick={() => handleAction(r.id, "approve")}
                >
                  Approve
                </button>
                <button
                  className="text-red-600 font-medium hover:underline"
                  onClick={() => handleAction(r.id, "reject")}
                >
                  Reject
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
