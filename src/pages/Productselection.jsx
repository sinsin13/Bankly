import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Bell, User, Lock, CheckCircle } from "lucide-react";

/* -------------------- KYC CONFIG -------------------- */
const KYC_CONFIG = {
  not_started: {
    kycText: "Complete Your KYC",
    accountText: "Open an Account",
    kycBtnClass: "bg-blue-600 hover:bg-blue-700 cursor-pointer",
    accountBtnClass: "bg-gray-400 cursor-not-allowed",
    description: "Complete your KYC to unlock banking services",
    lockText: "Complete KYC to Unlock"
  },
  pending: {
    kycText: "KYC Submitted",
    accountText: "Pending Approval",
    kycBtnClass: "bg-yellow-500 cursor-not-allowed",
    accountBtnClass: "bg-yellow-500 cursor-not-allowed",
    description: "Your KYC is under review by our team",
    lockText: "KYC Approval Required"
  },
  approved: {
    kycText: "KYC Completed ✓",
    accountText: "Open an Account",
    kycBtnClass: "bg-green-500 cursor-not-allowed",
    accountBtnClass: "bg-blue-600 hover:bg-blue-700 cursor-pointer",
    description: "Your KYC verification is complete!",
    lockText: null
  }
};

const VALID_KYC_STATUSES = ["not_started", "pending", "approved"];

