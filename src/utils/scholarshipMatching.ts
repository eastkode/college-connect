// Scholarship Matching Algorithm
export interface ScholarshipCriteria {
  minMarks: number;
  maxMarks?: number;
  eligibleClasses: ('10th' | '12th')[];
  eligibleCities?: string[];
  familyIncomeLimit?: number;
  category?: 'general' | 'obc' | 'sc' | 'st';
  gender?: 'male' | 'female' | 'other';
  courses?: string[];
  specialCriteria?: string[];
}

export interface Scholarship {
  id: string;
  name: string;
  provider: string;
  amount: number;
  criteria: ScholarshipCriteria;
  description: string;
  applicationDeadline: string;
  documentsRequired: string[];
  applicationProcess: string;
  isActive: boolean;
  totalSlots?: number;
  filledSlots?: number;
}

export const mockScholarships: Scholarship[] = [
  {
    id: 'sch_1',
    name: 'Merit Excellence Scholarship',
    provider: 'Delhi University',
    amount: 25000,
    criteria: {
      minMarks: 85,
      eligibleClasses: ['12th'],
      eligibleCities: ['Delhi', 'NCR'],
      courses: ['B.Com Honours', 'B.A. English', 'B.Sc. Mathematics']
    },
    description: 'Merit-based scholarship for outstanding students',
    applicationDeadline: '2024-07-15',
    documentsRequired: ['12th Marksheet', 'Income Certificate', 'Caste Certificate'],
    applicationProcess: 'Online application through university portal',
    isActive: true,
    totalSlots: 100,
    filledSlots: 45
  },
  {
    id: 'sch_2',
    name: 'Technical Excellence Award',
    provider: 'Mumbai University',
    amount: 50000,
    criteria: {
      minMarks: 80,
      eligibleClasses: ['12th'],
      courses: ['B.Tech Computer Science', 'B.Tech Electronics']
    },
    description: 'Scholarship for engineering aspirants',
    applicationDeadline: '2024-06-30',
    documentsRequired: ['JEE Scorecard', '12th Marksheet', 'Income Certificate'],
    applicationProcess: 'Apply through college admission portal',
    isActive: true,
    totalSlots: 50,
    filledSlots: 20
  },
  {
    id: 'sch_3',
    name: 'Need-based Support Scholarship',
    provider: 'Government of India',
    amount: 15000,
    criteria: {
      minMarks: 60,
      eligibleClasses: ['10th', '12th'],
      familyIncomeLimit: 500000,
      category: 'general'
    },
    description: 'Financial assistance for economically weaker sections',
    applicationDeadline: '2024-08-31',
    documentsRequired: ['Income Certificate', 'Marksheet', 'Bank Details'],
    applicationProcess: 'Apply through National Scholarship Portal',
    isActive: true
  },
  {
    id: 'sch_4',
    name: 'Women in STEM Scholarship',
    provider: 'Tech Foundation',
    amount: 30000,
    criteria: {
      minMarks: 75,
      eligibleClasses: ['12th'],
      gender: 'female',
      courses: ['B.Tech Computer Science', 'B.Tech Electronics', 'B.Sc. Physics']
    },
    description: 'Encouraging women participation in STEM fields',
    applicationDeadline: '2024-07-20',
    documentsRequired: ['12th Marksheet', 'Gender Certificate', 'Essay'],
    applicationProcess: 'Online application with essay submission',
    isActive: true,
    totalSlots: 25,
    filledSlots: 8
  }
];

export const matchScholarships = (
  studentData: any,
  scholarships: Scholarship[] = mockScholarships
): Scholarship[] => {
  return scholarships.filter(scholarship => {
    const criteria = scholarship.criteria;
    
    // Check if scholarship is active
    if (!scholarship.isActive) return false;
    
    // Check marks requirement
    if (studentData.marks < criteria.minMarks) return false;
    if (criteria.maxMarks && studentData.marks > criteria.maxMarks) return false;
    
    // Check class eligibility
    if (!criteria.eligibleClasses.includes(studentData.class)) return false;
    
    // Check city eligibility
    if (criteria.eligibleCities && !criteria.eligibleCities.includes(studentData.city)) return false;
    
    // Check family income (if provided)
    if (criteria.familyIncomeLimit && studentData.familyIncome > criteria.familyIncomeLimit) return false;
    
    // Check category (if provided)
    if (criteria.category && studentData.category !== criteria.category) return false;
    
    // Check gender (if provided)
    if (criteria.gender && studentData.gender !== criteria.gender) return false;
    
    // Check course interest
    if (criteria.courses && studentData.interestedCourses) {
      const hasMatchingCourse = criteria.courses.some(course => 
        studentData.interestedCourses.includes(course)
      );
      if (!hasMatchingCourse) return false;
    }
    
    // Check if slots are available
    if (scholarship.totalSlots && scholarship.filledSlots) {
      if (scholarship.filledSlots >= scholarship.totalSlots) return false;
    }
    
    return true;
  });
};

export const calculateScholarshipScore = (
  studentData: any,
  scholarship: Scholarship
): number => {
  let score = 0;
  
  // Base score from marks
  const marksPercentage = (studentData.marks - scholarship.criteria.minMarks) / 
                         (100 - scholarship.criteria.minMarks);
  score += marksPercentage * 40;
  
  // Bonus for exceeding minimum requirements
  if (studentData.marks > scholarship.criteria.minMarks + 10) score += 20;
  
  // Course match bonus
  if (scholarship.criteria.courses && studentData.interestedCourses) {
    const matchingCourses = scholarship.criteria.courses.filter(course => 
      studentData.interestedCourses.includes(course)
    );
    score += (matchingCourses.length / scholarship.criteria.courses.length) * 20;
  }
  
  // Location preference bonus
  if (scholarship.criteria.eligibleCities?.includes(studentData.city)) {
    score += 10;
  }
  
  // Availability bonus (fewer applicants = higher chance)
  if (scholarship.totalSlots && scholarship.filledSlots) {
    const availabilityRatio = (scholarship.totalSlots - scholarship.filledSlots) / scholarship.totalSlots;
    score += availabilityRatio * 10;
  }
  
  return Math.min(score, 100);
};

export const getScholarshipRecommendations = (
  studentData: any,
  limit: number = 5
): { scholarship: Scholarship; score: number; likelihood: string }[] => {
  const matchedScholarships = matchScholarships(studentData);
  
  const recommendations = matchedScholarships.map(scholarship => {
    const score = calculateScholarshipScore(studentData, scholarship);
    let likelihood = 'Low';
    
    if (score >= 80) likelihood = 'High';
    else if (score >= 60) likelihood = 'Medium';
    
    return { scholarship, score, likelihood };
  });
  
  return recommendations
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
};

export const getApplicationTimeline = (scholarship: Scholarship): {
  daysLeft: number;
  urgency: 'high' | 'medium' | 'low';
  status: string;
} => {
  const deadline = new Date(scholarship.applicationDeadline);
  const today = new Date();
  const daysLeft = Math.ceil((deadline.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  
  let urgency: 'high' | 'medium' | 'low' = 'low';
  let status = '';
  
  if (daysLeft < 0) {
    status = 'Deadline passed';
    urgency = 'high';
  } else if (daysLeft <= 7) {
    status = 'Apply immediately';
    urgency = 'high';
  } else if (daysLeft <= 30) {
    status = 'Apply soon';
    urgency = 'medium';
  } else {
    status = 'Plan your application';
    urgency = 'low';
  }
  
  return { daysLeft, urgency, status };
};