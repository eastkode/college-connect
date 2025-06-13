import { 
  Offer, 
  College, 
  Lead, 
  Referral, 
  Vendor, 
  BlogPost, 
  User, 
  Analytics,
  EmailTemplate,
  WhatsAppTemplate,
  SystemSettings
} from '../types';

// Enhanced Mock Offers
export const mockOffers: Offer[] = [
  {
    id: '1',
    title: 'Aakash Institute',
    description: 'JEE/NEET Coaching with Expert Faculty - 2 Year Program',
    discount: '30% OFF',
    category: 'coaching',
    eligibleClass: '12th',
    minMarks: 75,
    maxMarks: 100,
    city: 'Delhi',
    vendorId: 'vendor_1',
    validUntil: '2024-12-31',
    termsAndConditions: 'Valid for new admissions only. Cannot be combined with other offers.'
  },
  {
    id: '2',
    title: 'Allen Career Institute',
    description: 'Top Ranked Coaching for Medical & Engineering Entrance',
    discount: '25% OFF',
    category: 'coaching',
    eligibleClass: '12th',
    minMarks: 80,
    maxMarks: 100,
    city: 'Kota',
    vendorId: 'vendor_2',
    validUntil: '2024-11-30'
  },
  {
    id: '3',
    title: 'Free Bluetooth Earphones',
    description: 'Premium quality wireless earphones with noise cancellation',
    discount: 'FREE',
    category: 'freebie',
    eligibleClass: 'both',
    minMarks: 60,
    vendorId: 'vendor_3'
  },
  {
    id: '4',
    title: 'Stationery World',
    description: '₹500 off on school bags, notebooks and study materials',
    discount: '₹500 OFF',
    category: 'shop',
    eligibleClass: '10th',
    minMarks: 70,
    city: 'Mumbai',
    vendorId: 'vendor_4'
  },
  {
    id: '5',
    title: 'Unacademy Plus',
    description: 'Complete JEE/NEET preparation with live classes',
    discount: '40% OFF',
    category: 'coaching',
    eligibleClass: '12th',
    minMarks: 70,
    vendorId: 'vendor_5'
  },
  {
    id: '6',
    title: 'Free Study Planner',
    description: 'Personalized study planner and time table',
    discount: 'FREE',
    category: 'freebie',
    eligibleClass: 'both',
    minMarks: 50,
    vendorId: 'vendor_6'
  }
];

// Enhanced Mock Colleges
export const mockColleges: College[] = [
  {
    id: '1',
    name: 'Delhi University',
    course: 'B.Com Honours',
    fees: 50000,
    scholarshipAmount: 15000,
    placement: '85%',
    avgSalary: '₹4.5 LPA',
    city: 'Delhi',
    description: 'Premier university with excellent academic reputation',
    accreditation: 'NAAC A++',
    establishedYear: 1922,
    website: 'https://du.ac.in',
    contactEmail: 'admissions@du.ac.in',
    contactPhone: '+91-11-27667011',
    courseDuration: '3 Years',
    eligibilityCriteria: 'Minimum 75% in 12th',
    applicationDeadline: '2024-07-15',
    isActive: true
  },
  {
    id: '2',
    name: 'Mumbai University',
    course: 'B.Tech Computer Science',
    fees: 200000,
    scholarshipAmount: 50000,
    placement: '92%',
    avgSalary: '₹7.2 LPA',
    city: 'Mumbai',
    description: 'Leading technical university with industry partnerships',
    accreditation: 'NAAC A+',
    establishedYear: 1857,
    courseDuration: '4 Years',
    eligibilityCriteria: 'JEE Main qualified with 80%+ in 12th',
    isActive: true
  },
  {
    id: '3',
    name: 'Bangalore University',
    course: 'BBA',
    fees: 80000,
    scholarshipAmount: 20000,
    placement: '78%',
    avgSalary: '₹3.8 LPA',
    city: 'Bangalore',
    description: 'Business-focused education with practical approach',
    accreditation: 'NAAC A',
    establishedYear: 1964,
    courseDuration: '3 Years',
    eligibilityCriteria: 'Minimum 60% in 12th',
    isActive: true
  },
  {
    id: '4',
    name: 'Chennai Institute of Technology',
    course: 'B.Tech Mechanical Engineering',
    fees: 150000,
    scholarshipAmount: 30000,
    placement: '88%',
    avgSalary: '₹5.5 LPA',
    city: 'Chennai',
    description: 'Engineering excellence with modern infrastructure',
    accreditation: 'NAAC A',
    establishedYear: 1990,
    courseDuration: '4 Years',
    eligibilityCriteria: 'JEE Main qualified',
    isActive: true
  },
  {
    id: '5',
    name: 'Pune College of Arts',
    course: 'BA Psychology',
    fees: 45000,
    scholarshipAmount: 12000,
    placement: '70%',
    avgSalary: '₹3.2 LPA',
    city: 'Pune',
    description: 'Liberal arts education with research focus',
    accreditation: 'NAAC B++',
    establishedYear: 1975,
    courseDuration: '3 Years',
    eligibilityCriteria: 'Minimum 55% in 12th',
    isActive: true
  }
];

