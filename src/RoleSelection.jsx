import { useNavigate } from 'react-router-dom';
import './App.css';

function RoleSelection() {
  const navigate = useNavigate();

  return (
    <div style={{
      minHeight: '100vh',
      background: 'var(--bg)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      {/* Logo in top-left */}
      <div style={{
        position: 'absolute',
        top: '24px',
        left: '64px',
        fontSize: '20px',
        fontWeight: '700',
        color: 'white'
      }}>
        Bank.ly
      </div>

      {/* Go Back Button in top-right */}
      <button 
        onClick={() => navigate('/')}
        style={{
          position: 'absolute',
          top: '24px',
          right: '64px',
          background: 'white',
          color: '#0b366e',
          border: 'none',
          borderRadius: '6px',
          padding: '10px 20px',
          fontSize: '14px',
          fontWeight: '600',
          cursor: 'pointer',
          transition: 'transform 0.3s ease, box-shadow 0.3s ease',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-2px)';
          e.currentTarget.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.25)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
        }}
      >
        ← Go Back
      </button>

      {/* Main content */}
      <div style={{
        textAlign: 'center',
        maxWidth: '700px',
        width: '100%'
      }}>
        <h1 style={{
          fontSize: '48px',
          fontWeight: '700',
          marginBottom: '48px',
          letterSpacing: '1px',
          opacity: 0,
          animation: 'fadeUp 0.9s ease-out forwards',
          animationDelay: '0s'
        }}>
          WHO ARE YOU?
        </h1>

        <div style={{
          display: 'flex',
          gap: '32px',
          justifyContent: 'center',
          flexWrap: 'wrap'
        }}>
          {/* USER Card */}
          <div 
            onClick={() => navigate('/user-login')}
            style={{
            background: 'white',
            borderRadius: '20px',
            padding: '60px 80px',
            minWidth: '240px',
            cursor: 'pointer',
            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            boxShadow: '0 10px 40px rgba(0, 0, 0, 0.15)',
            opacity: 0,
            animation: 'zoomIn 1s ease-out forwards',
            animationDelay: '0.2s'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-8px)';
            e.currentTarget.style.boxShadow = '0 20px 60px rgba(0, 0, 0, 0.25)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 10px 40px rgba(0, 0, 0, 0.15)';
          }}>
            {/* User Icon */}
            <div style={{
              width: '80px',
              height: '80px',
              margin: '0 auto 24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="1.5">
                <circle cx="12" cy="12" r="10"/>
                <circle cx="12" cy="9" r="3"/>
                <path d="M6.168 18.849A4 4 0 0 1 10 16h4a4 4 0 0 1 3.834 2.855"/>
              </svg>
            </div>
            <div style={{
              fontSize: '24px',
              fontWeight: '700',
              color: '#000',
              letterSpacing: '0.5px'
            }}>
              USER
            </div>
          </div>

          {/* ADMIN Card */}
          <div 
            onClick={() => navigate('/admin-login')}
            style={{
            background: 'white',
            borderRadius: '20px',
            padding: '60px 80px',
            minWidth: '240px',
            cursor: 'pointer',
            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            boxShadow: '0 10px 40px rgba(0, 0, 0, 0.15)',
            opacity: 0,
            animation: 'zoomIn 1s ease-out forwards',
            animationDelay: '0.2s'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-8px)';
            e.currentTarget.style.boxShadow = '0 20px 60px rgba(0, 0, 0, 0.25)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 10px 40px rgba(0, 0, 0, 0.15)';
          }}>
            {/* Admin Shield Icon */}
            <div style={{
              width: '80px',
              height: '80px',
              margin: '0 auto 24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="1.5">
                <path d="M12 2L4 6v6c0 5.55 3.84 10.74 8 12 4.16-1.26 8-6.45 8-12V6l-8-4z"/>
                <path d="M9 12l2 2 4-4"/>
              </svg>
            </div>
            <div style={{
              fontSize: '24px',
              fontWeight: '700',
              color: '#000',
              letterSpacing: '0.5px'
            }}>
              ADMIN
            </div>
          </div>
        </div>

        {/* Privacy Policy Link */}
        <div style={{
          marginTop: '64px'
        }}>
          <a href="#" style={{
            color: 'white',
            fontSize: '16px',
            fontWeight: '600',
            textDecoration: 'none',
            letterSpacing: '0.5px',
            transition: 'opacity 0.3s ease'
          }}
          onMouseEnter={(e) => e.currentTarget.style.opacity = '0.8'}
          onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}>
            PRIVACY POLICY
          </a>
        </div>
      </div>
    </div>
  );
}

export default RoleSelection;