import { FC } from 'react';
import { useAuth } from '../context/AuthContext';
import profileImage from '../assets/hebbe.png';

interface Activity {
  id: string;
  action: string;
  project: string;
  timestamp: string;
}

const mockActivities: Activity[] = [
  {
    id: '1',
    action: 'Updated ticket status to "In Progress"',
    project: 'Website Redesign',
    timestamp: '2 hours ago',
  },
  {
    id: '2',
    action: 'Created new project "Mobile App Development"',
    project: 'Mobile App Development',
    timestamp: '1 day ago',
  },
  {
    id: '3',
    action: 'Completed ticket #123',
    project: 'API Integration',
    timestamp: '2 days ago',
  },
  {
    id: '4',
    action: 'Added new team member',
    project: 'Database Migration',
    timestamp: '3 days ago',
  },
];

const Profile: FC = () => {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="p-6">
      <div className="max-w-4xl mx-auto">
        <div className="container-primary">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="relative">
              <img
                src={user?.picture || profileImage}
                alt="Profile"
                className="w-32 h-32 rounded-full object-cover border-4 border-gray-200 dark:border-gray-700"
              />
              <div className="absolute bottom-0 right-0 bg-green-500 w-4 h-4 rounded-full border-2 border-white dark:border-gray-800"></div>
            </div>
            <div className="flex-1">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
                    {user?.name || 'Hector Lundman'}
                  </h1>
                  <p className="text-gray-600 dark:text-gray-400">{user?.email}</p>
                </div>
                <button
                  onClick={handleLogout}
                  className="px-6 py-2 bg-red-500 hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700 text-white rounded-md transition-colors duration-200 flex items-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  Sign Out
                </button>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="px-3 py-1 rounded-full text-sm font-medium bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200">
                  Admin
                </span>
                <span className="px-3 py-1 rounded-full text-sm font-medium bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200">
                  Member since {new Date().toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="container-primary">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Recent Activity</h2>
          <div className="space-y-4">
            {mockActivities.map((activity) => (
              <div
                key={activity.id}
                className="flex items-start space-x-4 p-4 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200"
              >
                <div className="w-2 h-2 rounded-full bg-blue-500 mt-2"></div>
                <div>
                  <p className="text-gray-800 dark:text-gray-200 font-medium">{activity.action}</p>
                  <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                    <span>{activity.project}</span>
                    <span>•</span>
                    <span>{activity.timestamp}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile; 