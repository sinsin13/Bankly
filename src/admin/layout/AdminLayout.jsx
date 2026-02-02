
import { Outlet, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import AdminSidebar from "../components/AdminSidebar";
import AdminHeader from "../components/AdminHeader";

export default function AdminLayout() {
  const location = useLocation();

  return (
    <div className="flex h-screen bg-gray-100">
      <AdminSidebar />

      <div className="flex flex-col flex-1">
        <div className="h-16 shrink-0">
          <AdminHeader />
        </div>

        <main className="flex-1 overflow-y-auto p-6">
          <AnimatePresence mode="wait">
            <Outlet key={location.pathname} />
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
