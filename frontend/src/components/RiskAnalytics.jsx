import React from 'react';
import { Activity, ShieldCheck, AlertTriangle } from 'lucide-react';

const RiskAnalytics = () => {
  // Mock data to provide reassurance
  const stats = [
    { label: "Safe Journeys Logs", value: "12", color: "var(--safe-color)", icon: <ShieldCheck size={20} /> },
    { label: "Alerts Handled", value: "2", color: "var(--warning-color)", icon: <AlertTriangle size={20} /> },
    { label: "Check-ins Completed", value: "24", color: "var(--primary-color)", icon: <Activity size={20} /> }
  ];

  // Simple CSS bar chart values
  const weekData = [
    { day: "Mon", height: "40%" },
    { day: "Tue", height: "30%" },
    { day: "Wed", height: "60%" },
    { day: "Thu", height: "20%" },
    { day: "Fri", height: "80%" },
    { day: "Sat", height: "90%" },
    { day: "Sun", height: "50%" },
  ];

  return (
    <div className="card glass-effect fade-in" style={{ paddingBottom: '32px' }}>
      <h2>Safety Analytics</h2>
      <p className="subtitle">Your recent safety trends and active monitoring logs. SafeHer is keeping you secure.</p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '16px', marginBottom: '32px' }}>
        {stats.map((stat, i) => (
          <div key={i} style={{ 
            background: 'rgba(255,255,255,0.05)', 
            padding: '20px', 
            borderRadius: '16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ color: stat.color }}>{stat.icon}</div>
              <span style={{ fontWeight: '500' }}>{stat.label}</span>
            </div>
            <span style={{ fontSize: '1.5rem', fontWeight: '800', fontFamily: 'Outfit', color: stat.color }}>
              {stat.value}
            </span>
          </div>
        ))}
      </div>

      <h3 style={{ marginBottom: '20px' }}>Weekly Activity</h3>
      <div style={{ 
        display: 'flex', 
        height: '150px', 
        alignItems: 'flex-end', 
        justifyContent: 'space-between',
        padding: '0 10px',
        borderBottom: '1px solid var(--glass-border)'
      }}>
        {weekData.map((data, i) => (
          <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', width: '30px' }}>
            <div style={{ 
              height: data.height, 
              width: '100%', 
              background: i === 4 || i === 5 ? 'var(--primary-color)' : 'var(--safe-color)',
              borderRadius: '4px 4px 0 0',
              opacity: 0.8,
              transition: 'height 1s ease-out'
            }}></div>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{data.day}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RiskAnalytics;
