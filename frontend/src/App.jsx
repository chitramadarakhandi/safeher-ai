import React, { useState, useEffect } from 'react';
import SituationAnalyzer from './components/SituationAnalyzer';
import SafeMode from './components/SafeMode';
import Helplines from './components/Helplines';
import Login from './components/Login';
import RiskAnalytics from './components/RiskAnalytics';
import VoiceAssistantGuide from './components/VoiceAssistantGuide';
import useSpeechRecognition from './hooks/useSpeechRecognition';
import { Shield, Sparkles, Phone, Activity, Settings, AlertOctagon } from 'lucide-react';
import './index.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState('analyzer');
  const [distressActive, setDistressActive] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem('safeher_user');
    if (user) setIsAuthenticated(true);
  }, []);

  // Global background distress detection
  const handleGlobalDistress = (word) => {
    console.error("DISTRESS WORD DETECTED:", word);
    setDistressActive(true);
    if (navigator.vibrate) navigator.vibrate([1000, 500, 1000, 500, 1000]);
  };

  const { startListening, isListening } = useSpeechRecognition(handleGlobalDistress);

  if (!isAuthenticated) {
    return <Login onLogin={() => setIsAuthenticated(true)} />;
  }

  const triggerSOS = () => {
    setDistressActive(true);
    if (navigator.vibrate) navigator.vibrate([1000, 500, 1000, 500, 1000]);
  };

  return (
    <div className="app-container">
      <div className="background-shapes">
        <div className="shape shape-1"></div>
        <div className="shape shape-2"></div>
      </div>

      {distressActive && (
        <div className="distress-overlay">
          <h1>🚨 SOS ACTIVATED 🚨</h1>
          <p>Sending location to emergency contacts...</p>
          <a href="tel:112" className="danger-btn" style={{ margin: '20px 0', textDecoration: 'none', background: '#fff', color: 'var(--danger-color)' }}>
            <Phone size={24} /> CALL 112 NOW
          </a>
          <button className="secondary-btn" onClick={() => setDistressActive(false)}>Cancel False Alarm</button>
        </div>
      )}

      {/* Floating SOS Button */}
      {!distressActive && (
        <button className="sos-float-btn" onClick={triggerSOS} title="Emergency SOS">
          <AlertOctagon size={28} />
          <span>SOS</span>
        </button>
      )}

      <header className="app-header glass-effect">
        <div className="logo-group">
          <Shield size={32} color="var(--primary-color)" />
          <h1>SafeHer AI</h1>
        </div>
        <button 
           className={`mic-toggle ${isListening ? 'listening-pulse' : ''}`}
           onClick={startListening}
           title="Enable Always-on Voice Trigger"
        >
          {isListening ? 'Listening...' : 'Voice Trigger'}
        </button>
      </header>

      <main className="main-content">
        {activeTab === 'analyzer' && <SituationAnalyzer />}
        {activeTab === 'safemode' && <SafeMode />}
        {activeTab === 'helplines' && <Helplines />}
        {activeTab === 'analytics' && <RiskAnalytics />}
        {activeTab === 'voice' && <VoiceAssistantGuide />}
      </main>

      <nav className="bottom-nav glass-effect">
        <button 
          className={activeTab === 'analyzer' ? 'active' : ''} 
          onClick={() => setActiveTab('analyzer')}
        >
          <Sparkles size={20} />
          <span>AI Guide</span>
        </button>
        <button 
          className={activeTab === 'analytics' ? 'active' : ''} 
          onClick={() => setActiveTab('analytics')}
        >
          <Activity size={20} />
          <span>Analytics</span>
        </button>
        <button 
          className={`safe-mode-btn ${activeTab === 'safemode' ? 'active' : ''}`} 
          onClick={() => setActiveTab('safemode')}
        >
          <Shield size={28} />
        </button>
        <button 
          className={activeTab === 'helplines' ? 'active' : ''} 
          onClick={() => setActiveTab('helplines')}
        >
          <Phone size={20} />
          <span>Helplines</span>
        </button>
        <button 
          className={activeTab === 'voice' ? 'active' : ''} 
          onClick={() => setActiveTab('voice')}
        >
          <Settings size={20} />
          <span>Voice</span>
        </button>
      </nav>
    </div>
  );
}

export default App;
