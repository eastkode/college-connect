import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Phone, Mail, MapPin, GraduationCap, Award } from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import { StudentForm as StudentFormType } from '../types';
import { calculateLeadScore } from '../utils/leadScoring';

export const StudentForm: React.FC = () => {
  const navigate = useNavigate();
  const { setStudentData, addLead } = useApp();
  const [formData, setFormData] = useState<StudentFormType>({
    fullName: '',
    phone: '',
    email: '',
    city: '',
    class: '12th',
    marks: 0,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'marks' ? parseInt(value) || 0 : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Calculate lead score
    const leadScore = calculateLeadScore({
      marks: formData.marks,
      class: formData.class,
      city: formData.city,
      source: 'organic', // Default for direct form submission
    });

    // Create lead entry
    addLead({
      studentData: formData,
      source: 'organic',
      status: 'new',
      leadScore,
    });

    setStudentData(formData);
    
    // Navigate based on class
    if (formData.class === '10th') {
      navigate('/results/class-10');
    } else {
      navigate('/results/class-12');
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 max-w-md w-full mx-auto animate-slide-up">
      <div className="text-center mb-6">
        <div className="mx-auto w-16 h-16 bg-gradient-to-r from-light-blue to-blue-600 rounded-full flex items-center justify-center mb-4">
          <Award className="h-8 w-8 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Get Your Offers!</h2>
        <p className="text-gray-600">Fill in your details to unlock personalized scholarships and offers</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Full Name */}
        <div className="relative">
          <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleInputChange}
            placeholder="Full Name"
            required
            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-light-blue focus:border-transparent transition-all duration-200"
          />
        </div>

        {/* Phone */}
        <div className="relative">
          <Phone className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            placeholder="Phone Number"
            required
            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-light-blue focus:border-transparent transition-all duration-200"
          />
        </div>

        {/* Email */}
        <div className="relative">
          <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Email Address"
            required
            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-light-blue focus:border-transparent transition-all duration-200"
          />
        </div>

        {/* City */}
        <div className="relative">
          <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleInputChange}
            placeholder="City"
            required
            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-light-blue focus:border-transparent transition-all duration-200"
          />
        </div>

        {/* Class */}
        <div className="relative">
          <GraduationCap className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
          <select
            name="class"
            value={formData.class}
            onChange={handleInputChange}
            required
            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-light-blue focus:border-transparent transition-all duration-200 bg-white"
          >
            <option value="10th">Class 10th</option>
            <option value="12th">Class 12th</option>
          </select>
        </div>

        {/* Marks */}
        <div className="relative">
          <Award className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
          <input
            type="number"
            name="marks"
            value={formData.marks || ''}
            onChange={handleInputChange}
            placeholder="Marks Percentage (%)"
            min="0"
            max="100"
            required
            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-light-blue focus:border-transparent transition-all duration-200"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-gradient-to-r from-light-blue to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
        >
          {isSubmitting ? (
            <div className="flex items-center justify-center space-x-2">
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Getting Your Offers...</span>
            </div>
          ) : (
            'Get Offers & Scholarships!'
          )}
        </button>
      </form>

      <p className="text-xs text-gray-500 text-center mt-4">
        By submitting, you agree to our Terms of Service and Privacy Policy
      </p>
    </div>
  );
};