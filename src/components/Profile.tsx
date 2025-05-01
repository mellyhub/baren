import { FC } from 'react';
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
  return (
    <div className="p-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-[#fffcfc] dark:bg-[#080404] rounded-md shadow-md p-6 mb-6">
          <div className="flex items-center space-x-6">
            <div className="relative">
              <img
                src={profileImage}
                alt="Profile"
                className="w-32 h-32 rounded-full object-cover border-4 border-gray-200 dark:border-gray-700"
              />
              <div className="absolute bottom-0 right-0 bg-green-500 w-4 h-4 rounded-full border-2 border-white dark:border-gray-800"></div>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">Hector Lundman</h1>
              <div className="flex items-center space-x-2">
                <span className="px-3 py-1 rounded-full text-sm font-medium bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200">
                  Admin
                </span>
                <span className="text-gray-500 dark:text-gray-400">•</span>
                <span className="text-gray-600 dark:text-gray-300">Member since January 2024</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-[#fffcfc] dark:bg-[#080404] rounded-md shadow-md p-6">
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