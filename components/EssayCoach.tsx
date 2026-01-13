
import React, { useState } from 'react';
import { getEssayFeedback } from '../services/gemini';
import { EssayFeedback } from '../types';
import LoadingOverlay from './LoadingOverlay';

const EssayCoach: React.FC = () => {
  const [essay, setEssay] = useState('');
  const [feedback, setFeedback] = useState<EssayFeedback | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!essay || essay.length < 100) {
      alert("Please enter a longer essay for quality feedback.");
      return;
    }
    setLoading(true);
    const result = await getEssayFeedback(essay);
    setFeedback(result);
    setLoading(false);
  };

  return (
    <div className="space-y-8">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-slate-900">Essay Coach</h2>
          <p className="text-slate-500 mt-1">Ivy League feedback powered by Gemini 3 Pro Reasoning.</p>
        </div>
        <div className="flex gap-4">
          <button
            onClick={() => { setEssay(''); setFeedback(null); }}
            className="px-6 py-2 text-slate-600 hover:bg-slate-100 rounded-xl transition-colors font-medium"
          >
            Clear All
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="px-8 py-3 bg-purple-600 text-white font-bold rounded-2xl hover:bg-purple-700 transition-all shadow-lg shadow-purple-500/20 disabled:opacity-50 flex items-center gap-2"
          >
            {loading ? <i className="fa-solid fa-brain animate-pulse"></i> : <i className="fa-solid fa-wand-magic-sparkles"></i>}
            Analyze Essay
          </button>
        </div>
      </header>

      {loading && <LoadingOverlay message="Our AI Admissions Officer is deeply reading your story..." />}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-4">
          <label className="block text-sm font-bold text-slate-700 uppercase tracking-widest">Your Essay Draft</label>
          <textarea
            value={essay}
            onChange={(e) => setEssay(e.target.value)}
            placeholder="Paste your college essay here (Common App, Supps, etc.)..."
            className="w-full h-[500px] p-8 rounded-3xl border border-slate-200 focus:ring-4 focus:ring-purple-100 outline-none shadow-inner resize-none bg-white text-slate-800 leading-relaxed font-serif text-lg"
          ></textarea>
          <div className="flex justify-between items-center px-2">
            <span className="text-xs text-slate-400">{essay.split(/\s+/).filter(Boolean).length} Words</span>
            <span className="text-xs text-slate-400">Minimum 100 words recommended</span>
          </div>
        </div>

        <div className="space-y-6">
          <label className="block text-sm font-bold text-slate-700 uppercase tracking-widest">Admissions Feedback</label>
          {feedback ? (
            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden animate-fadeIn">
              <div className="p-8 bg-purple-50 border-b border-purple-100 flex items-center justify-between">
                <div>
                  <h4 className="text-2xl font-bold text-purple-900">Overall Strength</h4>
                  <p className="text-purple-600 text-sm">Targeting Elite Institutions</p>
                </div>
                <div className="w-20 h-20 bg-white rounded-full border-4 border-purple-300 flex items-center justify-center">
                  <span className="text-3xl font-black text-purple-600">{feedback.score}<span className="text-sm text-purple-300">/10</span></span>
                </div>
              </div>
              
              <div className="p-8 space-y-8">
                <div>
                  <h5 className="font-bold text-emerald-700 mb-4 flex items-center gap-2">
                    <i className="fa-solid fa-circle-check"></i> Narrative Strengths
                  </h5>
                  <div className="flex flex-wrap gap-2">
                    {feedback.strengths.map((s, i) => (
                      <span key={i} className="px-3 py-2 bg-emerald-50 text-emerald-700 text-xs font-semibold rounded-lg border border-emerald-100">{s}</span>
                    ))}
                  </div>
                </div>

                <div>
                  <h5 className="font-bold text-amber-700 mb-4 flex items-center gap-2">
                    <i className="fa-solid fa-lightbulb"></i> Critical Suggestions
                  </h5>
                  <ul className="space-y-3">
                    {feedback.suggestions.map((s, i) => (
                      <li key={i} className="flex gap-3 text-sm text-slate-600 leading-relaxed">
                        <div className="w-5 h-5 flex-shrink-0 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center text-[10px] mt-0.5">
                          <i className="fa-solid fa-arrow-right"></i>
                        </div>
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                  <h5 className="font-bold text-slate-800 mb-2 text-sm">Grammar & Tone Note</h5>
                  <p className="text-xs text-slate-500 italic">"{feedback.grammarCheck}"</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-[500px] border-2 border-dashed border-slate-200 rounded-3xl flex flex-col items-center justify-center text-center p-8">
              <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mb-6">
                <i className="fa-solid fa-feather-pointed text-slate-300 text-3xl"></i>
              </div>
              <h4 className="text-slate-900 font-bold text-lg">No Analysis Yet</h4>
              <p className="text-slate-500 max-w-xs mt-2">Paste your essay on the left and hit analyze to get comprehensive AI-powered admissions feedback.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EssayCoach;
