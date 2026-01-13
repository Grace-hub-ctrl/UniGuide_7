
import React from 'react';
import { UserProfile } from '../types';

interface NavbarProps {
  onMenuClick: () => void;
  profile: UserProfile;
}

const Navbar: React.FC<NavbarProps> = ({ onMenuClick, profile }) => {
  return (
    <header className="h-16 border-b bg-white/80 backdrop-blur-md flex items-center justify-between px-4 md:px-8 sticky top-0 z-30">
      <div className="flex items-center gap-4">
        <button 
          onClick={onMenuClick}
          className="md:hidden w-10 h-10 flex items-center justify-center text-slate-500 hover:bg-slate-50 rounded-lg"
        >
          <i className="fa-solid fa-bars text-xl"></i>
        </button>
        <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 hidden sm:block">
          UniGuide
        </h2>
      </div>
      
      <div className="flex items-center gap-3 md:gap-6">
        <div className="hidden lg:flex items-center gap-2 px-3 py-1 bg-green-50 rounded-full border border-green-100">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-[10px] font-bold text-green-700 uppercase tracking-wider">Gemini 3 Flash Ready</span>
        </div>
        
        <div className="flex items-center gap-3 pl-4 border-l border-slate-100">
          <div className="hidden sm:block text-right">
            <p className="text-xs font-bold text-slate-900">{profile.name || 'Set Name'}</p>
            <p className="text-[10px] text-slate-500">{profile.grade || 'Add Grade'}</p>
          </div>
          <div className="w-9 h-9 bg-gradient-to-tr from-indigo-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg shadow-indigo-200">
            <i className="fa-solid fa-user text-white text-sm"></i>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
