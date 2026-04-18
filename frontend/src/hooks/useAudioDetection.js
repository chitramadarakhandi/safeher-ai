import { useState, useEffect, useRef } from 'react';

const useAudioDetection = (threshold = 85, onLoudSound) => {
  const [isMonitoring, setIsMonitoring] = useState(false);
  const [volume, setVolume] = useState(0);
  const audioContextRef = useRef(null);
  const streamRef = useRef(null);
  const animationRef = useRef(null);

  const startMonitoring = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
      streamRef.current = stream;
      
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      audioContextRef.current = audioContext;
      
      const analyser = audioContext.createAnalyser();
      analyser.fftSize = 256;
      
      const microphone = audioContext.createMediaStreamSource(stream);
      microphone.connect(analyser);
      
      const dataArray = new Uint8Array(analyser.frequencyBinCount);
      
      const updateVolume = () => {
        analyser.getByteFrequencyData(dataArray);
        let sum = 0;
        for (let i = 0; i < dataArray.length; i++) {
          sum += dataArray[i];
        }
        const average = sum / dataArray.length;
        setVolume(average);
        
        if (average > threshold && onLoudSound) {
          onLoudSound(average);
        }
        
        animationRef.current = requestAnimationFrame(updateVolume);
      };
      
      updateVolume();
      setIsMonitoring(true);
    } catch (err) {
      console.error('Error accessing microphone for volume detection', err);
    }
  };

  const stopMonitoring = () => {
    if (animationRef.current) cancelAnimationFrame(animationRef.current);
    if (audioContextRef.current) audioContextRef.current.close();
    if (streamRef.current) streamRef.current.getTracks().forEach(track => track.stop());
    setIsMonitoring(false);
    setVolume(0);
  };

  useEffect(() => {
    return stopMonitoring;
  }, []);

  return { isMonitoring, volume, startMonitoring, stopMonitoring };
};

export default useAudioDetection;
