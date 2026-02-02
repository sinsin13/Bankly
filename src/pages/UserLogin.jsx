import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function UserLogin() {
  const navigate = useNavigate();
  const [customerId, setCustomerId] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (customerId && password) {
      // TODO: Authenticate with backend and get user data
      // const response = await api.post('/login', { customerId, password });
      // const userData = response.data;
      
      // For now, use dummy data
      const userData = {
        token: 'dummy-user-token',
        name: 'Test User',
        phone: '+91 9876543210',
        customerId: customerId,
        kycStatus: 'not_started' // not_started, pending, approved
      };
      
      // Set user token and data in localStorage
      localStorage.setItem('userToken', userData.token);
      localStorage.setItem('userName', userData.name);
      localStorage.setItem('userPhone', userData.phone);
      localStorage.setItem('customerId', userData.customerId);
      localStorage.setItem('kycStatus', userData.kycStatus);
      
      // Navigate to product selection
      navigate('/product-selection');
    } else {
      alert('Please enter Customer ID and Password');
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
              className="w-full px-4 py-3 border-none rounded-lg text-sm bg-white text-black outline-none"
              placeholder="Enter your customer ID"
              required
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
              className="w-full px-4 py-3 border-none rounded-lg text-sm bg-white text-black outline-none"
              placeholder="Enter your password"
              required
            />
          </div>

          {/* Login Button */}
          <button 
            type="submit"
            className="w-full py-3.5 bg-blue-500 text-white rounded-lg text-base font-bold hover:-translate-y-0.5 hover:shadow-lg hover:shadow-blue-500/40 transition-all duration-300 tracking-wider"
          >
            LOGIN
          </button>
        </form>
      </div>
    </div>
  );
}

export default UserLogin;