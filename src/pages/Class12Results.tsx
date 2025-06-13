import React from 'react';
import { Link } from 'react-router-dom';
import { 
  GraduationCap, 
  Award, 
  TrendingUp, 
  Share2, 
  Copy, 
  CheckCircle,
  ExternalLink,
  Star,
  MapPin,
  DollarSign,
  Users
} from 'lucide-react';
import { useApp } from '../contexts/AppContext';

export const Class12Results: React.FC = () => {
  const { studentData, colleges } = useApp();
  const [copiedLink, setCopiedLink] = React.useState(false);

  if (!studentData) {
    return (
      <div className="min-h-screen bg-light-gray flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">No data found</h2>
          <Link to="/" className="text-light-blue hover:underline">
            Go back to home
          </Link>
        </div>
      </div>
    );
  }

  // Filter colleges based on marks (simplified logic)
  const eligibleColleges = colleges.filter(college => {
    if (studentData.marks >= 90) return true;
    if (studentData.marks >= 80) return college.fees <= 150000;
    if (studentData.marks >= 70) return college.fees <= 100000;
    return college.fees <= 80000;
  });

  const careerOutcomes = [
    {
      role: 'Software Engineer',
      avgSalary: '₹6-12 LPA',
      companies: ['TCS', 'Infosys', 'Wipro', 'Accenture'],
      growth: '25% annually'
    },
    {
      role: 'Business Analyst',
      avgSalary: '₹4-8 LPA',
      companies: ['Deloitte', 'EY', 'KPMG', 'PwC'],
      growth: '20% annually'
    },
    {
      role: 'Digital Marketing',
      avgSalary: '₹3-7 LPA',
      companies: ['Google', 'Facebook', 'Amazon', 'Flipkart'],
      growth: '30% annually'
    }
  ];

  const handleCopyReferralLink = () => {
    const referralLink = `${window.location.origin}?ref=${studentData.fullName.replace(' ', '').toLowerCase()}`;
    navigator.clipboard.writeText(referralLink);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="min-h-screen bg-light-gray py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="mx-auto w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mb-6">
            <Award className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            🎓 Amazing, {studentData.fullName}!
          </h1>
          <p className="text-xl text-gray-600 mb-2">
            Your {studentData.marks}% in Class 12th opens doors to incredible scholarships!
          </p>
          <div className="inline-flex items-center bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 rounded-full font-semibold">
            <Star className="h-5 w-5 mr-2" />
            {eligibleColleges.length} Scholarship Matches Found!
          </div>
        </div>

        {/* Scholarship Cards */}
        <section className="mb-12 animate-slide-up">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
            <Award className="h-6 w-6 mr-2 text-purple-500" />
            Your Scholarship Matches
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {eligibleColleges.map((college) => (
              <div
                key={college.id}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 border-l-4 border-purple-500"
              >
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-semibold text-gray-800">{college.name}</h3>
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                      ₹{college.scholarshipAmount.toLocaleString()} Scholarship
                    </span>
                  </div>
                  
                  <p className="text-light-blue font-medium mb-2">{college.course}</p>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <MapPin className="h-4 w-4 mr-2" />
                      {college.city}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <DollarSign className="h-4 w-4 mr-2" />
                      Annual Fees: ₹{college.fees.toLocaleString()}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <TrendingUp className="h-4 w-4 mr-2" />
                      Placement: {college.placement}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Users className="h-4 w-4 mr-2" />
                      Avg Salary: {college.avgSalary}
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-sm text-gray-600">After Scholarship:</span>
                      <span className="font-bold text-green-600">
                        ₹{(college.fees - college.scholarshipAmount).toLocaleString()}
                      </span>
                    </div>
                    <button className="w-full bg-gradient-to-r from-purple-500 to-purple-600 text-white py-3 px-4 rounded-lg font-semibold hover:from-purple-600 hover:to-purple-700 transition-all duration-200 flex items-center justify-center space-x-2">
                      <span>Apply Now</span>
                      <ExternalLink className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Career Outcomes */}
        <section className="mb-12 animate-slide-up">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
            <TrendingUp className="h-6 w-6 mr-2 text-green-500" />
            Career Outcomes & Job Prospects
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {careerOutcomes.map((career, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
              >
                <h3 className="text-xl font-semibold text-gray-800 mb-3">{career.role}</h3>
                
                <div className="space-y-3 mb-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Avg Salary:</span>
                    <span className="font-semibold text-green-600">{career.avgSalary}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Growth:</span>
                    <span className="font-semibold text-blue-600">{career.growth}</span>
                  </div>
                </div>

                <div className="border-t pt-3">
                  <p className="text-sm text-gray-600 mb-2">Top Recruiters:</p>
                  <div className="flex flex-wrap gap-1">
                    {career.companies.map((company, idx) => (
                      <span
                        key={idx}
                        className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs"
                      >
                        {company}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Referral Widget */}
        <section className="animate-slide-up">
          <div className="bg-gradient-to-r from-orange-500 to-pink-500 rounded-2xl p-8 text-white text-center">
            <h2 className="text-3xl font-bold mb-4">
              🎁 Share Success & Earn ₹150 Gift Card!
            </h2>
            <p className="text-xl mb-6 opacity-90">
              Help your friends discover their scholarship opportunities and earn rewards
            </p>
            
            <div className="bg-white bg-opacity-20 rounded-lg p-4 mb-6 max-w-md mx-auto">
              <p className="text-sm mb-2">Your Referral Link:</p>
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value={`scholarconnect.com?ref=${studentData.fullName.replace(' ', '').toLowerCase()}`}
                  readOnly
                  className="flex-1 bg-white bg-opacity-20 border border-white border-opacity-30 rounded px-3 py-2 text-sm"
                />
                <button
                  onClick={handleCopyReferralLink}
                  className="bg-white text-orange-500 p-2 rounded hover:bg-gray-100 transition-colors duration-200"
                >
                  {copiedLink ? <CheckCircle className="h-5 w-5" /> : <Copy className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-orange-500 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200 flex items-center justify-center space-x-2">
                <Share2 className="h-5 w-5" />
                <span>Share Success Story</span>
              </button>
              <Link
                to="/dashboard/student"
                className="border border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-orange-500 transition-colors duration-200 flex items-center justify-center space-x-2"
              >
                <span>View Dashboard</span>
              </Link>
            </div>
          </div>
        </section>

        {/* Next Steps */}
        <section className="mt-12 bg-white rounded-2xl p-8 shadow-lg animate-slide-up">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Your Journey Ahead
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="mx-auto w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center mb-4">
                <span className="text-white font-bold">1</span>
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Apply for Scholarships</h3>
              <p className="text-gray-600 text-sm">Submit applications to your matched colleges</p>
            </div>
            <div className="text-center">
              <div className="mx-auto w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mb-4">
                <span className="text-white font-bold">2</span>
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Prepare for Interviews</h3>
              <p className="text-gray-600 text-sm">Get ready for college admission interviews</p>
            </div>
            <div className="text-center">
              <div className="mx-auto w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mb-4">
                <span className="text-white font-bold">3</span>
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Share & Earn</h3>
              <p className="text-gray-600 text-sm">Use referral link to help friends and earn rewards</p>
            </div>
            <div className="text-center">
              <div className="mx-auto w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center mb-4">
                <span className="text-white font-bold">4</span>
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Start Your Career</h3>
              <p className="text-gray-600 text-sm">Begin your journey towards a successful future</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};