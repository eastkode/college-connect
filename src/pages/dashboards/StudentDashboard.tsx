import React from 'react';
import { 
  Award, 
  Gift, 
  Users, 
  TrendingUp, 
  Download, 
  Share2,
  ExternalLink,
  Copy,
  CheckCircle
} from 'lucide-react';
import { useApp } from '../../contexts/AppContext';

export const StudentDashboard: React.FC = () => {
  const { studentData } = useApp();
  const [copiedLink, setCopiedLink] = React.useState(false);

  const handleCopyReferralLink = () => {
    const referralLink = `${window.location.origin}?ref=${studentData?.fullName.replace(' ', '').toLowerCase()}`;
    navigator.clipboard.writeText(referralLink);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  // Mock data for dashboard
  const stats = {
    totalOffers: 12,
    claimedOffers: 7,
    referrals: 3,
    earnings: 450
  };

  const recentOffers = [
    { id: 1, title: 'Aakash Institute', discount: '30% OFF', status: 'claimed', type: 'coaching' },
    { id: 2, title: 'Free Bluetooth Earphones', discount: 'FREE', status: 'claimed', type: 'freebie' },
    { id: 3, title: 'Delhi University Scholarship', discount: '₹25,000', status: 'pending', type: 'scholarship' },
    { id: 4, title: 'Stationery World', discount: '₹500 OFF', status: 'available', type: 'shop' }
  ];

  const referralData = [
    { name: 'Rahul Kumar', status: 'joined', reward: '₹150', date: '2024-01-15' },
    { name: 'Priya Sharma', status: 'pending', reward: '₹150', date: '2024-01-12' },
    { name: 'Amit Singh', status: 'joined', reward: '₹150', date: '2024-01-10' }
  ];

  return (
    <div className="min-h-screen bg-light-gray py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Welcome back, {studentData?.fullName || 'Student'}! 👋
          </h1>
          <p className="text-gray-600">
            Track your offers, manage referrals, and unlock more opportunities
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Offers</p>
                <p className="text-3xl font-bold text-gray-800">{stats.totalOffers}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <Award className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Claimed Offers</p>
                <p className="text-3xl font-bold text-gray-800">{stats.claimedOffers}</p>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <Gift className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Referrals</p>
                <p className="text-3xl font-bold text-gray-800">{stats.referrals}</p>
              </div>
              <div className="p-3 bg-purple-100 rounded-full">
                <Users className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Earnings</p>
                <p className="text-3xl font-bold text-gray-800">₹{stats.earnings}</p>
              </div>
              <div className="p-3 bg-orange-100 rounded-full">
                <TrendingUp className="h-6 w-6 text-orange-600" />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Offers */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-800">Your Offers</h2>
                <button className="text-light-blue hover:text-blue-600 font-medium">
                  View All
                </button>
              </div>

              <div className="space-y-4">
                {recentOffers.map((offer) => (
                  <div key={offer.id} className="flex items-center justify-between p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                    <div className="flex items-center space-x-4">
                      <div className={`p-2 rounded-full ${
                        offer.type === 'coaching' ? 'bg-blue-100' :
                        offer.type === 'freebie' ? 'bg-green-100' :
                        offer.type === 'scholarship' ? 'bg-purple-100' : 'bg-orange-100'
                      }`}>
                        {offer.type === 'coaching' && <Award className="h-5 w-5 text-blue-600" />}
                        {offer.type === 'freebie' && <Gift className="h-5 w-5 text-green-600" />}
                        {offer.type === 'scholarship' && <TrendingUp className="h-5 w-5 text-purple-600" />}
                        {offer.type === 'shop' && <ExternalLink className="h-5 w-5 text-orange-600" />}
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">{offer.title}</p>
                        <p className="text-sm text-gray-600">{offer.discount}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        offer.status === 'claimed' ? 'bg-green-100 text-green-800' :
                        offer.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-blue-100 text-blue-800'
                      }`}>
                        {offer.status}
                      </span>
                      
                      {offer.status === 'available' && (
                        <button className="text-light-blue hover:text-blue-600 font-medium text-sm">
                          Claim
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Referral Widget */}
          <div className="space-y-6">
            {/* Referral Link */}
            <div className="bg-gradient-to-r from-orange-500 to-pink-500 rounded-xl p-6 text-white">
              <h3 className="text-lg font-bold mb-4">🎁 Earn ₹150 per Referral!</h3>
              
              <div className="bg-white bg-opacity-20 rounded-lg p-3 mb-4">
                <p className="text-sm mb-2 opacity-90">Your Referral Link:</p>
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={`scholarconnect.com?ref=${studentData?.fullName.replace(' ', '').toLowerCase()}`}
                    readOnly
                    className="flex-1 bg-transparent border border-white border-opacity-30 rounded px-2 py-1 text-xs"
                  />
                  <button
                    onClick={handleCopyReferralLink}
                    className="bg-white text-orange-500 p-1 rounded hover:bg-gray-100 transition-colors duration-200"
                  >
                    {copiedLink ? <CheckCircle className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <button className="w-full bg-white text-orange-500 py-2 px-4 rounded-lg font-medium hover:bg-gray-100 transition-colors duration-200 flex items-center justify-center space-x-2">
                <Share2 className="h-4 w-4" />
                <span>Share Now</span>
              </button>
            </div>

            {/* Referral History */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Referral History</h3>
              
              <div className="space-y-3">
                {referralData.map((referral, index) => (
                  <div key={index} className="flex items-center justify-between py-2">
                    <div>
                      <p className="text-sm font-medium text-gray-800">{referral.name}</p>
                      <p className="text-xs text-gray-600">{referral.date}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-green-600">{referral.reward}</p>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        referral.status === 'joined' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {referral.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Quick Actions</h3>
              
              <div className="space-y-3">
                <button className="w-full bg-light-blue text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-600 transition-colors duration-200 flex items-center justify-center space-x-2">
                  <Download className="h-4 w-4" />
                  <span>Download Offers PDF</span>
                </button>
                
                <button className="w-full border border-light-blue text-light-blue py-3 px-4 rounded-lg font-medium hover:bg-light-blue hover:text-white transition-colors duration-200">
                  Update Profile
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};