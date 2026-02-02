

import {
  LayoutDashboard,
  Users,
  CheckCircle,
  ArrowLeftRight,
  Settings,
  LogOut,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";


const menu = [
  { name: "Dashboard", icon: LayoutDashboard, path: "/admin/dashboard" },
  { name: "Customers", icon: Users, path: "/admin/customers" },
  { name: "Approvals", icon: CheckCircle, path: "/admin/approvals" },
  { name: "Transactions", icon: ArrowLeftRight, path: "/admin/transactions" },
];

export default function AdminSidebar() {
  const navigate = useNavigate();
  // inside AdminSidebar component
  const logout = async () => {
    try {
      await api.post("/admin/logout"); // optional: backend may accept a logout call
    } catch (err) {
      // ignore errors, proceed to clear client-side token
    } finally {
      localStorage.removeItem("adminToken");
      navigate("/admin/login");
    }
  };

  return (
    <aside className="w-64 bg-gradient-to-b from-blue-600 to-blue-500 text-white flex flex-col">
      <div className="p-6 text-2xl font-bold">Bank.ly</div>

      <nav className="flex-1 space-y-1 px-3">
        {menu.map(({ name, icon: Icon, path }) => (
          <NavLink
            key={name}
            to={path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg transition-all
               ${isActive ? "bg-white text-blue-600" : "hover:bg-blue-700"}`
            }
          >
            <Icon size={20} />
            {name}
          </NavLink>
        ))}
      </nav>

      <div className="px-3 pb-4 space-y-1">
        <button className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-blue-700 w-full">
          <Settings size={20} />
          Settings
        </button>
        <button onClick={logout} className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-red-500 w-full">
          <LogOut size={20} />
          Logout
        </button>
      </div>
    </aside>
  );
}

