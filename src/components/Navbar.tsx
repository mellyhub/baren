import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { useState } from 'react';

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement search functionality
    console.log('Searching for:', searchQuery);
  };

  return (
    <nav className="bg-white dark:bg-[#141414] border-b border-gray-200 dark:border-[#262626]">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="space-x-2 group">
              <span className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              <img
                src="src/assets/Baren logo.png"
                alt="Baren"
                className="w-12 h-12 rounded-[0.1em]"
              />           
              </span>
            </Link>
          </div>

          {/* Search Bar */}
          <div className="ml-80 flex-1 max-w-2xl mx-4">
            <form onSubmit={handleSearch} className="relative">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search projects, tickets, or users..."
                  className="w-full pl-10 pr-4 py-2 rounded-lg bg-gray-50 dark:bg-[#262626] border border-gray-200 dark:border-[#333333] text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent"
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg
                    className="h-5 w-5 text-gray-400 dark:text-gray-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
              </div>
            </form>
          </div>

          <div className="flex items-center h-full">
            <div className="hidden sm:flex sm:items-center sm:space-x-4 h-full">
              <Link to="/" className="flex items-center space-x-2 group h-full">
                <span className="flex items-center nav-item text-sm font-medium h-full border-b-2 border-transparent">
                  Activity Feed
                </span>
              </Link>

              <Link to="/projects" className="flex items-center space-x-2 group h-full">
                <span className="flex items-center nav-item text-sm font-medium h-full border-b-2 border-transparent">
                  Projects
                </span>
              </Link>
            </div>
            <div className="flex items-center space-x-4 ml-3">
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

              <div className="relative group">
                <Link to="/profile">
                  <button className="btn btn-primary flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200">
                    <div className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center">
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <span>My Profile</span>
                  </button>
                </Link>
                {/* 
                Unnused code for displaying user name or email
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {user?.name || user?.email}
                  </span> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;