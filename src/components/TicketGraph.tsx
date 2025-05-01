import { FC, useState } from 'react';

interface TimeRange {
  id: string;
  label: string;
}

interface TicketData {
  month: string;
  completed: number;
}

const timeRanges: TimeRange[] = [
  { id: '1W', label: '1W' },
  { id: '1M', label: '1M' },
  { id: '3M', label: '3M' },
  { id: '6M', label: '6M' },
  { id: '9M', label: '9M' },
  { id: '1Y', label: '1Y' },
];

const mockData: TicketData[] = [
  { month: 'Jan', completed: 45 },
  { month: 'Feb', completed: 32 },
  { month: 'Mar', completed: 28 },
  { month: 'Apr', completed: 38 },
  { month: 'May', completed: 42 },
  { month: 'Jun', completed: 48 },
  { month: 'Jul', completed: 52 },
  { month: 'Aug', completed: 68 },
  { month: 'Sep', completed: 55 },
];

const TicketGraph: FC = () => {
  const [selectedRange, setSelectedRange] = useState('9M');
  const maxTickets = Math.max(...mockData.map(d => d.completed));
  const currentMonth = mockData[mockData.length - 2]; // August data
  const previousMonth = mockData[mockData.length - 3]; // July data
  const percentageChange = ((currentMonth.completed - previousMonth.completed) / previousMonth.completed * 100).toFixed(1);

  return (
    <div className="bg-[#fffcfc] dark:bg-[#080404] rounded-lg shadow-md p-6">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
            Completed Tickets in {currentMonth.month}
          </h2>
          <div className="flex items-center space-x-2">
            <span className="text-4xl font-mono font-bold text-gray-900 dark:text-white">
              {currentMonth.completed}
            </span>
            <span className={`text-sm font-medium ${Number(percentageChange) >= 0 ? 'text-green-500' : 'text-red-500'}`}>
              {Number(percentageChange) >= 0 ? '↑' : '↓'} {Math.abs(Number(percentageChange))}%
            </span>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button className="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
          </button>
          <button className="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
            </svg>
          </button>
        </div>
      </div>

      <div className="relative h-48 mb-6">
        <div className="absolute inset-0 flex items-end justify-between">
          {mockData.map((data, index) => (
            <div key={data.month} className="flex flex-col items-center w-full">
              <div
                className={`w-8 rounded-t-md transition-all duration-300 ${
                  data.month === currentMonth.month
                    ? 'bg-blue-500'
                    : 'bg-gray-200 dark:bg-gray-700'
                }`}
                style={{ height: `${(data.completed / maxTickets) * 100}%` }}
              ></div>
              <span className="text-xs text-gray-500 dark:text-gray-400 mt-2">{data.month}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-center space-x-2">
        {timeRanges.map((range) => (
          <button
            key={range.id}
            onClick={() => setSelectedRange(range.id)}
            className={`px-3 py-1 rounded-full text-sm font-medium transition-colors duration-200 ${
              selectedRange === range.id
                ? 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white'
                : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
            }`}
          >
            {range.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TicketGraph; 