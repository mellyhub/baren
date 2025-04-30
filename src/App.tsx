import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import KanbanBoard from './components/KanbanBoard';
import ActivityFeed from './components/ActivityFeed';
import Projects from './components/Projects';
import { ThemeProvider } from './context/ThemeContext';

interface Ticket {
  id: string;
  title: string;
  description: string;
  status: 'todo' | 'in-progress' | 'done';
  priority: 'low' | 'medium' | 'high';
}

interface Activity {
  id: string;
  user: string;
  action: string;
  timestamp: string;
}

// Mock data for demonstration
const mockTickets: Ticket[] = [
  {
    id: '1',
    title: 'Implement user authentication',
    description: 'Add login and registration functionality',
    status: 'todo',
    priority: 'high',
  },
  {
    id: '2',
    title: 'Design landing page',
    description: 'Create a modern and responsive landing page',
    status: 'in-progress',
    priority: 'medium',
  },
  {
    id: '3',
    title: 'Fix mobile responsiveness',
    description: 'Address issues with mobile view',
    status: 'done',
    priority: 'low',
  },
];

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
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-200">
          <Navbar />
          <main className="w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <Routes>
              <Route
                path="/"
                element={
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2">
                      <KanbanBoard tickets={mockTickets} />
                    </div>
                    <div>
                      <ActivityFeed activities={mockActivities} />
                    </div>
                  </div>
                }
              />
              <Route
                path="/board"
                element={<KanbanBoard tickets={mockTickets} />}
              />
              <Route
                path="/projects"
                element={<Projects />}
              />
              <Route
                path="/projects/:id"
                element={<Projects />}
              />
            </Routes>
          </main>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
