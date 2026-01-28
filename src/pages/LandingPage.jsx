import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#187cff] text-white">
      <Navbar />

      <main className="grid grid-cols-1 md:grid-cols-[1.1fr_1fr] min-h-[calc(100vh-6rem)] px-16 pb-10">
        {/* Hero Image */}
        <div className="flex justify-center items-center opacity-0 animate-zoomIn" style={{ animationDelay: '0.4s', animationFillMode: 'forwards' }}>
          <img 
            src="/1.jpg" 
            alt="Dashboard Illustration"
            className="h-[75vh] max-h-[calc(100vh-6rem)] w-auto max-w-full object-contain bg-white rounded-3xl shadow-2xl"
          />
        </div>

        {/* Hero Text */}
        <div className="flex flex-col justify-center items-start opacity-0 animate-fadeUp" style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}>
          <h1 className="text-5xl md:text-6xl leading-tight mb-4 font-bold">
            Get More Done with <br/>
            Bankly
          </h1>

          <p className="max-w-lg text-base leading-relaxed mb-6 text-blue-100">
            Banking software that empowers banks to securely process
            transactions, analyze data, and deliver modern digital banking
            experiences.
          </p>

          <button 
            onClick={() => navigate('/register')}
            className="px-6 py-3.5 text-base font-semibold mt-2 bg-white text-blue-900 rounded-md hover:-translate-y-1 hover:shadow-2xl transition-all duration-300 opacity-0 animate-fadeUp"
            style={{ animationDelay: '0.5s', animationFillMode: 'forwards' }}
          >
            Register for free →
          </button>
        </div>
      </main>
    </div>
  );
}

export default LandingPage;