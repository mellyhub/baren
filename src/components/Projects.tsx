import { FC } from 'react';
import { Link } from 'react-router-dom';

interface Project {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'completed' | 'archived';
  progress: number;
  totalTickets: number;
  completedTickets: number;
  lastUpdated: string;
}

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
  },
  {
    id: '3',
    name: 'API Integration',
    description: 'Integration of third-party APIs for payment processing and authentication',
    status: 'completed',
    progress: 100,
    totalTickets: 12,
    completedTickets: 12,
    lastUpdated: '1 week ago',
  },
  {
    id: '4',
    name: 'Database Migration',
    description: 'Migration of legacy database to new cloud-based solution',
    status: 'archived',
    progress: 100,
    totalTickets: 8,
    completedTickets: 8,
    lastUpdated: '2 months ago',
  },
];

const Projects: FC = () => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200';
      case 'completed':
        return 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200';
      case 'archived':
        return 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200';
      default:
        return 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200';
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Projects</h1>
        <button className="btn btn-primary">
          Create New Project
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockProjects.map((project) => (
          <Link
            key={project.id}
            to={`/projects/${project.id}`}
            className="block bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
          >
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white">{project.name}</h2>
                <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(project.status)}`}>
                  {project.status}
                </span>
              </div>
              
              <p className="text-gray-600 dark:text-gray-300 mb-4">{project.description}</p>
              
              <div className="mb-4">
                <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400 mb-1">
                  <span>Progress</span>
                  <span>{project.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${project.progress}%` }}
                  />
                </div>
              </div>

              <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400">
                <span>
                  {project.completedTickets} of {project.totalTickets} tickets completed
                </span>
                <span>Updated {project.lastUpdated}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Projects; 