// import { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Bell, User, CheckCircle, Lock } from 'lucide-react';

// function ProductSelection() {
//   const navigate = useNavigate();
//   const userName = localStorage.getItem('userName') || 'User';
//   const [kycStatus, setKycStatus] = useState('not_started'); // not_started, pending, approved

//   useEffect(() => {
//     // Get KYC status from localStorage
//     const status = localStorage.getItem('kycStatus') || 'not_started';
//     setKycStatus(status);
//   }, []);

//   const handleLogout = () => {
//     localStorage.removeItem("userToken");
//     localStorage.removeItem("userName");
//     localStorage.removeItem("userPhone");
//     localStorage.removeItem("customerId");
//     localStorage.removeItem("kycStatus");
//     navigate("/");
//   };

//   const handleKYCClick = () => {
//     if (kycStatus === 'not_started') {
//       navigate('/kyc-flow');
//     }
//   };

//   const handleOpenAccountClick = () => {
//     if (kycStatus === 'approved') {
//       navigate('/account-creation');
//     }
//   };

//   const getKYCButtonText = () => {
//     switch (kycStatus) {
//       case 'not_started':
//         return 'Complete Your KYC';
//       case 'pending':
//         return 'KYC Submitted';
//       case 'approved':
//         return 'KYC Completed ✓';
//       default:
//         return 'Complete Your KYC';
//     }
//   };

//   const getAccountButtonText = () => {
//     switch (kycStatus) {
//       case 'not_started':
//         return 'Open an Account';
//       case 'pending':
//         return 'Pending Approval';
//       case 'approved':
//         return 'Open an Account';
//       default:
//         return 'Open an Account';
//     }
//   };

//   const getAccountButtonColor = () => {
//     switch (kycStatus) {
//       case 'not_started':
//         return 'bg-gray-400 cursor-not-allowed';
//       case 'pending':
//         return 'bg-yellow-500 cursor-not-allowed';
//       case 'approved':
//         return 'bg-blue-600 hover:bg-blue-700 cursor-pointer';
//       default:
//         return 'bg-gray-400 cursor-not-allowed';
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 flex">
//       {/* Left Sidebar */}
//       <aside className="w-80 bg-gradient-to-b from-blue-600 to-blue-500 text-white flex flex-col">
//         <div className="p-8 text-3xl font-bold">Bank.ly</div>

//         <nav className="flex-1 px-4">
//           <button className="flex items-center gap-4 px-6 py-4 rounded-lg bg-white text-blue-600 w-full text-lg mb-2">
//             <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//               <circle cx="11" cy="11" r="8"/>
//               <path d="m21 21-4.35-4.35"/>
//             </svg>
//             Explore
//           </button>

//           <button className="flex items-center gap-4 px-6 py-4 rounded-lg hover:bg-blue-700 w-full text-lg">
//             <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//               <circle cx="12" cy="12" r="10"/>
//               <path d="M12 16v-4M12 8h.01"/>
//             </svg>
//             Help & Support
//           </button>
//         </nav>

//         <div className="px-4 pb-6 space-y-2">
//           <button className="flex items-center gap-4 px-6 py-4 rounded-lg hover:bg-blue-700 w-full text-lg">
//             <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//               <circle cx="12" cy="12" r="3"/>
//               <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
//             </svg>
//             Settings
//           </button>

//           <button 
//             onClick={handleLogout}
//             className="flex items-center gap-4 px-6 py-4 rounded-lg hover:bg-red-500 w-full text-lg"
//           >
//             <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//               <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
//               <polyline points="16 17 21 12 16 7"/>
//               <line x1="21" y1="12" x2="9" y2="12"/>
//             </svg>
//             Logout
//           </button>
//         </div>
//       </aside>

//       {/* Main Content Area */}
//       <div className="flex-1 flex flex-col">
//         {/* Top Header */}
//         <header className="h-20 bg-white flex items-center justify-end px-8 shadow-sm">
//           <div className="flex items-center gap-6">
//             <Bell className="cursor-pointer text-gray-600 hover:text-blue-600 transition" size={24} />
//             <div className="flex items-center gap-3 cursor-pointer">
//               <div className="w-12 h-12 rounded-full bg-blue-500 text-white flex items-center justify-center">
//                 <User size={22} />
//               </div>
//               <div className="text-sm">
//                 <p className="font-semibold text-base">{userName}</p>
//                 <p className="text-gray-500 text-sm">User</p>
//               </div>
//             </div>
//           </div>
//         </header>

