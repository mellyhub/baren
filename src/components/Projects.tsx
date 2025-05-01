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
  image: string;
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
  {
    id: '3',
    name: 'API Integration',
    description: 'Integration of third-party APIs for payment processing and authentication',
    status: 'completed',
    progress: 100,
    totalTickets: 12,
    completedTickets: 12,
    lastUpdated: '1 week ago',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=500&h=300&fit=crop',
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
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&h=300&fit=crop',
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
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white tracking-wide">Projects</h1>
        <button className="btn btn-primary hover:opacity-90 transition-opacity duration-200 font-medium">
          Create New Project
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockProjects.map((project) => (
          <Link
            key={project.id}
            to={`/projects/${project.id}`}
            className="group block bg-[#fffcfc] dark:bg-[#080404] rounded-sm shadow-md hover:shadow-lg transition-all duration-200 overflow-hidden">
            <div className="relative h-48 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/80 to-transparent z-10" />
              <img
                src={project.image}
                alt={project.name}
                className="w-full h-full object-cover group-hover:brightness-95 transition-all duration-200"
              />
              <div className="absolute top-4 right-4 z-20">
                <span className={`px-2 py-1 rounded-full text-xs font-medium transition-colors duration-200 capitalize ${getStatusColor(project.status)}`}>
                  {project.status}
                </span>
              </div>
              <div className="absolute bottom-4 left-4 z-20">
                <h2 className="text-xl font-bold text-gray-100 group-hover:text-white transition-colors duration-200 tracking-wide">
                  {project.name}
                </h2>
              </div>
            </div>
            <div className="p-6">
              <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2 group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors duration-200 font-normal">
                {project.description}
              </p>
              
              <div className="mb-4">
                <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400 mb-1 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors duration-200 font-medium">
                  <span>Progress</span>
                  <span>{project.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full transition-all duration-500 ease-out"
                    style={{ width: `${project.progress}%` }}
                  />
                </div>
              </div>

              <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400">
                <span className="group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors duration-200 font-medium">
                  {project.completedTickets} of {project.totalTickets} tickets completed
                </span>
                <span className="group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors duration-200 font-medium">
                  Updated {project.lastUpdated}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Projects; 