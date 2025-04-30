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
        return 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200';
      case 'medium':
        return 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200';
      case 'low':
        return 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200';
      default:
        return 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200';
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 mb-4 hover:shadow-lg transition-all duration-200">
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white">{title}</h3>
        <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${getPriorityColor(priority)}`}>
          {priority}
        </span>
      </div>
      <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">{description}</p>
      <div className="flex justify-between items-center text-xs text-gray-500 dark:text-gray-400">
        <span>#{id}</span>
        <span className="capitalize">{status}</span>
      </div>
    </div>
  );
};

export default TicketCard; 