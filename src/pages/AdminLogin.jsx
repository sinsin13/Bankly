import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

export default function AdminLogin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await api.post("/Auth/login", {
        email,
        password,
      });

      const { token, userName, role, expiration } = response.data;

      // 🔐 Hard check
      if (role !== "Admin") {
        throw new Error("Access denied: Not an admin account");
      }

      // ✅ Store auth data
      localStorage.setItem("token", token);
      localStorage.setItem("role", role);
      localStorage.setItem("userName", userName);
      localStorage.setItem("expiresAt", expiration);

      navigate("/admin/dashboard");
    } catch (err) {
      setError(
        err.response?.data ||
        err.message ||
        "Invalid admin credentials"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-600 to-blue-500 flex items-center justify-center relative">
      <div className="absolute top-6 left-10 text-white text-xl font-bold">
        Bank.ly
      </div>

      <button
        onClick={() => navigate("/role-selection")}
        className="absolute top-6 right-10 bg-white text-blue-700 px-5 py-2 rounded-lg font-semibold shadow hover:scale-105 transition"
      >
        ← Go Back
      </button>

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

        <div className="mb-6">
          <label className="block text-sm font-semibold mb-2 text-black">
            Admin Email
          </label>
          <input
            type="email"
            className="w-full px-4 py-3 rounded-lg outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
            required
          />
        </div>

        <div className="mb-8">
          <label className="block text-sm font-semibold mb-2 text-black">
            Password
          </label>
          <input
            type="password"
            className="w-full px-4 py-3 rounded-lg outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg font-bold text-lg transition disabled:opacity-50"
        >
          {loading ? "LOGGING IN..." : "LOGIN"}
        </button>
      </form>
    </div>
  );
}
