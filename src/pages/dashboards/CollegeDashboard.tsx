import React, { useState } from 'react';
import { 
  Users, 
  Filter, 
  Download, 
  Search, 
  MapPin, 
  Mail, 
  Phone,
  TrendingUp,
  Award,
  DollarSign,
  Calendar,
  ChevronDown,
  Edit
} from 'lucide-react';

export const CollegeDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('leads');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Mock data
  const stats = {
    totalLeads: 156,
    newLeads: 23,
    contacted: 89,
    converted: 44
  };

  const leads = [
    {
      id: 1,
      name: 'Priya Sharma',
      email: 'priya@email.com',
      phone: '+91 98765-43210',
      class: '12th',
      marks: 87,
      city: 'Delhi',
      course: 'B.Tech Computer Science',
      status: 'new',
      date: '2024-01-15',
      source: 'organic'
    },
    {
      id: 2,
      name: 'Rahul Kumar',
      email: 'rahul@email.com',
      phone: '+91 98765-43211',
      class: '12th',
      marks: 92,
      city: 'Mumbai',
      course: 'B.Com Honours',
      status: 'contacted',
      date: '2024-01-14',
      source: 'referral'
    },
    {
      id: 3,
      name: 'Sneha Patel',
      email: 'sneha@email.com',
      phone: '+91 98765-43212',
      class: '12th',
      marks: 78,
      city: 'Bangalore',
      course: 'BBA',
      status: 'interested',
      date: '2024-01-13',
      source: 'paid'
    },
    {
      id: 4,
      name: 'Amit Singh',
      email: 'amit@email.com',
      phone: '+91 98765-43213',
      class: '12th',
      marks: 85,
      city: 'Chennai',
      course: 'B.Tech Computer Science',
      status: 'admitted',
      date: '2024-01-12',
      source: 'organic'
    }
  ];

  const filteredLeads = leads.filter(lead => {
    const matchesSearch = lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lead.course.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || lead.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-blue-100 text-blue-800';
      case 'contacted': return 'bg-yellow-100 text-yellow-800';
      case 'interested': return 'bg-purple-100 text-purple-800';
      case 'admitted': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getSourceBadge = (source: string) => {
    const colors = {
      organic: 'bg-green-100 text-green-800',
      referral: 'bg-blue-100 text-blue-800',
      paid: 'bg-orange-100 text-orange-800'
    };
    return colors[source as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="min-h-screen bg-light-gray py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">College Partner Dashboard</h1>
          <p className="text-gray-600">Manage your leads and track admissions</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Leads</p>
                <p className="text-3xl font-bold text-gray-800">{stats.totalLeads}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">New Leads</p>
                <p className="text-3xl font-bold text-gray-800">{stats.newLeads}</p>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Contacted</p>
                <p className="text-3xl font-bold text-gray-800">{stats.contacted}</p>
              </div>
              <div className="p-3 bg-yellow-100 rounded-full">
                <Mail className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Converted</p>
                <p className="text-3xl font-bold text-gray-800">{stats.converted}</p>
              </div>
              <div className="p-3 bg-purple-100 rounded-full">
                <Award className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-lg mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {['leads', 'profile', 'analytics'].map((tab) => (
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

          {/* Leads Tab */}
          {activeTab === 'leads' && (
            <div className="p-6">
              {/* Filters */}
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search leads by name, email, or course..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-light-blue focus:border-transparent"
                  />
                </div>
                
                <div className="flex gap-2">
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-light-blue focus:border-transparent bg-white"
                  >
                    <option value="all">All Status</option>
                    <option value="new">New</option>
                    <option value="contacted">Contacted</option>
                    <option value="interested">Interested</option>
                    <option value="admitted">Admitted</option>
                  </select>
                  
                  <button className="px-4 py-3 bg-light-blue text-white rounded-lg hover:bg-blue-600 transition-colors duration-200 flex items-center space-x-2">
                    <Download className="h-4 w-4" />
                    <span>Export</span>
                  </button>
                </div>
              </div>

              {/* Leads Table */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-semibold text-gray-800">Student</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-800">Course</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-800">Marks</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-800">Location</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-800">Source</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-800">Status</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-800">Date</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-800">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredLeads.map((lead) => (
                      <tr key={lead.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-4 px-4">
                          <div>
                            <p className="font-medium text-gray-800">{lead.name}</p>
                            <div className="flex items-center space-x-4 text-sm text-gray-600">
                              <div className="flex items-center">
                                <Mail className="h-3 w-3 mr-1" />
                                {lead.email}
                              </div>
                              <div className="flex items-center">
                                <Phone className="h-3 w-3 mr-1" />
                                {lead.phone}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <p className="font-medium text-gray-800">{lead.course}</p>
                          <p className="text-sm text-gray-600">Class {lead.class}</p>
                        </td>
                        <td className="py-4 px-4">
                          <span className="font-bold text-light-blue">{lead.marks}%</span>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center text-gray-600">
                            <MapPin className="h-4 w-4 mr-1" />
                            {lead.city}
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${getSourceBadge(lead.source)}`}>
                            {lead.source}
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(lead.status)}`}>
                            {lead.status}
                          </span>
                        </td>
                        <td className="py-4 px-4 text-sm text-gray-600">
                          {lead.date}
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex space-x-2">
                            <button className="text-light-blue hover:text-blue-600 text-sm font-medium">
                              Contact
                            </button>
                            <button className="text-gray-500 hover:text-gray-700 text-sm font-medium">
                              View
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

          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <div className="p-6">
              <div className="max-w-2xl">
                <h3 className="text-lg font-bold text-gray-800 mb-6">College Profile</h3>
                
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        College Name
                      </label>
                      <input
                        type="text"
                        defaultValue="Delhi University"
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-light-blue focus:border-transparent"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        City
                      </label>
                      <input
                        type="text"
                        defaultValue="Delhi"
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-light-blue focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Courses Offered
                    </label>
                    <textarea
                      rows={4}
                      defaultValue="B.Tech Computer Science, B.Com Honours, BBA, B.Sc Mathematics"
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-light-blue focus:border-transparent"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Annual Fees (₹)
                      </label>
                      <input
                        type="number"
                        defaultValue="50000"
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-light-blue focus:border-transparent"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Max Scholarship (₹)
                      </label>
                      <input
                        type="number"
                        defaultValue="15000"
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-light-blue focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Placement Rate (%)
                      </label>
                      <input
                        type="number"
                        defaultValue="85"
                        max="100"
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-light-blue focus:border-transparent"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Average Salary
                      </label>
                      <input
                        type="text"
                        defaultValue="₹4.5 LPA"
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-light-blue focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="bg-light-blue text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-600 transition-colors duration-200 flex items-center space-x-2"
                    >
                      <Edit className="h-4 w-4" />
                      <span>Update Profile</span>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Analytics Tab */}
          {activeTab === 'analytics' && (
            <div className="p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-6">Analytics & Insights</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-6 text-white">
                  <h4 className="text-lg font-semibold mb-2">Conversion Rate</h4>
                  <p className="text-3xl font-bold">28.2%</p>
                  <p className="text-blue-100 text-sm">+5.3% from last month</p>
                </div>
                
                <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-6 text-white">
                  <h4 className="text-lg font-semibold mb-2">Avg. Response Time</h4>
                  <p className="text-3xl font-bold">2.4h</p>
                  <p className="text-green-100 text-sm">-0.8h from last month</p>
                </div>
                
                <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl p-6 text-white">
                  <h4 className="text-lg font-semibold mb-2">Lead Quality Score</h4>
                  <p className="text-3xl font-bold">8.7/10</p>
                  <p className="text-purple-100 text-sm">+0.3 from last month</p>
                </div>
              </div>

              <div className="mt-8 bg-gray-50 rounded-xl p-6">
                <h4 className="text-lg font-semibold text-gray-800 mb-4">Lead Sources Breakdown</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Organic Search</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-32 bg-gray-200 rounded-full h-2">
                        <div className="bg-green-500 h-2 rounded-full" style={{ width: '65%' }}></div>
                      </div>
                      <span className="text-sm font-medium">65%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Referrals</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-32 bg-gray-200 rounded-full h-2">
                        <div className="bg-blue-500 h-2 rounded-full" style={{ width: '25%' }}></div>
                      </div>
                      <span className="text-sm font-medium">25%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Paid Ads</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-32 bg-gray-200 rounded-full h-2">
                        <div className="bg-orange-500 h-2 rounded-full" style={{ width: '10%' }}></div>
                      </div>
                      <span className="text-sm font-medium">10%</span>
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