import React, { useEffect, useState } from 'react';

interface CircularProgressProps {
  percentage: number;
}

const CircularProgress: React.FC<CircularProgressProps> = ({ percentage }) => {
  const [currentPercentage, setCurrentPercentage] = useState(0);
  const radius = 80;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (currentPercentage / 100) * circumference;

  // Determine color based on capacity level
  const getColorForCapacity = (percent: number): string => {
    if (percent > 30) return '#22c55e'; // Green for normal levels
    if (percent > 10) return '#f59e0b'; // Amber/yellow for warning levels
    return '#ef4444'; // Red for critical levels
  };

  const progressColor = getColorForCapacity(percentage);

  // Animation effect
  useEffect(() => {
    const duration = 1000; // 1 second
    const interval = 10; // Update every 10ms
    const steps = duration / interval;
    const increment = percentage / steps;
    let current = 0;

    setCurrentPercentage(0);
    const timer = setInterval(() => {
      current += increment;
      if (current >= percentage) {
        clearInterval(timer);
        setCurrentPercentage(percentage);
      } else {
        setCurrentPercentage(current);
      }
    }, interval);

    return () => clearInterval(timer);
  }, [percentage]);

  return (
    <div className="relative flex h-64 w-64 items-center justify-center">
      <svg className="absolute h-full w-full" viewBox="0 0 200 200">
        <circle
          cx="100"
          cy="100"
          r={radius}
          fill="none"
          stroke="#E8E9F3"
          strokeWidth="15"
          strokeLinecap="round"
        />
      </svg>

      <svg className="absolute h-full w-full -rotate-90" viewBox="0 0 200 200">
        <circle
          cx="100"
          cy="100"
          r={radius}
          fill="none"
          stroke={progressColor}
          strokeWidth="15"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          style={{ transition: 'stroke-dashoffset 0.1s ease' }}
        />
      </svg>

      <div className="z-10 flex flex-col items-center">
        <span className="text-5xl font-bold">{Math.round(currentPercentage)}%</span>
        <span className="text-gray-500">Capacity</span>
      </div>
    </div>
  );
};

export default CircularProgress;
