
import React from 'react';
import { Section, UserProfile } from '../types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface DashboardProps {
  onNavigate: (section: Section) => void;
  profile: UserProfile;
}

const data = [
  { name: 'Ivy League', chance: 15 },
  { name: 'Target Schools', chance: 45 },
  { name: 'Safety Schools', chance: 85 },
  { name: 'Research Internships', chance: 30 },
];

const COLORS = ['#ef4444', '#f59e0b', '#10b981', '#3b82f6'];

const Dashboard: React.FC<DashboardProps> = ({ onNavigate, profile }) => {
  return (
    <div className="space-y-8 pb-12">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <h1 className="text-2xl md:text-3xl font-bold text-slate-900">
              {profile.name ? `Hello, ${profile.name.split(' ')[0]}!` : 'Welcome to UniGuide!'}
            </h1>
            <span className="px-3 py-1 bg-blue-600 text-white text-[10px] font-black rounded-full uppercase tracking-[0.1em] shadow-lg shadow-blue-500/20">Class of 2026</span>
          </div>
          <p className="text-slate-500 text-sm md:text-base">
            Your journey to the perfect university starts here.
          </p>
        </div>
        {!profile.isProfileComplete && (
          <button 
            onClick={() => onNavigate('profile')}
            className="flex items-center gap-2 px-4 py-2 bg-amber-50 text-amber-700 border border-amber-200 rounded-xl text-xs font-bold animate-bounce md:animate-none"
          >
            <i className="fa-solid fa-circle-exclamation"></i>
            Complete Profile for AI Analysis
          </button>
        )}
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <ActionCard
          icon="fa-graduation-cap"
          title="Scholarships"
          desc={`Discover 2026 funding`}
          color="blue"
          onClick={() => onNavigate('scholarships')}
        />
        <ActionCard
          icon="fa-university"
          title="Explorer"
          desc="Research 5,000+ colleges"
          color="indigo"
          onClick={() => onNavigate('colleges')}
        />
        <ActionCard
          icon="fa-pen-nib"
          title="Essay Coach"
          desc="AI critique for drafts"
          color="purple"
          onClick={() => onNavigate('essay')}
        />
        <ActionCard
          icon="fa-briefcase"
          title="Scout"
          desc="Internships & camps"
          color="emerald"
          onClick={() => onNavigate('opportunities')}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
        <div className="lg:col-span-2 bg-white p-4 md:p-8 rounded-[2rem] shadow-sm border border-slate-200">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-lg text-slate-800">Admission Probability Index</h3>
            <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded uppercase tracking-widest">Live 2026 Forecast</span>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" stroke="#64748b" fontSize={10} width={100} />
                <Tooltip 
                  cursor={{fill: '#f8fafc'}}
                  contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                />
                <Bar dataKey="chance" radius={[0, 8, 8, 0]} barSize={24}>
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <p className="text-[10px] text-slate-400 mt-4 text-center leading-relaxed">
            Forecasted based on your {profile.gpa || '3.5 (default)'} GPA and {profile.major || 'general'} focus for the 2026 cycle.
          </p>
        </div>

        <div className="bg-white p-6 md:p-8 rounded-[2rem] shadow-sm border border-slate-200">
          <h3 className="font-bold text-lg text-slate-800 mb-6 flex items-center gap-2">
            <i className="fa-solid fa-bell text-blue-500 text-sm"></i>
            Deadlines 2026
          </h3>
          <div className="space-y-3">
            <DeadlineItem title="Common App Early" date="Nov 01, 2026" days={410} />
            <DeadlineItem title="Coca-Cola Schol." date="Oct 31, 2026" days={409} color="red" />
            <DeadlineItem title="UC Application" date="Nov 30, 2026" days={439} />
            <DeadlineItem title="Harvard REA" date="Nov 01, 2026" days={410} />
          </div>
          <button className="w-full mt-6 py-4 border-2 border-dashed border-slate-200 text-slate-400 rounded-2xl hover:bg-slate-50 hover:border-slate-300 text-xs font-bold transition-all">
            + Custom Tracker
          </button>
        </div>
      </div>
    </div>
  );
};

const ActionCard: React.FC<{ icon: string; title: string; desc: string; color: string; onClick: () => void }> = ({ icon, title, desc, color, onClick }) => {
  const colorMap: any = {
    blue: 'bg-blue-50 text-blue-600',
    indigo: 'bg-indigo-50 text-indigo-600',
    purple: 'bg-purple-50 text-purple-600',
    emerald: 'bg-emerald-50 text-emerald-600',
  };
  return (
    <button
      onClick={onClick}
      className="p-5 md:p-6 bg-white rounded-[2rem] border border-slate-200 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all text-left group"
    >
      <div className={`w-12 h-12 ${colorMap[color]} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
        <i className={`fa-solid ${icon} text-xl`}></i>
      </div>
      <h4 className="font-bold text-slate-900 mb-1">{title}</h4>
      <p className="text-[11px] text-slate-500 leading-relaxed font-medium">{desc}</p>
    </button>
  );
};

const DeadlineItem: React.FC<{ title: string; date: string; days: number; color?: string }> = ({ title, date, days, color = 'blue' }) => (
  <div className="flex items-center gap-4 p-3 rounded-2xl hover:bg-slate-50 transition-all cursor-pointer border border-transparent hover:border-slate-100">
    <div className={`w-10 h-10 flex-shrink-0 flex items-center justify-center rounded-xl ${color === 'red' ? 'bg-red-50 text-red-500' : 'bg-blue-50 text-blue-500'}`}>
      <span className="text-[10px] font-black leading-none">{days}d</span>
    </div>
    <div className="min-w-0">
      <h5 className="font-bold text-xs text-slate-900 truncate">{title}</h5>
      <p className="text-[10px] text-slate-400 font-medium">{date}</p>
    </div>
  </div>
);

export default Dashboard;
