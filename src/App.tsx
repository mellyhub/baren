import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import Navbar from './components/Navbar';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider, ProtectedRoute } from './context/AuthContext';

// Lazy load components
const ActivityFeed = lazy(() => import('./components/ActivityFeed'));
const Projects = lazy(() => import('./components/Projects'));
const ProjectBoard = lazy(() => import('./components/ProjectBoard'));
const Profile = lazy(() => import('./components/Profile'));
const Login = lazy(() => import('./components/Login'));

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
        <AuthProvider>
          <div className="min-h-screen bg-gray-100 dark:bg-[#141414]">
            <Routes>
              <Route
                path="/login"
                element={
                  <Suspense fallback={
                    <div className="flex items-center justify-center min-h-screen">
                      <div className="animate-pulse text-gray-600 dark:text-gray-300">Loading...</div>
                    </div>
                  }>
                    <Login />
                  </Suspense>
                }
              />
              
              <Route
                path="/*"
                element={
                  <ProtectedRoute>
                    <>
                      <Navbar />
                      <main className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
                        <Suspense fallback={
                          <div className="flex items-center justify-center min-h-[60vh]">
                            <div className="animate-pulse text-gray-600 dark:text-gray-300">Loading...</div>
                          </div>
                        }>
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
                        </Suspense>
                      </main>
                    </>
                  </ProtectedRoute>
                }
              />
            </Routes>
          </div>
        </AuthProvider>
      </Router>
    </ThemeProvider>
  );
}

export default App;
