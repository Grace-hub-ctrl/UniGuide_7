
import React, { useState } from 'react';
import { scoutOpportunities } from '../services/gemini';
import { Opportunity, UserProfile } from '../types';
import LoadingOverlay from './LoadingOverlay';

interface OpportunitiesProps {
  profile: UserProfile;
}

// Fix: Opportunities component was missing the profile prop that App.tsx was passing.
const Opportunities: React.FC<OpportunitiesProps> = ({ profile }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Opportunity[]>([]);
  const [loading, setLoading] = useState(false);

  const handleScout = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query) return;
    setLoading(true);
    // Leverage profile data to personalize opportunity scouting
    const contextQuery = profile.isProfileComplete 
      ? `${query} for a student in ${profile.grade} with focus on ${profile.major}`
      : query;
    const data = await scoutOpportunities(contextQuery);
    setResults(data);
    setLoading(false);
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Opportunity Scout</h2>
          <p className="text-slate-500 mt-1 text-sm">Find internships, research programs, and pre-college camps.</p>
        </div>
        <form onSubmit={handleScout} className="flex-1 max-w-xl flex gap-2">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="e.g. Computer Science internships for high schoolers"
            className="flex-1 px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 outline-none shadow-sm"
          />
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 bg-emerald-600 text-white font-bold rounded-xl hover:bg-emerald-700 transition-all disabled:opacity-50"
          >
            {loading ? <i className="fa-solid fa-compass animate-spin"></i> : 'Scout'}
          </button>
        </form>
      </div>

      {loading && <LoadingOverlay message="Scanning organizations and university research portals..." />}

      {results.length > 0 ? (
        <div className="space-y-4">
          {results.map((op, idx) => (
            <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-6 hover:shadow-md transition-all">
              <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-2xl flex-shrink-0 flex items-center justify-center">
                <i className={`fa-solid ${op.type === 'internship' ? 'fa-briefcase' : op.type === 'summer-camp' ? 'fa-sun' : 'fa-flask'} text-2xl`}></i>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                  <h3 className="font-bold text-lg text-slate-900 truncate">{op.title}</h3>
                  <span className="px-3 py-1 bg-slate-100 text-slate-600 text-xs font-bold rounded-full uppercase tracking-widest">{op.type}</span>
                </div>
                <div className="flex flex-wrap gap-4 text-sm text-slate-500 mb-4">
                  <span className="flex items-center gap-1"><i className="fa-solid fa-building text-xs"></i> {op.organization}</span>
                  <span className="flex items-center gap-1"><i className="fa-solid fa-map-marker-alt text-xs"></i> {op.location}</span>
                </div>
                <p className="text-slate-600 text-sm leading-relaxed mb-6">{op.description}</p>
                <div className="flex items-center gap-4">
                  <a
                    href={op.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-2 bg-slate-900 text-white font-bold text-sm rounded-lg hover:bg-slate-800 transition-colors"
                  >
                    Apply Now
                  </a>
                  <button className="text-emerald-600 font-bold text-sm flex items-center gap-2 hover:underline">
                    <i className="fa-solid fa-bookmark"></i> Save to List
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        !loading && (
          <div className="bg-emerald-50 p-12 rounded-3xl border border-emerald-100 text-center">
            <h3 className="text-emerald-900 font-bold text-xl mb-2">Start Your Search</h3>
            <p className="text-emerald-700 max-w-md mx-auto">
              UniGuide uses real-time search to find open summer programs, competitive internships, and research opportunities that match your interests.
            </p>
          </div>
        )
      )}
    </div>
  );
};

export default Opportunities;
