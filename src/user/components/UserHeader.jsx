import { useNavigate } from "react-router-dom";
import { Bell, User } from "lucide-react";
export default function UserHeader() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };
  let name="Vikas Prajapati"
  let designation="Customer"

  return (
    <header className="bg-white shadow px-6 py-4 flex justify-between items-center">
      <h2 className="text-lg font-semibold">User Dashboard</h2>

      <div className="flex items-center gap-4">
         <Bell className="cursor-pointer text-gray-600 hover:text-blue-600 transition" />

        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center">
            U
          </div>
          <div className="text-sm">
            <p className="font-medium">{name}</p>
            <p className="text-gray-500 text-xs">{designation}</p>
          </div>
        </div>

        
      </div>
    </header>
  );
}
