import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell, User, LogOut, Settings, HelpCircle, Search, CheckCircle } from 'lucide-react';

function AccountCreation() {
  const navigate = useNavigate();
  const userName = localStorage.getItem('userName') || 'User';
  const [selectedAccountType, setSelectedAccountType] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("userToken");
    localStorage.removeItem("userName");
    localStorage.removeItem("userPhone");
    localStorage.removeItem("customerId");
    localStorage.removeItem("kycStatus");
    navigate("/");
  };

  const handleAccountTypeSelect = (type) => {
    setSelectedAccountType(type);
  };

  const handleSubmit = async () => {
    if (!selectedAccountType) {
      alert('Please select an account type');
      return;
    }

    // TODO: Send account creation request to backend
    // const response = await api.post('/create-account', { accountType: selectedAccountType });
    
    console.log('Creating account:', selectedAccountType);
    
    // Show success modal
    setShowSuccess(true);
    
    // Redirect after 3 seconds
    setTimeout(() => {
      navigate('/user/dashboard');
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Success Modal */}
      {showSuccess && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-10 max-w-md text-center shadow-2xl">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
            <h2 className="text-3xl font-bold mb-4">Account Created Successfully!</h2>
            <p className="text-gray-600 mb-6">
              Your {selectedAccountType === 'savings' ? 'Savings' : 'Current'} Account has been created.
            </p>
            <div className="bg-blue-50 p-4 rounded-lg mb-6">
              <p className="text-sm text-gray-600">Account Number</p>
              <p className="text-2xl font-bold text-blue-600">
                {Math.floor(10000000000 + Math.random() * 90000000000)}
              </p>
            </div>
            <p className="text-sm text-gray-500">Redirecting to dashboard...</p>
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
          <h1 className="text-xl font-semibold">Create New Account</h1>

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

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto p-12">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-black mb-4">
                Choose Your Account Type
              </h2>
              <p className="text-lg text-gray-600">
                Select the account that best suits your banking needs
              </p>
            </div>

            {/* Account Type Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              {/* Savings Account */}
              <div
                onClick={() => handleAccountTypeSelect('savings')}
                className={`cursor-pointer rounded-2xl p-8 border-4 transition-all ${
                  selectedAccountType === 'savings'
                    ? 'border-blue-600 bg-blue-50 shadow-xl'
                    : 'border-gray-200 bg-white hover:border-blue-300 hover:shadow-lg'
                }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2">
                      <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
                    </svg>
                  </div>
                  {selectedAccountType === 'savings' && (
                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-5 h-5 text-white" />
                    </div>
                  )}
                </div>

                <h3 className="text-2xl font-bold mb-3">Savings Account</h3>
                <p className="text-gray-600 mb-6">
                  Perfect for individuals looking to save money and earn interest
                </p>

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-sm">Zero minimum balance</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-sm">4.5% interest rate</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-sm">Free debit card</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-sm">Mobile & internet banking</span>
                  </div>
                </div>
              </div>

              {/* Current Account */}
              <div
                onClick={() => handleAccountTypeSelect('current')}
                className={`cursor-pointer rounded-2xl p-8 border-4 transition-all ${
                  selectedAccountType === 'current'
                    ? 'border-blue-600 bg-blue-50 shadow-xl'
                    : 'border-gray-200 bg-white hover:border-blue-300 hover:shadow-lg'
                }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#9333ea" strokeWidth="2">
                      <rect x="4" y="7" width="16" height="13" rx="2" ry="2"/>
                      <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                    </svg>
                  </div>
                  {selectedAccountType === 'current' && (
                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-5 h-5 text-white" />
                    </div>
                  )}
                </div>

                <h3 className="text-2xl font-bold mb-3">Current Account</h3>
                <p className="text-gray-600 mb-6">
                  Ideal for businesses and frequent transactions
                </p>

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-sm">Unlimited transactions</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-sm">Overdraft facility</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-sm">Free checkbook</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-sm">Business banking tools</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-center gap-4">
              <button
                onClick={() => navigate('/product-selection')}
                className="px-8 py-3 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                disabled={!selectedAccountType}
                className={`px-8 py-3 rounded-lg font-semibold transition ${
                  selectedAccountType
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                Create Account
              </button>
            </div>

            {/* Info Box */}
            <div className="mt-12 bg-blue-50 rounded-xl p-6 border border-blue-200">
              <h4 className="font-semibold text-blue-900 mb-2">📋 What happens next?</h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Your account will be activated immediately</li>
                <li>• You'll receive your account number and details via email</li>
                <li>• Debit card will be delivered within 7 business days</li>
                <li>• You can start banking right away through our mobile app</li>
              </ul>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default AccountCreation;