//         {/* Products Content */}
//         <main className="flex-1 p-12 overflow-y-auto">
//           {/* Header */}
//           <div className="text-center mb-12">
//             <h1 className="text-5xl font-bold text-black mb-4">
//               Welcome to Bank.ly
//             </h1>
//             <p className="text-xl text-gray-600 italic">
//               Complete your KYC to start banking with us
//             </p>
//           </div>

//           {/* KYC Status Banner */}
//           {kycStatus === 'pending' && (
//             <div className="max-w-4xl mx-auto mb-8">
//               <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
//                 <div className="flex items-center">
//                   <svg className="w-6 h-6 text-yellow-600 mr-3" fill="currentColor" viewBox="0 0 20 20">
//                     <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
//                   </svg>
//                   <div>
//                     <p className="font-semibold text-yellow-800">KYC Under Review</p>
//                     <p className="text-sm text-yellow-700">Your KYC application is pending approval. You'll be notified once approved.</p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           )}

//           {kycStatus === 'approved' && (
//             <div className="max-w-4xl mx-auto mb-8">
//               <div className="bg-green-50 border-l-4 border-green-400 p-4">
//                 <div className="flex items-center">
//                   <CheckCircle className="w-6 h-6 text-green-600 mr-3" />
//                   <div>
//                     <p className="font-semibold text-green-800">KYC Verified ✓</p>
//                     <p className="text-sm text-green-700">Your KYC has been approved! You can now open a bank account.</p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* Action Buttons */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            
//             {/* Complete KYC Card */}
//             <div className="bg-gradient-to-br from-blue-300 to-blue-200 rounded-3xl p-10 flex flex-col items-center text-center shadow-lg hover:shadow-xl transition-all">
//               <div className="w-40 h-40 bg-white rounded-full flex items-center justify-center mb-8">
//                 <svg 
//                   width="100" 
//                   height="100" 
//                   viewBox="0 0 24 24" 
//                   fill="none" 
//                   stroke={kycStatus === 'approved' ? '#22c55e' : '#3b82f6'}
//                   strokeWidth="1.5"
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                 >
//                   <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
//                   <circle cx="12" cy="7" r="4"/>
//                   <path d="M9 10h6"/>
//                   <path d="M12 7v6"/>
//                 </svg>
//               </div>

//               <h2 className="text-3xl font-bold text-black mb-4">
//                 KYC Verification
//               </h2>
              
//               <p className="text-lg text-gray-700 mb-8">
//                 {kycStatus === 'not_started' && 'Complete your KYC to unlock banking services'}
//                 {kycStatus === 'pending' && 'Your KYC is under review by our team'}
//                 {kycStatus === 'approved' && 'Your KYC verification is complete!'}
//               </p>

//               <button 
//                 onClick={handleKYCClick}
//                 disabled={kycStatus !== 'not_started'}
//                 className={`px-10 py-4 rounded-full text-lg font-semibold transition-all ${
//                   kycStatus === 'not_started'
//                     ? 'bg-blue-600 hover:bg-blue-700 text-white hover:shadow-xl cursor-pointer'
//                     : kycStatus === 'pending'
//                     ? 'bg-yellow-500 text-white cursor-not-allowed'
//                     : 'bg-green-500 text-white cursor-not-allowed'
//                 }`}
//               >
//                 {getKYCButtonText()}
//               </button>

//               {kycStatus !== 'not_started' && (
//                 <p className="text-sm text-gray-600 mt-4">
//                   {kycStatus === 'pending' && '⏳ Waiting for admin approval'}
//                   {kycStatus === 'approved' && '✓ Verified'}
//                 </p>
//               )}
//             </div>

//             {/* Open Account Card */}
//             <div className="bg-gradient-to-br from-blue-300 to-blue-200 rounded-3xl p-10 flex flex-col items-center text-center shadow-lg hover:shadow-xl transition-all relative">
//               {/* Lock Overlay for disabled state */}
//               {kycStatus !== 'approved' && (
//                 <div className="absolute inset-0 bg-gray-900 bg-opacity-40 rounded-3xl flex items-center justify-center z-10">
//                   <div className="text-center">
//                     <Lock className="w-16 h-16 text-white mx-auto mb-3" />
//                     <p className="text-white font-semibold text-lg">
//                       {kycStatus === 'not_started' && 'Complete KYC to Unlock'}
//                       {kycStatus === 'pending' && 'KYC Approval Required'}
//                     </p>
//                   </div>
//                 </div>
//               )}

//               <div className="w-40 h-40 bg-white rounded-full flex items-center justify-center mb-8">
//                 <svg 
//                   width="120" 
//                   height="120" 
//                   viewBox="0 0 24 24" 
//                   fill="none" 
//                   stroke="#3b82f6" 
//                   strokeWidth="1.5"
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                 >
//                   <rect x="4" y="7" width="16" height="13" rx="2" ry="2"/>
//                   <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
//                   <circle cx="12" cy="13" r="2"/>
//                 </svg>
//               </div>

