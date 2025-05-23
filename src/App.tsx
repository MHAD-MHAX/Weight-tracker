import { useState, useEffect } from 'react';
import CircularProgress from './components/CircularProgress';
import StatusInfo from './components/StatusInfo';
import Statistics from './components/Statistics';

// Mock function to simulate API call until real endpoint is available
const fetchStatistics = async () => {
  // This would normally be a real API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { day: '1', value: 15 },
        { day: '2', value: 22 },
        { day: '3', value: 18 },
        { day: '4', value: 15 },
        { day: '5', value: 19 },
        { day: '6', value: 16 },
        { day: '7', value: 21 },
        { day: '8', value: 19 },
        { day: '9', value: 16 },
        { day: '10', value: 20 },
        { day: '11', value: 18 },
        { day: '12', value: 16 },
        { day: '13', value: 14 },
        { day: '14', value: 19 },
      ]);
    }, 500);
  });
};

function App() {
  // State for real-time data (simulating websocket data that would normally come from MQTT)
  const [realtimeData, setRealtimeData] = useState({
    capacityPercentage: 69,
    currentWeight: 25.83,
    projectedDate: '20/04/2025',
    hasGasLeakage: false
  });

  // State for statistics data from REST API
  const [statisticsData, setStatisticsData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Simulate real-time data updates
  useEffect(() => {
    console.log("Setting up simulated real-time data updates");

    // Function to simulate real-time data updates
    const simulateDataUpdates = () => {
      const randomCapacity = Math.floor(Math.random() * 100);
      const calculatedWeight = (20 + (randomCapacity / 10)).toFixed(2);

      setRealtimeData(prev => ({
        ...prev,
        capacityPercentage: randomCapacity,
        hasGasLeakage: randomCapacity < 15,
        currentWeight: parseFloat(calculatedWeight)
      }));
      console.log("Updated real-time data:", randomCapacity);
    };

    // Initial update
    simulateDataUpdates();

    const interval = setInterval(simulateDataUpdates, 5000);

    // Clean up
    return () => {
      clearInterval(interval);
    };
  }, []);

  // Fetch statistics data from REST API
  useEffect(() => {
    console.log("Fetching statistics data");
    const getStatistics = async () => {
      try {
        setIsLoading(true);
        const data = await fetchStatistics();
        setStatisticsData(data as any[]);
        setError(null);
        console.log("Statistics data loaded:", data);
      } catch (err) {
        console.error('Error fetching statistics:', err);
        setError('Failed to load statistics data');
      } finally {
        setIsLoading(false);
      }
    };

    getStatistics();

    // Refresh data periodically
    const interval = setInterval(getStatistics, 60000); // Refresh every minute

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <div className="relative mx-auto w-full max-w-sm overflow-hidden rounded-3xl bg-white shadow-xl">
        {/* Mock iPhone status bar */}
        <div className="flex items-center justify-between bg-white py-2 px-5 text-xs text-gray-800">
          <div>9:41</div>
          <div className="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12.55a11 11 0 0 1 14.08 0" />
              <path d="M1.42 9a16 16 0 0 1 21.16 0" />
              <path d="M8.53 16.11a6 6 0 0 1 6.95 0" />
              <line x1="12" y1="20" x2="12.01" y2="20" />
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 18H3a2 2 0 0 1-2-2V8c0-1.1.9-2 2-2h3.19M15 6h2a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-3.19" />
              <line x1="23" y1="13" x2="23" y2="11" />
              <path d="M11 6 7 12l4 6" />
              <path d="m13 12 4-6 4 6-4 6-4-6Z" />
            </svg>
          </div>
        </div>

        {/* Main content */}
        <div className="px-6 py-4">
          {/* Gas leakage alert indicator */}
          <div className={`absolute right-6 top-12 flex items-center rounded-full ${
            realtimeData.hasGasLeakage ? 'bg-red-100 animate-pulse' : 'bg-gray-100'
          } px-3 py-1 text-lg`}>
            <span className={realtimeData.hasGasLeakage ? 'text-red-600' : 'text-gray-400'}>
              🚨
            </span>
          </div>

          {/* Circular progress component */}
          <div className="mb-6 flex justify-center">
            <CircularProgress
              percentage={realtimeData.capacityPercentage}
            />
          </div>

          {/* Status information */}
          <StatusInfo
            currentWeight={realtimeData.currentWeight}
            projectedDate={realtimeData.projectedDate}
          />

          {/* Statistics component */}
          {isLoading ? (
            <div className="flex h-48 items-center justify-center">
              <p className="text-gray-500">Loading statistics...</p>
            </div>
          ) : error ? (
            <div className="flex h-48 items-center justify-center">
              <p className="text-red-500">{error}</p>
            </div>
          ) : (
            <Statistics data={statisticsData} />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
