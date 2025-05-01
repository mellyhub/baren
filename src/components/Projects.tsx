import { FC } from 'react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useAuth0Sub } from '../context/AuthContext';

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

async function fetchProjectsData(auth0Sub: string, setProjects: React.Dispatch<React.SetStateAction<Project[]>>) {
  try {
    const res = await fetch('/api/projects', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ auth0Id: auth0Sub }),
    });

    if (!res.ok) throw new Error("Failed to fetch projects");

    const data = await res.json();

    const transformed = data.map((p: any): Project => ({
      id: p.id.toString(),
      name: p.name,
      description: p.description,
      status: p.status,
      progress: Math.round((p.completed_tickets / p.total_tickets) * 100),
      totalTickets: p.total_tickets,
      completedTickets: p.completed_tickets,
      lastUpdated: p.last_updated,
      image: p.image_url,
    }));
    
    setProjects(transformed);

  } catch (err) {
    console.error(err);
  }
}

const Projects: FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const sub = useAuth0Sub();

  useEffect(() => {
    if (sub) {
      fetchProjectsData(sub, setProjects);
    }
    
  }, [sub])

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
        {projects.length === 0 ? 
            <div className="text-gray-500 dark:text-gray-300">No projects found.</div> : 
          projects.map((project) => (
          <div key={project.id} className="relative group">
            {/* Gradient Glow Effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-500 dark:from-blue-600 dark:to-purple-600 rounded-lg blur opacity-5 group-hover:opacity-95 transition-all duration-500" />
            
            <Link
              to={`/projects/${project.id}`}
              className="relative block bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 overflow-hidden">
              <div className="relative h-48 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/80 to-transparent z-10" />
                <img
                  src={project.image}
                  alt={project.name}
                  className="w-full h-full object-cover"
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
                    {project.lastUpdated}
                  </span>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects; 