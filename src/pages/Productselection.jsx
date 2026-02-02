import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell, User } from 'lucide-react';

function ProductSelection() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('User');

  useEffect(() => {
    // Get user name from localStorage
    const storedName = localStorage.getItem('userName');
    if (storedName) {
      setUserName(storedName);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userToken");
    localStorage.removeItem("userName");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Left Sidebar */}
      <aside className="w-80 bg-gradient-to-b from-blue-600 to-blue-500 text-white flex flex-col">
        <div className="p-8 text-3xl font-bold">Bank.ly</div>

        <nav className="flex-1 px-4">
          <button className="flex items-center gap-4 px-6 py-4 rounded-lg bg-white text-blue-600 w-full text-lg mb-2">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"/>
              <path d="m21 21-4.35-4.35"/>
            </svg>
            Explore
          </button>

          <button className="flex items-center gap-4 px-6 py-4 rounded-lg hover:bg-blue-700 w-full text-lg">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"/>
              <path d="M12 16v-4M12 8h.01"/>
            </svg>
            Help & Support
          </button>
        </nav>

        <div className="px-4 pb-6 space-y-2">
          <button className="flex items-center gap-4 px-6 py-4 rounded-lg hover:bg-blue-700 w-full text-lg">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="3"/>
              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
            </svg>
            Settings
          </button>

          <button 
            onClick={handleLogout}
            className="flex items-center gap-4 px-6 py-4 rounded-lg hover:bg-red-500 w-full text-lg"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
              <polyline points="16 17 21 12 16 7"/>
              <line x1="21" y1="12" x2="9" y2="12"/>
            </svg>
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Top Header */}
        <header className="h-20 bg-white flex items-center justify-end px-8 shadow-sm">
          <div className="flex items-center gap-6">
            <Bell className="cursor-pointer text-gray-600 hover:text-blue-600 transition" size={24} />
            <div className="flex items-center gap-3 cursor-pointer">
              <div className="w-12 h-12 rounded-full bg-blue-500 text-white flex items-center justify-center">
                <User size={22} />
              </div>
              <div className="text-sm">
                <p className="font-semibold text-base">{userName}</p>
                <p className="text-gray-500 text-sm">Customer</p>
              </div>
            </div>
          </div>
        </header>

        {/* Products Content */}
        <main className="flex-1 p-12 overflow-y-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-black mb-4">
              Explore our products
            </h1>
            <p className="text-xl text-gray-600 italic">
              Grow your wealth with our premium banking services
            </p>
          </div>

          {/* Product Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            
            {/* Open Bank Account Card */}
            <div className="bg-gradient-to-br from-blue-300 to-blue-200 rounded-3xl p-10 flex flex-col items-center text-center shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all">
              <div className="w-40 h-40 bg-white rounded-full flex items-center justify-center mb-8">
                <svg 
                  width="120" 
                  height="120" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="#3b82f6" 
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="4" y="7" width="16" height="13" rx="2" ry="2"/>
                  <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                  <circle cx="12" cy="13" r="2"/>
                </svg>
              </div>

              <h2 className="text-3xl font-bold text-black mb-4">
                Open a bank account
              </h2>
              
              <p className="text-lg text-gray-700 mb-8">
                Zero balance savings and current accounts
              </p>

              <button className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-4 rounded-full text-lg font-semibold transition-all hover:shadow-xl">
                Open account now
              </button>
            </div>

            {/* Apply for Loan Card */}
            <div className="bg-gradient-to-br from-blue-300 to-blue-200 rounded-3xl p-10 flex flex-col items-center text-center shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all">
              <div className="w-40 h-40 bg-white rounded-full flex items-center justify-center mb-8">
                <svg 
                  width="100" 
                  height="100" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="#3b82f6" 
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
                </svg>
              </div>

              <h2 className="text-3xl font-bold text-black mb-4">
                Apply for loan
              </h2>
              
              <p className="text-lg text-gray-700 mb-8">
                Personal and home loans at low rates
              </p>

              <button className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-4 rounded-full text-lg font-semibold transition-all hover:shadow-xl">
                Check eligibility
              </button>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
}

export default ProductSelection;