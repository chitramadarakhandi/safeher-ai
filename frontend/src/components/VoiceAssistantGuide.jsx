import React from 'react';
import { Mic, CheckCircle } from 'lucide-react';

const VoiceAssistantGuide = () => {
  return (
    <div className="card glass-effect fade-in">
      <h2>Siri & Bixby Integration</h2>
      <p className="subtitle">Set up hands-free shortcuts to instantly trigger SafeHer's Panic Mode using your voice.</p>

      <div style={{ background: 'rgba(0,0,0,0.3)', borderRadius: '16px', padding: '24px', marginBottom: '24px' }}>
        <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px', color: 'var(--text-main)' }}>
          <Mic size={20} color="var(--primary-color)" /> iOS (Siri)
        </h3>
        <ol style={{ paddingLeft: '20px', color: 'var(--text-muted)', lineHeight: '1.6' }}>
          <li style={{ marginBottom: '8px' }}>Open the <strong>Shortcuts</strong> app on your iPhone.</li>
          <li style={{ marginBottom: '8px' }}>Tap <strong>+</strong> to create a new Shortcut.</li>
          <li style={{ marginBottom: '8px' }}>Add Action: <em>"Open URL"</em> and enter your SafeHer web link.</li>
          <li style={{ marginBottom: '8px' }}>Name it <strong>"SafeHer Protocol"</strong>.</li>
          <li>Now just say: <br/><strong style={{ color: '#fff' }}>"Hey Siri, run SafeHer Protocol"</strong></li>
        </ol>
      </div>

      <div style={{ background: 'rgba(0,0,0,0.3)', borderRadius: '16px', padding: '24px' }}>
        <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px', color: 'var(--text-main)' }}>
          <Mic size={20} color="var(--primary-color)" /> Android (Bixby/Google)
        </h3>
        <ol style={{ paddingLeft: '20px', color: 'var(--text-muted)', lineHeight: '1.6' }}>
          <li style={{ marginBottom: '8px' }}>Open your browser, tap the Menu, and select <strong>"Add to Home screen"</strong>.</li>
          <li style={{ marginBottom: '8px' }}>Open <strong>Bixby Routines</strong> or <strong>Google Assistant Routines</strong>.</li>
          <li style={{ marginBottom: '8px' }}>Set trigger phrase to <strong>"I am not safe"</strong>.</li>
          <li style={{ marginBottom: '8px' }}>Set action to open the SafeHer app shortcut.</li>
          <li>Now just say: <br/><strong style={{ color: '#fff' }}>"Hey Google, I am not safe"</strong></li>
        </ol>
      </div>
      
      <div style={{ marginTop: '24px', background: 'var(--safe-bg)', border: '1px solid var(--safe-color)', padding: '16px', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '12px' }}>
         <CheckCircle size={24} color="var(--safe-color)" />
         <p style={{ fontSize: '0.9rem', color: '#fff' }}>Voice shortcuts save critical seconds. We strongly recommend completing this setup.</p>
      </div>
    </div>
  );
};

export default VoiceAssistantGuide;