/* -------------------- COMPONENT -------------------- */
function ProductSelection() {
  const navigate = useNavigate();
  const [kycStatus, setKycStatus] = useState("not_started");
  const [userName, setUserName] = useState("User");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  /* Initialize KYC Status and User Name
     - Validates KYC status against allowed values
     - Safely retrieves userName with fallback
     - Handles loading state
  */
  useEffect(() => {
    try {
      const storedStatus = localStorage.getItem("kycStatus");
      const storedUserName = localStorage.getItem("userName");

      // Validate and set KYC status
      if (storedStatus && VALID_KYC_STATUSES.includes(storedStatus)) {
        setKycStatus(storedStatus);
      } else {
        setKycStatus("not_started");
      }

      // Set user name with fallback
      if (storedUserName && storedUserName.trim()) {
        setUserName(storedUserName);
      } else {
        setUserName("User");
      }

      setIsLoading(false);
    } catch (err) {
      console.error("Error loading user data:", err);
      setError("Failed to load user data");
      setIsLoading(false);
    }
  }, []);

  const handleLogout = async () => {
    try {
      // Clear localStorage
      const keysToRemove = [
        "userToken",
        "userName",
        "userPhone",
        "customerId",
        "kycStatus"
      ];
      
      keysToRemove.forEach(key => {
        try {
          localStorage.removeItem(key);
        } catch (err) {
          console.error(`Failed to remove ${key}:`, err);
        }
      });

      // Optional: Call backend logout endpoint if needed
      // await fetch('/api/logout', { method: 'POST' });

      // Navigate to home
      navigate("/", { replace: true });
    } catch (err) {
      console.error("Logout error:", err);
      setError("Failed to logout. Please try again.");
    }
  };

  const handleKYCClick = () => {
    if (kycStatus === "not_started") {
      navigate("/kyc-flow");
    }
  };

  const handleOpenAccountClick = () => {
    if (kycStatus === "approved") {
      navigate("/account-creation");
    }
  };

  // Get KYC config with fallback
  const kyc = KYC_CONFIG[kycStatus] || KYC_CONFIG.not_started;

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* ============ Sidebar ============ */}
      <aside className="w-80 bg-gradient-to-b from-blue-600 to-blue-500 text-white flex flex-col">
        <div className="p-8 text-3xl font-bold">Bank.ly</div>

        <nav className="flex-1 px-4 space-y-2">
          <button 
            className="px-6 py-4 rounded-lg bg-white text-blue-600 w-full text-lg font-medium hover:bg-gray-100 transition-colors"
            aria-current="page"
          >
            Explore
          </button>
          <button 
            className="px-6 py-4 rounded-lg hover:bg-blue-700 w-full text-lg font-medium transition-colors"
            aria-label="Help and support"
          >
            Help & Support
          </button>
        </nav>

        <div className="px-4 pb-6">
          <button
            onClick={handleLogout}
            className="px-6 py-4 rounded-lg hover:bg-red-500 w-full text-lg font-medium transition-colors"
            aria-label="Logout from your account"
          >
            Logout
          </button>
        </div>
      </aside>

      {/* ============ Main Content ============ */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="h-20 bg-white flex items-center justify-between px-8 shadow-sm">
          <div></div>
          <div className="flex items-center gap-6">
            <button 
              className="text-gray-600 hover:text-gray-800 transition-colors p-2"
              aria-label="Notifications"
            >
              <Bell size={24} />
            </button>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-blue-500 text-white flex items-center justify-center shadow-sm">
                <User size={22} />
              </div>
              <div>
                <p className="font-semibold text-gray-900">{userName}</p>
                <p className="text-sm text-gray-500">User</p>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 p-12 overflow-y-auto">
          {/* Error Banner */}
          {error && (
            <div className="max-w-4xl mx-auto mb-8 bg-red-50 border-l-4 border-red-400 p-4">
              <p className="font-semibold text-red-800">{error}</p>
              <button
                onClick={() => setError(null)}
                className="text-sm text-red-700 mt-2 hover:underline"
              >
                Dismiss
              </button>
            </div>
          )}

          {/* Welcome Section */}
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold mb-4 text-gray-900">Welcome to Bank.ly</h1>
            <p className="text-xl text-gray-600 italic">
              Complete your KYC to start banking with us
            </p>
          </div>

          {/* Status Banners */}
          {kycStatus === "pending" && (
            <div className="max-w-4xl mx-auto mb-8 bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
              <p className="font-semibold text-yellow-800">KYC Under Review</p>
              <p className="text-sm text-yellow-700 mt-1">
                Your KYC application is pending approval. We'll notify you once it's processed.
              </p>
            </div>
          )}

          {kycStatus === "approved" && (
            <div className="max-w-4xl mx-auto mb-8 bg-green-50 border-l-4 border-green-400 p-4 rounded flex items-start gap-4">
              <CheckCircle className="text-green-600 mt-1 flex-shrink-0" size={24} />
              <div>
                <p className="font-semibold text-green-800">KYC Verified</p>
                <p className="text-sm text-green-700 mt-1">
                  Congratulations! You can now open a bank account.
                </p>
              </div>
            </div>
          )}

          {/* Product Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* KYC Card */}
            <div className="bg-gradient-to-br from-blue-200 to-blue-100 rounded-3xl p-10 text-center shadow-lg hover:shadow-xl transition-shadow">
              <h2 className="text-3xl font-bold mb-4 text-gray-900">KYC Verification</h2>
              <p className="text-lg text-gray-700 mb-8">
                {kyc.description}
              </p>

              <button
                onClick={handleKYCClick}
                disabled={kycStatus !== "not_started"}
                className={`px-10 py-4 rounded-full text-lg font-semibold text-white transition-all ${kyc.kycBtnClass} disabled:opacity-75`}
                aria-label={kyc.kycText}
                title={kycStatus !== "not_started" ? "KYC already completed or pending" : "Click to start KYC"}
              >
                {kyc.kycText}
              </button>
            </div>

            {/* Account Card */}
            <div className="relative bg-gradient-to-br from-blue-200 to-blue-100 rounded-3xl p-10 text-center shadow-lg hover:shadow-xl transition-shadow">
              {kyc.lockText && (
                <div 
                  className="absolute inset-0 bg-black bg-opacity-50 rounded-3xl flex flex-col items-center justify-center z-10 text-white backdrop-blur-sm"
                  role="alert"
                >
                  <Lock size={48} className="mb-2" />
                  <p className="font-semibold">{kyc.lockText}</p>
                </div>
              )}

              <h2 className="text-3xl font-bold mb-4 text-gray-900">Open Bank Account</h2>
              <p className="text-lg text-gray-700 mb-8">
                {kycStatus === "approved"
                  ? "Choose savings or current account"
                  : "Complete KYC verification first"}
              </p>

              <button
                onClick={handleOpenAccountClick}
                disabled={kycStatus !== "approved"}
                className={`px-10 py-4 rounded-full text-lg font-semibold text-white transition-all ${kyc.accountBtnClass} disabled:opacity-75`}
                aria-label={kyc.accountText}
                title={kycStatus !== "approved" ? "Complete KYC first" : "Click to open an account"}
              >
                {kyc.accountText}
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default ProductSelection;