import React, { useState } from 'react';
import { getOfflineFallback } from '../utils/offlineFallback';
import { Mic, MicOff, AlertCircle, ShieldAlert, Navigation } from 'lucide-react';
import useSpeechRecognition from '../hooks/useSpeechRecognition';

const SituationAnalyzer = () => {
  const [situationText, setSituationText] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleSpeech = (text) => {
    setSituationText(old => old + " " + text);
  };

  const { isListening, startListening, stopListening } = useSpeechRecognition(handleSpeech);

  const analyzeSituation = async () => {
    if (!situationText.trim()) return;
    setLoading(true);
    setResult(null);

    if (!navigator.onLine) {
       setResult(getOfflineFallback(situationText));
       setLoading(false);
       return;
    }

    try {
      const apiUrl = import.meta.env.VITE_API_URL || '/api/ai/analyze';
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ situation: situationText, context: 'Walking outside' })
      });
      const data = await response.json();
      setResult(data);
    } catch (err) {
      console.error(err);
      setResult(getOfflineFallback(situationText)); // Fallback if API fails
    } finally {
      setLoading(false);
    }
  };

  const getRiskColor = (level) => {
    if (level === 'HIGH') return 'var(--danger-color)';
    if (level === 'MEDIUM') return 'var(--warning-color)';
    return 'var(--safe-color)';
  };

  return (
    <div className="card glass-effect fade-in">
      <h2>Situation Analyzer</h2>
      <p className="subtitle">Describe your situation (text or voice) for AI safety guidance.</p>
      
      <div className="input-group">
        <textarea 
          placeholder="I am in a cab and the driver took a wrong turn..."
          value={situationText}
          onChange={(e) => setSituationText(e.target.value)}
          rows="4"
        />
        <button 
          className={`icon-btn ${isListening ? 'listening' : ''}`}
          onClick={isListening ? stopListening : startListening}
          title="Use Voice"
        >
          {isListening ? <MicOff size={20} /> : <Mic size={20} />}
        </button>
      </div>

      <button className="primary-btn" onClick={analyzeSituation} disabled={loading}>
        {loading ? <span className="loader"></span> : 'Analyze Situation'}
      </button>

      {result && (
        <div className="result-card slide-up" style={{ borderColor: getRiskColor(result.riskLevel) }}>
          <div className="risk-header">
            <AlertCircle size={24} color={getRiskColor(result.riskLevel)} />
            <h3 style={{ color: getRiskColor(result.riskLevel) }}>{result.riskLevel} RISK</h3>
          </div>
          <p className="reason">{result.reason}</p>
          
          <div className="actions-list">
            <h4><ShieldAlert size={18} /> Immediate Actions</h4>
            <ul>
              {result.immediateActions?.map((action, i) => (
                <li key={i}>{action}</li>
              ))}
            </ul>
          </div>

          <div className="escape-plan">
            <h4><Navigation size={18} /> Escape Plan</h4>
            {Array.isArray(result.escapePlan) ? (
              <ul className="actions-list" style={{ marginTop: '12px' }}>
                {result.escapePlan.map((step, i) => (
                  <li key={i}>{step}</li>
                ))}
              </ul>
            ) : (
              <p>{result.escapePlan}</p>
            )}
          </div>

          <div className="reassurance">
            <p>{result.reassurance}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default SituationAnalyzer;