//               <h2 className="text-3xl font-bold text-black mb-4">
//                 Open Bank Account
//               </h2>
              
//               <p className="text-lg text-gray-700 mb-8">
//                 {kycStatus === 'not_started' && 'Complete KYC verification first'}
//                 {kycStatus === 'pending' && 'Waiting for KYC approval'}
//                 {kycStatus === 'approved' && 'Choose savings or current account'}
//               </p>

//               <button 
//                 onClick={handleOpenAccountClick}
//                 disabled={kycStatus !== 'approved'}
//                 className={`px-10 py-4 rounded-full text-lg font-semibold transition-all text-white ${getAccountButtonColor()}`}
//               >
//                 {getAccountButtonText()}
//               </button>

//               {kycStatus === 'pending' && (
//                 <div className="mt-4 flex items-center gap-2 text-yellow-600">
//                   <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
//                     <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
//                     <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
//                   </svg>
//                   <p className="text-sm font-medium">Under Review</p>
//                 </div>
//               )}
//             </div>

//           </div>

//           {/* Info Section */}
//           <div className="max-w-6xl mx-auto mt-12">
//             <div className="bg-white rounded-2xl p-8 shadow border-2 border-gray-200">
//               <h3 className="text-2xl font-bold mb-4">How It Works</h3>
//               <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//                 <div className="text-center">
//                   <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
//                     <span className="text-2xl font-bold text-blue-600">1</span>
//                   </div>
//                   <h4 className="font-semibold mb-2">Complete KYC</h4>
//                   <p className="text-sm text-gray-600">Submit your documents and personal information for verification</p>
//                 </div>
//                 <div className="text-center">
//                   <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
//                     <span className="text-2xl font-bold text-blue-600">2</span>
//                   </div>
//                   <h4 className="font-semibold mb-2">Wait for Approval</h4>
//                   <p className="text-sm text-gray-600">Our team will review your KYC within 24-48 hours</p>
//                 </div>
//                 <div className="text-center">
//                   <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
//                     <span className="text-2xl font-bold text-blue-600">3</span>
//                   </div>
//                   <h4 className="font-semibold mb-2">Open Account</h4>
//                   <p className="text-sm text-gray-600">Once approved, create your savings or current account instantly</p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// }

// export default ProductSelection;




import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell, User, CheckCircle, Lock } from 'lucide-react';

