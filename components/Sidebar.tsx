
import React from 'react';
import { Section, UserProfile } from '../types';

interface SidebarProps {
  profile: UserProfile;
  activeSection: Section;
  onNavigate: (section: Section) => void;
  isOpen: boolean;
  onClose: () => void;
  onLogout: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ profile, activeSection, onNavigate, isOpen, onClose, onLogout }) => {
  const navItems: { id: Section; label: string; icon: string }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: 'fa-gauge' },
    { id: 'scholarships', label: 'Scholarships', icon: 'fa-graduation-cap' },
    { id: 'colleges', label: 'College Explorer', icon: 'fa-university' },
    { id: 'essay', label: 'Essay Coach', icon: 'fa-pen-nib' },
    { id: 'opportunities', label: 'Opportunities', icon: 'fa-briefcase' },
    { id: 'profile', label: 'My Profile', icon: 'fa-user-gear' },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-40 md:hidden"
          onClick={onClose}
        ></div>
      )}

      <aside className={`
        fixed md:relative top-0 left-0 h-full w-72 bg-slate-900 text-slate-300 z-50 transition-transform duration-300 transform
        ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0
        flex flex-col border-r border-slate-800
      `}>
        <div className="p-6">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                <i className="fa-solid fa-bolt text-white"></i>
              </div>
              <span className="font-bold text-xl text-white tracking-tight">UniGuide</span>
            </div>
            <button onClick={onClose} className="md:hidden text-slate-400 hover:text-white">
              <i className="fa-solid fa-times"></i>
            </button>
          </div>

          <nav className="space-y-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  activeSection === item.id
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20'
                    : 'hover:bg-slate-800 hover:text-white'
                }`}
              >
                <i className={`fa-solid ${item.icon} w-5`}></i>
                <span className="font-medium">{item.label}</span>
              </button>
            ))}
          </nav>
        </div>

        <div className="mt-auto p-6 space-y-4">
          <div className="p-4 bg-slate-800/50 rounded-2xl border border-slate-700">
            <p className="text-[10px] text-slate-500 mb-2 uppercase tracking-widest font-bold">Account</p>
            <button 
              onClick={onLogout}
              className="w-full flex items-center gap-3 px-3 py-2 text-sm text-slate-400 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-all"
            >
              <i className="fa-solid fa-sign-out-alt"></i>
              <span>Logout</span>
            </button>
          </div>
          
          <div className="flex items-center gap-3 p-2 bg-slate-800/30 rounded-2xl border border-white/5">
            <div className="w-10 h-10 bg-gradient-to-tr from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white border border-slate-700">
               <i className="fa-solid fa-user-graduate"></i>
            </div>
            <div className="min-w-0">
              <p className="text-xs font-bold text-white truncate">{profile.name || 'Student Account'}</p>
              <p className="text-[10px] text-blue-400 font-bold truncate tracking-tight">Academic Year 2026</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
