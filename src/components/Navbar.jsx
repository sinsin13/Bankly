import { useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();

  return (
    <header className="flex items-center justify-between px-16 py-6 h-24">
      <div className="text-xl font-bold">bank.ly</div>

      <nav className="hidden md:flex">
        <a href="#" className="mx-4 text-blue-100 text-sm hover:text-white transition-colors">Products</a>
        <a href="#" className="mx-4 text-blue-100 text-sm hover:text-white transition-colors">Solutions</a>
        <a href="#" className="mx-4 text-blue-100 text-sm hover:text-white transition-colors">Resources</a>
        <a href="#" className="mx-4 text-blue-100 text-sm hover:text-white transition-colors">Pricing</a>
      </nav>

      <div className="flex gap-3">
        <button 
          onClick={() => navigate('/role-selection')}
          className="bg-yellow-300 text-gray-800 px-5 py-2.5 rounded-md text-sm font-semibold hover:-translate-y-1 hover:shadow-2xl transition-all duration-300"
        >
          Login
        </button>
        <button 
          onClick={() => navigate('/register')}
          className="bg-white text-blue-900 px-5 py-2.5 rounded-md text-sm font-semibold hover:-translate-y-1 hover:shadow-2xl transition-all duration-300"
        >
          Register →
        </button>
      </div>
    </header>
  );
}

export default Navbar;