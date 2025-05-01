import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className="bg-white dark:bg-[#141414] border-b border-gray-200 dark:border-[#262626]">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 flex justify-between">
        <div className="flex items-center">
          <Link to="/" className="space-x-2 group">
            <span className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              Logo goes here
            </span>
          </Link>
        </div>
        <div className="flex justify-end h-16">
          <div className="hidden sm:flex sm:items-center sm:space-x-4">
            <Link to="/" className="flex items-center space-x-2 group">
              <span className="flex items-center px-3 py-2 text-sm font-medium transition-all duration-200 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:underline">
                Activity Feed
              </span>
            </Link>

            <Link to="/projects" className="flex items-center space-x-2 group">
            <span className="flex items-center px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:underline">
                Projects
              </span>
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-md hover:bg-gray-50 dark:hover:bg-[#262626] transition-colors duration-200 focus:outline-none"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <svg
                  className="w-5 h-5 text-gray-400 dark:text-gray-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              ) : (
                <svg
                  className="w-5 h-5 text-gray-400 dark:text-gray-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                  />
                </svg>
              )}
            </button>
            <button className="btn btn-primary flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200">
              <div className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <span>My Profile</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 