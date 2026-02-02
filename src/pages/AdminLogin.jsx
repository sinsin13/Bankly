import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please enter both Admin ID and Password");
      return;
    }

    setLoading(true);

    try {
      // TODO: Replace with actual API call
      // const response = await api.post('/auth/admin/login', { email, password });
      
      // Simulating API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Store token and admin info
      localStorage.setItem("adminToken", "dummy-admin-token");
      localStorage.setItem("adminName", email.split('@')[0] || "Admin");
      
      // Navigate to dashboard
      navigate("/admin/dashboard");
    } catch (err) {
      setError("Invalid credentials. Please try again.");
    } finally {
      setLoading(false);
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
          Admin Login
        </h2>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 text-sm">
            {error}
          </div>
        )}

        {/* Admin ID */}
        <div className="mb-6">
          <label className="block text-sm font-semibold mb-2 text-black">
            Admin ID
          </label>
          <input
            type="text"
            className="w-full px-4 py-3 rounded-lg outline-none disabled:opacity-50"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
            placeholder="Enter your admin ID"
          />
        </div>

        {/* Password */}
        <div className="mb-8">
          <label className="block text-sm font-semibold mb-2 text-black">
            Password
          </label>
          <input
            type="password"
            className="w-full px-4 py-3 rounded-lg outline-none disabled:opacity-50"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
            placeholder="Enter your password"
          />
        </div>

        {/* Login Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg font-bold text-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'LOGGING IN...' : 'LOGIN'}
        </button>
      </form>
    </div>
  );
}