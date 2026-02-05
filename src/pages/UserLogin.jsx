import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

function UserLogin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await api.post('/Auth/login', {
        email,
        password,
      });

      const { token, userName, role, expiration } = response.data;

      // ❌ Block admin login from user page
      if (role !== "Customer") {
        setError("Admins must log in from the Admin Login page");
        setLoading(false);
        return;
      }
      
      // ✅ Store auth data
      localStorage.setItem('token', token);
      localStorage.setItem('userName', userName);
      localStorage.setItem('role', role);
      localStorage.setItem('expiresAt', expiration);

      // ✅ IMPORTANT: decide redirect based on backend data
      const accountsResponse = await api.get('/Accounts', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const accounts = accountsResponse.data;

      if (accounts && accounts.length > 0) {
        // ✅ User already has account → dashboard
        navigate('/user/dashboard', { replace: true });
      } else {
        // ✅ No account yet → product selection
        navigate('/product-selection', { replace: true });
      }

    } catch (err) {
      setError(
        err.response?.data || 'Invalid email or password'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#187cff] text-white flex flex-col items-center justify-center p-5">
      
      {/* Logo */}
      <div className="absolute top-6 left-16 text-xl font-bold">
        Bank.ly
      </div>

      {/* Go Back */}
      <button
        onClick={() => navigate('/role-selection')}
        className="absolute top-6 right-16 bg-white text-blue-900 px-5 py-2.5 rounded-md text-sm font-semibold hover:-translate-y-0.5 hover:shadow-xl transition-all duration-300 shadow-md"
      >
        ← Go Back
      </button>

      {/* Login Card */}
      <div className="bg-[#E6F0FF] rounded-3xl px-14 py-12 w-full max-w-md shadow-2xl">
        <h2 className="text-3xl font-bold text-black text-center mb-8">
          Welcome Back
        </h2>

        <form onSubmit={handleSubmit}>
          
          {/* Email */}
          <div className="mb-5">
            <label className="block text-sm font-semibold text-black mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-lg text-sm bg-white text-black outline-none"
              placeholder="Enter your email"
              required
            />
          </div>

          {/* Password */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-black mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-lg text-sm bg-white text-black outline-none"
              placeholder="Enter your password"
              required
            />
          </div>

          {/* Error */}
          {error && (
            <p className="text-red-600 text-sm mb-4 text-center">
              {error}
            </p>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 bg-blue-500 text-white rounded-lg text-base font-bold hover:-translate-y-0.5 hover:shadow-lg hover:shadow-blue-500/40 transition-all duration-300 tracking-wider disabled:opacity-50"
          
          >
            {loading ? 'Logging in...' : 'LOGIN'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default UserLogin;
