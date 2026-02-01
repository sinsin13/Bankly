import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function RegisterUser() {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    
    console.log('Registration Data:', formData);
    
    // Store user token (dummy for now)
    localStorage.setItem("userToken", "dummy-user-token");
    
    // Navigate to product selection page
    navigate('/product-selection');
  };

  return (
    <div className="min-h-screen bg-[#187cff] text-white flex flex-col items-center justify-center p-5">
      {/* Logo */}
      <div className="absolute top-6 left-16 text-xl font-bold">
        Bank.ly
      </div>

      {/* Go Back Button */}
      <button 
        onClick={() => navigate('/')}
        className="absolute top-6 right-16 bg-white text-blue-900 px-5 py-2.5 rounded-md text-sm font-semibold hover:-translate-y-0.5 hover:shadow-xl transition-all duration-300 shadow-md"
      >
        ← Go Back
      </button>

      {/* Registration Card */}
      <div className="bg-[#E6F0FF] rounded-3xl px-14 py-12 w-full max-w-md shadow-2xl opacity-0 animate-zoomIn" style={{ animationDelay: '0.1s', animationFillMode: 'forwards' }}>
        {/* Title */}
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
            />
          </div>

          {/* Phone */}
          <div className="mb-5">
            <label className="block text-sm font-semibold text-black mb-2">
              Phone
            </label>
            <input 
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 border-none rounded-lg text-sm bg-white text-black outline-none"
            />
          </div>

          {/* Create Password */}
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
            />
          </div>

          {/* Register Button */}
          <button 
            type="submit"
            className="w-full py-3.5 bg-green-500 text-white rounded-lg text-base font-bold hover:-translate-y-0.5 hover:shadow-lg hover:shadow-green-500/40 transition-all duration-300 tracking-wider"
          >
            REGISTER
          </button>
        </form>
      </div>
    </div>
  );
}

export default RegisterUser;