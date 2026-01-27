import { useNavigate } from 'react-router-dom';
import './App.css';

function UserLogin() {
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
        onClick={() => navigate('/role-selection')}
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

      {/* Login Card */}
      <div style={{
        background: '#E6F0FF',
        borderRadius: '20px',
        padding: '48px 56px',
        width: '100%',
        maxWidth: '440px',
        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.2)',
        opacity: 0,
        animation: 'zoomIn 0.8s ease-out forwards',
        animationDelay: '0.1s'
      }}>
        <h2 style={{
          fontSize: '32px',
          fontWeight: '700',
          color: '#000',
          textAlign: 'center',
          marginBottom: '32px'
        }}>
          Welcome Back
        </h2>

        <form onSubmit={(e) => e.preventDefault()}>
          {/* Customer ID */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{
              display: 'block',
              fontSize: '14px',
              fontWeight: '600',
              color: '#000',
              marginBottom: '8px'
            }}>
              Customer ID
            </label>
            <input 
              type="text"
              style={{
                width: '100%',
                padding: '12px 16px',
                border: 'none',
                borderRadius: '8px',
                fontSize: '14px',
                background: 'white',
                color: '#000',
                outline: 'none'
              }}
            />
          </div>

          {/* Password */}
          <div style={{ marginBottom: '28px' }}>
            <label style={{
              display: 'block',
              fontSize: '14px',
              fontWeight: '600',
              color: '#000',
              marginBottom: '8px'
            }}>
              Password
            </label>
            <input 
              type="password"
              style={{
                width: '100%',
                padding: '12px 16px',
                border: 'none',
                borderRadius: '8px',
                fontSize: '14px',
                background: 'white',
                color: '#000',
                outline: 'none'
              }}
            />
          </div>

          {/* Login Button */}
          <button 
            type="submit"
            style={{
              width: '100%',
              padding: '14px',
              background: '#1E90FF',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: '700',
              cursor: 'pointer',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              letterSpacing: '0.5px'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 8px 20px rgba(30, 144, 255, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            LOGIN
          </button>
        </form>
      </div>
    </div>
  );
}

export default UserLogin;