import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { GraduationCap, Menu, X, User, Building } from 'lucide-react';
import { useApp } from '../contexts/AppContext';

export const Header: React.FC = () => {
  const location = useLocation();
  const { isLoggedIn, userType, logout } = useApp();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="bg-navy text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="p-2 bg-light-blue rounded-lg group-hover:scale-110 transition-transform duration-200">
              <GraduationCap className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold">ScholarConnect</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className={`hover:text-light-blue transition-colors duration-200 ${
                isActive('/') ? 'text-light-blue font-medium' : ''
              }`}
            >
              Home
            </Link>
            <Link
              to="/courses"
              className={`hover:text-light-blue transition-colors duration-200 ${
                isActive('/courses') ? 'text-light-blue font-medium' : ''
              }`}
            >
              Compare Courses
            </Link>
            
            {isLoggedIn ? (
              <div className="flex items-center space-x-4">
                {userType === 'student' && (
                  <Link
                    to="/dashboard/student"
                    className={`hover:text-light-blue transition-colors duration-200 flex items-center space-x-1 ${
                      isActive('/dashboard/student') ? 'text-light-blue font-medium' : ''
                    }`}
                  >
                    <User className="h-4 w-4" />
                    <span>Dashboard</span>
                  </Link>
                )}
                {userType === 'college' && (
                  <Link
                    to="/dashboard/college"
                    className={`hover:text-light-blue transition-colors duration-200 flex items-center space-x-1 ${
                      isActive('/dashboard/college') ? 'text-light-blue font-medium' : ''
                    }`}
                  >
                    <Building className="h-4 w-4" />
                    <span>Dashboard</span>
                  </Link>
                )}
                {userType === 'admin' && (
                  <Link
                    to="/dashboard/admin"
                    className={`hover:text-light-blue transition-colors duration-200 ${
                      isActive('/dashboard/admin') ? 'text-light-blue font-medium' : ''
                    }`}
                  >
                    Admin
                  </Link>
                )}
                <button
                  onClick={logout}
                  className="bg-light-blue hover:bg-blue-600 px-4 py-2 rounded-lg transition-colors duration-200"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to="/login/student"
                  className="hover:text-light-blue transition-colors duration-200"
                >
                  Student Login
                </Link>
                <Link
                  to="/login/college"
                  className="bg-light-blue hover:bg-blue-600 px-4 py-2 rounded-lg transition-colors duration-200"
                >
                  College Partner
                </Link>
              </div>
            )}
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-800 transition-colors duration-200"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-700 animate-slide-up">
            <div className="flex flex-col space-y-4">
              <Link
                to="/"
                className={`hover:text-light-blue transition-colors duration-200 ${
                  isActive('/') ? 'text-light-blue font-medium' : ''
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/courses"
                className={`hover:text-light-blue transition-colors duration-200 ${
                  isActive('/courses') ? 'text-light-blue font-medium' : ''
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Compare Courses
              </Link>
              
              {isLoggedIn ? (
                <>
                  {userType === 'student' && (
                    <Link
                      to="/dashboard/student"
                      className={`hover:text-light-blue transition-colors duration-200 ${
                        isActive('/dashboard/student') ? 'text-light-blue font-medium' : ''
                      }`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Student Dashboard
                    </Link>
                  )}
                  {userType === 'college' && (
                    <Link
                      to="/dashboard/college"
                      className={`hover:text-light-blue transition-colors duration-200 ${
                        isActive('/dashboard/college') ? 'text-light-blue font-medium' : ''
                      }`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      College Dashboard
                    </Link>
                  )}
                  {userType === 'admin' && (
                    <Link
                      to="/dashboard/admin"
                      className={`hover:text-light-blue transition-colors duration-200 ${
                        isActive('/dashboard/admin') ? 'text-light-blue font-medium' : ''
                      }`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Admin Dashboard
                    </Link>
                  )}
                  <button
                    onClick={() => {
                      logout();
                      setIsMenuOpen(false);
                    }}
                    className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg transition-colors duration-200 text-left"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login/student"
                    className="hover:text-light-blue transition-colors duration-200"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Student Login
                  </Link>
                  <Link
                    to="/login/college"
                    className="bg-light-blue hover:bg-blue-600 px-4 py-2 rounded-lg transition-colors duration-200 text-center"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    College Partner
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};