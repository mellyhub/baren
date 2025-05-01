import { FC } from 'react';
import TicketCard from './TicketCard';

interface Ticket {
  id: string;
  title: string;
  description: string;
  status: 'todo' | 'in-progress' | 'done';
  priority: 'low' | 'medium' | 'high';
}

interface KanbanBoardProps {
  tickets: Ticket[];
}

const KanbanBoard: FC<KanbanBoardProps> = ({ tickets }) => {
  const columns = [
    { id: 'todo', title: 'To Do', color: 'bg-gray-100 dark:bg-gray-700' },
    { id: 'in-progress', title: 'In Progress', color: 'bg-blue-50 dark:bg-blue-900/20' },
    { id: 'done', title: 'Done', color: 'bg-green-50 dark:bg-green-900/20' },
  ];

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {columns.map((column) => (
          <div key={column.id} className={`${column.color} rounded-lg p-4 transition-colors duration-200`}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">{column.title}</h2>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {tickets.filter((ticket) => ticket.status === column.id).length} tickets
              </span>
            </div>
            <div className="space-y-4">
              {tickets
                .filter((ticket) => ticket.status === column.id)
                .map((ticket) => (
                  <TicketCard key={ticket.id} {...ticket} />
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default KanbanBoard; 