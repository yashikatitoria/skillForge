import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await api.get('/projects');
        setProjects(res.data);
      } catch (err) {
        console.error('Failed to load projects');
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  const handleAccept = async (id) => {
    try {
      await api.post(`/projects/${id}/assign`);
      alert('Project accepted! Check your dashboard.');
      // Refresh list to remove it or update status
      setProjects(projects.map(p => p._id === id ? { ...p, status: 'assigned' } : p));
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to accept project.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <Link to="/dashboard" className="text-2xl font-bold text-blue-600">SkillForge</Link>
            <div className="space-x-4">
              <Link to="/dashboard" className="text-gray-500 hover:text-gray-900">Dashboard</Link>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-900">Available Campus Projects</h1>
            <span className="bg-green-100 text-green-800 text-sm font-medium px-3 py-1 rounded">Worker Mode Active</span>
          </div>

          {loading ? (
             <div className="text-center py-8 text-gray-500">Loading open projects...</div>
          ) : projects.length === 0 ? (
             <div className="text-center py-12 bg-white border rounded">
               <p className="text-gray-500">No projects available at the moment. Check back later!</p>
             </div>
          ) : (
            <div className="flex flex-col gap-4">
              {projects.filter(p => p.status === 'open').map(project => (
                <div key={project._id} className="bg-white p-6 border rounded-lg shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center">
                  <div className="mb-4 sm:mb-0">
                    <h3 className="text-xl font-bold text-gray-900">{project.title}</h3>
                    <p className="text-gray-600 mt-1">{project.description}</p>
                    <div className="text-sm text-gray-500 mt-2">
                      <span className="font-semibold text-blue-600">{project.category}</span> • Posted by {project.client?.name || 'Student'}
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-lg font-bold text-yellow-600 bg-yellow-50 px-3 py-1 rounded-full whitespace-nowrap">
                      {project.rewardParams?.credits || 0} 🟡
                    </div>
                    <button 
                      onClick={() => handleAccept(project._id)} 
                      className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded transition"
                    >
                      Accept
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
