import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';

function RegisterUser() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  
  // Form data state
  const [formData, setFormData] = useState({
    name: '',
    dob: '',
    mobile: '',
    email: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    proofId: '',
    idNo: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false,
    agreePrivacy: false
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleNext = () => {
    // Add validation here before moving to next step
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      navigate('/');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Send data to backend/database
    console.log('Registration Data:', formData);
    alert('Registration Successful! (Data will be saved to database in future)');
    navigate('/role-selection');
  };

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
      {/* Logo */}
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

      {/* Registration Card */}
      <div style={{
        background: '#E6F0FF',
        borderRadius: '20px',
        padding: '48px 56px',
        width: '100%',
        maxWidth: '500px',
        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.2)',
        opacity: 0,
        animation: 'zoomIn 0.8s ease-out forwards',
        animationDelay: '0.1s'
      }}>
        {/* Title */}
        <h2 style={{
          fontSize: '28px',
          fontWeight: '700',
          color: '#000',
          textAlign: 'center',
          marginBottom: '8px'
        }}>
          {currentStep === 1 && 'Personal Details'}
          {currentStep === 2 && 'Residential Address'}
          {currentStep === 3 && 'Identity & Security'}
        </h2>

        {/* Progress Indicator */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: '32px',
          gap: '12px'
        }}>
          {[1, 2, 3].map((step) => (
            <div key={step} style={{ display: 'flex', alignItems: 'center' }}>
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                background: step < currentStep ? '#4CAF50' : step === currentStep ? '#1E90FF' : '#ccc',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontWeight: '600',
                fontSize: '14px'
              }}>
                {step < currentStep ? '✓' : step}
              </div>
              {step < 3 && (
                <div style={{
                  width: '40px',
                  height: '3px',
                  background: step < currentStep ? '#4CAF50' : '#ccc',
                  margin: '0 4px'
                }} />
              )}
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit}>
          {/* Step 1: Personal Details */}
          {currentStep === 1 && (
            <>
              <div style={{ marginBottom: '20px' }}>
                <label style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: '600',
                  color: '#000',
                  marginBottom: '8px'
                }}>
                  Name :
                </label>
                <input 
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
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

              <div style={{ marginBottom: '20px' }}>
                <label style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: '600',
                  color: '#000',
                  marginBottom: '8px'
                }}>
                  DOB :
                </label>
                <input 
                  type="date"
                  name="dob"
                  value={formData.dob}
                  onChange={handleInputChange}
                  required
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

              <div style={{ marginBottom: '20px' }}>
                <label style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: '600',
                  color: '#000',
                  marginBottom: '8px'
                }}>
                  Mobile :
                </label>
                <input 
                  type="tel"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleInputChange}
                  required
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

              <div style={{ marginBottom: '20px' }}>
                <label style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: '600',
                  color: '#000',
                  marginBottom: '8px'
                }}>
                  Email :
                </label>
                <input 
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
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
            </>
          )}

          {/* Step 2: Residential Address */}
          {currentStep === 2 && (
            <>
              <div style={{ marginBottom: '20px' }}>
                <label style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: '600',
                  color: '#000',
                  marginBottom: '8px'
                }}>
                  Address :
                </label>
                <input 
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  required
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

              <div style={{ marginBottom: '20px' }}>
                <label style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: '600',
                  color: '#000',
                  marginBottom: '8px'
                }}>
                  City :
                </label>
                <input 
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  required
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

              <div style={{ marginBottom: '20px' }}>
                <label style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: '600',
                  color: '#000',
                  marginBottom: '8px'
                }}>
                  State :
                </label>
                <input 
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  required
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

              <div style={{ marginBottom: '20px' }}>
                <label style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: '600',
                  color: '#000',
                  marginBottom: '8px'
                }}>
                  Zip Code :
                </label>
                <input 
                  type="text"
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={handleInputChange}
                  required
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
            </>
          )}

          {/* Step 3: Identity & Security */}
          {currentStep === 3 && (
            <>
              <div style={{ marginBottom: '20px' }}>
                <label style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: '600',
                  color: '#000',
                  marginBottom: '8px'
                }}>
                  Proof ID :
                </label>
                <input 
                  type="text"
                  name="proofId"
                  value={formData.proofId}
                  onChange={handleInputChange}
                  placeholder="Aadhaar/PAN/Passport"
                  required
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

              <div style={{ marginBottom: '20px' }}>
                <label style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: '600',
                  color: '#000',
                  marginBottom: '8px'
                }}>
                  ID No :
                </label>
                <input 
                  type="text"
                  name="idNo"
                  value={formData.idNo}
                  onChange={handleInputChange}
                  required
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

              <div style={{ marginBottom: '20px' }}>
                <label style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: '600',
                  color: '#000',
                  marginBottom: '8px'
                }}>
                  Create Password :
                </label>
                <input 
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
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

              <div style={{ marginBottom: '20px' }}>
                <label style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: '600',
                  color: '#000',
                  marginBottom: '8px'
                }}>
                  Confirm Password :
                </label>
                <input 
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  required
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

              {/* Checkboxes */}
              <div style={{ marginBottom: '12px', fontSize: '12px' }}>
                <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', color: '#000' }}>
                  <input 
                    type="checkbox"
                    name="agreeTerms"
                    checked={formData.agreeTerms}
                    onChange={handleInputChange}
                    required
                    style={{ marginRight: '8px' }}
                  />
                  I agree that the information provided is correct
                </label>
              </div>

              <div style={{ marginBottom: '20px', fontSize: '12px' }}>
                <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', color: '#000' }}>
                  <input 
                    type="checkbox"
                    name="agreePrivacy"
                    checked={formData.agreePrivacy}
                    onChange={handleInputChange}
                    required
                    style={{ marginRight: '8px' }}
                  />
                  I agree to the Terms of Service and Privacy Policy
                </label>
              </div>
            </>
          )}

          {/* Navigation Buttons */}
          <div style={{
            display: 'flex',
            gap: '12px',
            marginTop: '28px'
          }}>
            <button 
              type="button"
              onClick={handleBack}
              style={{
                flex: 1,
                padding: '14px',
                background: 'white',
                color: '#1E90FF',
                border: '2px solid #1E90FF',
                borderRadius: '8px',
                fontSize: '16px',
                fontWeight: '700',
                cursor: 'pointer',
                transition: 'transform 0.3s ease',
                letterSpacing: '0.5px'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              Back
            </button>

            {currentStep < 3 ? (
              <button 
                type="button"
                onClick={handleNext}
                style={{
                  flex: 1,
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
                Next
              </button>
            ) : (
              <button 
                type="submit"
                style={{
                  flex: 1,
                  padding: '14px',
                  background: '#4CAF50',
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
                  e.currentTarget.style.boxShadow = '0 8px 20px rgba(76, 175, 80, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                Submit
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default RegisterUser;