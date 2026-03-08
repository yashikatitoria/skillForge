import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';

export default function NewProject() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Graphic Design');
  const [rewardCredits, setRewardCredits] = useState(10);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleCreate = async (e) => {
    e.preventDefault();
    setError('');

    try {
      await api.post('/projects', { title, description, category, rewardCredits });
      alert('Project posted successfully!');
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to post project.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center items-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-xl w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
        <div>
          <h2 className="text-center text-3xl font-extrabold text-gray-900">Post a New Project</h2>
          <p className="mt-2 text-center text-sm text-gray-600">Offer your credits to verified students to help you with a task.</p>
        </div>

        {error && <div className="bg-red-50 text-red-500 p-3 rounded text-sm text-center">{error}</div>}

        <form className="mt-8 space-y-6" onSubmit={handleCreate}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Project Title</label>
              <input type="text" required value={title} onChange={e => setTitle(e.target.value)} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">Detailed Description</label>
              <textarea required rows={4} value={description} onChange={e => setDescription(e.target.value)} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Category</label>
                <select value={category} onChange={e => setCategory(e.target.value)} className="mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
                  <option>Graphic Design</option>
                  <option>Web Development</option>
                  <option>Content Writing</option>
                  <option>AI Data Tasks</option>
                  <option>Video Editing</option>
                  <option>Presentation Design</option>
                  <option>Research Assistance</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Credit Reward</label>
                <input type="number" min="1" required value={rewardCredits} onChange={e => setRewardCredits(e.target.value)} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
              </div>
            </div>
          </div>

          <div className="flex gap-4">
             <button type="button" onClick={() => navigate('/dashboard')} className="w-full flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none">
              Cancel
            </button>
            <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none">
              Post Project
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
