import { FC } from 'react';
import { useParams } from 'react-router-dom';
import KanbanBoard from './KanbanBoard';

interface Project {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'completed' | 'archived';
  progress: number;
  totalTickets: number;
  completedTickets: number;
  lastUpdated: string;
  image: string;
}

interface Ticket {
  id: string;
  title: string;
  description: string;
  status: 'todo' | 'in-progress' | 'done';
  priority: 'low' | 'medium' | 'high';
}

// Mock data - in a real app, this would come from an API
const mockProjects: Project[] = [
  {
    id: '1',
    name: 'Website Redesign',
    description: 'Complete overhaul of the company website with modern design and improved user experience',
    status: 'active',
    progress: 75,
    totalTickets: 24,
    completedTickets: 18,
    lastUpdated: '2 hours ago',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&h=300&fit=crop',
  },
  {
    id: '2',
    name: 'Mobile App Development',
    description: 'Development of a new mobile application for iOS and Android platforms',
    status: 'active',
    progress: 45,
    totalTickets: 36,
    completedTickets: 16,
    lastUpdated: '1 day ago',
    image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=500&h=300&fit=crop',
  },
];

const mockProjectTickets: Record<string, Ticket[]> = {
  '1': [
    {
      id: '1-1',
      title: 'Design Homepage',
      description: 'Create new homepage design with modern UI elements',
      status: 'todo',
      priority: 'high',
    },
    {
      id: '1-2',
      title: 'Implement Navigation',
      description: 'Build responsive navigation menu',
      status: 'in-progress',
      priority: 'medium',
    },
    {
      id: '1-3',
      title: 'Mobile Optimization',
      description: 'Ensure website works well on mobile devices',
      status: 'done',
      priority: 'low',
    },
  ],
  '2': [
    {
      id: '2-1',
      title: 'User Authentication',
      description: 'Implement login and registration',
      status: 'todo',
      priority: 'high',
    },
    {
      id: '2-2',
      title: 'API Integration',
      description: 'Connect app to backend services',
      status: 'in-progress',
      priority: 'high',
    },
    {
      id: '2-3',
      title: 'UI Components',
      description: 'Build reusable UI components',
      status: 'done',
      priority: 'medium',
    },
  ],
};

const ProjectBoard: FC = () => {
  const { id } = useParams<{ id: string }>();
  const project = mockProjects.find(p => p.id === id);
  const tickets = mockProjectTickets[id || ''] || [];

  if (!project) {
    return (
      <div className="p-6 text-center">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Project not found</h1>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="group mb-8 bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transition-all duration-200 hover:shadow-lg">
        <div className="flex gap-6">
          <div className="relative w-48 h-48 flex-shrink-0 rounded-lg overflow-hidden">
            <img
              src={project.image}
              alt={project.name}
              className="w-full h-full object-cover group-hover:brightness-95 transition-all duration-200"
            />
          </div>
          <div className="flex-1">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-800 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200 tracking-wide">
                  {project.name}
                </h1>
                <p className="text-gray-600 dark:text-gray-300 mt-2 line-clamp-2 group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors duration-200 font-normal">
                  {project.description}
                </p>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm font-medium transition-colors duration-200 ${
                project.status === 'active' ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200' :
                project.status === 'completed' ? 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200' :
                'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
              }`}>
                {project.status}
              </span>
            </div>
            
            <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
              <span className="group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors duration-200 font-medium">
                {project.completedTickets} of {project.totalTickets} tickets completed
              </span>
              <span className="text-gray-300 dark:text-gray-600">•</span>
              <span className="group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors duration-200 font-medium">
                Updated {project.lastUpdated}
              </span>
            </div>

            <div className="mt-4">
              <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400 mb-1 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors duration-200 font-medium">
                <span>Overall Progress</span>
                <span>{project.progress}%</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${project.progress}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="group bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transition-all duration-200 hover:shadow-lg">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200 tracking-wide">
          Kanban Board
        </h2>
        <KanbanBoard tickets={tickets} />
      </div>
    </div>
  );
};

export default ProjectBoard; 