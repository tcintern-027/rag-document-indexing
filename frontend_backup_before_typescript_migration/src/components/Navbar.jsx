import React, { useState, useEffect } from 'react';
import { Bot, Sparkles, Moon, Sun, Activity, Database, FileText } from 'lucide-react';
import { apiService } from '../services/api';

export const Navbar = ({ darkMode, setDarkMode, documentCount, vectorCount }) => {
  const [healthStatus, setHealthStatus] = useState('checking');

  useEffect(() => {
    const checkHealth = async () => {
      try {
        const res = await apiService.getHealth();
        setHealthStatus(res.status === 'healthy' ? 'online' : 'degraded');
      } catch {
        setHealthStatus('offline');
      }
    };

    checkHealth();
    const interval = setInterval(checkHealth, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="h-16 border-b border-slate-800 bg-slate-900/90 backdrop-blur-md sticky top-0 z-30 px-6 flex items-center justify-between text-slate-100 dark:bg-slate-900/90 dark:border-slate-800 dark:text-slate-100 light:bg-white/90 light:border-slate-200 light:text-slate-900">
      {/* Brand Header */}
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center shadow-lg shadow-indigo-500/20">
          <Bot className="w-6 h-6 text-white" />
        </div>
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="font-bold text-lg tracking-tight">AI Knowledge Assistant</h1>
            <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
              RAG v1.0
            </span>
          </div>
          <p className="text-xs text-slate-400 dark:text-slate-400 light:text-slate-500">
            Grounded Vector Search &amp; Groq Llama 3.3 Intelligence
          </p>
        </div>
      </div>

      {/* Center Status Indicators */}
      <div className="hidden md:flex items-center space-x-6">
        <div className="flex items-center space-x-2 text-xs text-slate-400">
          <FileText className="w-4 h-4 text-indigo-400" />
          <span>Docs: <strong className="text-slate-200">{documentCount}</strong></span>
        </div>
        <div className="flex items-center space-x-2 text-xs text-slate-400">
          <Database className="w-4 h-4 text-purple-400" />
          <span>Vectors: <strong className="text-slate-200">{vectorCount}</strong></span>
        </div>

        {/* Backend Health Badge */}
        <div className="flex items-center space-x-2 bg-slate-800/60 px-3 py-1.5 rounded-full border border-slate-700/50">
          <Activity className={`w-3.5 h-3.5 ${
            healthStatus === 'online' ? 'text-emerald-400 animate-pulse' :
            healthStatus === 'degraded' ? 'text-amber-400' : 'text-rose-400'
          }`} />
          <span className="text-xs font-medium capitalize">
            Backend: {healthStatus}
          </span>
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center space-x-3">
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors border border-slate-700/50"
          title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        >
          {darkMode ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-indigo-600" />}
        </button>
      </div>
    </header>
  );
};
