
import React, { useState } from 'react';

interface AuthProps {
  onLogin: (email: string, name: string) => void;
}

const Auth: React.FC<AuthProps> = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) {
      setIsLoading(true);
      // Simulate network delay for a "proper" feel
      setTimeout(() => {
        const displayName = name || (isLogin ? email.split('@')[0] : 'New Student');
        onLogin(email, displayName);
        setIsLoading(false);
      }, 1000);
    }
  };

  const handleGoogleLogin = () => {
    setIsLoading(true);
    // Simulating Google OAuth retrieval with a realistic account
    setTimeout(() => {
      onLogin('alex.johnson@gmail.com', 'Alex Johnson');
      setIsLoading(false);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Dynamic Animated Background */}
      <div className="absolute top-0 -left-20 w-72 h-72 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
      <div className="absolute bottom-0 -right-20 w-96 h-96 bg-indigo-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-700"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-500/5 rounded-full blur-[120px]"></div>

      <div className="w-full max-w-4xl bg-white rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col md:flex-row relative z-10 border border-white/10">
        {/* Branding Side */}
        <div className="md:w-1/2 bg-gradient-to-br from-blue-600 to-indigo-700 p-12 text-white flex flex-col justify-between relative overflow-hidden">
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-12">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-xl rounded-2xl flex items-center justify-center border border-white/30 shadow-inner">
                <i className="fa-solid fa-bolt text-white text-2xl"></i>
              </div>
              <span className="font-bold text-3xl tracking-tight">UniGuide</span>
            </div>
            <h1 className="text-4xl lg:text-5xl font-extrabold mb-6 leading-[1.1]">The AI Edge for Class of 2026.</h1>
            <p className="text-blue-100 text-lg leading-relaxed opacity-90">
              Join thousands of students using Gemini-powered insights to secure their future at top-tier universities.
            </p>
          </div>
          
          <div className="mt-8 pt-8 border-t border-white/10 hidden md:block relative z-10">
            <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/10">
              <div className="flex items-center gap-4">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map(i => (
                    <img key={i} src={`https://i.pravatar.cc/150?u=${i + 10}`} className="w-10 h-10 rounded-full border-2 border-indigo-600 shadow-sm" alt="user" />
                  ))}
                </div>
                <div>
                  <p className="text-xs font-bold text-white">Trusted by 15k+ Students</p>
                  <div className="flex gap-1 mt-1">
                    {[1, 2, 3, 4, 5].map(i => <i key={i} className="fa-solid fa-star text-[8px] text-yellow-400"></i>)}
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Subtle decoration */}
          <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
        </div>

        {/* Form Side */}
        <div className="md:w-1/2 p-8 md:p-14 flex flex-col justify-center bg-white">
          <div className="mb-10">
            <h2 className="text-3xl font-bold text-slate-900 mb-2">
              {isLogin ? 'Welcome Back' : 'Get Started'}
            </h2>
            <p className="text-slate-500 font-medium">
              {isLogin ? 'Sign in to access your 2026 dashboard.' : 'Create your personalized academic profile.'}
            </p>
          </div>

          <div className="space-y-6">
            {/* Google Login Button */}
            <button
              onClick={handleGoogleLogin}
              disabled={isLoading}
              className="w-full py-4 border border-slate-200 rounded-2xl flex items-center justify-center gap-3 hover:bg-slate-50 hover:border-slate-300 transition-all font-bold text-slate-700 shadow-sm active:scale-[0.98] disabled:opacity-50"
            >
              <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" className="w-5 h-5" alt="Google" />
              Continue with Google
            </button>

            <div className="relative flex items-center justify-center py-2">
              <div className="border-t border-slate-100 w-full"></div>
              <span className="bg-white px-4 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] absolute">Or continue with email</span>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name field - required for sign up, optional/available for login per request */}
              <div>
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 px-1">Full Name</label>
                <div className="relative">
                  <i className="fa-solid fa-user absolute left-4 top-1/2 -translate-y-1/2 text-slate-300"></i>
                  <input
                    type="text"
                    required={!isLogin}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                    className="w-full pl-11 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all font-medium text-slate-700"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 px-1">Email Address</label>
                <div className="relative">
                  <i className="fa-solid fa-envelope absolute left-4 top-1/2 -translate-y-1/2 text-slate-300"></i>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="alex@example.com"
                    className="w-full pl-11 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all font-medium text-slate-700"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 px-1">Password</label>
                <div className="relative">
                  <i className="fa-solid fa-lock absolute left-4 top-1/2 -translate-y-1/2 text-slate-300"></i>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-11 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all font-medium text-slate-700"
                  />
                </div>
              </div>
              
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-4 bg-slate-900 text-white font-bold rounded-2xl hover:bg-slate-800 transition-all shadow-xl shadow-slate-200 active:scale-[0.98] mt-6 flex items-center justify-center gap-2 disabled:opacity-70"
              >
                {isLoading ? (
                  <i className="fa-solid fa-circle-notch animate-spin"></i>
                ) : (
                  <>
                    {isLogin ? 'Sign In' : 'Create Account'}
                    <i className="fa-solid fa-arrow-right text-xs"></i>
                  </>
                )}
              </button>
            </form>
          </div>

          <div className="mt-10 text-center">
            <p className="text-sm font-medium text-slate-500">
              {isLogin ? "New to UniGuide?" : "Already have an account?"}{' '}
              <button
                onClick={() => { setIsLogin(!isLogin); setName(''); }}
                className="font-bold text-blue-600 hover:text-blue-700 hover:underline transition-all"
              >
                {isLogin ? 'Create Account' : 'Sign In'}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
