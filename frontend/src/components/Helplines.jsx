import React from 'react';
import { Phone, ShieldAlert, HeartPulse, ShieldCheck, Siren } from 'lucide-react';

const Helplines = () => {
  const helplines = [
    {
      name: "National Emergency",
      desc: "All-in-one emergency number (Police, Fire, Medical)",
      number: "112",
      icon: <Siren size={24} color="var(--danger-color)" />
    },
    {
      name: "Women Helpline",
      desc: "Domestic abuse and distress support",
      number: "1091",
      icon: <ShieldAlert size={24} color="var(--primary-color)" />
    },
    {
      name: "Domestic Abuse",
      desc: "Dedicated support for domestic violence",
      number: "181",
      icon: <HeartPulse size={24} color="var(--warning-color)" />
    },
    {
      name: "Police",
      desc: "Direct local police assistance",
      number: "100",
      icon: <ShieldCheck size={24} color="var(--secondary-color)" />
    }
  ];

  return (
    <div className="card glass-effect fade-in">
      <h2>Emergency Helplines</h2>
      <p className="subtitle">Tap any number below to call immediately.</p>

      <div className="helplines-grid">
        {helplines.map((helpline, index) => (
          <a href={`tel:${helpline.number}`} className="helpline-card" key={index}>
            <div className="helpline-info">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                {helpline.icon}
                <h3>{helpline.name}</h3>
              </div>
              <p>{helpline.desc}</p>
            </div>
            <div className="helpline-number">
              {helpline.number}
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default Helplines;
