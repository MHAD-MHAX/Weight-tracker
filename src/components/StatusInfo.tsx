import React from 'react';

interface StatusInfoProps {
  currentWeight: number;
  projectedDate: string;
}

const StatusInfo: React.FC<StatusInfoProps> = ({ currentWeight, projectedDate }) => {
  return (
    <div className="mb-8 grid grid-cols-2 gap-4">
      <div className="rounded-lg bg-gray-50 p-4 shadow-sm transition-all duration-300 hover:shadow-md hover:bg-gray-100">
        <div className="mb-1 text-sm font-medium text-gray-500">Current KG</div>
        <div className="flex items-center justify-between">
          <div className="text-xl font-bold">{currentWeight}kg</div>
          <div className="rounded-full bg-red-100 px-2 py-0.5 text-xs font-medium text-red-500">-10%</div>
        </div>
      </div>

      <div className="rounded-lg bg-gray-50 p-4 shadow-sm transition-all duration-300 hover:shadow-md hover:bg-gray-100">
        <div className="mb-1 text-sm font-medium text-gray-500">Projected Date</div>
        <div className="text-xl font-bold">{projectedDate}</div>
      </div>
    </div>
  );
};

export default StatusInfo;
