export interface StudentForm {
  fullName: string;
  phone: string;
  email: string;
  city: string;
  class: '10th' | '12th';
  marks: number;
}

export interface Offer {
  id: string;
  title: string;
  description: string;
  discount: string;
  category: 'coaching' | 'scholarship' | 'freebie' | 'shop';
  eligibleClass: '10th' | '12th' | 'both';
  minMarks: number;
  maxMarks?: number;
  city?: string;
  vendorId?: string;
  image?: string;
  validUntil?: string;
  termsAndConditions?: string;
}

export interface College {
  id: string;
  name: string;
  course: string;
  fees: number;
  scholarshipAmount: number;
  placement: string;
  avgSalary: string;
  city: string;
  logo?: string;
  description?: string;
  accreditation?: string;
  establishedYear?: number;
  website?: string;
  contactEmail?: string;
  contactPhone?: string;
  courseDuration?: string;
  eligibilityCriteria?: string;
  applicationDeadline?: string;
  isActive?: boolean;
}

export interface Referral {
  id: string;
  referrerName: string;
  referrerEmail: string;
  refereeName: string;
  refereeEmail: string;
  status: 'pending' | 'joined' | 'rewarded';
  rewardAmount: number;
  date: string;
  referralCode: string;
}

export interface Lead {
  id: string;
  studentData: StudentForm;
  source: 'organic' | 'referral' | 'paid' | 'social';
  status: 'new' | 'contacted' | 'interested' | 'admitted' | 'rejected';
  assignedCollege?: string;
  createdAt: string;
  lastContactedAt?: string;
  notes?: string;
  leadScore?: number;
  interestedCourses?: string[];
}

export interface Vendor {
  id: string;
  businessName: string;
  category: 'coaching' | 'shop' | 'freebie';
  city: string;
  contactEmail: string;
  contactPhone: string;
  description: string;
  website?: string;
  logo?: string;
  isActive: boolean;
  offers: Offer[];
  createdAt: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  author: string;
  category: string;
  tags: string[];
  featuredImage?: string;
  metaTitle?: string;
  metaDescription?: string;
  publishedAt: string;
  isPublished: boolean;
  views: number;
}

export interface User {
  id: string;
  email: string;
  role: 'student' | 'college' | 'admin' | 'vendor';
  isActive: boolean;
  lastLogin?: string;
  createdAt: string;
  profile?: StudentProfile | CollegeProfile | AdminProfile | VendorProfile;
}

export interface StudentProfile {
  fullName: string;
  phone: string;
  city: string;
  class: '10th' | '12th';
  marks: number;
  referralCode: string;
  totalReferrals: number;
  totalEarnings: number;
}

export interface CollegeProfile {
  collegeName: string;
  city: string;
  contactPerson: string;
  phone: string;
  website?: string;
  courses: string[];
  totalLeads: number;
  conversionRate: number;
  subscriptionStatus: 'active' | 'inactive' | 'trial';
  subscriptionExpiry?: string;
}

export interface AdminProfile {
  fullName: string;
  department: string;
  permissions: string[];
}

export interface VendorProfile {
  businessName: string;
  category: string;
  city: string;
  contactPerson: string;
  phone: string;
  totalOffers: number;
  totalRedemptions: number;
}

export interface Analytics {
  totalStudents: number;
  totalColleges: number;
  totalLeads: number;
  totalRevenue: number;
  conversionRate: number;
  topCities: { city: string; count: number }[];
  leadsBySource: { source: string; count: number }[];
  monthlyGrowth: { month: string; students: number; leads: number }[];
}

export interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  htmlContent: string;
  textContent: string;
  variables: string[];
  category: 'welcome' | 'referral' | 'lead' | 'marketing';
  isActive: boolean;
}

export interface WhatsAppTemplate {
  id: string;
  name: string;
  content: string;
  variables: string[];
  category: 'lead_followup' | 'admission_reminder' | 'offer_notification';
  isApproved: boolean;
}

export interface SystemSettings {
  siteName: string;
  primaryColor: string;
  secondaryColor: string;
  logo: string;
  favicon: string;
  contactEmail: string;
  contactPhone: string;
  address: string;
  socialLinks: {
    facebook?: string;
    twitter?: string;
    instagram?: string;
    linkedin?: string;
  };
  seoSettings: {
    metaTitle: string;
    metaDescription: string;
    keywords: string[];
  };
  emailSettings: {
    provider: 'sendgrid' | 'nodemailer';
    apiKey: string;
    fromEmail: string;
    fromName: string;
  };
  whatsappSettings: {
    provider: 'gupshup' | 'twilio' | 'meta';
    apiKey: string;
    phoneNumber: string;
  };
}