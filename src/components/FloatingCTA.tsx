import React from 'react';
import { Gift, Share2 } from 'lucide-react';

export const FloatingCTA: React.FC = () => {
  const [isVisible, setIsVisible] = React.useState(false);

  React.useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-bounce-gentle">
      <button className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white px-6 py-3 rounded-full shadow-lg flex items-center space-x-2 transition-all duration-300 transform hover:scale-105">
        <Gift className="h-5 w-5" />
        <span className="font-medium hidden sm:inline">Refer & Earn ₹150!</span>
      </button>
    </div>
  );
};