import { FC } from 'react';
import TicketGraph from './TicketGraph';

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
    <div className="space-y-6">
      <TicketGraph />
      
      <div className="bg-[#fffcfc] dark:bg-[#080404] rounded-lg shadow-md">
        <div className="p-6">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Recent Activity</h2>
          <div className="space-y-4">
            {activities.map((activity) => (
              <div
                key={activity.id}
                className="flex items-start space-x-4 p-4 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200"
              >
                <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-medium text-blue-800 dark:text-blue-200">
                    {activity.user.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="text-gray-800 dark:text-gray-200">
                    <span className="font-medium">{activity.user}</span> {activity.action}
                  </p>
                  <span className="text-sm text-gray-500 dark:text-gray-400">{activity.timestamp}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivityFeed; 