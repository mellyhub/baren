import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import ActivityFeed from './components/ActivityFeed';
import Projects from './components/Projects';
import ProjectBoard from './components/ProjectBoard';
import Profile from './components/Profile';
import { ThemeProvider } from './context/ThemeContext';

interface Activity {
  id: string;
  user: string;
  action: string;
  timestamp: string;
}

// Mock data for demonstration
const mockActivities: Activity[] = [
  {
    id: '1',
    user: 'Hector',
    action: 'moved Ticket #2 to "In Progress"',
    timestamp: '2 hours ago',
  },
  {
    id: '2',
    user: 'Sarah',
    action: 'created Ticket #3',
    timestamp: '4 hours ago',
  },
  {
    id: '3',
    user: 'Hector',
    action: 'moved Ticket #2 to "In Progress"',
    timestamp: '2 hours ago',
  },
  {
    id: '4',
    user: 'Sarah',
    action: 'created Ticket #3',
    timestamp: '4 hours ago',
  },
];

function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="min-h-screen bg-gray-100 dark:bg-[#141414]">
          <Navbar />
          <main className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <Routes>
              <Route
                path="/"
                element={<ActivityFeed activities={mockActivities} />}
              />
              <Route
                path="/projects"
                element={<Projects />}
              />
              <Route
                path="/projects/:id"
                element={<ProjectBoard />}
              />
              <Route
                path="/profile"
                element={<Profile />}
              />
            </Routes>
          </main>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
