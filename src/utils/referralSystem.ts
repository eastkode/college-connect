// Referral System Logic
export interface ReferralConfig {
  rewardAmount: number;
  minimumQualifyingMarks: number;
  maxReferralsPerUser: number;
  rewardValidityDays: number;
  fraudDetectionEnabled: boolean;
}

export const defaultReferralConfig: ReferralConfig = {
  rewardAmount: 150,
  minimumQualifyingMarks: 50,
  maxReferralsPerUser: 50,
  rewardValidityDays: 365,
  fraudDetectionEnabled: true,
};

export const generateReferralCode = (userName: string): string => {
  const cleanName = userName.replace(/[^a-zA-Z]/g, '').toUpperCase();
  const randomSuffix = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `${cleanName.substring(0, 6)}${randomSuffix}`;
};

export const generateReferralLink = (referralCode: string, baseUrl: string): string => {
  return `${baseUrl}?ref=${referralCode}`;
};

export const validateReferral = (
  referrerEmail: string,
  refereeEmail: string,
  refereeData: any,
  config: ReferralConfig = defaultReferralConfig
): { isValid: boolean; reason?: string } => {
  // Check if referring themselves
  if (referrerEmail === refereeEmail) {
    return { isValid: false, reason: 'Cannot refer yourself' };
  }

  // Check minimum qualifying marks
  if (refereeData.marks < config.minimumQualifyingMarks) {
    return { isValid: false, reason: 'Referee does not meet minimum marks requirement' };
  }

  // Additional fraud detection checks would go here
  if (config.fraudDetectionEnabled) {
    // Check for suspicious patterns, IP addresses, device fingerprints, etc.
    // This would integrate with fraud detection services
  }

  return { isValid: true };
};

export const calculateReferralReward = (
  refereeData: any,
  config: ReferralConfig = defaultReferralConfig
): number => {
  let reward = config.rewardAmount;

  // Bonus for high-scoring referees
  if (refereeData.marks >= 90) {
    reward += 50; // Bonus for excellent students
  } else if (refereeData.marks >= 80) {
    reward += 25; // Bonus for good students
  }

  // Bonus for premium courses
  const premiumCourses = ['B.Tech Computer Science', 'MBBS', 'B.Tech Electronics'];
  if (refereeData.interestedCourses?.some((course: string) => premiumCourses.includes(course))) {
    reward += 25;
  }

  return reward;
};

export const getReferralStats = (referrals: any[]): {
  totalReferrals: number;
  successfulReferrals: number;
  pendingReferrals: number;
  totalEarnings: number;
  conversionRate: number;
} => {
  const totalReferrals = referrals.length;
  const successfulReferrals = referrals.filter(r => r.status === 'rewarded').length;
  const pendingReferrals = referrals.filter(r => r.status === 'pending').length;
  const totalEarnings = referrals
    .filter(r => r.status === 'rewarded')
    .reduce((sum, r) => sum + r.rewardAmount, 0);
  const conversionRate = totalReferrals > 0 ? (successfulReferrals / totalReferrals) * 100 : 0;

  return {
    totalReferrals,
    successfulReferrals,
    pendingReferrals,
    totalEarnings,
    conversionRate,
  };
};

export const getTopReferrers = (referrals: any[], limit: number = 10): any[] => {
  const referrerStats = referrals.reduce((acc, referral) => {
    const email = referral.referrerEmail;
    if (!acc[email]) {
      acc[email] = {
        email,
        name: referral.referrerName,
        totalReferrals: 0,
        successfulReferrals: 0,
        totalEarnings: 0,
      };
    }
    
    acc[email].totalReferrals++;
    if (referral.status === 'rewarded') {
      acc[email].successfulReferrals++;
      acc[email].totalEarnings += referral.rewardAmount;
    }
    
    return acc;
  }, {} as Record<string, any>);

  return Object.values(referrerStats)
    .sort((a: any, b: any) => b.totalEarnings - a.totalEarnings)
    .slice(0, limit);
};