import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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

      <main className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="bg-white border rounded-xl overflow-hidden shadow-lg">
          <div className="bg-blue-600 h-32"></div>
          <div className="px-6 py-6 sm:px-10 relative">
            <div className="absolute -top-16 border-4 border-white rounded-full bg-gray-200 h-24 w-24 flex items-center justify-center text-3xl font-bold text-gray-500 shadow-md">
              {user.name.charAt(0).toUpperCase()}
            </div>
            
            <div className="mt-8 flex justify-between items-start">
              <div>
                <h1 className="text-3xl font-extrabold text-gray-900">{user.name}</h1>
                <p className="text-gray-500 font-medium">{user.email}</p>
                <div className="mt-2 text-sm text-gray-500">
                   Role: <span className="capitalize font-semibold">{user.role}</span>
                </div>
              </div>
              <div className="text-right">
                <span className="block text-sm text-gray-500 uppercase font-bold tracking-wider">Campus Cred</span>
                <span className="block text-2xl font-bold text-green-600">{user.credits} 🟡</span>
              </div>
            </div>

            <div className="mt-8 border-t pt-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Portfolio of Work</h2>
              <div className="text-center py-12 bg-gray-50 border-2 border-dashed rounded-lg">
                <p className="text-gray-500">No projects completed yet. Accept tasks to build your auto-portfolio.</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
