import React, { createContext, useContext, useState, ReactNode } from 'react';
import { StudentForm, Offer, College, Referral, Lead, User, Analytics } from '../types';
import { 
  mockOffers, 
  mockColleges, 
  mockReferrals, 
  mockLeads, 
  mockUsers, 
  mockAnalytics 
} from '../data/mockData';

interface AppContextType {
  // Student Data
  studentData: StudentForm | null;
  setStudentData: (data: StudentForm) => void;
  
  // Core Data
  offers: Offer[];
  colleges: College[];
  referrals: Referral[];
  leads: Lead[];
  users: User[];
  analytics: Analytics;
  
  // Authentication
  isLoggedIn: boolean;
  userType: 'student' | 'college' | 'admin' | null;
  currentUser: User | null;
  login: (type: 'student' | 'college' | 'admin', email?: string) => void;
  logout: () => void;
  
  // Lead Management
  addLead: (lead: Omit<Lead, 'id' | 'createdAt'>) => void;
  updateLeadStatus: (leadId: string, status: Lead['status'], notes?: string) => void;
  getLeadsByCollege: (collegeId: string) => Lead[];
  getLeadsByStatus: (status: Lead['status']) => Lead[];
  
  // Referral Management
  addReferral: (referral: Omit<Referral, 'id'>) => void;
  updateReferralStatus: (referralId: string, status: Referral['status']) => void;
  getReferralsByUser: (userEmail: string) => Referral[];
  
  // College Management
  updateCollegeProfile: (collegeId: string, updates: Partial<College>) => void;
  getCollegeLeadStats: (collegeId: string) => {
    total: number;
    new: number;
    contacted: number;
    interested: number;
    admitted: number;
  };
  
  // Offer Management
  getEligibleOffers: (studentData: StudentForm) => Offer[];
  
  // Analytics
  getAnalyticsByDateRange: (startDate: string, endDate: string) => Partial<Analytics>;
  getLeadConversionRate: () => number;
  getTopPerformingOffers: () => Offer[];
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [studentData, setStudentData] = useState<StudentForm | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState<'student' | 'college' | 'admin' | null>(null);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  
  // State for dynamic data
  const [offers] = useState<Offer[]>(mockOffers);
  const [colleges, setColleges] = useState<College[]>(mockColleges);
  const [referrals, setReferrals] = useState<Referral[]>(mockReferrals);
  const [leads, setLeads] = useState<Lead[]>(mockLeads);
  const [users] = useState<User[]>(mockUsers);
  const [analytics] = useState<Analytics>(mockAnalytics);

  const login = (type: 'student' | 'college' | 'admin', email?: string) => {
    setIsLoggedIn(true);
    setUserType(type);
    
    // Find user by email if provided
    if (email) {
      const user = users.find(u => u.email === email && u.role === type);
      setCurrentUser(user || null);
    }
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUserType(null);
    setCurrentUser(null);
    setStudentData(null);
  };

  // Lead Management Functions
  const addLead = (leadData: Omit<Lead, 'id' | 'createdAt'>) => {
    const newLead: Lead = {
      ...leadData,
      id: `lead_${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    setLeads(prev => [newLead, ...prev]);
  };

  const updateLeadStatus = (leadId: string, status: Lead['status'], notes?: string) => {
    setLeads(prev => prev.map(lead => 
      lead.id === leadId 
        ? { 
            ...lead, 
            status, 
            notes: notes || lead.notes,
            lastContactedAt: status === 'contacted' ? new Date().toISOString() : lead.lastContactedAt
          }
        : lead
    ));
  };

  const getLeadsByCollege = (collegeId: string) => {
    return leads.filter(lead => lead.assignedCollege === collegeId);
  };

  const getLeadsByStatus = (status: Lead['status']) => {
    return leads.filter(lead => lead.status === status);
  };

  // Referral Management Functions
  const addReferral = (referralData: Omit<Referral, 'id'>) => {
    const newReferral: Referral = {
      ...referralData,
      id: `ref_${Date.now()}`,
    };
    setReferrals(prev => [newReferral, ...prev]);
  };

  const updateReferralStatus = (referralId: string, status: Referral['status']) => {
    setReferrals(prev => prev.map(referral => 
      referral.id === referralId ? { ...referral, status } : referral
    ));
  };

  const getReferralsByUser = (userEmail: string) => {
    return referrals.filter(referral => referral.referrerEmail === userEmail);
  };

  // College Management Functions
  const updateCollegeProfile = (collegeId: string, updates: Partial<College>) => {
    setColleges(prev => prev.map(college => 
      college.id === collegeId ? { ...college, ...updates } : college
    ));
  };

  const getCollegeLeadStats = (collegeId: string) => {
    const collegeLeads = getLeadsByCollege(collegeId);
    return {
      total: collegeLeads.length,
      new: collegeLeads.filter(l => l.status === 'new').length,
      contacted: collegeLeads.filter(l => l.status === 'contacted').length,
      interested: collegeLeads.filter(l => l.status === 'interested').length,
      admitted: collegeLeads.filter(l => l.status === 'admitted').length,
    };
  };

  // Offer Management Functions
  const getEligibleOffers = (studentData: StudentForm) => {
    return offers.filter(offer => {
      const classMatch = offer.eligibleClass === 'both' || offer.eligibleClass === studentData.class;
      const marksMatch = studentData.marks >= offer.minMarks && 
                        (!offer.maxMarks || studentData.marks <= offer.maxMarks);
      const cityMatch = !offer.city || offer.city === studentData.city;
      
      return classMatch && marksMatch && cityMatch;
    });
  };

  // Analytics Functions
  const getAnalyticsByDateRange = (startDate: string, endDate: string) => {
    // In a real app, this would filter data by date range
    return analytics;
  };

  const getLeadConversionRate = () => {
    const totalLeads = leads.length;
    const convertedLeads = leads.filter(lead => lead.status === 'admitted').length;
    return totalLeads > 0 ? (convertedLeads / totalLeads) * 100 : 0;
  };

  const getTopPerformingOffers = () => {
    // In a real app, this would be based on actual redemption data
    return offers.slice(0, 5);
  };

  const value = {
    // Student Data
    studentData,
    setStudentData,
    
    // Core Data
    offers,
    colleges,
    referrals,
    leads,
    users,
    analytics,
    
    // Authentication
    isLoggedIn,
    userType,
    currentUser,
    login,
    logout,
    
    // Lead Management
    addLead,
    updateLeadStatus,
    getLeadsByCollege,
    getLeadsByStatus,
    
    // Referral Management
    addReferral,
    updateReferralStatus,
    getReferralsByUser,
    
    // College Management
    updateCollegeProfile,
    getCollegeLeadStats,
    
    // Offer Management
    getEligibleOffers,
    
    // Analytics
    getAnalyticsByDateRange,
    getLeadConversionRate,
    getTopPerformingOffers,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};