import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell, User, LogOut, Settings, HelpCircle, Search } from 'lucide-react';

function KYCFlow() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);

  // Get user name from localStorage
  const userName = localStorage.getItem('userName') || 'User';

  // Form data state
  const [formData, setFormData] = useState({
    // Step 1 - Profile
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

    // Step 4 - Document Upload (Aadhaar & PAN)
    aadhaarNumber: '',
    panNumber: '',
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

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    } else {
      // Submit application and set status to pending
      localStorage.setItem('kycStatus', 'pending');
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
            {currentStep === 5 ? 'Application Status' : 'Complete your KYC'}
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
                Please fill the below fields to complete your KYC process
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
                  {/* Step 1: Profile */}
                  {currentStep === 1 && (
                    <div>
                      <h2 className="text-xl font-bold mb-6">Personal Information</h2>
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
                          <input
                            type="email"
                            value={formData.email}
                            onChange={(e) => handleInputChange('email', e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                            placeholder="Enter your email address"
                          />
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

                  {/* Step 4: Document Upload (Aadhaar & PAN) */}
                  {currentStep === 4 && (
                    <div>
                      <h2 className="text-xl font-bold mb-4">Document Verification</h2>
                      <p className="text-gray-600 text-sm mb-6">
                        Please fill out the details from your Aadhaar and PAN cards for verification.
                      </p>

                      <div className="space-y-6">
                        {/* Aadhaar */}
                        <div>
                          <h3 className="font-semibold mb-3">Aadhaar Card</h3>
                          <div className="space-y-3">
                            <div>
                              <label className="block text-sm font-semibold mb-2">Aadhaar Number</label>
                              <input
                                type="text"
                                value={formData.aadhaarNumber}
                                onChange={(e) => handleInputChange('aadhaarNumber', e.target.value)}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                placeholder="Enter Aadhaar number"
                              />
                            </div>
                          </div>
                        </div>

                        {/* PAN */}
                        <div>
                          <h3 className="font-semibold mb-3">PAN Card</h3>
                          <div className="space-y-3">
                            <div>
                              <label className="block text-sm font-semibold mb-2">PAN Number</label>
                              <input
                                type="text"
                                value={formData.panNumber}
                                onChange={(e) => handleInputChange('panNumber', e.target.value)}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                placeholder="Enter PAN number"
                              />
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
                  Thank you for choosing Nexus Bank. Your application has been received.
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
