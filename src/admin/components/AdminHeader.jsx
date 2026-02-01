
import { Bell, User } from "lucide-react";

export default function AdminHeader() {
  return (
    <header className="h-16 bg-white flex items-center justify-between px-6 shadow-sm">
      <h1 className="text-xl font-semibold">Admin Dashboard</h1>

      <div className="flex items-center gap-5">
        <Bell className="cursor-pointer text-gray-600 hover:text-blue-600 transition" />
        <div className="flex items-center gap-2 cursor-pointer">
          <div className="w-9 h-9 rounded-full bg-blue-500 text-white flex items-center justify-center">
            <User size={18} />
          </div>
          <div className="text-sm">
            <p className="font-medium">Vikas Prajapati</p>
            <p className="text-gray-500 text-xs">Manager</p>
          </div>
        </div>
      </div>
    </header>
  );
}
