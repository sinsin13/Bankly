// import { NavLink } from "react-router-dom";

// const link =
//   "flex items-center gap-2 px-4 py-2 rounded-md transition";

// export default function UserSidebar() {
//   return (
//     <aside className="w-64 bg-gradient-to-b from-blue-600 to-blue-500 text-white">
//       <div className="p-6 text-2xl font-bold">Bank.ly</div>

//       <nav className="space-y-2 px-3">
//         <NavLink to="/user/dashboard"
//           className={({ isActive }) =>
//             `${link} ${isActive ? "bg-blue-400" : "hover:bg-blue-400"}`
//           }>
//           Dashboard
//         </NavLink>

//         <NavLink to="/user/accounts"
//           className={({ isActive }) =>
//             `${link} ${isActive ? "bg-blue-400" : "hover:bg-blue-400"}`
//           }>
//           My Accounts
//         </NavLink>

//         <NavLink to="/user/transactions"
//           className={({ isActive }) =>
//             `${link} ${isActive ? "bg-blue-400" : "hover:bg-blue-400"}`
//           }>
//           Transactions
//         </NavLink>

//         <NavLink to="/user/transfer"
//           className={({ isActive }) =>
//             `${link} ${isActive ? "bg-blue-400" : "hover:bg-blue-400"}`
//           }>
//           Fund Transfer
//         </NavLink>
//       </nav>
//     </aside>
//   );
// }

import {
  LayoutDashboard,
  Wallet,
  ArrowLeftRight,
  Send,
  Settings,
  LogOut,
} from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";

const menu = [
  { name: "Dashboard", icon: LayoutDashboard, path: "/user/dashboard" },
  { name: "My Accounts", icon: Wallet, path: "/user/accounts" },
  { name: "Transactions", icon: ArrowLeftRight, path: "/user/transactions" },
  { name: "Fund Transfer", icon: Send, path: "/user/transfer" },
];

export default function UserSidebar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <aside className="w-64 bg-gradient-to-b from-blue-600 to-blue-500 text-white flex flex-col">
      
      {/* LOGO */}
      <div className="p-6 text-2xl font-bold">
        Bank.ly
      </div>

      {/* MENU */}
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

      {/* BOTTOM ACTIONS */}
      <div className="px-3 pb-4 space-y-1">
        <button
          className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-blue-700 w-full"
          onClick={() => alert("Settings page coming soon")}
        >
          <Settings size={20} />
          Settings
        </button>

        <button
          onClick={logout}
          className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-red-500 w-full"
        >
          <LogOut size={20} />
          Logout
        </button>
      </div>
    </aside>
  );
}
