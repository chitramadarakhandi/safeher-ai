import React, { useState, useEffect } from 'react';
import useAudioDetection from '../hooks/useAudioDetection';
import { Shield, ShieldOff, Clock, PhoneCall, Volume2 } from 'lucide-react';

const SafeMode = () => {
  const [isActive, setIsActive] = useState(false);
  const [journeyTime, setJourneyTime] = useState(15); // minutes
  const [timeLeft, setTimeLeft] = useState(null);
  const [checkInActive, setCheckInActive] = useState(false);

  // When loud sound is detected, auto-trigger a panic response
  const handleLoudSound = (vol) => {
    console.warn('LOUD SOUND DETECTED:', vol);
    alert('Loud sound detected! Initiating Emergency Protocol...');
    // Real app: make fake outgoing call or send SMS
  };

  const { startMonitoring, stopMonitoring, isMonitoring } = useAudioDetection(100, handleLoudSound);

  useEffect(() => {
    let timer;
    if (isActive && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            triggerCheckIn();
            return 0;
          }
          return prev - 1;
        });
      }, 60000); // decrement every minute
    }
    return () => clearInterval(timer);
  }, [isActive, timeLeft]);

  const toggleSafeMode = () => {
    if (isActive) {
      setIsActive(false);
      setTimeLeft(null);
      setCheckInActive(false); // FIXED: Force modal to close if active
      stopMonitoring();
    } else {
      setIsActive(true);
      setTimeLeft(journeyTime);
      setCheckInActive(false);
      startMonitoring();
    }
  };

  const triggerCheckIn = () => {
    setCheckInActive(true);
    // Real app: loud audio ping, push notification
    if (navigator.vibrate) navigator.vibrate([500, 250, 500, 250, 500]);
  };

  const handleSafeResponse = () => {
    setCheckInActive(false);
    setIsActive(false);
    setTimeLeft(null); // FIXED: clean up properly
    stopMonitoring();
  };

  const handlePanicResponse = () => {
    setCheckInActive(false);
    alert('Calling Emergency Contacts (Demo)...');
  };

  return (
    <div className="card glass-effect fade-in">
      <div className="safe-mode-header">
        <h2>Smart Safe Mode</h2>
        <p className="subtitle">Continuous monitoring for your journey.</p>
      </div>

      <div className={`status-indicator ${isActive ? 'active-pulse' : ''}`}>
        {isActive ? <Shield size={80} color="var(--safe-color)" /> : <ShieldOff size={80} color="#64748b" />}
      </div>

      {!isActive ? (
        <div className="setup-journey">
          <label>
            <Clock size={16}/> Expected Journey Time (mins)
          </label>
          <input 
            type="number" 
            value={journeyTime}
            onChange={(e) => setJourneyTime(Number(e.target.value))}
            min="1"
            max="120"
          />
          <button className="primary-btn green-glow" onClick={toggleSafeMode}>
            Start Journey
          </button>
        </div>
      ) : (
        <div className="active-journey">
          <h3>Monitoring Active</h3>
          <p>Time remaining: <strong>{timeLeft} mins</strong></p>
          <p className="small-text"><Volume2 size={12}/> Audio anomaly detection is ON</p>
          <button className="secondary-btn" onClick={toggleSafeMode}>
            Cancel Safe Mode
          </button>
        </div>
      )}

      {checkInActive && (
        <div className="checkin-modal">
          <div className="checkin-content fade-in">
            <h3 className="danger-text">Are you safe?</h3>
            <p style={{ color: 'var(--text-muted)', marginBottom: '24px' }}>Your expected journey time has passed.</p>
            <div className="checkin-actions">
              <button className="danger-btn" onClick={handlePanicResponse}>
                <PhoneCall size={18}/> NO - HELP ME
              </button>
              <button className="success-btn" onClick={handleSafeResponse}>
                YES - I'm Safe
              </button>
            </div>
            <p className="small-text" style={{ color: 'var(--text-muted)' }}>Auto-alerting in 30 seconds...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default SafeMode;
