
import React from 'react';

const LoadingOverlay: React.FC<{ message: string }> = ({ message }) => {
  return (
    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl text-center space-y-6 animate-fadeIn">
        <div className="relative w-20 h-20 mx-auto">
          <div className="absolute inset-0 border-4 border-blue-100 rounded-full"></div>
          <div className="absolute inset-0 border-4 border-blue-600 rounded-full border-t-transparent animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <i className="fa-solid fa-bolt text-blue-600 text-2xl animate-pulse"></i>
          </div>
        </div>
        <div className="space-y-2">
          <h3 className="text-xl font-bold text-slate-900">UniGuide Thinking...</h3>
          <p className="text-slate-500 text-sm leading-relaxed">{message}</p>
        </div>
        <div className="flex justify-center gap-1">
          <div className="w-1 h-1 bg-blue-200 rounded-full"></div>
          <div className="w-1 h-1 bg-blue-400 rounded-full"></div>
          <div className="w-1 h-1 bg-blue-600 rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingOverlay;
