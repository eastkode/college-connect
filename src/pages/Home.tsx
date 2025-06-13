import React from 'react';
import { Link } from 'react-router-dom';
import { 
  GraduationCap, 
  Award, 
  Gift, 
  TrendingUp, 
  Users, 
  Star,
  ArrowRight,
  CheckCircle,
  Heart,
  BookOpen,
  Target
} from 'lucide-react';
import { StudentForm } from '../components/StudentForm';
import { FloatingCTA } from '../components/FloatingCTA';

export const Home: React.FC = () => {
  const benefits = [
    {
      icon: <Award className="h-8 w-8 text-light-blue" />,
      title: 'Scholarship Matches',
      description: 'Get personalized scholarship recommendations based on your academic performance'
    },
    {
      icon: <Gift className="h-8 w-8 text-green-500" />,
      title: 'Free Goodies',
      description: 'Unlock free earphones, t-shirts, and other exciting rewards'
    },
    {
      icon: <TrendingUp className="h-8 w-8 text-purple-500" />,
      title: 'Coaching Discounts',
      description: 'Get up to 30% discount on top coaching institutes'
    },
    {
      icon: <Users className="h-8 w-8 text-orange-500" />,
      title: 'Referral Rewards',
      description: 'Earn ₹150 gift card for every friend you refer'
    }
  ];

  const testimonials = [
    {
      name: 'Priya Sharma',
      class: '12th Pass',
      text: 'Got ₹25,000 scholarship for B.Tech through ScholarConnect! Amazing platform.',
      rating: 5,
      image: 'https://images.pexels.com/photos/3769021/pexels-photo-3769021.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1'
    },
    {
      name: 'Rahul Kumar',
      class: '10th Pass',
      text: 'Free coaching materials and 20% discount on Aakash Institute. Thanks!',
      rating: 5,
      image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1'
    },
    {
      name: 'Sneha Patel',
      class: '12th Pass',
      text: 'Found the perfect college with scholarship support. Highly recommended!',
      rating: 5,
      image: 'https://images.pexels.com/photos/3932957/pexels-photo-3932957.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1'
    }
  ];

  const faqs = [
    {
      question: 'How does ScholarConnect work?',
      answer: 'Simply enter your marks and details. We match you with relevant scholarships, coaching discounts, and offers based on your academic performance.'
    },
    {
      question: 'Is it really free to use?',
      answer: 'Yes! Our platform is completely free for students. We earn through partnerships with colleges and coaching institutes.'
    },
    {
      question: 'How do I earn through referrals?',
      answer: 'Share your unique referral link with friends. When they sign up and get matched with offers, you earn ₹150 gift card!'
    },
    {
      question: 'Are the scholarships genuine?',
      answer: 'Absolutely! We partner only with verified colleges and institutions. All scholarships are legitimate and transparent.'
    }
  ];

  const [openFaq, setOpenFaq] = React.useState<number | null>(null);

  return (
    <div className="min-h-screen">
      <FloatingCTA />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-navy via-blue-900 to-light-blue text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Hero Content */}
            <div className="animate-fade-in">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                Enter Your Marks,
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">
                  {' '}Unlock Offers
                </span>
                <br />& Scholarships!
              </h1>
              <p className="text-xl text-blue-100 mb-8 max-w-lg">
                Connect with top colleges, get scholarship matches, and unlock exclusive offers 
                based on your academic performance. Start your educational journey today!
              </p>
              
              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 mb-8">
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-400">50K+</div>
                  <div className="text-sm text-blue-200">Students Helped</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-400">₹2Cr+</div>
                  <div className="text-sm text-blue-200">Scholarships Won</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-400">500+</div>
                  <div className="text-sm text-blue-200">College Partners</div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/courses"
                  className="bg-white text-navy px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200 flex items-center justify-center space-x-2"
                >
                  <BookOpen className="h-5 w-5" />
                  <span>Compare Courses</span>
                </Link>
                <a
                  href="#form"
                  className="border border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-navy transition-colors duration-200 flex items-center justify-center space-x-2"
                >
                  <Target className="h-5 w-5" />
                  <span>Get Started</span>
                </a>
              </div>
            </div>

            {/* Form */}
            <div id="form" className="animate-slide-up">
              <StudentForm />
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-light-gray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
              Why Choose ScholarConnect?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We're not just another platform. We're your gateway to educational opportunities 
              that match your potential and aspirations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 text-center group"
              >
                <div className="mx-auto w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {benefit.title}
                </h3>
                <p className="text-gray-600">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
              Success Stories
            </h2>
            <p className="text-xl text-gray-600">
              See how ScholarConnect has transformed students' educational journeys
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white border border-gray-100 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="flex items-center mb-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-800">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600">{testimonial.class}</p>
                  </div>
                </div>
                
                <div className="flex mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                  ))}
                </div>
                
                <p className="text-gray-700 italic">"{testimonial.text}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-light-gray">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600">
              Got questions? We've got answers!
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors duration-200"
                >
                  <span className="font-semibold text-gray-800">{faq.question}</span>
                  <ArrowRight
                    className={`h-5 w-5 text-gray-500 transition-transform duration-200 ${
                      openFaq === index ? 'rotate-90' : ''
                    }`}
                  />
                </button>
                {openFaq === index && (
                  <div className="px-6 pb-4 text-gray-600 animate-slide-up">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};