import { Link, useNavigate } from 'react-router-dom';
import { Camera, MapPin, Mail, Award, Clock, Heart, Settings, LogOut, ChevronRight } from 'lucide-react';
import avatarImg from '../avatar.png';
import api from '../api';

export default function Profile() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      navigate('/login');
    } else {
      setUser(JSON.parse(storedUser));
    }
  }, [navigate]);

  if (!user) return <div className="p-8 text-center text-gray-500">Loading Profile...</div>;

  return (
    <div className="min-h-screen bg-white">
      <nav className="bg-gray-50 shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
             <Link to="/dashboard" className="text-2xl font-bold text-blue-600">SkillForge</Link>
             <Link to="/dashboard" className="text-gray-500 hover:text-gray-900">← Back to Dashboard</Link>
          </div>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="glass-card rounded-[3rem] overflow-hidden shadow-2xl shadow-blue-500/10 border-none relative">
          {/* Header/Cover Section */}
          <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-700 h-48 relative">
            <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
          </div>
          
          <div className="px-8 pb-12 sm:px-12 relative">
            {/* Avatar Section */}
            <div className="relative -mt-20 mb-8 flex items-end justify-between">
              <div className="relative group">
                <div className="relative h-40 w-40 rounded-[2.5rem] overflow-hidden border-8 border-white shadow-2xl bg-slate-100 flex items-center justify-center">
                  <img 
                    src={avatarImg} 
                    alt={user.name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="hidden absolute inset-0 bg-blue-600 text-white font-black text-4xl items-center justify-center">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                </div>
                <button className="absolute bottom-2 right-2 p-3 bg-white text-blue-600 rounded-2xl shadow-xl hover:bg-blue-50 transition-colors border-2 border-white group/cam">
                  <Camera className="w-5 h-5 group-hover/cam:scale-110 transition-transform" />
                </button>
              </div>

              <div className="flex gap-3 mb-4">
                <button className="p-4 bg-slate-50 text-slate-400 rounded-3xl hover:bg-slate-100 hover:text-slate-600 transition-all">
                  <Settings className="w-6 h-6" />
                </button>
                <button 
                  onClick={() => {
                    localStorage.removeItem('user');
                    navigate('/login');
                  }}
                  className="p-4 bg-rose-50 text-rose-500 rounded-3xl hover:bg-rose-100 transition-all"
                >
                  <LogOut className="w-6 h-6" />
                </button>
              </div>
            </div>
            
            {/* User Info Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              <div className="lg:col-span-2 space-y-8">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h1 className="text-5xl font-black text-slate-900 tracking-tight">{user.name}</h1>
                    <span className="px-4 py-1.5 bg-blue-50 text-blue-600 text-xs font-black uppercase tracking-widest rounded-full border border-blue-100">
                      {user.role}
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center gap-6 text-slate-400 font-bold uppercase tracking-wider text-[11px]">
                    <span className="flex items-center gap-2"><Mail className="w-4 h-4" /> {user.email}</span>
                    <span className="flex items-center gap-2"><MapPin className="w-4 h-4" /> Campus Hub Alpha</span>
                    <span className="flex items-center gap-2 text-green-500"><Award className="w-4 h-4" /> {user.credits} Skill Credits</span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  {[
                    { label: 'Completed', value: '0', icon: <Award className="text-amber-500" />, color: 'bg-amber-50' },
                    { label: 'In Progress', value: '4', icon: <Clock className="text-blue-500" />, color: 'bg-blue-50' },
                    { label: 'Achievements', value: '2', icon: <Heart className="text-rose-500" />, color: 'bg-rose-50' }
                  ].map((stat, i) => (
                    <div key={i} className={`p-6 rounded-[2rem] ${stat.color} border border-transparent hover:border-white transition-all`}>
                      <div className="mb-2">{stat.icon}</div>
                      <div className="text-2xl font-black text-slate-900">{stat.value}</div>
                      <div className="text-[10px] font-black uppercase tracking-widest text-slate-400">{stat.label}</div>
                    </div>
                  ))}
                </div>

                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-black text-slate-900 tracking-tight">Portfolio of Work</h2>
                    <button className="text-xs font-black text-blue-600 uppercase tracking-widest hover:underline flex items-center gap-1">
                      View All <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="text-center py-20 glass-card rounded-[2.5rem] border-2 border-dashed border-slate-200">
                    <div className="max-w-xs mx-auto space-y-4">
                      <div className="h-16 w-16 bg-slate-50 text-slate-300 rounded-3xl flex items-center justify-center mx-auto">
                        <Award size={32} />
                      </div>
                      <p className="text-slate-400 font-medium">No projects completed yet. Start learning to build your auto-portfolio.</p>
                      <Link to="/skills" className="inline-block px-8 py-3 bg-blue-600 text-white font-black text-sm uppercase tracking-wider rounded-2xl shadow-lg shadow-blue-500/20 hover:scale-105 active:scale-95 transition-all">
                        Browse Skills
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sidebar/Activity */}
              <div className="space-y-8">
                 <div className="p-8 glass-card rounded-[2.5rem] bg-slate-900 text-white">
                    <h3 className="text-xl font-black mb-6">Course Activity</h3>
                    <div className="space-y-6">
                       {[
                         { name: 'Web Dev Fundamentals', prog: 65 },
                         { name: 'UI/UX Principles', prog: 30 },
                         { name: 'Modern React', prog: 12 }
                       ].map((course, i) => (
                         <div key={i} className="space-y-2">
                           <div className="flex justify-between text-[11px] font-black uppercase tracking-widest text-slate-400">
                             <span>{course.name}</span>
                             <span>{course.prog}%</span>
                           </div>
                           <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                             <div className="h-full bg-blue-500 rounded-full" style={{ width: `${course.prog}%` }}></div>
                           </div>
                         </div>
                       ))}
                    </div>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
