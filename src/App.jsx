import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './AuthContext';
import DynamicIslandNavbar from './components/DynamicIslandNavbar';
import HeroSection from './components/HeroSection';
import FeaturesSection from './components/FeaturesSection';
import HowItWorks from './components/HowItWorks';
import CareerRoadmap from './components/CareerRoadmap';
import JobRecommendation from './components/JobRecommendation';
import DashboardPreview from './components/DashboardPreview';
import CommunitySection from './components/CommunitySection';
import Footer from './components/Footer';
import ReactLenis from 'lenis/react';
import Login from './components/Login';
import Signup from './components/Signup';

const Home = () => (
  <>
    <DynamicIslandNavbar />
    <main>
      <HeroSection />
      <FeaturesSection />
      <HowItWorks />
      <CareerRoadmap />
      <JobRecommendation />
      <DashboardPreview />
      <CommunitySection />
    </main>
    <Footer />
  </>
);

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <ReactLenis
          root
          options={{
            lerp: 0.1,
            duration: 1.2,
            orientation: 'vertical',
            gestureOrientation: 'vertical',
            smoothWheel: true,
            wheelMultiplier: 1,
            smoothTouch: true,
            touchMultiplier: 2,
          }}>
          <div className="min-h-screen bg-darker text-slate-200 font-sans selection:bg-primary/30 selection:text-white">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
            </Routes>
          </div>
        </ReactLenis>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
