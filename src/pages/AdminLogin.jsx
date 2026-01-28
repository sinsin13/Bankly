
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    if (email && password) {
      localStorage.setItem("adminToken", "dummy-token");
      navigate("/admin/dashboard");
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-600 to-blue-500 flex items-center justify-center relative">
      
      {/* Top Left Logo */}
      <div className="absolute top-6 left-10 text-white text-xl font-bold">
        Bank.ly
      </div>

      {/* Top Right Go Back */}
      <button
        onClick={() => navigate("/role-selection")}
        className="absolute top-6 right-10 bg-white text-blue-700 px-5 py-2 rounded-lg font-semibold shadow hover:scale-105 transition"
      >
        ← Go Back
      </button>

      {/* Login Card */}
      <form
        onSubmit={handleLogin}
        className="bg-blue-50/90 backdrop-blur-md rounded-2xl shadow-2xl px-10 py-12 w-[420px]"
      >
        <h2 className="text-3xl font-bold text-center mb-10 text-black">
          Welcome Back
        </h2>

        {/* Admin ID */}
        <div className="mb-6">
          <label className="block text-sm font-semibold mb-2 text-black">
            Admin ID
          </label>
          <input
            type="text"
            className="w-full px-4 py-3 rounded-lg outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        {/* Password */}
        <div className="mb-8">
          <label className="block text-sm font-semibold mb-2 text-black">
            Password
          </label>
          <input
            type="password"
            className="w-full px-4 py-3 rounded-lg outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {/* Login Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg font-bold text-lg transition"
        >
          LOGIN
        </button>
      </form>
    </div>
  );
}
