import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Mail, Phone, Lock, User, Building } from 'lucide-react';
import { useApp } from '../contexts/AppContext';

export const Login: React.FC = () => {
  const { type } = useParams<{ type: 'student' | 'college' | 'admin' }>();
  const navigate = useNavigate();
  const { login } = useApp();
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    if (type) {
      login(type as 'student' | 'college' | 'admin');
      navigate(`/dashboard/${type}`);
    }
  };

  const getTitle = () => {
    switch (type) {
      case 'student': return 'Student Login';
      case 'college': return 'College Partner Login';
      case 'admin': return 'Admin Login';
      default: return 'Login';
    }
  };

  const getIcon = () => {
    switch (type) {
      case 'student': return <User className="h-8 w-8 text-white" />;
      case 'college': return <Building className="h-8 w-8 text-white" />;
      case 'admin': return <Lock className="h-8 w-8 text-white" />;
      default: return <User className="h-8 w-8 text-white" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-navy via-blue-900 to-light-blue flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="mx-auto w-16 h-16 bg-gradient-to-r from-light-blue to-blue-600 rounded-full flex items-center justify-center mb-4">
            {getIcon()}
          </div>
          <h2 className="text-3xl font-bold text-white mb-2">{getTitle()}</h2>
          <p className="text-blue-100">
            {type === 'student' && 'Access your dashboard and track your offers'}
            {type === 'college' && 'Manage your leads and partnerships'}
            {type === 'admin' && 'Administrative access to the platform'}
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            {/* Email */}
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleInputChange}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-light-blue focus:border-transparent bg-white"
                placeholder="Email address"
              />
            </div>

            {/* Phone (for students only) */}
            {type === 'student' && (
              <div className="relative">
                <Phone className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-light-blue focus:border-transparent bg-white"
                  placeholder="Phone number (optional)"
                />
              </div>
            )}

            {/* Password */}
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                name="password"
                type="password"
                required
                value={formData.password}
                onChange={handleInputChange}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-light-blue focus:border-transparent bg-white"
                placeholder="Password"
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-light-blue focus:ring-light-blue border-gray-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-blue-100">
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <a href="#" className="text-light-blue hover:text-blue-300">
                Forgot password?
              </a>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-white text-navy font-semibold py-3 px-4 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-light-blue transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="w-5 h-5 border-2 border-navy border-t-transparent rounded-full animate-spin"></div>
                <span>Signing in...</span>
              </div>
            ) : (
              'Sign in'
            )}
          </button>

          {type === 'college' && (
            <div className="text-center">
              <p className="text-blue-100 text-sm">
                New college partner?{' '}
                <a href="#" className="text-light-blue hover:text-blue-300 font-medium">
                  Register here
                </a>
              </p>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};