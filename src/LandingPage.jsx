import { useNavigate } from 'react-router-dom';
import './App.css';

function LandingPage() {
  const navigate = useNavigate();

  return (
    <>
      {/* NAVBAR */}
      <header>
        <div className="logo">bank.ly</div>

        <nav>
          {/* <a href="#">Products</a>
          <a href="#">Solutions</a>
          <a href="#">Resources</a>
          <a href="#">Pricing</a> */}
        </nav>

        <div className="actions">
          <button className="btn btn-login" onClick={() => navigate('/role-selection')}>Login</button>
          <button className="btn btn-try-nav" onClick={() => navigate('/register')}>Register →</button>
        </div>
      </header>

      {/* HERO */}
      <main>
        {/* IMAGE */}
        <div className="hero-image">
          <img src="/1.jpg" alt="Dashboard Illustration" />
        </div>

        {/* TEXT */}
        <div className="hero-text">
          <h1>
            Get More Done with <br/>
            Bankly
          </h1>

          <p>
            Banking software that empowers banks to securely process
            transactions, analyze data, and deliver modern digital banking
            experiences.
          </p>

          <button className="btn btn-try-hero" onClick={() => navigate('/register')}>
            Register for free →
          </button>
        </div>
      </main>
    </>
  );
}

export default LandingPage;