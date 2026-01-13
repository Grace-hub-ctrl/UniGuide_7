
import React, { useState } from 'react';
import { researchCollege } from '../services/gemini';
import { CollegeInfo } from '../types';
import LoadingOverlay from './LoadingOverlay';

const FEATURED_COLLEGES = [
  { name: "Stanford University", location: "Stanford, CA", rank: "#3 National", color: "bg-red-50 text-red-600" },
  { name: "MIT", location: "Cambridge, MA", rank: "#2 National", color: "bg-slate-50 text-slate-600" },
  { name: "UC Berkeley", location: "Berkeley, CA", rank: "#15 National", color: "bg-blue-50 text-blue-600" },
  { name: "Oxford University", location: "Oxford, UK", rank: "#1 Global", color: "bg-indigo-50 text-indigo-600" }
];

const Colleges: React.FC = () => {
  const [collegeName, setCollegeName] = useState('');
  const [info, setInfo] = useState<CollegeInfo | null>(null);
  const [loading, setLoading] = useState(false);

  const handleResearch = async (e: React.FormEvent | string) => {
    const targetName = typeof e === 'string' ? e : collegeName;
    if (typeof e !== 'string') e.preventDefault();
    if (!targetName) return;
    
    setLoading(true);
    const data = await researchCollege(targetName);
    setInfo(data);
    setLoading(false);
  };

  return (
    <div className="space-y-8">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-slate-900 mb-4">College Explorer 2026</h2>
        <p className="text-slate-500 mb-8">Research the top-ranking universities for your 2026 enrollment.</p>
        <form onSubmit={handleResearch} className="flex gap-2">
          <input
            type="text"
            value={collegeName}
            onChange={(e) => setCollegeName(e.target.value)}
            placeholder="Enter college name (e.g. Stanford University)..."
            className="flex-1 px-6 py-4 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none shadow-sm text-lg"
          />
          <button
            type="submit"
            disabled={loading}
            className="px-8 py-4 bg-indigo-600 text-white font-bold rounded-2xl hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-500/20"
          >
            {loading ? <i className="fa-solid fa-spinner animate-spin"></i> : 'Research'}
          </button>
        </form>
      </div>

      {!info && !loading && (
        <div className="animate-fadeIn">
          <div className="flex items-center gap-2 mb-6 justify-center">
            <span className="w-2 h-2 bg-indigo-500 rounded-full"></span>
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Top Universities for 2026 Entry</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {FEATURED_COLLEGES.map((c, i) => (
              <button 
                key={i} 
                onClick={() => { setCollegeName(c.name); handleResearch(c.name); }}
                className="p-6 bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all text-left"
              >
                <div className={`w-10 h-10 ${c.color} rounded-xl flex items-center justify-center mb-4`}>
                  <i className="fa-solid fa-university"></i>
                </div>
                <h4 className="font-bold text-slate-900 mb-1">{c.name}</h4>
                <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold mb-1">{c.location}</p>
                <p className="text-[10px] font-black text-indigo-600">{c.rank}</p>
              </button>
            ))}
          </div>
        </div>
      )}

      {loading && <LoadingOverlay message="Analyzing 2026 admission trends and university stats..." />}

      {info && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-8">
            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                <div>
                  <h3 className="text-4xl font-extrabold text-slate-900">{info.name}</h3>
                  <p className="text-slate-500 flex items-center gap-2 mt-2">
                    <i className="fa-solid fa-location-dot text-indigo-500"></i>
                    {info.location}
                  </p>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <span className="text-[10px] font-black text-white bg-indigo-600 px-3 py-1 rounded-full uppercase tracking-widest">Entry: Fall 2026</span>
                  <a
                    href={info.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-2 bg-slate-900 text-white rounded-xl text-sm font-bold hover:bg-slate-800 transition-colors inline-block text-center"
                  >
                    Visit Official Site
                  </a>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
                <StatBox label="Rank" value={info.rank} icon="fa-award" />
                <StatBox label="Acceptance" value={info.acceptanceRate} icon="fa-check-circle" />
                <StatBox label="Tuition" value={info.tuition} icon="fa-money-bill-wave" />
                <StatBox label="Status" value="Open 2026" icon="fa-clock" color="green" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-bold text-emerald-600 mb-4 flex items-center gap-2">
                    <i className="fa-solid fa-plus-circle"></i> Key Strengths
                  </h4>
                  <ul className="space-y-3">
                    {info.notablePros.map((pro, i) => (
                      <li key={i} className="flex gap-3 text-sm text-slate-600">
                        <i className="fa-solid fa-check text-emerald-500 mt-1"></i>
                        {pro}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold text-amber-600 mb-4 flex items-center gap-2">
                    <i className="fa-solid fa-circle-exclamation"></i> Considerations
                  </h4>
                  <ul className="space-y-3">
                    {info.notableCons.map((con, i) => (
                      <li key={i} className="flex gap-3 text-sm text-slate-600">
                        <i className="fa-solid fa-minus text-amber-500 mt-1"></i>
                        {con}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div className="bg-indigo-600 p-6 rounded-3xl text-white shadow-xl shadow-indigo-500/20">
              <h4 className="font-bold text-lg mb-4">Admissions Outlook 2026</h4>
              <p className="text-sm text-indigo-100 mb-6 leading-relaxed">
                Projected for 2026: {info.name} is emphasizing holistic review with an focus on "Social Innovation" and "Climate Literacy" in personal statements.
              </p>
              <div className="space-y-4">
                <ProgressItem label="Test Scores (Avg)" val={92} />
                <ProgressItem label="GPA Competitive" val={88} />
                <ProgressItem label="Extracurriculars" val={75} />
              </div>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
              <h4 className="font-bold text-slate-900 mb-4">Campus Life</h4>
              <div className="grid grid-cols-2 gap-2">
                <img src={`https://picsum.photos/seed/${info.name}-1/200/200`} className="w-full h-24 object-cover rounded-xl" alt="Campus" />
                <img src={`https://picsum.photos/seed/${info.name}-2/200/200`} className="w-full h-24 object-cover rounded-xl" alt="Campus" />
                <img src={`https://picsum.photos/seed/${info.name}-3/200/200`} className="w-full h-24 object-cover rounded-xl" alt="Campus" />
                <img src={`https://picsum.photos/seed/${info.name}-4/200/200`} className="w-full h-24 object-cover rounded-xl" alt="Campus" />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const StatBox: React.FC<{ label: string; value: string; icon: string; color?: string }> = ({ label, value, icon, color = 'indigo' }) => (
  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
    <div className={`w-8 h-8 rounded-lg mb-3 flex items-center justify-center ${color === 'green' ? 'bg-green-100 text-green-600' : 'bg-indigo-100 text-indigo-600'}`}>
      <i className={`fa-solid ${icon} text-sm`}></i>
    </div>
    <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">{label}</p>
    <p className="text-lg font-bold text-slate-900 truncate">{value}</p>
  </div>
);

const ProgressItem: React.FC<{ label: string; val: number }> = ({ label, val }) => (
  <div>
    <div className="flex justify-between text-xs font-bold mb-1">
      <span>{label}</span>
      <span>{val}%</span>
    </div>
    <div className="h-2 w-full bg-indigo-800 rounded-full overflow-hidden">
      <div className="h-full bg-white rounded-full transition-all duration-1000" style={{ width: `${val}%` }}></div>
    </div>
  </div>
);

export default Colleges;
