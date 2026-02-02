import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell, User, LogOut, Settings, HelpCircle, Search } from 'lucide-react';

function KYCFlow() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [showEmailVerification, setShowEmailVerification] = useState(false);
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [resendTimer, setResendTimer] = useState(25);

  // Get user name from localStorage
  const userName = localStorage.getItem('userName') || 'User';

  // Form data state
  const [formData, setFormData] = useState({
    // Step 1 - Profile & Account
    accountType: 'savings',
    name: userName,
    dateOfBirth: '',
    gender: '',
    maritalStatus: '',
    
    // Step 2 - Contact Details
    email: '',
    contactNo: '',
    emergencyContact: '',
    
    // Step 3 - Residential Address
    address: '',
    city: '',
    state: '',
    zipCode: '',
    
    // Step 4 - Document Upload
    identityProofType: '',
    identityProofNumber: '',
    identityProofFile: null,
    addressProofType: '',
    addressProofNumber: '',
    addressProofFile: null,
    termsAccepted: false
  });

  const handleLogout = () => {
    localStorage.removeItem("userToken");
    localStorage.removeItem("userName");
    localStorage.removeItem("userPhone");
    navigate("/");
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleOtpChange = (index, value) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      
      // Auto-focus next input
      if (value && index < 5) {
        document.getElementById(`otp-${index + 1}`)?.focus();
      }
    }
  };

  const handleVerifyEmail = () => {
    setShowEmailVerification(true);
    // Start countdown
    const timer = setInterval(() => {
      setResendTimer(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleVerifyOtp = () => {
    const otpValue = otp.join('');
    if (otpValue.length === 6) {
      setShowEmailVerification(false);
      alert('Email verified successfully!');
    }
  };

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    } else {
      // Submit application
      setCurrentStep(5);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Email Verification Modal */}
      {showEmailVerification && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 w-full max-w-md shadow-2xl">
            <h2 className="text-2xl font-bold text-center mb-4">Verify Email Address</h2>
            <p className="text-center text-gray-600 mb-6">
              Enter the 6-digit code sent to {formData.email || 'your email'}
            </p>
            
            <div className="flex gap-2 justify-center mb-4">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  id={`otp-${index}`}
                  type="text"
                  maxLength="1"
                  value={digit}
                  onChange={(e) => handleOtpChange(index, e.target.value)}
                  className="w-12 h-12 text-center text-xl font-bold border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                />
              ))}
            </div>
            
            <p className="text-center text-sm text-gray-500 mb-6">
              Resend code in {resendTimer > 0 ? `00:${resendTimer.toString().padStart(2, '0')}` : '00:00'}s
            </p>
            
            <div className="flex gap-3">
              <button
                onClick={() => setShowEmailVerification(false)}
                className="flex-1 px-6 py-3 bg-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-400 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleVerifyOtp}
                className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
              >
                Verify & Proceed
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Left Sidebar */}
      <aside className="w-64 bg-gradient-to-b from-blue-600 to-blue-500 text-white flex flex-col flex-shrink-0">
        <div className="p-6 text-2xl font-bold">Bank.ly</div>

        <nav className="flex-1 px-3">
          <button className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-blue-700 w-full text-left mb-1">
            <Search size={20} />
            Explore
          </button>

          <button className="flex items-center gap-3 px-4 py-3 rounded-lg bg-blue-700 w-full text-left mb-1">
            <HelpCircle size={20} />
            Help & Support
          </button>
        </nav>

        <div className="px-3 pb-4 space-y-1">
          <button className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-blue-700 w-full text-left">
            <Settings size={20} />
            Settings
          </button>
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-red-500 w-full text-left"
          >
            <LogOut size={20} />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Header */}
        <header className="h-16 bg-white flex items-center justify-between px-6 shadow-sm flex-shrink-0">
          <h1 className="text-xl font-semibold">
            {currentStep === 5 ? 'Application Status' : 'New Account Application'}
          </h1>

          <div className="flex items-center gap-5">
            <Bell className="cursor-pointer text-gray-600 hover:text-blue-600 transition" />
            <div className="flex items-center gap-2 cursor-pointer">
              <div className="w-9 h-9 rounded-full bg-blue-500 text-white flex items-center justify-center">
                <User size={18} />
              </div>
              <div className="text-sm">
                <p className="font-medium">{userName}</p>
                <p className="text-gray-500 text-xs">User</p>
              </div>
            </div>
          </div>
        </header>

        {/* Form Content */}
        <main className="flex-1 overflow-y-auto bg-white">
          {currentStep !== 5 && (
            <div className="max-w-5xl mx-auto p-6">
              <p className="text-center text-gray-600 mb-8">
                Please complete the details below to activate your account
              </p>

              <div className="flex gap-6">
                {/* Progress Steps */}
                <div className="w-64 bg-gray-100 rounded-xl p-6 flex-shrink-0">
                  <div className="space-y-4">
                    {/* Step 1 */}
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold ${
                        currentStep >= 1 ? 'bg-blue-500' : 'bg-gray-400'
                      }`}>
                        1
                      </div>
                      <div>
                        <p className="font-semibold text-sm">Profile & Account</p>
                      </div>
                    </div>
                    <div className="ml-5 h-8 w-0.5 bg-gray-300"></div>

                    {/* Step 2 */}
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold ${
                        currentStep >= 2 ? 'bg-blue-500' : 'bg-gray-400'
                      }`}>
                        2
                      </div>
                      <div>
                        <p className="font-semibold text-sm">Contact Details</p>
                      </div>
                    </div>
                    <div className="ml-5 h-8 w-0.5 bg-gray-300"></div>

                    {/* Step 3 */}
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold ${
                        currentStep >= 3 ? 'bg-blue-500' : 'bg-gray-400'
                      }`}>
                        3
                      </div>
                      <div>
                        <p className="font-semibold text-sm">Residential Address</p>
                      </div>
                    </div>
                    <div className="ml-5 h-8 w-0.5 bg-gray-300"></div>

                    {/* Step 4 */}
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold ${
                        currentStep >= 4 ? 'bg-blue-500' : 'bg-gray-400'
                      }`}>
                        4
                      </div>
                      <div>
                        <p className="font-semibold text-sm">Upload Document</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Form Content */}
                <div className="flex-1 bg-white rounded-xl border border-gray-200 p-8">
                  {/* Step 1: Profile & Account */}
                  {currentStep === 1 && (
                    <div>
                      <h2 className="text-xl font-bold mb-6">Account Type</h2>
                      <p className="text-gray-600 text-sm mb-4">Choose the account that best fits your needs</p>
                      
                      <div className="flex gap-4 mb-8">
                        <button
                          onClick={() => handleInputChange('accountType', 'savings')}
                          className={`px-6 py-2 rounded-lg font-semibold transition ${
                            formData.accountType === 'savings'
                              ? 'bg-blue-600 text-white'
                              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                          }`}
                        >
                          Savings Account
                        </button>
                        <button
                          onClick={() => handleInputChange('accountType', 'current')}
                          className={`px-6 py-2 rounded-lg font-semibold transition ${
                            formData.accountType === 'current'
                              ? 'bg-blue-600 text-white'
                              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                          }`}
                        >
                          Current Account
                        </button>
                      </div>

                      <h2 className="text-xl font-bold mb-4">Personal Information</h2>
                      <p className="text-gray-600 text-sm mb-6">
                        Ensure your name and details match your official government ID
                      </p>

                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-semibold mb-2">Name</label>
                          <input
                            type="text"
                            value={formData.name}
                            onChange={(e) => handleInputChange('name', e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                            placeholder="Enter your full name"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-semibold mb-2">Date of Birth</label>
                          <input
                            type="date"
                            value={formData.dateOfBirth}
                            onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-semibold mb-2">Gender</label>
                          <select
                            value={formData.gender}
                            onChange={(e) => handleInputChange('gender', e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                          >
                            <option value="">Select Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-semibold mb-2">Marital Status</label>
                          <select
                            value={formData.maritalStatus}
                            onChange={(e) => handleInputChange('maritalStatus', e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                          >
                            <option value="">Select Marital Status</option>
                            <option value="single">Single</option>
                            <option value="married">Married</option>
                            <option value="divorced">Divorced</option>
                            <option value="widowed">Widowed</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Step 2: Contact Details */}
                  {currentStep === 2 && (
                    <div>
                      <h2 className="text-xl font-bold mb-4">Contact Information</h2>
                      <p className="text-gray-600 text-sm mb-6">
                        Provide active contact details for important account updates and OTPs
                      </p>

                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-semibold mb-2">Email</label>
                          <div className="flex gap-2">
                            <input
                              type="email"
                              value={formData.email}
                              onChange={(e) => handleInputChange('email', e.target.value)}
                              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                              placeholder="Enter your email address"
                            />
                            <button
                              onClick={handleVerifyEmail}
                              className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
                            >
                              Verify
                            </button>
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-semibold mb-2">Contact No.</label>
                          <input
                            type="tel"
                            value={formData.contactNo}
                            onChange={(e) => handleInputChange('contactNo', e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                            placeholder="+91 98765 43210"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-semibold mb-2">Emergency Contact</label>
                          <input
                            type="tel"
                            value={formData.emergencyContact}
                            onChange={(e) => handleInputChange('emergencyContact', e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                            placeholder="+91 98765 43210"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Step 3: Residential Address */}
                  {currentStep === 3 && (
                    <div>
                      <h2 className="text-xl font-bold mb-4">Address Information</h2>
                      <p className="text-gray-600 text-sm mb-6">
                        Where should we deliver your debit card and cheque book?
                      </p>

                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-semibold mb-2">Address</label>
                          <input
                            type="text"
                            value={formData.address}
                            onChange={(e) => handleInputChange('address', e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                            placeholder="Street address, apartment, suite, etc."
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-semibold mb-2">City</label>
                          <select
                            value={formData.city}
                            onChange={(e) => handleInputChange('city', e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                          >
                            <option value="">Select City</option>
                            <option value="jaipur">Jaipur</option>
                            <option value="delhi">Delhi</option>
                            <option value="mumbai">Mumbai</option>
                            <option value="bangalore">Bangalore</option>
                            <option value="chennai">Chennai</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-semibold mb-2">State</label>
                          <select
                            value={formData.state}
                            onChange={(e) => handleInputChange('state', e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                          >
                            <option value="">Select State</option>
                            <option value="rajasthan">Rajasthan</option>
                            <option value="delhi">Delhi</option>
                            <option value="maharashtra">Maharashtra</option>
                            <option value="karnataka">Karnataka</option>
                            <option value="tamil-nadu">Tamil Nadu</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-semibold mb-2">Zip / postal code</label>
                          <input
                            type="text"
                            value={formData.zipCode}
                            onChange={(e) => handleInputChange('zipCode', e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                            placeholder="302001"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Step 4: Document Upload */}
                  {currentStep === 4 && (
                    <div>
                      <h2 className="text-xl font-bold mb-4">Document Verification</h2>
                      <p className="text-gray-600 text-sm mb-6">
                        Please upload clear images of your official documents
                      </p>

                      <div className="space-y-6">
                        {/* Identity Proof */}
                        <div>
                          <h3 className="font-semibold mb-3">Identity proof</h3>
                          <div className="space-y-3">
                            <div>
                              <label className="block text-sm font-semibold mb-2">Select ID type</label>
                              <select
                                value={formData.identityProofType}
                                onChange={(e) => handleInputChange('identityProofType', e.target.value)}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                              >
                                <option value="">Select document type</option>
                                <option value="aadhaar">Aadhaar Card</option>
                                <option value="pan">PAN Card</option>
                                <option value="passport">Passport</option>
                                <option value="voter">Voter ID</option>
                                <option value="driving">Driving License</option>
                              </select>
                            </div>

                            <div>
                              <label className="block text-sm font-semibold mb-2">ID Number</label>
                              <input
                                type="text"
                                value={formData.identityProofNumber}
                                onChange={(e) => handleInputChange('identityProofNumber', e.target.value)}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                placeholder="Enter ID number"
                              />
                            </div>

                            <div>
                              <label className="block text-sm font-semibold mb-2">Upload file</label>
                              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-500 transition cursor-pointer">
                                <div className="w-16 h-16 mx-auto mb-3 bg-blue-100 rounded-full flex items-center justify-center">
                                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                  </svg>
                                </div>
                                <p className="text-sm text-gray-600">Upload your file</p>
                                <input
                                  type="file"
                                  onChange={(e) => handleInputChange('identityProofFile', e.target.files[0])}
                                  className="hidden"
                                  accept="image/*,.pdf"
                                />
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Address Proof */}
                        <div>
                          <h3 className="font-semibold mb-3">Address proof</h3>
                          <div className="space-y-3">
                            <div>
                              <label className="block text-sm font-semibold mb-2">Select document</label>
                              <select
                                value={formData.addressProofType}
                                onChange={(e) => handleInputChange('addressProofType', e.target.value)}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                              >
                                <option value="">Select document type</option>
                                <option value="aadhaar">Aadhaar Card</option>
                                <option value="passport">Passport</option>
                                <option value="utility">Utility Bill</option>
                                <option value="rental">Rental Agreement</option>
                              </select>
                            </div>

                            <div>
                              <label className="block text-sm font-semibold mb-2">Document number</label>
                              <input
                                type="text"
                                value={formData.addressProofNumber}
                                onChange={(e) => handleInputChange('addressProofNumber', e.target.value)}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                placeholder="Enter document number"
                              />
                            </div>

                            <div>
                              <label className="block text-sm font-semibold mb-2">Upload file</label>
                              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-500 transition cursor-pointer">
                                <div className="w-16 h-16 mx-auto mb-3 bg-blue-100 rounded-full flex items-center justify-center">
                                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                  </svg>
                                </div>
                                <p className="text-sm text-gray-600">Upload your file</p>
                                <input
                                  type="file"
                                  onChange={(e) => handleInputChange('addressProofFile', e.target.files[0])}
                                  className="hidden"
                                  accept="image/*,.pdf"
                                />
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Terms Checkbox */}
                        <div className="flex items-start gap-2 pt-4">
                          <input
                            type="checkbox"
                            id="terms"
                            checked={formData.termsAccepted}
                            onChange={(e) => handleInputChange('termsAccepted', e.target.checked)}
                            className="mt-1 w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                          />
                          <label htmlFor="terms" className="text-sm text-gray-700">
                            I certify that the information provided is correct.
                          </label>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Navigation Buttons */}
                  <div className="flex justify-between mt-8 pt-6 border-t">
                    <button
                      onClick={handleBack}
                      disabled={currentStep === 1}
                      className={`px-8 py-3 rounded-lg font-semibold transition ${
                        currentStep === 1
                          ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }`}
                    >
                      Back
                    </button>
                    <button
                      onClick={handleNext}
                      className="px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
                    >
                      {currentStep === 4 ? 'Submit' : 'Next'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 5: Success Screen */}
          {currentStep === 5 && (
            <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-6">
              <div className="text-center max-w-lg">
                <div className="w-32 h-32 mx-auto mb-6 bg-green-100 rounded-full flex items-center justify-center">
                  <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center">
                    <svg className="w-14 h-14 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </div>

                <h2 className="text-3xl font-bold mb-4">Application Submitted Successfully</h2>
                <p className="text-gray-600 mb-8">
                  Thank you for choosing Bankly. Your application has been received.
                </p>

                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-8 text-left">
                  <div className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-yellow-600 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                    <div>
                      <p className="font-semibold text-yellow-800 mb-1">Status: Pending Approval</p>
                      <p className="text-sm text-yellow-700">
                        Your application is under review. You will receive an email within 48 hours.
                      </p>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => navigate('/product-selection')}
                  className="px-10 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition text-lg"
                >
                  Explore Products
                </button>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default KYCFlow;