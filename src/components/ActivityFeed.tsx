import { FC } from 'react';

interface Activity {
  id: string;
  user: string;
  action: string;
  timestamp: string;
}

interface ActivityFeedProps {
  activities: Activity[];
}

const ActivityFeed: FC<ActivityFeedProps> = ({ activities }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transition-colors duration-200">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Activity Feed</h2>
      <div className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="border-l-4 border-blue-500 dark:border-blue-400 pl-4 py-2">
            <div className="flex items-center justify-between">
              <p className="text-gray-700 dark:text-gray-300">
                <span className="font-medium text-gray-900 dark:text-white">{activity.user}</span>{' '}
                {activity.action}
              </p>
              <span className="text-sm text-gray-500 dark:text-gray-400">{activity.timestamp}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActivityFeed; 