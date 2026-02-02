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
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error for this field when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone is required';
    } else if (!/^[0-9]{10}$/.test(formData.phone)) {
      newErrors.phone = 'Phone must be 10 digits';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);

    try {
      // TODO: Replace with actual API call
      // const response = await api.post('/auth/register', formData);
      
      // Simulating API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      console.log('Registration Data:', formData);
      
      // After successful registration, log the user in
      localStorage.setItem('userToken', 'dummy-user-token');
      localStorage.setItem('userName', formData.name);
      
      // Navigate to product selection
      navigate('/product-selection');
    } catch (err) {
      setErrors({ submit: 'Registration failed. Please try again.' });
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

        {errors.submit && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 text-sm">
            {errors.submit}
          </div>
        )}

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
              disabled={loading}
              className="w-full px-4 py-3 border-none rounded-lg text-sm bg-white text-black outline-none disabled:opacity-50"
              placeholder="Enter your full name"
            />
            {errors.name && (
              <p className="text-red-600 text-xs mt-1">{errors.name}</p>
            )}
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
              disabled={loading}
              className="w-full px-4 py-3 border-none rounded-lg text-sm bg-white text-black outline-none disabled:opacity-50"
              placeholder="Enter 10-digit phone number"
              maxLength={10}
            />
            {errors.phone && (
              <p className="text-red-600 text-xs mt-1">{errors.phone}</p>
            )}
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
              disabled={loading}
              className="w-full px-4 py-3 border-none rounded-lg text-sm bg-white text-black outline-none disabled:opacity-50"
              placeholder="At least 6 characters"
            />
            {errors.password && (
              <p className="text-red-600 text-xs mt-1">{errors.password}</p>
            )}
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
              disabled={loading}
              className="w-full px-4 py-3 border-none rounded-lg text-sm bg-white text-black outline-none disabled:opacity-50"
              placeholder="Re-enter your password"
            />
            {errors.confirmPassword && (
              <p className="text-red-600 text-xs mt-1">{errors.confirmPassword}</p>
            )}
          </div>

          {/* Register Button */}
          <button 
            type="submit"
            disabled={loading}
            className="w-full py-3.5 bg-green-500 text-white rounded-lg text-base font-bold hover:-translate-y-0.5 hover:shadow-lg hover:shadow-green-500/40 transition-all duration-300 tracking-wider disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            {loading ? 'REGISTERING...' : 'REGISTER'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default RegisterUser;