import React, { useState } from 'react';
import { Shield, MapPin, ArrowRight } from 'lucide-react';

const Login = ({ onLogin }) => {
  const [name, setName] = useState('');
  const [askingLocation, setAskingLocation] = useState(false);
  const [error, setError] = useState('');

  const handleStart = (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    setAskingLocation(true);
    
    // Request geolocation
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log("Location access granted:", position);
          completeLogin();
        },
        (err) => {
          console.error("Location error:", err);
          setError("Location access helps us protect you better, but you can continue without it.");
          setTimeout(() => completeLogin(), 3000); // login anyway after 3 seconds
        }
      );
    } else {
      completeLogin();
    }
  };

  const completeLogin = () => {
    // Save to local storage for persistence if needed
    localStorage.setItem('safeher_user', name);
    onLogin();
  };

  return (
    <div className="login-container">
      <div className="background-shapes">
        <div className="shape shape-1"></div>
        <div className="shape shape-2"></div>
      </div>
      
      <div className="login-card glass-effect fade-in">
        <div className="login-header">
          <Shield size={64} color="var(--primary-color)" style={{ marginBottom: '16px' }} />
          <h1>Welcome to SafeHer</h1>
          <p className="subtitle" style={{ marginBottom: '32px' }}>Your proactive, AI-powered safety companion.</p>
        </div>

        {!askingLocation ? (
          <form onSubmit={handleStart} className="login-form">
            <div className="input-group">
              <input 
                type="text" 
                placeholder="Enter your name" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoFocus
                required
              />
            </div>
            <button type="submit" className="primary-btn">
              Get Started <ArrowRight size={20} />
            </button>
          </form>
        ) : (
          <div className="location-prompt slide-up">
            <div className="pulse-icon-container" style={{ margin: '0 auto 24px', width: '80px', height: '80px', borderRadius: '50%', background: 'rgba(99, 102, 241, 0.1)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
               <MapPin size={40} color="var(--secondary-color)" className={error ? "" : "pulse-animation"} />
            </div>
            <h3>Securing Your Location...</h3>
            <p className="subtitle" style={{ marginTop: '12px' }}>
              {error || "We're requesting location access to ensure Safe Mode and SOS alerts can accurately pinpoint you in an emergency."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