// Enhanced Mock Leads
export const mockLeads: Lead[] = [
  {
    id: '1',
    studentData: {
      fullName: 'Priya Sharma',
      phone: '+91-9876543210',
      email: 'priya.sharma@email.com',
      city: 'Delhi',
      class: '12th',
      marks: 87
    },
    source: 'organic',
    status: 'new',
    createdAt: '2024-01-15T10:30:00Z',
    leadScore: 85,
    interestedCourses: ['B.Tech Computer Science', 'B.Com Honours']
  },
  {
    id: '2',
    studentData: {
      fullName: 'Rahul Kumar',
      phone: '+91-9876543211',
      email: 'rahul.kumar@email.com',
      city: 'Mumbai',
      class: '12th',
      marks: 92
    },
    source: 'referral',
    status: 'contacted',
    assignedCollege: '2',
    createdAt: '2024-01-14T14:20:00Z',
    lastContactedAt: '2024-01-15T09:00:00Z',
    leadScore: 95,
    notes: 'Very interested in engineering programs'
  },
  {
    id: '3',
    studentData: {
      fullName: 'Sneha Patel',
      phone: '+91-9876543212',
      email: 'sneha.patel@email.com',
      city: 'Bangalore',
      class: '12th',
      marks: 78
    },
    source: 'paid',
    status: 'interested',
    assignedCollege: '3',
    createdAt: '2024-01-13T16:45:00Z',
    leadScore: 75,
    interestedCourses: ['BBA', 'B.Com']
  },
  {
    id: '4',
    studentData: {
      fullName: 'Amit Singh',
      phone: '+91-9876543213',
      email: 'amit.singh@email.com',
      city: 'Chennai',
      class: '12th',
      marks: 85
    },
    source: 'social',
    status: 'admitted',
    assignedCollege: '4',
    createdAt: '2024-01-12T11:15:00Z',
    leadScore: 90
  },
  {
    id: '5',
    studentData: {
      fullName: 'Kavya Reddy',
      phone: '+91-9876543214',
      email: 'kavya.reddy@email.com',
      city: 'Hyderabad',
      class: '10th',
      marks: 82
    },
    source: 'organic',
    status: 'new',
    createdAt: '2024-01-16T08:30:00Z',
    leadScore: 80
  }
];

// Mock Referrals
export const mockReferrals: Referral[] = [
  {
    id: '1',
    referrerName: 'Priya Sharma',
    referrerEmail: 'priya.sharma@email.com',
    refereeName: 'Rahul Kumar',
    refereeEmail: 'rahul.kumar@email.com',
    status: 'rewarded',
    rewardAmount: 150,
    date: '2024-01-15',
    referralCode: 'PRIYA2024'
  },
  {
    id: '2',
    referrerName: 'Rahul Kumar',
    referrerEmail: 'rahul.kumar@email.com',
    refereeName: 'Sneha Patel',
    refereeEmail: 'sneha.patel@email.com',
    status: 'joined',
    rewardAmount: 150,
    date: '2024-01-14',
    referralCode: 'RAHUL2024'
  },
  {
    id: '3',
    referrerName: 'Sneha Patel',
    referrerEmail: 'sneha.patel@email.com',
    refereeName: 'Amit Singh',
    refereeEmail: 'amit.singh@email.com',
    status: 'pending',
    rewardAmount: 150,
    date: '2024-01-13',
    referralCode: 'SNEHA2024'
  }
];

