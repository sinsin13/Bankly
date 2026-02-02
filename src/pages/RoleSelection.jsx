import { useNavigate } from 'react-router-dom';

function RoleSelection() {
  const navigate = useNavigate();

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

      {/* Main content */}
      <div className="text-center max-w-3xl w-full">
        <h1 className="text-5xl font-bold mb-12 tracking-wide opacity-0 animate-fadeUp" style={{ animationFillMode: 'forwards' }}>
          WHO ARE YOU?
        </h1>

        <div className="flex gap-8 justify-center flex-wrap">
          {/* USER Card */}
          <div 
            onClick={() => navigate('/user-login')}
            className="bg-white rounded-3xl p-16 min-w-[240px] cursor-pointer hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 shadow-xl opacity-0 animate-zoomIn"
            style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}
          >
            <div className="w-20 h-20 mx-auto mb-6 flex items-center justify-center">
              <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="1.5">
                <circle cx="12" cy="12" r="10"/>
                <circle cx="12" cy="9" r="3"/>
                <path d="M6.168 18.849A4 4 0 0 1 10 16h4a4 4 0 0 1 3.834 2.855"/>
              </svg>
            </div>
            <div className="text-2xl font-bold text-black tracking-wide">
              USER
            </div>
          </div>

          {/* ADMIN Card */}
          <div 
            onClick={() => navigate('/admin/login')}
            className="bg-white rounded-3xl p-16 min-w-[240px] cursor-pointer hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 shadow-xl opacity-0 animate-zoomIn"
            style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}
          >
            <div className="w-20 h-20 mx-auto mb-6 flex items-center justify-center">
              <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="1.5">
                <path d="M12 2L4 6v6c0 5.55 3.84 10.74 8 12 4.16-1.26 8-6.45 8-12V6l-8-4z"/>
                <path d="M9 12l2 2 4-4"/>
              </svg>
            </div>
            <div className="text-2xl font-bold text-black tracking-wide">
              ADMIN
            </div>
          </div>
        </div>

        {/* Privacy Policy Link */}
        <div className="mt-16">
          <a 
            href="#" 
            className="text-white text-base font-semibold tracking-wide hover:opacity-80 transition-opacity duration-300"
          >
            PRIVACY POLICY
          </a>
        </div>
      </div>
    </div>
  );
}

export default RoleSelection;