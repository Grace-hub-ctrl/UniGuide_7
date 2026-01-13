
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Scholarships from './components/Scholarships';
import Colleges from './components/Colleges';
import EssayCoach from './components/EssayCoach';
import Opportunities from './components/Opportunities';
import ProfileSettings from './components/ProfileSettings';
import Auth from './components/Auth';
import ChatWidget from './components/ChatWidget';
import { Section, UserProfile } from './types';

const DEFAULT_PROFILE: UserProfile = {
  name: '',
  email: '',
  grade: '',
  gpa: '',
  major: '',
  location: '',
  interests: [],
  isProfileComplete: false
};

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userProfile, setUserProfile] = useState<UserProfile>(DEFAULT_PROFILE);
  const [activeSection, setActiveSection] = useState<Section>('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const savedProfile = localStorage.getItem('uniguide_profile');
    const savedAuth = localStorage.getItem('uniguide_auth');
    if (savedProfile) setUserProfile(JSON.parse(savedProfile));
    if (savedAuth === 'true') setIsAuthenticated(true);
  }, []);

  const handleLogin = (email: string, name: string) => {
    setIsAuthenticated(true);
    localStorage.setItem('uniguide_auth', 'true');
    
    // Update profile with the name and email provided at login
    const newProfile = { ...userProfile, email, name: name || userProfile.name };
    setUserProfile(newProfile);
    localStorage.setItem('uniguide_profile', JSON.stringify(newProfile));
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('uniguide_auth');
    setActiveSection('dashboard');
  };

  const updateProfile = (profile: UserProfile) => {
    setUserProfile(profile);
    localStorage.setItem('uniguide_profile', JSON.stringify(profile));
  };

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  if (!isAuthenticated) {
    return <Auth onLogin={handleLogin} />;
  }

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard': return <Dashboard onNavigate={setActiveSection} profile={userProfile} />;
      case 'scholarships': return <Scholarships profile={userProfile} />;
      case 'colleges': return <Colleges />;
      case 'essay': return <EssayCoach />;
      case 'opportunities': return <Opportunities profile={userProfile} />;
      case 'profile': return <ProfileSettings profile={userProfile} onUpdate={updateProfile} />;
      default: return <Dashboard onNavigate={setActiveSection} profile={userProfile} />;
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50 relative">
      <Sidebar 
        profile={userProfile}
        activeSection={activeSection} 
        onNavigate={(s) => { setActiveSection(s); setIsSidebarOpen(false); }} 
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        onLogout={handleLogout}
      />
      
      <div className="flex flex-col flex-1 overflow-y-auto w-full">
        <Navbar onMenuClick={toggleSidebar} profile={userProfile} />
        <main className="p-4 md:p-8 w-full max-w-full overflow-x-hidden">
          <div className="max-w-7xl mx-auto animate-fadeIn">
            {renderContent()}
          </div>
        </main>
      </div>

      <ChatWidget profile={userProfile} />
      
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.4s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default App;