// Mock Vendors
export const mockVendors: Vendor[] = [
  {
    id: 'vendor_1',
    businessName: 'Aakash Educational Services',
    category: 'coaching',
    city: 'Delhi',
    contactEmail: 'partnerships@aakash.ac.in',
    contactPhone: '+91-11-47623456',
    description: 'Leading coaching institute for medical and engineering entrance exams',
    website: 'https://aakash.ac.in',
    isActive: true,
    offers: [mockOffers[0]],
    createdAt: '2023-06-15T10:00:00Z'
  },
  {
    id: 'vendor_2',
    businessName: 'Allen Career Institute',
    category: 'coaching',
    city: 'Kota',
    contactEmail: 'info@allen.ac.in',
    contactPhone: '+91-744-2757575',
    description: 'Premier coaching institute with highest success rate',
    website: 'https://allen.ac.in',
    isActive: true,
    offers: [mockOffers[1]],
    createdAt: '2023-07-20T12:00:00Z'
  },
  {
    id: 'vendor_3',
    businessName: 'TechGadgets India',
    category: 'freebie',
    city: 'Bangalore',
    contactEmail: 'support@techgadgets.in',
    contactPhone: '+91-80-12345678',
    description: 'Electronics and gadgets for students',
    isActive: true,
    offers: [mockOffers[2]],
    createdAt: '2023-08-10T14:30:00Z'
  }
];

// Mock Blog Posts
export const mockBlogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Top 10 Engineering Colleges in India 2024',
    slug: 'top-10-engineering-colleges-india-2024',
    content: 'Detailed analysis of the best engineering colleges...',
    excerpt: 'Discover the top engineering colleges in India with placement records, fees, and admission criteria.',
    author: 'Dr. Rajesh Kumar',
    category: 'Education',
    tags: ['engineering', 'colleges', 'admissions', '2024'],
    metaTitle: 'Best Engineering Colleges in India 2024 | Complete Guide',
    metaDescription: 'Find the top engineering colleges in India with detailed information about placements, fees, and admission process.',
    publishedAt: '2024-01-10T10:00:00Z',
    isPublished: true,
    views: 15420
  },
  {
    id: '2',
    title: 'How to Prepare for JEE Main 2024',
    slug: 'how-to-prepare-jee-main-2024',
    content: 'Complete preparation strategy for JEE Main...',
    excerpt: 'Step-by-step guide to crack JEE Main with study tips, time management, and practice strategies.',
    author: 'Prof. Anita Sharma',
    category: 'Exam Preparation',
    tags: ['JEE', 'preparation', 'engineering', 'tips'],
    publishedAt: '2024-01-08T14:30:00Z',
    isPublished: true,
    views: 8750
  }
];

// Mock Analytics
export const mockAnalytics: Analytics = {
  totalStudents: 12450,
  totalColleges: 89,
  totalLeads: 3420,
  totalRevenue: 2850000,
  conversionRate: 28.5,
  topCities: [
    { city: 'Delhi', count: 1250 },
    { city: 'Mumbai', count: 980 },
    { city: 'Bangalore', count: 875 },
    { city: 'Chennai', count: 650 },
    { city: 'Pune', count: 445 }
  ],
  leadsBySource: [
    { source: 'organic', count: 1850 },
    { source: 'referral', count: 920 },
    { source: 'paid', count: 450 },
    { source: 'social', count: 200 }
  ],
  monthlyGrowth: [
    { month: 'Jan', students: 1200, leads: 340 },
    { month: 'Feb', students: 1450, leads: 420 },
    { month: 'Mar', students: 1680, leads: 485 },
    { month: 'Apr', students: 1920, leads: 560 }
  ]
};