function ProductSelection() {
  const navigate = useNavigate();
  const userName = localStorage.getItem('userName') || 'User';
  const [kycStatus, setKycStatus] = useState('not_started'); // not_started, pending, approved
  const [showDevTools, setShowDevTools] = useState(false);

  useEffect(() => {
    // Get KYC status from localStorage
    const status = localStorage.getItem('kycStatus') || 'not_started';
    setKycStatus(status);

    // Keyboard shortcut: Press 'K' to toggle KYC status
    const handleKeyPress = (e) => {
      if (e.key.toLowerCase() === 'k' && !e.ctrlKey && !e.metaKey) {
        // Only if not in an input field
        if (e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
          toggleKycStatus();
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [kycStatus]);

  // DEV TOOL: Toggle KYC Status for Testing
  const toggleKycStatus = () => {
    let newStatus;
    if (kycStatus === 'not_started') {
      newStatus = 'pending';
    } else if (kycStatus === 'pending') {
      newStatus = 'approved';
    } else {
      newStatus = 'not_started';
    }
    
    localStorage.setItem('kycStatus', newStatus);
    setKycStatus(newStatus);
    console.log('KYC Status changed to:', newStatus);
  };

  const handleLogout = () => {
    localStorage.removeItem("userToken");
    localStorage.removeItem("userName");
    localStorage.removeItem("userPhone");
    localStorage.removeItem("customerId");
    localStorage.removeItem("kycStatus");
    navigate("/");
  };

  const handleKYCClick = () => {
    if (kycStatus === 'not_started') {
      navigate('/kyc-flow');
    }
  };

  const handleOpenAccountClick = () => {
    if (kycStatus === 'approved') {
      navigate('/account-creation');
    }
  };

  const getKYCButtonText = () => {
    switch (kycStatus) {
      case 'not_started':
        return 'Complete Your KYC';
      case 'pending':
        return 'KYC Submitted';
      case 'approved':
        return 'KYC Completed ✓';
      default:
        return 'Complete Your KYC';
    }
  };

  const getAccountButtonText = () => {
    switch (kycStatus) {
      case 'not_started':
        return 'Open an Account';
      case 'pending':
        return 'Pending Approval';
      case 'approved':
        return 'Open an Account';
      default:
        return 'Open an Account';
    }
  };

  const getAccountButtonColor = () => {
    switch (kycStatus) {
      case 'not_started':
        return 'bg-gray-400 cursor-not-allowed';
      case 'pending':
        return 'bg-yellow-500 cursor-not-allowed';
      case 'approved':
        return 'bg-blue-600 hover:bg-blue-700 cursor-pointer';
      default:
        return 'bg-gray-400 cursor-not-allowed';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Developer Tools - Floating Toggle Button */}
      <button
        onClick={() => setShowDevTools(!showDevTools)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-purple-600 hover:bg-purple-700 text-white rounded-full shadow-lg flex items-center justify-center transition-all"
        title="Toggle Dev Tools"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      </button>

      {/* Developer Tools Panel */}
      {showDevTools && (
        <div className="fixed bottom-24 right-6 z-50 bg-white rounded-xl shadow-2xl p-6 w-80 border-2 border-purple-500">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-lg">🛠️ Dev Tools</h3>
            <button
              onClick={() => setShowDevTools(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          </div>
          
          <div className="space-y-4">
            <div>
              <p className="text-sm font-semibold mb-2">Current KYC Status:</p>
              <div className={`px-4 py-2 rounded-lg text-center font-bold ${
                kycStatus === 'not_started' ? 'bg-gray-200 text-gray-700' :
                kycStatus === 'pending' ? 'bg-yellow-200 text-yellow-800' :
                'bg-green-200 text-green-800'
              }`}>
                {kycStatus === 'not_started' && '🔴 NOT STARTED'}
                {kycStatus === 'pending' && '🟡 PENDING'}
                {kycStatus === 'approved' && '🟢 APPROVED'}
              </div>
            </div>

            <div>
              <p className="text-sm font-semibold mb-2">Toggle Status:</p>
              <button
                onClick={toggleKycStatus}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white px-4 py-3 rounded-lg font-semibold transition-all"
              >
                Switch to Next Status
              </button>
              <p className="text-xs text-gray-500 mt-2 text-center">
                Cycles: Not Started → Pending → Approved → Not Started
              </p>
            </div>

            <div>
              <p className="text-sm font-semibold mb-2">Quick Actions:</p>
              <div className="space-y-2">
                <button
                  onClick={() => {
                    localStorage.setItem('kycStatus', 'not_started');
                    setKycStatus('not_started');
                  }}
                  className="w-full bg-gray-500 hover:bg-gray-600 text-white px-3 py-2 rounded text-sm"
                >
                  Set: Not Started
                </button>
                <button
                  onClick={() => {
                    localStorage.setItem('kycStatus', 'pending');
                    setKycStatus('pending');
                  }}
                  className="w-full bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-2 rounded text-sm"
                >
                  Set: Pending
                </button>
                <button
                  onClick={() => {
                    localStorage.setItem('kycStatus', 'approved');
                    setKycStatus('approved');
                  }}
                  className="w-full bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded text-sm"
                >
                  Set: Approved
                </button>
              </div>
            </div>

            <div className="pt-4 border-t">
              <p className="text-xs text-gray-500 mb-1">
                💡 Use this to test different states without completing the full workflow
              </p>
              <p className="text-xs text-purple-600 font-semibold">
                ⌨️ Press 'K' to quickly toggle status
              </p>
            </div>
          </div>
        </div>
      )}

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
                <p className="text-gray-500 text-sm">User</p>
              </div>
            </div>
          </div>
        </header>

        {/* Products Content */}
        <main className="flex-1 p-12 overflow-y-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-black mb-4">
              Welcome to Bank.ly
            </h1>
            <p className="text-xl text-gray-600 italic">
              Complete your KYC to start banking with us
            </p>
          </div>

          {/* KYC Status Banner */}
          {kycStatus === 'pending' && (
            <div className="max-w-4xl mx-auto mb-8">
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
                <div className="flex items-center">
                  <svg className="w-6 h-6 text-yellow-600 mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <p className="font-semibold text-yellow-800">KYC Under Review</p>
                    <p className="text-sm text-yellow-700">Your KYC application is pending approval. You'll be notified once approved.</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {kycStatus === 'approved' && (
            <div className="max-w-4xl mx-auto mb-8">
              <div className="bg-green-50 border-l-4 border-green-400 p-4">
                <div className="flex items-center">
                  <CheckCircle className="w-6 h-6 text-green-600 mr-3" />
                  <div>
                    <p className="font-semibold text-green-800">KYC Verified ✓</p>
                    <p className="text-sm text-green-700">Your KYC has been approved! You can now open a bank account.</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            
            {/* Complete KYC Card */}
            <div className="bg-gradient-to-br from-blue-300 to-blue-200 rounded-3xl p-10 flex flex-col items-center text-center shadow-lg hover:shadow-xl transition-all">
              <div className="w-40 h-40 bg-white rounded-full flex items-center justify-center mb-8">
                <svg 
                  width="100" 
                  height="100" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke={kycStatus === 'approved' ? '#22c55e' : '#3b82f6'}
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                  <circle cx="12" cy="7" r="4"/>
                  <path d="M9 10h6"/>
                  <path d="M12 7v6"/>
                </svg>
              </div>

              <h2 className="text-3xl font-bold text-black mb-4">
                KYC Verification
              </h2>
              
              <p className="text-lg text-gray-700 mb-8">
                {kycStatus === 'not_started' && 'Complete your KYC to unlock banking services'}
                {kycStatus === 'pending' && 'Your KYC is under review by our team'}
                {kycStatus === 'approved' && 'Your KYC verification is complete!'}
              </p>

              <button 
                onClick={handleKYCClick}
                disabled={kycStatus !== 'not_started'}
                className={`px-10 py-4 rounded-full text-lg font-semibold transition-all ${
                  kycStatus === 'not_started'
                    ? 'bg-blue-600 hover:bg-blue-700 text-white hover:shadow-xl cursor-pointer'
                    : kycStatus === 'pending'
                    ? 'bg-yellow-500 text-white cursor-not-allowed'
                    : 'bg-green-500 text-white cursor-not-allowed'
                }`}
              >
                {getKYCButtonText()}
              </button>

              {kycStatus !== 'not_started' && (
                <p className="text-sm text-gray-600 mt-4">
                  {kycStatus === 'pending' && '⏳ Waiting for admin approval'}
                  {kycStatus === 'approved' && '✓ Verified'}
                </p>
              )}
            </div>

            {/* Open Account Card */}
            <div className="bg-gradient-to-br from-blue-300 to-blue-200 rounded-3xl p-10 flex flex-col items-center text-center shadow-lg hover:shadow-xl transition-all relative">
              {/* Lock Overlay for disabled state */}
              {kycStatus !== 'approved' && (
                <div className="absolute inset-0 bg-gray-900 bg-opacity-40 rounded-3xl flex items-center justify-center z-10">
                  <div className="text-center">
                    <Lock className="w-16 h-16 text-white mx-auto mb-3" />
                    <p className="text-white font-semibold text-lg">
                      {kycStatus === 'not_started' && 'Complete KYC to Unlock'}
                      {kycStatus === 'pending' && 'KYC Approval Required'}
                    </p>
                  </div>
                </div>
              )}

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
                Open Bank Account
              </h2>
              
              <p className="text-lg text-gray-700 mb-8">
                {kycStatus === 'not_started' && 'Complete KYC verification first'}
                {kycStatus === 'pending' && 'Waiting for KYC approval'}
                {kycStatus === 'approved' && 'Choose savings or current account'}
              </p>

              <button 
                onClick={handleOpenAccountClick}
                disabled={kycStatus !== 'approved'}
                className={`px-10 py-4 rounded-full text-lg font-semibold transition-all text-white ${getAccountButtonColor()}`}
              >
                {getAccountButtonText()}
              </button>

              {kycStatus === 'pending' && (
                <div className="mt-4 flex items-center gap-2 text-yellow-600">
                  <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                  </svg>
                  <p className="text-sm font-medium">Under Review</p>
                </div>
              )}
            </div>

          </div>

          {/* Info Section */}
          <div className="max-w-6xl mx-auto mt-12">
            <div className="bg-white rounded-2xl p-8 shadow border-2 border-gray-200">
              <h3 className="text-2xl font-bold mb-4">How It Works</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-blue-600">1</span>
                  </div>
                  <h4 className="font-semibold mb-2">Complete KYC</h4>
                  <p className="text-sm text-gray-600">Submit your documents and personal information for verification</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-blue-600">2</span>
                  </div>
                  <h4 className="font-semibold mb-2">Wait for Approval</h4>
                  <p className="text-sm text-gray-600">Our team will review your KYC within 24-48 hours</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-blue-600">3</span>
                  </div>
                  <h4 className="font-semibold mb-2">Open Account</h4>
                  <p className="text-sm text-gray-600">Once approved, create your savings or current account instantly</p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default ProductSelection;


