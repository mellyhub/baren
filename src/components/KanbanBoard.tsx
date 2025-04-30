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
    { id: 'todo', title: 'To Do' },
    { id: 'in-progress', title: 'In Progress' },
    { id: 'done', title: 'Done' },
  ];

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {columns.map((column) => (
          <div key={column.id} className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 transition-colors duration-200">
            <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-4">{column.title}</h2>
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