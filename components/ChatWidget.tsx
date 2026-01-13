
import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
import { Message, UserProfile } from '../types';

interface ChatWidgetProps {
  profile: UserProfile;
}

const ChatWidget: React.FC<ChatWidgetProps> = ({ profile }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', content: `Hi ${profile.name ? profile.name.split(' ')[0] : 'there'}! I'm your UniGuide assistant. Ask me anything about colleges or scholarships!` }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isTyping) return;

    const userMessage = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsTyping(true);

    try {
      // Create a new instance right before making an API call to ensure it uses the latest process.env.API_KEY.
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const context = profile.isProfileComplete 
        ? `The user is a ${profile.grade} student with a ${profile.gpa} GPA interested in ${profile.major}. Location: ${profile.location}.`
        : "The user's profile is not yet complete.";

      const chat = ai.chats.create({
        model: 'gemini-3-flash-preview',
        config: { 
          systemInstruction: `You are a friendly college admissions consultant for high school students. ${context} Be concise and encouraging.` 
        }
      });
      
      const response = await chat.sendMessage({ message: userMessage });
      // Accessing text property directly from GenerateContentResponse
      setMessages(prev => [...prev, { role: 'model', content: response.text || "I'm having trouble thinking. Please try again." }]);
    } catch (err) {
      console.error("Chat error:", err);
      setMessages(prev => [...prev, { role: 'model', content: "Error connecting to AI. Please check your connection." }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-[60] flex flex-col items-end">
      {isOpen && (
        <div className="w-[calc(100vw-3rem)] sm:w-96 h-[500px] bg-white rounded-[2.5rem] shadow-2xl border border-slate-200 flex flex-col mb-4 overflow-hidden animate-fadeIn">
          <div className="p-5 bg-slate-900 text-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-500 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
                <i className="fa-solid fa-robot text-xs"></i>
              </div>
              <span className="font-bold text-sm tracking-tight">AI Assistant</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-white transition-colors">
              <i className="fa-solid fa-times"></i>
            </button>
          </div>

          <div ref={scrollRef} className="flex-1 overflow-y-auto p-5 space-y-4 bg-slate-50/50">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] px-4 py-3 rounded-2xl text-xs md:text-sm leading-relaxed shadow-sm ${
                  m.role === 'user' 
                    ? 'bg-slate-900 text-white rounded-br-none' 
                    : 'bg-white text-slate-700 border border-slate-200 rounded-bl-none'
                }`}>
                  {m.content}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white px-4 py-3 rounded-2xl border border-slate-200 shadow-sm flex gap-1.5 items-center">
                  <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce"></div>
                  <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                  <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                </div>
              </div>
            )}
          </div>

          <form onSubmit={handleSend} className="p-4 bg-white border-t border-slate-100">
            <div className="relative">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask anything..."
                className="w-full pl-5 pr-12 py-4 bg-slate-100 rounded-2xl text-xs md:text-sm outline-none focus:ring-2 focus:ring-blue-500 transition-all font-medium"
              />
              <button type="submit" className="absolute right-2 top-2 w-10 h-10 bg-slate-900 text-white rounded-xl flex items-center justify-center hover:bg-slate-800 transition-colors shadow-lg">
                <i className="fa-solid fa-paper-plane text-[10px]"></i>
              </button>
            </div>
          </form>
        </div>
      )}

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-slate-900 text-white rounded-2xl shadow-xl flex items-center justify-center hover:scale-110 transition-transform active:scale-95 group relative z-50"
      >
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-blue-500 rounded-full border-2 border-white animate-pulse"></div>
        {isOpen ? <i className="fa-solid fa-chevron-down text-lg"></i> : <i className="fa-solid fa-comment-dots text-xl"></i>}
      </button>
    </div>
  );
};

export default ChatWidget;
