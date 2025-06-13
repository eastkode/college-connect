import React, { useState } from 'react';
import { 
  Users, 
  Building, 
  Award, 
  TrendingUp, 
  DollarSign,
  Search,
  Filter,
  Plus,
  Edit,
  Trash2,
  Eye,
  Download
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');

  // Mock data
  const stats = {
    totalStudents: 12450,
    totalColleges: 89,
    totalLeads: 3420,
    totalRevenue: 2850000
  };

  const recentActivity = [
    { type: 'student', action: 'New student registration', name: 'Priya Sharma', time: '2 mins ago' },
    { type: 'college', action: 'College profile updated', name: 'Delhi University', time: '15 mins ago' },
    { type: 'lead', action: 'Lead converted', name: 'Rahul Kumar → Mumbai University', time: '1 hour ago' },
    { type: 'payment', action: 'Payment received', name: 'Bangalore Institute - ₹15,000', time: '2 hours ago' }
  ];

  const colleges = [
    { id: 1, name: 'Delhi University', city: 'Delhi', leads: 45, conversion: '28%', revenue: 67500, status: 'active' },
    { id: 2, name: 'Mumbai University', city: 'Mumbai', leads: 38, conversion: '32%', revenue: 57000, status: 'active' },
    { id: 3, name: 'Bangalore Institute', city: 'Bangalore', leads: 29, conversion: '25%', revenue: 43500, status: 'pending' },
    { id: 4, name: 'Chennai College', city: 'Chennai', leads: 22, conversion: '30%', revenue: 33000, status: 'active' }
  ];

  const scholarships = [
    { id: 1, title: 'Merit Scholarship', amount: 25000, eligibility: '85%+ marks', colleges: 12, active: true },
    { id: 2, title: 'Need-based Aid', amount: 15000, eligibility: 'Family income < 5L', colleges: 8, active: true },
    { id: 3, title: 'Sports Scholarship', amount: 20000, eligibility: 'State level sports', colleges: 6, active: false },
    { id: 4, title: 'Minority Scholarship', amount: 18000, eligibility: 'Minority community', colleges: 10, active: true }
  ];

  return (
    <div className="min-h-screen bg-light-gray py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">Manage the entire ScholarConnect platform</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Students</p>
                <p className="text-3xl font-bold text-gray-800">{stats.totalStudents.toLocaleString()}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Partner Colleges</p>
                <p className="text-3xl font-bold text-gray-800">{stats.totalColleges}</p>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <Building className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Leads</p>
                <p className="text-3xl font-bold text-gray-800">{stats.totalLeads.toLocaleString()}</p>
              </div>
              <div className="p-3 bg-purple-100 rounded-full">
                <TrendingUp className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Revenue</p>
                <p className="text-3xl font-bold text-gray-800">₹{(stats.totalRevenue / 100000).toFixed(1)}L</p>
              </div>
              <div className="p-3 bg-orange-100 rounded-full">
                <DollarSign className="h-6 w-6 text-orange-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-lg mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {['overview', 'colleges', 'scholarships', 'analytics'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm capitalize ${
                    activeTab === tab
                      ? 'border-light-blue text-light-blue'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </nav>
          </div>

          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Recent Activity */}
                <div>
                  <h3 className="text-lg font-bold text-gray-800 mb-4">Recent Activity</h3>
                  <div className="space-y-4">
                    {recentActivity.map((activity, index) => (
                      <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                        <div className={`p-2 rounded-full ${
                          activity.type === 'student' ? 'bg-blue-100' :
                          activity.type === 'college' ? 'bg-green-100' :
                          activity.type === 'lead' ? 'bg-purple-100' : 'bg-orange-100'
                        }`}>
                          {activity.type === 'student' && <Users className="h-4 w-4 text-blue-600" />}
                          {activity.type === 'college' && <Building className="h-4 w-4 text-green-600" />}
                          {activity.type === 'lead' && <TrendingUp className="h-4 w-4 text-purple-600" />}
                          {activity.type === 'payment' && <DollarSign className="h-4 w-4 text-orange-600" />}
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-800">{activity.action}</p>
                          <p className="text-sm text-gray-600">{activity.name}</p>
                          <p className="text-xs text-gray-500">{activity.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Quick Stats */}
                <div>
                  <h3 className="text-lg font-bold text-gray-800 mb-4">Platform Metrics</h3>
                  <div className="space-y-4">
                    <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-4 text-white">
                      <h4 className="font-semibold mb-2">Monthly Growth</h4>
                      <p className="text-2xl font-bold">+23.5%</p>
                      <p className="text-blue-100 text-sm">New student registrations</p>
                    </div>
                    
                    <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-lg p-4 text-white">
                      <h4 className="font-semibold mb-2">Conversion Rate</h4>
                      <p className="text-2xl font-bold">29.8%</p>
                      <p className="text-green-100 text-sm">Leads to admissions</p>
                    </div>
                    
                    <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg p-4 text-white">
                      <h4 className="font-semibold mb-2">Avg. Scholarship</h4>
                      <p className="text-2xl font-bold">₹18,500</p>
                      <p className="text-purple-100 text-sm">Per student awarded</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Colleges Tab */}
          {activeTab === 'colleges' && (
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold text-gray-800">College Management</h3>
                <button className="bg-light-blue text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-600 transition-colors duration-200 flex items-center space-x-2">
                  <Plus className="h-4 w-4" />
                  <span>Add College</span>
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-semibold text-gray-800">College</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-800">Leads</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-800">Conversion</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-800">Revenue</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-800">Status</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-800">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {colleges.map((college) => (
                      <tr key={college.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-4 px-4">
                          <div>
                            <p className="font-medium text-gray-800">{college.name}</p>
                            <p className="text-sm text-gray-600">{college.city}</p>
                          </div>
                        </td>
                        <td className="py-4 px-4 font-medium">{college.leads}</td>
                        <td className="py-4 px-4 font-medium text-green-600">{college.conversion}</td>
                        <td className="py-4 px-4 font-medium">₹{college.revenue.toLocaleString()}</td>
                        <td className="py-4 px-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            college.status === 'active' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {college.status}
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex space-x-2">
                            <button className="text-light-blue hover:text-blue-600">
                              <Eye className="h-4 w-4" />
                            </button>
                            <button className="text-gray-500 hover:text-gray-700">
                              <Edit className="h-4 w-4" />
                            </button>
                            <button className="text-red-500 hover:text-red-700">
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Scholarships Tab */}
          {activeTab === 'scholarships' && (
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold text-gray-800">Scholarship Management</h3>
                <button className="bg-light-blue text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-600 transition-colors duration-200 flex items-center space-x-2">
                  <Plus className="h-4 w-4" />
                  <span>Create Scholarship</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {scholarships.map((scholarship) => (
                  <div key={scholarship.id} className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow duration-200">
                    <div className="flex justify-between items-start mb-4">
                      <h4 className="text-lg font-semibold text-gray-800">{scholarship.title}</h4>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        scholarship.active 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {scholarship.active ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Amount:</span>
                        <span className="font-semibold text-green-600">₹{scholarship.amount.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Eligibility:</span>
                        <span className="text-sm text-gray-800">{scholarship.eligibility}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Partner Colleges:</span>
                        <span className="font-medium">{scholarship.colleges}</span>
                      </div>
                    </div>

                    <div className="flex space-x-2">
                      <button className="flex-1 bg-light-blue text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-600 transition-colors duration-200">
                        Edit
                      </button>
                      <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                        View Details
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Analytics Tab */}
          {activeTab === 'analytics' && (
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold text-gray-800">Platform Analytics</h3>
                <button className="bg-light-blue text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-600 transition-colors duration-200 flex items-center space-x-2">
                  <Download className="h-4 w-4" />
                  <span>Export Report</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-6 text-white">
                  <h4 className="text-lg font-semibold mb-2">Daily Active Users</h4>
                  <p className="text-3xl font-bold">2,847</p>
                  <p className="text-blue-100 text-sm">+12.3% from yesterday</p>
                </div>
                
                <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-6 text-white">
                  <h4 className="text-lg font-semibold mb-2">Lead Quality Score</h4>
                  <p className="text-3xl font-bold">8.9/10</p>
                  <p className="text-green-100 text-sm">+0.2 from last week</p>
                </div>
                
                <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl p-6 text-white">
                  <h4 className="text-lg font-semibold mb-2">Platform Revenue</h4>
                  <p className="text-3xl font-bold">₹28.5L</p>
                  <p className="text-purple-100 text-sm">This month</p>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h4 className="text-lg font-semibold text-gray-800 mb-4">Performance Trends</h4>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-600">Student Registrations</span>
                      <span className="text-sm font-medium text-green-600">+23.5%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{ width: '78%' }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-600">College Partnerships</span>
                      <span className="text-sm font-medium text-blue-600">+15.2%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-500 h-2 rounded-full" style={{ width: '65%' }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-600">Scholarship Disbursals</span>
                      <span className="text-sm font-medium text-purple-600">+31.8%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-purple-500 h-2 rounded-full" style={{ width: '85%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};