// Lead Scoring Algorithm
export interface LeadScoringFactors {
  marks: number;
  class: '10th' | '12th';
  city: string;
  source: 'organic' | 'referral' | 'paid' | 'social';
  interestedCourses?: string[];
  parentIncome?: number;
  previousInteractions?: number;
}

export const calculateLeadScore = (factors: LeadScoringFactors): number => {
  let score = 0;

  // Marks scoring (40% weightage)
  if (factors.marks >= 90) score += 40;
  else if (factors.marks >= 80) score += 35;
  else if (factors.marks >= 70) score += 30;
  else if (factors.marks >= 60) score += 25;
  else score += 20;

  // Class scoring (20% weightage)
  if (factors.class === '12th') score += 20;
  else score += 15;

  // Source scoring (15% weightage)
  switch (factors.source) {
    case 'referral': score += 15; break;
    case 'organic': score += 12; break;
    case 'paid': score += 10; break;
    case 'social': score += 8; break;
  }

  // City tier scoring (10% weightage)
  const tier1Cities = ['Delhi', 'Mumbai', 'Bangalore', 'Chennai', 'Hyderabad', 'Pune'];
  const tier2Cities = ['Ahmedabad', 'Kolkata', 'Surat', 'Jaipur', 'Lucknow', 'Kanpur'];
  
  if (tier1Cities.includes(factors.city)) score += 10;
  else if (tier2Cities.includes(factors.city)) score += 8;
  else score += 6;

  // Course interest scoring (10% weightage)
  if (factors.interestedCourses && factors.interestedCourses.length > 0) {
    const highDemandCourses = ['B.Tech Computer Science', 'B.Tech Electronics', 'MBBS', 'BDS'];
    const hasHighDemandCourse = factors.interestedCourses.some(course => 
      highDemandCourses.includes(course)
    );
    score += hasHighDemandCourse ? 10 : 7;
  }

  // Previous interactions bonus (5% weightage)
  if (factors.previousInteractions && factors.previousInteractions > 0) {
    score += Math.min(factors.previousInteractions * 2, 5);
  }

  return Math.min(score, 100); // Cap at 100
};

export const getLeadPriority = (score: number): 'high' | 'medium' | 'low' => {
  if (score >= 80) return 'high';
  if (score >= 60) return 'medium';
  return 'low';
};

export const getRecommendedActions = (score: number, factors: LeadScoringFactors): string[] => {
  const actions: string[] = [];

  if (score >= 80) {
    actions.push('Immediate phone call within 2 hours');
    actions.push('Send premium college brochures');
    actions.push('Schedule campus visit');
  } else if (score >= 60) {
    actions.push('Call within 24 hours');
    actions.push('Send course information via email');
    actions.push('Follow up with WhatsApp message');
  } else {
    actions.push('Send automated email sequence');
    actions.push('Add to nurturing campaign');
    actions.push('Follow up after 3 days');
  }

  if (factors.marks >= 85) {
    actions.push('Offer scholarship information');
  }

  if (factors.source === 'referral') {
    actions.push('Mention referral source in communication');
  }

  return actions;
};