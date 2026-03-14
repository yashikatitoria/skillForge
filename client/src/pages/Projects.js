import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, MapPin, Zap, ChevronRight, CheckCircle2 } from 'lucide-react';
import api from '../api';

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) setUser(JSON.parse(storedUser));

    const fetchProjects = async () => {
      try {
        const res = await api.get('/projects');
        setProjects(res.data);
      } catch (err) {
        setError('Failed to load projects. Ensure you are logged in.');
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  const handleAccept = async (id) => {
    try {
      await api.post(`/projects/${id}/assign`);
      alert('Project accepted! View details in your dashboard.');
      window.location.reload();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to accept project.');
    }
  };

  if (loading) return <div className="text-center p-20 text-slate-400 font-bold text-xl animate-pulse">Scanning the Campus Market...</div>;

  return (
    <div className="space-y-10 animate-in fade-in duration-700 pb-20">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-black uppercase tracking-widest border border-emerald-100">
            <Zap className="w-3 h-3 fill-current" />
            <span>Ready for Pickup</span>
          </div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">Open Opportunities</h1>
          <p className="text-slate-500 font-medium italic">Handpicked projects from your fellow student entrepreneurs.</p>
        </div>
        <div className="flex items-center space-x-2 bg-indigo-50 px-5 py-3 rounded-2xl border border-indigo-100 font-bold text-indigo-700 text-xs shadow-sm shadow-indigo-500/5">
           <span className="w-2 h-2 rounded-full bg-indigo-500 animate-ping"></span>
           <span>Live Updates</span>
        </div>
      </div>

      {error && (
        <div className="p-8 bg-rose-50 text-rose-600 rounded-[2rem] border border-rose-100 font-bold text-center flex items-center justify-center space-x-3">
          <span className="text-xl">⚠️</span>
          <span>{error}</span>
        </div>
      )}

      {projects.length === 0 ? (
        <div className="glass-card p-24 text-center rounded-[3rem] border-dashed border-2 flex flex-col items-center">
          <div className="w-24 h-24 bg-slate-50 rounded-[2rem] flex items-center justify-center text-slate-300 mb-8 text-4xl shadow-inner">☕</div>
          <p className="text-2xl font-black text-slate-800">No active projects right now.</p>
          <p className="text-slate-500 font-medium mt-3 text-lg">Why not be the first to post a new gig?</p>
          <Link to="/projects/new" className="mt-8 bg-indigo-600 text-white px-8 py-3.5 rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl shadow-indigo-600/20 hover:scale-105 transition-all">
            Post Project
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((p) => (
            <div key={p._id} className="glass-card flex flex-col rounded-[2.5rem] overflow-hidden transition-all hover:scale-[1.03] hover:shadow-2xl hover:shadow-indigo-500/15 border-b-8 border-b-transparent hover:border-b-indigo-600 group">
              <div className="p-8 pb-4 flex-1">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center space-x-2">
                    <span className="bg-slate-900 text-white text-[9px] uppercase font-black tracking-widest px-3 py-1.5 rounded-lg shadow-lg">
                      {p.category}
                    </span>
                  </div>
                  <div className="text-xl font-black text-amber-600 bg-amber-50 px-4 py-1.5 rounded-2xl border border-amber-100 shadow-sm shadow-amber-500/5">
                    🟡 {p.rewardParams.credits}
                  </div>
                </div>

                <h3 className="text-2xl font-black text-slate-900 mb-4 group-hover:text-indigo-600 transition-colors leading-tight">
                  {p.title}
                </h3>
                <p className="text-slate-500 font-medium line-clamp-3 mb-8 text-sm leading-relaxed tracking-tight">
                  {p.description}
                </p>

                {/* PROTOTYPE: Recommended Course Link */}
                <Link to="/skills" className="flex items-center p-4 bg-slate-50 rounded-2xl mb-8 group/link hover:bg-indigo-50 transition-colors border border-transparent hover:border-indigo-100">
                   <div className="p-2 bg-white rounded-xl text-indigo-500 mr-4 shadow-sm">
                      <BookOpen className="w-4 h-4" />
                   </div>
                   <div className="flex-1">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Recommended Skill</p>
                      <p className="text-xs font-bold text-slate-700 group-hover/link:text-indigo-700 transition-colors">{p.category} Essentials</p>
                   </div>
                   <ChevronRight className="w-4 h-4 text-slate-300 group-hover/link:text-indigo-500 group-hover/link:translate-x-1 transition-all" />
                </Link>

                <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <img 
                      src={`https://ui-avatars.com/api/?name=${p.client?.name}&background=6366f1&color=fff&bold=true`} 
                      className="w-10 h-10 rounded-xl shadow-lg shadow-indigo-500/10 ring-2 ring-indigo-50"
                      alt="Creator" 
                    />
                    <div>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Creator</p>
                      <p className="text-sm font-bold text-slate-800 tracking-tight">{p.client?.name}</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Status</p>
                    <span className="text-xs font-bold text-emerald-600 flex items-center">
                       <CheckCircle2 className="w-3 h-3 mr-1" />
                       Verified
                    </span>
                  </div>
                </div>
              </div>
              <div className="px-8 pb-10 pt-4">
                {user && user.role === 'worker' && p.status === 'open' ? (
                  <button
                    onClick={() => handleAccept(p._id)}
                    className="w-full premium-btn text-white py-4 rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl shadow-indigo-600/10 hover:shadow-indigo-600/30 transition-all flex items-center justify-center space-x-2"
                  >
                    <span>Accept Project</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    disabled
                    className="w-full bg-slate-100 text-slate-400 py-4 rounded-2xl font-black text-sm uppercase tracking-widest cursor-not-allowed border border-slate-200"
                  >
                    {p.status === 'open' ? (user?.role === 'client' ? 'Client Restricted' : 'Login to Accept') : 'Already Assigned'}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
