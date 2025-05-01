import { FC } from 'react';

interface TicketCardProps {
  id: string;
  title: string;
  description: string;
  status: 'todo' | 'in-progress' | 'done';
  priority: 'low' | 'medium' | 'high';
}

const TicketCard: FC<TicketCardProps> = ({ id, title, description, status, priority }) => {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200';
      case 'medium':
        return 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200';
      case 'low':
        return 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200';
      default:
        return 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'todo':
        return 'text-gray-500 dark:text-gray-400';
      case 'in-progress':
        return 'text-blue-500 dark:text-blue-400';
      case 'done':
        return 'text-green-500 dark:text-green-400';
      default:
        return 'text-gray-500 dark:text-gray-400';
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 hover:shadow-md transition-all duration-200 border border-gray-100 dark:border-gray-700">
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-base font-semibold text-gray-800 dark:text-white">{title}</h3>
        <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${getPriorityColor(priority)}`}>
          {priority}
        </span>
      </div>
      <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">{description}</p>
      <div className="flex justify-between items-center text-xs">
        <span className="text-gray-500 dark:text-gray-400">#{id}</span>
        <span className={`font-medium ${getStatusColor(status)}`}>
          {status.replace('-', ' ')}
        </span>
      </div>
    </div>
  );
};

export default TicketCard; 