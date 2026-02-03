import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function RegisterUser() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      await api.post("/Auth/register", {
        name: formData.name,
        email: formData.email,
        password: formData.password,

        // 🔹 required by backend but hidden from UI
        dob: "2000-01-01T00:00:00",
        address: "Not Provided"
      });

      alert(
        "Account created successfully.\n\nPlease login to explore products."
      );

      navigate("/user-login");

    } catch (err) {
      console.error("Registration error:", err.response);

      let message = "Registration failed";

      if (err.response?.data) {
        message = err.response.data;
      }

      alert(message);
    }

  };


  return (
    <div className="min-h-screen bg-[#187cff] text-white flex flex-col items-center justify-center p-5">

      {/* Logo */}
      <div className="absolute top-6 left-16 text-xl font-bold">
        Bank.ly
      </div>

      {/* Go Back Button */}
      <button
        onClick={() => navigate("/")}
        className="absolute top-6 right-16 bg-white text-blue-900 px-5 py-2.5 rounded-md text-sm font-semibold hover:-translate-y-0.5 hover:shadow-xl transition-all duration-300 shadow-md"
      >
        ← Go Back
      </button>

      {/* Registration Card */}
      <div
        className="bg-[#E6F0FF] rounded-3xl px-14 py-12 w-full max-w-md shadow-2xl opacity-0 animate-zoomIn"
        style={{ animationDelay: "0.1s", animationFillMode: "forwards" }}
      >
        <h2 className="text-3xl font-bold text-black text-center mb-8">
          Sign Up
        </h2>

        <form onSubmit={handleSubmit}>

          {/* Name */}
          <div className="mb-5">
            <label className="block text-sm font-semibold text-black mb-2">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 border-none rounded-lg text-sm bg-white text-black outline-none"
              placeholder="Enter your full name"
            />
          </div>

          {/* Email (REPLACED PHONE) */}
          <div className="mb-5">
            <label className="block text-sm font-semibold text-black mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 border-none rounded-lg text-sm bg-white text-black outline-none"
              placeholder="Enter your email"
            />
          </div>

          {/* Password */}
          <div className="mb-5">
            <label className="block text-sm font-semibold text-black mb-2">
              Create Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 border-none rounded-lg text-sm bg-white text-black outline-none"
              placeholder="Create a strong password"
            />
          </div>

          {/* Confirm Password */}
          <div className="mb-7">
            <label className="block text-sm font-semibold text-black mb-2">
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 border-none rounded-lg text-sm bg-white text-black outline-none"
              placeholder="Confirm your password"
            />
          </div>

          {/* Register Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 bg-green-500 text-white rounded-lg text-base font-bold hover:-translate-y-0.5 hover:shadow-lg hover:shadow-green-500/40 transition-all duration-300 tracking-wider disabled:opacity-50"
          >
            {loading ? "Creating Account..." : "REGISTER"}
          </button>
        </form>
      </div>

      {/* SUCCESS OVERLAY */}
      {success && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 w-[360px] text-center shadow-2xl">
            <h2 className="text-xl font-bold text-green-600 mb-3">
              Account Created Successfully
            </h2>

            <p className="text-gray-700 mb-6 text-sm">
              Your account has been created.
              <br />
              Please log in to explore products.
            </p>

            <button
              onClick={() => navigate("/user-login")}
              className="w-full py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              Go to Login
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default RegisterUser;
