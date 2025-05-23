import React, { useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface DataPoint {
  day: string;
  value: number;
}

interface StatisticsProps {
  data: DataPoint[];
}

const Statistics: React.FC<StatisticsProps> = ({ data }) => {
  const [chartType, setChartType] = useState<'daily' | 'monthly'>('daily');

  // Prepare chart data
  const chartData = {
    labels: data.map(item => item.day),
    datasets: [
      {
        label: 'Weight',
        data: data.map(item => item.value),
        backgroundColor: '#2E70CC',
        borderRadius: 3,
      },
    ],
  };

  // Chart options
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true
      }
    }
  };

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-base font-semibold text-gray-800">Statistics</h3>
        <div className="flex text-xs">
          <button
            className={`rounded-l-md px-3 py-1 ${
              chartType === 'daily' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600'
            }`}
            onClick={() => setChartType('daily')}
          >
            Daily
          </button>
          <button
            className={`rounded-r-md px-3 py-1 ${
              chartType === 'monthly' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600'
            }`}
            onClick={() => setChartType('monthly')}
          >
            Monthly
          </button>
        </div>
      </div>

      <div className="h-48 w-full">
        <Bar data={chartData} options={options} />
      </div>
    </div>
  );
};

export default Statistics;
