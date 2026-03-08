import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center p-6">
      <div className="max-w-3xl text-center space-y-6">
        <h1 className="text-5xl font-extrabold text-blue-600">SkillForge</h1>
        <p className="text-xl text-gray-700">A Campus-First Peer Skill Marketplace</p>
        <p className="text-gray-500">
          "Every student has a skill. Nobody gives them a chance to prove it — until now."
        </p>
        <div className="flex justify-center flex-wrap gap-4 mt-8">
          <Link to="/register" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded shadow-lg transition duration-200">
            Join the Campus
          </Link>
          <Link to="/login" className="bg-white hover:bg-gray-100 text-blue-600 font-bold py-3 px-8 rounded shadow-lg border border-gray-200 transition duration-200">
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}
