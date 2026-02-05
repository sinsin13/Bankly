import { useEffect, useState } from "react";
import api from "../../services/api";
import StatCard from "../components/StatCard";
import PageTransition from "../components/PageTransition";

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalCustomers: 0,
    pendingApprovals: 0,
    frozenAccounts: 0,
    todayTransactions: 0,
  });

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // ✅ FIXED ENDPOINT
      const res = await api.get("/Admin/dashboard/stats");
      const data = res.data;

      setStats({
        totalCustomers: data.totalAccounts,
        pendingApprovals: data.pendingKycCount,
        frozenAccounts: 0,
        todayTransactions: data.totalTransactions,
      });
    } catch (err) {
      console.error("Failed to fetch dashboard stats:", err);
      setStats({
        totalCustomers: 0,
        pendingApprovals: 0,
        frozenAccounts: 0,
        todayTransactions: 0,
      });
    }
  };

  return (
    <PageTransition>
      <div className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Total Customers"
            value={stats.totalCustomers}
            variant="dark"
          />

          <StatCard
            title="Pending Approvals"
            value={stats.pendingApprovals}
            variant="medium"
          />

          <StatCard
            title="Frozen Accounts"
            value={stats.frozenAccounts}
            variant="light"
          />

          <StatCard
            title="Transactions Today"
            value={stats.todayTransactions}
            variant="lighter"
          />
        </div>

        <div className="cursor-pointer bg-white rounded-2xl p-6 shadow border-2 border-gray-200 hover:border-blue-500 transition-all">
          <h3 className="text-lg font-semibold mb-2">System Summary</h3>
          <p className="text-gray-600 text-sm">
            Welcome to the Admin Dashboard
          </p>
        </div>
      </div>
    </PageTransition>
  );
}
