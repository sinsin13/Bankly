import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Bell, User, Lock, CheckCircle } from "lucide-react";
import api from "../services/api";

/* -------------------- KYC CONFIG -------------------- */
const KYC_CONFIG = {
  not_started: {
    kycText: "Complete Your KYC",
    accountText: "Open an Account",
    kycBtnClass: "bg-blue-600 hover:bg-blue-700 cursor-pointer",
    accountBtnClass: "bg-gray-400 cursor-not-allowed",
    description: "Complete your KYC to unlock banking services",
    lockText: "Complete KYC to Unlock",
  },
  pending: {
    kycText: "KYC Submitted",
    accountText: "Pending Approval",
    kycBtnClass: "bg-yellow-500 cursor-not-allowed",
    accountBtnClass: "bg-yellow-500 cursor-not-allowed",
    description: "Your KYC is under review by our team",
    lockText: "KYC Approval Required",
  },
  approved: {
    kycText: "KYC Completed ✓",
    accountText: "Open an Account",
    kycBtnClass: "bg-green-500 cursor-not-allowed",
    accountBtnClass: "bg-blue-600 hover:bg-blue-700 cursor-pointer",
    description: "Your KYC verification is complete!",
    lockText: null,
  },
  rejected: {
    kycText: "KYC Rejected",
    accountText: "Not Available",
    kycBtnClass: "bg-red-500 cursor-not-allowed",
    accountBtnClass: "bg-gray-400 cursor-not-allowed",
    description: "Your KYC was rejected. Please re-submit with correct details.",
    lockText: "KYC Rejected",
  },
};

/* -------------------- STATUS MAPPER -------------------- */
const mapBackendKycStatus = (status) => {
  switch ((status || "").toLowerCase()) {
    case "submitted":
      return "pending";
    case "approved":
      return "approved";
    case "rejected":
      return "rejected";
    case "notstarted":
      return "not_started";
    default:
      return "not_started";
  }
};

/* -------------------- COMPONENT -------------------- */
function ProductSelection() {
  const navigate = useNavigate();

  const [kycStatus, setKycStatus] = useState("not_started");
  const [userName, setUserName] = useState("User");
  const [isLoading, setIsLoading] = useState(true);

  /* -------- Fetch KYC status from backend (SOURCE OF TRUTH) -------- */
  useEffect(() => {
    const loadData = async () => {
      try {
        const storedUserName = localStorage.getItem("userName");
        if (storedUserName) {
          setUserName(storedUserName);
        }

        const res = await api.get("/Kyc/me");
        setKycStatus(mapBackendKycStatus(res.data?.status));
      } catch {
        // New user / no KYC yet → valid state
        setKycStatus("not_started");
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  /* -------------------- Handlers -------------------- */
  const handleLogout = () => {
    [
      "token",
      "userName",
      "userPhone",
      "customerId",
      "role",
      "expiresAt",
    ].forEach((k) => localStorage.removeItem(k));

    navigate("/", { replace: true });
  };

  const handleKYCClick = () => {
    if (kycStatus === "not_started" || kycStatus === "rejected") {
      navigate("/kyc-flow");
    }
  };

  const handleOpenAccountClick = () => {
    if (kycStatus === "approved") {
      navigate("/account-creation");
    }
  };

  const kyc = KYC_CONFIG[kycStatus] || KYC_CONFIG.not_started;

  /* -------------------- Loading -------------------- */
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

  /* -------------------- UI -------------------- */
  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-80 bg-gradient-to-b from-blue-600 to-blue-500 text-white flex flex-col">
        <div className="p-8 text-3xl font-bold">Bank.ly</div>

        <nav className="flex-1 px-4 space-y-2">
          <button className="px-6 py-4 rounded-lg bg-white text-blue-600 w-full text-lg font-medium">
            Explore
          </button>
          <button className="px-6 py-4 rounded-lg hover:bg-blue-700 w-full text-lg font-medium">
            Help & Support
          </button>
        </nav>

        <div className="px-4 pb-6">
          <button
            onClick={handleLogout}
            className="px-6 py-4 rounded-lg hover:bg-red-500 w-full text-lg font-medium"
          >
            Logout
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="h-20 bg-white flex justify-end px-8 shadow-sm">
          <div className="flex items-center gap-6">
            <Bell size={24} className="text-gray-600" />
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-blue-500 text-white flex items-center justify-center">
                <User size={22} />
              </div>
              <div>
                <p className="font-semibold">{userName}</p>
                <p className="text-sm text-gray-500">User</p>
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-12">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold mb-4">Welcome to Bank.ly</h1>
            <p className="text-xl text-gray-600 italic">
              Complete your KYC to start banking with us
            </p>
          </div>

          {/* Status banners */}
          {kycStatus === "pending" && (
            <div className="max-w-4xl mx-auto mb-8 bg-yellow-50 border-l-4 border-yellow-400 p-4">
              <p className="font-semibold text-yellow-800">KYC Under Review</p>
              <p className="text-sm text-yellow-700">
                Your KYC application is pending approval.
              </p>
            </div>
          )}

          {kycStatus === "approved" && (
            <div className="max-w-4xl mx-auto mb-8 bg-green-50 border-l-4 border-green-400 p-4 flex items-center gap-2">
              <CheckCircle className="text-green-600" />
              <div>
                <p className="font-semibold text-green-800">KYC Verified</p>
                <p className="text-sm text-green-700">
                  You can now open a bank account.
                </p>
              </div>
            </div>
          )}

          {kycStatus === "rejected" && (
            <div className="max-w-4xl mx-auto mb-8 bg-red-50 border-l-4 border-red-400 p-4">
              <p className="font-semibold text-red-800">KYC Rejected</p>
              <p className="text-sm text-red-700">
                Please re-submit your KYC with correct details.
              </p>
            </div>
          )}

          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* KYC Card */}
            <div className="bg-blue-200 rounded-3xl p-10 text-center shadow-lg">
              <h2 className="text-3xl font-bold mb-4">KYC Verification</h2>
              <p className="mb-8 text-gray-700">{kyc.description}</p>

              <button
                onClick={handleKYCClick}
                disabled={kycStatus === "pending" || kycStatus === "approved"}
                className={`px-10 py-4 rounded-full text-white text-lg font-semibold ${kyc.kycBtnClass}`}
              >
                {kyc.kycText}
              </button>
            </div>

            {/* Account Card */}
            <div className="relative bg-blue-200 rounded-3xl p-10 text-center shadow-lg">
              {kyc.lockText && (
                <div className="absolute inset-0 bg-black bg-opacity-40 rounded-3xl flex flex-col items-center justify-center text-white z-10">
                  <Lock size={48} />
                  <p className="mt-2 font-semibold">{kyc.lockText}</p>
                </div>
              )}

              <h2 className="text-3xl font-bold mb-4">Open Bank Account</h2>
              <p className="mb-8 text-gray-700">
                {kycStatus === "approved"
                  ? "Choose savings or current account"
                  : "Complete KYC first"}
              </p>

              <button
                onClick={handleOpenAccountClick}
                disabled={kycStatus !== "approved"}
                className={`px-10 py-4 rounded-full text-white text-lg font-semibold ${kyc.accountBtnClass}`}
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
