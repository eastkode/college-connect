import React from 'react';
import { Link } from 'react-router-dom';
import { 
  GraduationCap, 
  Gift, 
  ShoppingBag, 
  Share2, 
  Copy, 
  CheckCircle,
  ExternalLink,
  Star
} from 'lucide-react';
import { useApp } from '../contexts/AppContext';

export const Class10Results: React.FC = () => {
  const { studentData, offers } = useApp();
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

  const eligibleOffers = offers.filter(
    offer => 
      (offer.eligibleClass === '10th' || offer.eligibleClass === 'both') && 
      studentData.marks >= offer.minMarks
  );

  const coachingOffers = eligibleOffers.filter(offer => offer.category === 'coaching');
  const freebies = eligibleOffers.filter(offer => offer.category === 'freebie');
  const shopOffers = eligibleOffers.filter(offer => offer.category === 'shop');

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
          <div className="mx-auto w-20 h-20 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center mb-6">
            <CheckCircle className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            🎉 Congratulations, {studentData.fullName}!
          </h1>
          <p className="text-xl text-gray-600 mb-2">
            Based on your {studentData.marks}% in Class 10th, here's what you've unlocked:
          </p>
          <div className="inline-flex items-center bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-6 py-2 rounded-full font-semibold">
            <Star className="h-5 w-5 mr-2" />
            {eligibleOffers.length} Exclusive Offers Available!
          </div>
        </div>

        {/* Coaching Institutes */}
        {coachingOffers.length > 0 && (
          <section className="mb-12 animate-slide-up">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <GraduationCap className="h-6 w-6 mr-2 text-light-blue" />
              Top Coaching Institutes
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {coachingOffers.map((offer) => (
                <div
                  key={offer.id}
                  className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 border-l-4 border-light-blue"
                >
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-semibold text-gray-800">{offer.title}</h3>
                    <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                      {offer.discount}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-6">{offer.description}</p>
                  <button className="w-full bg-gradient-to-r from-light-blue to-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:from-blue-600 hover:to-blue-700 transition-all duration-200 flex items-center justify-center space-x-2">
                    <span>Claim Offer</span>
                    <ExternalLink className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Free Goodies */}
        {freebies.length > 0 && (
          <section className="mb-12 animate-slide-up">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <Gift className="h-6 w-6 mr-2 text-green-500" />
              Free Goodies Just for You!
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {freebies.map((offer) => (
                <div
                  key={offer.id}
                  className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 border-l-4 border-green-500"
                >
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-semibold text-gray-800">{offer.title}</h3>
                    <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                      {offer.discount}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-6">{offer.description}</p>
                  <button className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-3 px-4 rounded-lg font-semibold hover:from-green-600 hover:to-green-700 transition-all duration-200">
                    Claim Free Item
                  </button>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Local Shop Offers */}
        {shopOffers.length > 0 && (
          <section className="mb-12 animate-slide-up">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <ShoppingBag className="h-6 w-6 mr-2 text-purple-500" />
              Local Shop Offers in {studentData.city}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {shopOffers.map((offer) => (
                <div
                  key={offer.id}
                  className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 border-l-4 border-purple-500"
                >
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-semibold text-gray-800">{offer.title}</h3>
                    <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">
                      {offer.discount}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-6">{offer.description}</p>
                  <button className="w-full bg-gradient-to-r from-purple-500 to-purple-600 text-white py-3 px-4 rounded-lg font-semibold hover:from-purple-600 hover:to-purple-700 transition-all duration-200">
                    Get Discount
                  </button>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Referral Widget */}
        <section className="animate-slide-up">
          <div className="bg-gradient-to-r from-orange-500 to-pink-500 rounded-2xl p-8 text-white text-center">
            <h2 className="text-3xl font-bold mb-4">
              🎁 Refer Friends & Earn ₹150 Gift Card!
            </h2>
            <p className="text-xl mb-6 opacity-90">
              Share ScholarConnect with your friends and earn rewards for each successful referral
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
                <span>Share on WhatsApp</span>
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
            What's Next?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="mx-auto w-12 h-12 bg-light-blue rounded-full flex items-center justify-center mb-4">
                <span className="text-white font-bold">1</span>
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Claim Your Offers</h3>
              <p className="text-gray-600 text-sm">Click on the offers above to claim them before they expire</p>
            </div>
            <div className="text-center">
              <div className="mx-auto w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mb-4">
                <span className="text-white font-bold">2</span>
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Share & Earn</h3>
              <p className="text-gray-600 text-sm">Use your referral link to earn ₹150 for each friend who joins</p>
            </div>
            <div className="text-center">
              <div className="mx-auto w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center mb-4">
                <span className="text-white font-bold">3</span>
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Plan for 12th</h3>
              <p className="text-gray-600 text-sm">Start preparing for Class 12th to unlock even more opportunities</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};