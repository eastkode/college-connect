import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './contexts/AppContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { Class10Results } from './pages/Class10Results';
import { Class12Results } from './pages/Class12Results';
import { CourseComparison } from './pages/CourseComparison';
import { Login } from './pages/Login';
import { StudentDashboard } from './pages/dashboards/StudentDashboard';
import { CollegeDashboard } from './pages/dashboards/CollegeDashboard';
import { AdminDashboard } from './pages/dashboards/AdminDashboard';

function App() {
  return (
    <AppProvider>
      <Router>
        <div className="min-h-screen bg-light-gray font-inter">
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/results/class-10" element={<Class10Results />} />
              <Route path="/results/class-12" element={<Class12Results />} />
              <Route path="/courses" element={<CourseComparison />} />
              <Route path="/login/:type" element={<Login />} />
              <Route path="/dashboard/student" element={<StudentDashboard />} />
              <Route path="/dashboard/college" element={<CollegeDashboard />} />
              <Route path="/dashboard/admin" element={<AdminDashboard />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AppProvider>
  );
}

export default App;