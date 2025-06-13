import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  MapPin, 
  DollarSign, 
  TrendingUp, 
  Award,
  Users,
  BookOpen,
  Star,
  ExternalLink
} from 'lucide-react';
import { useApp } from '../contexts/AppContext';

export const CourseComparison: React.FC = () => {
  const { colleges } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStream, setSelectedStream] = useState('all');
  const [selectedCity, setSelectedCity] = useState('all');
  const [selectedColleges, setSelectedColleges] = useState<string[]>([]);

  const streams = ['all', 'Engineering', 'Commerce', 'Arts', 'Science', 'Management'];
  const cities = ['all', ...Array.from(new Set(colleges.map(c => c.city)))];

  const filteredColleges = colleges.filter(college => {
    const matchesSearch = college.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         college.course.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStream = selectedStream === 'all' || college.course.includes(selectedStream);
    const matchesCity = selectedCity === 'all' || college.city === selectedCity;
    
    return matchesSearch && matchesStream && matchesCity;
  });

  const toggleCollegeSelection = (collegeId: string) => {
    setSelectedColleges(prev => 
      prev.includes(collegeId) 
        ? prev.filter(id => id !== collegeId)
        : prev.length < 3 ? [...prev, collegeId] : prev
    );
  };

  const selectedCollegeData = colleges.filter(c => selectedColleges.includes(c.id));

  return (
    <div className="min-h-screen bg-light-gray py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Compare Courses & Colleges
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Find the perfect college and course combination that matches your goals, 
            budget, and career aspirations.
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search colleges or courses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-light-blue focus:border-transparent"
              />
            </div>

            {/* Stream Filter */}
            <div className="relative">
              <BookOpen className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <select
                value={selectedStream}
                onChange={(e) => setSelectedStream(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-light-blue focus:border-transparent bg-white appearance-none"
              >
                {streams.map(stream => (
                  <option key={stream} value={stream}>
                    {stream === 'all' ? 'All Streams' : stream}
                  </option>
                ))}
              </select>
            </div>

            {/* City Filter */}
            <div className="relative">
              <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-light-blue focus:border-transparent bg-white appearance-none"
              >
                {cities.map(city => (
                  <option key={city} value={city}>
                    {city === 'all' ? 'All Cities' : city}
                  </option>
                ))}
              </select>
            </div>

            {/* Compare Button */}
            <button 
              className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center space-x-2 ${
                selectedColleges.length >= 2
                  ? 'bg-gradient-to-r from-light-blue to-blue-600 text-white hover:from-blue-600 hover:to-blue-700'
                  : 'bg-gray-200 text-gray-500 cursor-not-allowed'
              }`}
              disabled={selectedColleges.length < 2}
            >
              <Filter className="h-5 w-5" />
              <span>Compare ({selectedColleges.length})</span>
            </button>
          </div>
        </div>

        {/* Comparison View */}
        {selectedColleges.length >= 2 && (
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">College Comparison</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-semibold text-gray-800">Feature</th>
                    {selectedCollegeData.map(college => (
                      <th key={college.id} className="text-center py-3 px-4 font-semibold text-gray-800 min-w-48">
                        {college.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-100">
                    <td className="py-3 px-4 font-medium text-gray-700">Course</td>
                    {selectedCollegeData.map(college => (
                      <td key={college.id} className="py-3 px-4 text-center text-light-blue font-medium">
                        {college.course}
                      </td>
                    ))}
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-3 px-4 font-medium text-gray-700">Annual Fees</td>
                    {selectedCollegeData.map(college => (
                      <td key={college.id} className="py-3 px-4 text-center">
                        ₹{college.fees.toLocaleString()}
                      </td>
                    ))}
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-3 px-4 font-medium text-gray-700">Scholarship Available</td>
                    {selectedCollegeData.map(college => (
                      <td key={college.id} className="py-3 px-4 text-center text-green-600 font-medium">
                        ₹{college.scholarshipAmount.toLocaleString()}
                      </td>
                    ))}
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-3 px-4 font-medium text-gray-700">Placement Rate</td>
                    {selectedCollegeData.map(college => (
                      <td key={college.id} className="py-3 px-4 text-center">
                        {college.placement}
                      </td>
                    ))}
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-3 px-4 font-medium text-gray-700">Average Salary</td>
                    {selectedCollegeData.map(college => (
                      <td key={college.id} className="py-3 px-4 text-center font-medium">
                        {college.avgSalary}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-medium text-gray-700">Location</td>
                    {selectedCollegeData.map(college => (
                      <td key={college.id} className="py-3 px-4 text-center">
                        {college.city}
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* College Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredColleges.map((college) => (
            <div
              key={college.id}
              className={`bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer ${
                selectedColleges.includes(college.id) 
                  ? 'ring-2 ring-light-blue border-light-blue' 
                  : 'border border-gray-100'
              }`}
              onClick={() => toggleCollegeSelection(college.id)}
            >
              <div className="p-6">
                {/* Header */}
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-semibold text-gray-800">{college.name}</h3>
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="text-sm text-gray-600">4.2</span>
                  </div>
                </div>

                {/* Course */}
                <p className="text-light-blue font-medium mb-4">{college.course}</p>

                {/* Details */}
                <div className="space-y-3 mb-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm text-gray-600">
                      <MapPin className="h-4 w-4 mr-2" />
                      {college.city}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <DollarSign className="h-4 w-4 mr-2" />
                      ₹{college.fees.toLocaleString()}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm text-gray-600">
                      <TrendingUp className="h-4 w-4 mr-2" />
                      {college.placement} Placement
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Users className="h-4 w-4 mr-2" />
                      {college.avgSalary}
                    </div>
                  </div>
                </div>

                {/* Scholarship Badge */}
                <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Award className="h-5 w-5 text-green-500 mr-2" />
                      <span className="text-sm font-medium text-green-800">Scholarship Available</span>
                    </div>
                    <span className="text-lg font-bold text-green-600">
                      ₹{college.scholarshipAmount.toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-2">
                  <button 
                    className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all duration-200 ${
                      selectedColleges.includes(college.id)
                        ? 'bg-light-blue text-white'
                        : 'border border-light-blue text-light-blue hover:bg-light-blue hover:text-white'
                    }`}
                  >
                    {selectedColleges.includes(college.id) ? 'Selected' : 'Compare'}
                  </button>
                  <button className="bg-gradient-to-r from-light-blue to-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:from-blue-600 hover:to-blue-700 transition-all duration-200 flex items-center space-x-1">
                    <span>Apply</span>
                    <ExternalLink className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredColleges.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No colleges found</h3>
            <p className="text-gray-500">Try adjusting your search criteria</p>
          </div>
        )}

        {/* Help Section */}
        <div className="mt-12 bg-gradient-to-r from-light-blue to-blue-600 rounded-2xl p-8 text-white text-center">
          <h2 className="text-2xl font-bold mb-4">Need Help Choosing?</h2>
          <p className="text-lg mb-6 opacity-90">
            Our education counselors are here to help you make the right decision
          </p>
          <button className="bg-white text-light-blue px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200">
            Get Free Counseling
          </button>
        </div>
      </div>
    </div>
  );
};