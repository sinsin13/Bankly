import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function UserLogin() {
  const navigate = useNavigate();
  const [customerId, setCustomerId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!customerId || !password) {
      setError('Please enter both Customer ID and Password');
      return;
    }

    setLoading(true);

    try {
      // TODO: Replace with actual API call
      // const response = await api.post('/auth/user/login', { customerId, password });
      
      // Simulating API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Store token (in production, get this from backend)
      localStorage.setItem('userToken', 'dummy-user-token');
      localStorage.setItem('userName', customerId); // Store user info
      
      // Navigate to product selection
      navigate('/product-selection');
    } catch (err) {
      setError('Invalid credentials. Please try again.');
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

      {/* Go Back Button */}
      <button 
        onClick={() => navigate('/role-selection')}
        className="absolute top-6 right-16 bg-white text-blue-900 px-5 py-2.5 rounded-md text-sm font-semibold hover:-translate-y-0.5 hover:shadow-xl transition-all duration-300 shadow-md"
      >
        ← Go Back
      </button>

      {/* Login Card */}
      <div className="bg-[#E6F0FF] rounded-3xl px-14 py-12 w-full max-w-md shadow-2xl opacity-0 animate-zoomIn" style={{ animationDelay: '0.1s', animationFillMode: 'forwards' }}>
        <h2 className="text-3xl font-bold text-black text-center mb-8">
          Welcome Back
        </h2>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Customer ID */}
          <div className="mb-5">
            <label className="block text-sm font-semibold text-black mb-2">
              Customer ID
            </label>
            <input 
              type="text"
              value={customerId}
              onChange={(e) => setCustomerId(e.target.value)}
              disabled={loading}
              className="w-full px-4 py-3 border-none rounded-lg text-sm bg-white text-black outline-none disabled:opacity-50"
              placeholder="Enter your Customer ID"
            />
          </div>

          {/* Password */}
          <div className="mb-7">
            <label className="block text-sm font-semibold text-black mb-2">
              Password
            </label>
            <input 
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
              className="w-full px-4 py-3 border-none rounded-lg text-sm bg-white text-black outline-none disabled:opacity-50"
              placeholder="Enter your password"
            />
          </div>

          {/* Login Button */}
          <button 
            type="submit"
            disabled={loading}
            className="w-full py-3.5 bg-blue-500 text-white rounded-lg text-base font-bold hover:-translate-y-0.5 hover:shadow-lg hover:shadow-blue-500/40 transition-all duration-300 tracking-wider disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            {loading ? 'LOGGING IN...' : 'LOGIN'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default UserLogin;