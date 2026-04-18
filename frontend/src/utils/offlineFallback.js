export const getOfflineFallback = (situation) => {
  const lowerSit = situation.toLowerCase();
  
  if (lowerSit.includes('follow') || lowerSit.includes('stalk') || lowerSit.includes('at night')) {
    return {
      riskLevel: 'HIGH',
      reason: 'Offline detection: Key terms indicate you might be followed or unsafe at night.',
      immediateActions: [
        'Do not go home directly or into an isolated area.',
        'Locate a 24/7 store, gas station, or a populated area.',
        'Call an emergency contact or the police immediately.'
      ],
      escapePlan: 'Change your pace and cross the street. If they follow, run to the nearest lit building and ask for help.',
      reassurance: 'Stay calm. You have offline options. Keep moving confidently to a safe place.'
    };
  }

  if (lowerSit.includes('cab') || lowerSit.includes('uber') || lowerSit.includes('driver')) {
    return {
      riskLevel: 'MEDIUM',
      reason: 'Offline detection: Cab safety protocols activated.',
      immediateActions: [
        'Share your live location with a friend.',
        'Pretend to be on a call starting with "I am almost there, are you waiting outside?"',
        'Check child locks on doors if possible.'
      ],
      escapePlan: 'If suspecting foul play, lower the window and wait for a traffic stop to exit immediately.',
      reassurance: 'Keep your phone ready. Pretend you are being tracked by family.'
    };
  }

  // Default fallback
  return {
    riskLevel: 'MEDIUM',
    reason: 'Offline detection: Generic safety protocol activated without internet.',
    immediateActions: [
      'Stay alert and aware of your surroundings.',
      'Have your keys in your hand.',
      'Move towards well-lit, populated areas.'
    ],
    escapePlan: 'Walk purposefully to the nearest safe public location.',
    reassurance: 'You are capable. Trust your instincts and stay vigilant.'
  };
};