// Mock Email Templates
export const mockEmailTemplates: EmailTemplate[] = [
  {
    id: '1',
    name: 'Student Welcome Email',
    subject: 'Welcome to ScholarConnect - Your Journey Begins!',
    htmlContent: '<h1>Welcome {{studentName}}!</h1><p>Thank you for joining ScholarConnect...</p>',
    textContent: 'Welcome {{studentName}}! Thank you for joining ScholarConnect...',
    variables: ['studentName', 'referralLink', 'offersCount'],
    category: 'welcome',
    isActive: true
  },
  {
    id: '2',
    name: 'Referral Success',
    subject: 'Congratulations! You earned ₹150 reward',
    htmlContent: '<h1>Great news {{referrerName}}!</h1><p>Your friend {{refereeName}} has joined...</p>',
    textContent: 'Great news {{referrerName}}! Your friend {{refereeName}} has joined...',
    variables: ['referrerName', 'refereeName', 'rewardAmount'],
    category: 'referral',
    isActive: true
  }
];

// Mock WhatsApp Templates
export const mockWhatsAppTemplates: WhatsAppTemplate[] = [
  {
    id: '1',
    name: 'Lead Follow-up',
    content: 'Hi {{studentName}}, thank you for your interest in {{collegeName}}. Our counselor will contact you within 24 hours.',
    variables: ['studentName', 'collegeName'],
    category: 'lead_followup',
    isApproved: true
  },
  {
    id: '2',
    name: 'Admission Reminder',
    content: 'Hi {{studentName}}, admission deadline for {{courseName}} is approaching. Apply now to secure your seat!',
    variables: ['studentName', 'courseName', 'deadline'],
    category: 'admission_reminder',
    isApproved: true
  }
];

// Mock System Settings
export const mockSystemSettings: SystemSettings = {
  siteName: 'ScholarConnect',
  primaryColor: '#38BDF8',
  secondaryColor: '#0F172A',
  logo: '/logo.png',
  favicon: '/favicon.ico',
  contactEmail: 'support@scholarconnect.com',
  contactPhone: '+91-99999-99999',
  address: '123 Education Hub, New Delhi, India',
  socialLinks: {
    facebook: 'https://facebook.com/scholarconnect',
    twitter: 'https://twitter.com/scholarconnect',
    instagram: 'https://instagram.com/scholarconnect',
    linkedin: 'https://linkedin.com/company/scholarconnect'
  },
  seoSettings: {
    metaTitle: 'ScholarConnect - Find Scholarships & Educational Opportunities',
    metaDescription: 'Connect with top colleges, get scholarship matches, and unlock exclusive offers based on your academic performance.',
    keywords: ['scholarships', 'education', 'colleges', 'admissions', 'student offers']
  },
  emailSettings: {
    provider: 'sendgrid',
    apiKey: 'SG.xxx',
    fromEmail: 'noreply@scholarconnect.com',
    fromName: 'ScholarConnect'
  },
  whatsappSettings: {
    provider: 'gupshup',
    apiKey: 'xxx',
    phoneNumber: '+91-99999-99999'
  }
};

// Mock Users
export const mockUsers: User[] = [
  {
    id: '1',
    email: 'priya.sharma@email.com',
    role: 'student',
    isActive: true,
    lastLogin: '2024-01-16T10:30:00Z',
    createdAt: '2024-01-15T10:30:00Z',
    profile: {
      fullName: 'Priya Sharma',
      phone: '+91-9876543210',
      city: 'Delhi',
      class: '12th',
      marks: 87,
      referralCode: 'PRIYA2024',
      totalReferrals: 2,
      totalEarnings: 300
    }
  },
  {
    id: '2',
    email: 'admissions@du.ac.in',
    role: 'college',
    isActive: true,
    lastLogin: '2024-01-16T09:15:00Z',
    createdAt: '2023-09-01T10:00:00Z',
    profile: {
      collegeName: 'Delhi University',
      city: 'Delhi',
      contactPerson: 'Dr. Rajesh Kumar',
      phone: '+91-11-27667011',
      website: 'https://du.ac.in',
      courses: ['B.Com Honours', 'B.A. English', 'B.Sc. Mathematics'],
      totalLeads: 156,
      conversionRate: 28.5,
      subscriptionStatus: 'active',
      subscriptionExpiry: '2024-12-31'
    }
  },
  {
    id: '3',
    email: 'admin@scholarconnect.com',
    role: 'admin',
    isActive: true,
    lastLogin: '2024-01-16T08:00:00Z',
    createdAt: '2023-01-01T00:00:00Z',
    profile: {
      fullName: 'Admin User',
      department: 'Operations',
      permissions: ['manage_users', 'manage_colleges', 'manage_offers', 'view_analytics']
    }
  }
];