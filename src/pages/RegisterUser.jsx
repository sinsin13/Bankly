import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProgressIndicator from '../components/ProgressIndicator';

function RegisterUser() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  
  const [formData, setFormData] = useState({
    name: '',
    dob: '',
    mobile: '',
    email: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    proofId: '',
    idNo: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false,
    agreePrivacy: false
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      navigate('/');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Registration Data:', formData);
    alert('Registration Successful! (Data will be saved to database in future)');
    navigate('/role-selection');
  };

  return (
    <div className="min-h-screen bg-[#187cff] text-white flex flex-col items-center justify-center p-5">
      {/* Logo */}
      <div className="absolute top-6 left-16 text-xl font-bold">
        Bank.ly
      </div>

      {/* Registration Card */}
      <div className="bg-[#E6F0FF] rounded-3xl px-14 py-12 w-full max-w-xl shadow-2xl opacity-0 animate-zoomIn" style={{ animationDelay: '0.1s', animationFillMode: 'forwards' }}>
        {/* Title */}
        <h2 className="text-3xl font-bold text-black text-center mb-2">
          {currentStep === 1 && 'Personal Details'}
          {currentStep === 2 && 'Residential Address'}
          {currentStep === 3 && 'Identity & Security'}
        </h2>

        {/* Progress Indicator */}
        <ProgressIndicator currentStep={currentStep} />

        <form onSubmit={handleSubmit}>
          {/* Step 1: Personal Details */}
          {currentStep === 1 && (
            <>
              <div className="mb-5">
                <label className="block text-sm font-semibold text-black mb-2">
                  Name :
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

              <div className="mb-5">
                <label className="block text-sm font-semibold text-black mb-2">
                  DOB :
                </label>
                <input 
                  type="date"
                  name="dob"
                  value={formData.dob}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border-none rounded-lg text-sm bg-white text-black outline-none"
                />
              </div>

              <div className="mb-5">
                <label className="block text-sm font-semibold text-black mb-2">
                  Mobile :
                </label>
                <input 
                  type="tel"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border-none rounded-lg text-sm bg-white text-black outline-none"
                />
              </div>

              <div className="mb-5">
                <label className="block text-sm font-semibold text-black mb-2">
                  Email :
                </label>
                <input 
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border-none rounded-lg text-sm bg-white text-black outline-none"
                />
              </div>
            </>
          )}

          {/* Step 2: Residential Address */}
          {currentStep === 2 && (
            <>
              <div className="mb-5">
                <label className="block text-sm font-semibold text-black mb-2">
                  Address :
                </label>
                <input 
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border-none rounded-lg text-sm bg-white text-black outline-none"
                />
              </div>

              <div className="mb-5">
                <label className="block text-sm font-semibold text-black mb-2">
                  City :
                </label>
                <input 
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border-none rounded-lg text-sm bg-white text-black outline-none"
                />
              </div>

              <div className="mb-5">
                <label className="block text-sm font-semibold text-black mb-2">
                  State :
                </label>
                <input 
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border-none rounded-lg text-sm bg-white text-black outline-none"
                />
              </div>

              <div className="mb-5">
                <label className="block text-sm font-semibold text-black mb-2">
                  Zip Code :
                </label>
                <input 
                  type="text"
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border-none rounded-lg text-sm bg-white text-black outline-none"
                />
              </div>
            </>
          )}

          {/* Step 3: Identity & Security */}
          {currentStep === 3 && (
            <>
              <div className="mb-5">
                <label className="block text-sm font-semibold text-black mb-2">
                  Proof ID :
                </label>
                <input 
                  type="text"
                  name="proofId"
                  value={formData.proofId}
                  onChange={handleInputChange}
                  placeholder="Aadhaar/PAN/Passport"
                  required
                  className="w-full px-4 py-3 border-none rounded-lg text-sm bg-white text-black outline-none"
                />
              </div>

              <div className="mb-5">
                <label className="block text-sm font-semibold text-black mb-2">
                  ID No :
                </label>
                <input 
                  type="text"
                  name="idNo"
                  value={formData.idNo}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border-none rounded-lg text-sm bg-white text-black outline-none"
                />
              </div>

              <div className="mb-5">
                <label className="block text-sm font-semibold text-black mb-2">
                  Create Password :
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

              <div className="mb-5">
                <label className="block text-sm font-semibold text-black mb-2">
                  Confirm Password :
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

              {/* Checkboxes */}
              <div className="mb-3 text-xs">
                <label className="flex items-center cursor-pointer text-black">
                  <input 
                    type="checkbox"
                    name="agreeTerms"
                    checked={formData.agreeTerms}
                    onChange={handleInputChange}
                    required
                    className="mr-2"
                  />
                  I agree that the information provided is correct
                </label>
              </div>

              <div className="mb-5 text-xs">
                <label className="flex items-center cursor-pointer text-black">
                  <input 
                    type="checkbox"
                    name="agreePrivacy"
                    checked={formData.agreePrivacy}
                    onChange={handleInputChange}
                    required
                    className="mr-2"
                  />
                  I agree to the Terms of Service and Privacy Policy
                </label>
              </div>
            </>
          )}

          {/* Navigation Buttons */}
          <div className="flex gap-3 mt-7">
            <button 
              type="button"
              onClick={handleBack}
              className="flex-1 py-3.5 bg-white text-blue-500 border-2 border-blue-500 rounded-lg text-base font-bold hover:-translate-y-0.5 transition-all duration-300 tracking-wider"
            >
              Back
            </button>

            {currentStep < 3 ? (
              <button 
                type="button"
                onClick={handleNext}
                className="flex-1 py-3.5 bg-blue-500 text-white rounded-lg text-base font-bold hover:-translate-y-0.5 hover:shadow-lg hover:shadow-blue-500/40 transition-all duration-300 tracking-wider"
              >
                Next
              </button>
            ) : (
              <button 
                type="submit"
                className="flex-1 py-3.5 bg-green-500 text-white rounded-lg text-base font-bold hover:-translate-y-0.5 hover:shadow-lg hover:shadow-green-500/40 transition-all duration-300 tracking-wider"
              >
                Submit
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default RegisterUser;