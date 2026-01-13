
import React, { useState } from 'react';
import { findScholarships } from '../services/gemini';
import { Scholarship, UserProfile } from '../types';
import LoadingOverlay from './LoadingOverlay';

interface ScholarshipsProps {
  profile: UserProfile;
}

const SAMPLE_SCHOLARSHIPS: Scholarship[] = [
  {
    name: "Global Excellence Scholarship 2026",
    provider: "International Education Fund",
    amount: "$25,000",
    deadline: "March 15, 2026",
    eligibility: "High-achieving international students entering undergraduate programs in Fall 2026. Requires 3.8+ GPA.",
    link: "https://example.com/global-excellence"
  },
  {
    name: "STEM Innovation Award 2026",
    provider: "Tech Future Foundation",
    amount: "$10,000",
    deadline: "January 30, 2026",
    eligibility: "Students planning to major in CS, Engineering, or Math in the 2026 academic year.",
    link: "https://example.com/stem-award"
  },
  {
    name: "Future Leaders Community Grant",
    provider: "Civic Outreach Group",
    amount: "$5,000",
    deadline: "May 01, 2026",
    eligibility: "Open to Class of 2026 Seniors with significant leadership roles and 100+ volunteer hours.",
    link: "https://example.com/community-grant"
  }
];

const Scholarships: React.FC<ScholarshipsProps> = ({ profile }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Scholarship[]>([]);
  const [citations, setCitations] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    const finalQuery = `${query} for 2026 entry ${profile.isProfileComplete ? `Context: Grade ${profile.grade}, GPA ${profile.gpa}, Major ${profile.major}, Location ${profile.location}` : ''}`;
    
    setLoading(true);
    setHasSearched(true);
    const { scholarships, citations } = await findScholarships(finalQuery);
    setResults(scholarships);
    setCitations(citations);
    setLoading(false);
  };

  const displayScholarships = hasSearched ? results : SAMPLE_SCHOLARSHIPS;

  return (
    <div className="space-y-8">
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
        <div className="max-w-xl">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900">Scholarship Finder 2026</h2>
          <p className="text-slate-500 mt-2 text-sm">
            Gemini scans real-time data for grants targeting the 2026 academic cycle.
          </p>
        </div>
        <form onSubmit={handleSearch} className="flex-1 max-w-2xl flex flex-col sm:flex-row gap-2">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search traits (e.g. First-gen, STEM, Art 2026)"
            className="flex-1 px-5 py-4 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all shadow-sm"
          />
          <button
            type="submit"
            disabled={loading}
            className="px-8 py-4 bg-blue-600 text-white font-bold rounded-2xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20 disabled:opacity-50"
          >
            {loading ? <i className="fa-solid fa-circle-notch animate-spin"></i> : 'Find Awards'}
          </button>
        </form>
      </div>

      {loading && <LoadingOverlay message="Scouring financial databases and university grant portals for 2026..." />}

      {!hasSearched && (
        <div className="flex items-center gap-2 mb-4">
          <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Featured 2026 Scholarships</h3>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayScholarships.map((s, idx) => (
          <div key={idx} className="bg-white p-6 rounded-[2rem] border border-slate-200 shadow-sm flex flex-col hover:shadow-md transition-shadow group">
            <div className="flex justify-between items-start mb-4">
              <h3 className="font-bold text-base text-slate-900 leading-tight group-hover:text-blue-600 transition-colors">{s.name}</h3>
              <span className="px-3 py-1 bg-green-50 text-green-700 text-[10px] font-black rounded-full uppercase tracking-widest flex-shrink-0 ml-2">{s.amount}</span>
            </div>
            <div className="space-y-2 mb-6 flex-1">
              <p className="text-[11px] text-slate-500"><strong className="text-slate-700">Provider:</strong> {s.provider}</p>
              <div className="flex items-center gap-2 text-[11px] text-blue-600 font-bold">
                <i className="fa-solid fa-calendar-day"></i>
                <span>Deadline: {s.deadline}</span>
              </div>
              <p className="text-xs text-slate-600 line-clamp-4 leading-relaxed mt-3">{s.eligibility}</p>
            </div>
            <a
              href={s.link}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 bg-slate-900 text-white text-center font-bold text-xs rounded-xl hover:bg-slate-800 transition-colors"
            >
              Apply Now <i className="fa-solid fa-external-link ml-2 text-[10px]"></i>
            </a>
          </div>
        ))}
      </div>

      {citations.length > 0 && (
        <div className="bg-white p-6 rounded-[2rem] border border-slate-200">
          <h4 className="text-[10px] font-black text-slate-400 mb-4 uppercase tracking-widest flex items-center gap-2">
            <i className="fa-solid fa-shield-check text-blue-500"></i>
            Source Grounding
          </h4>
          <div className="flex flex-wrap gap-2">
            {citations.map((cite, i) => cite.web && (
              <a 
                key={i}
                href={cite.web.uri} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-[10px] text-blue-600 hover:bg-blue-50 px-3 py-2 bg-slate-50 rounded-full border border-slate-100 flex items-center gap-2 max-w-[200px] truncate transition-colors"
              >
                <i className="fa-solid fa-link text-[8px]"></i>
                {cite.web.title || cite.web.uri}
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Scholarships;
