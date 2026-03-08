import React, { useEffect, useState } from 'react';
import api from '../api';

export default function StudentDashboard() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    async function fetch() {
      try {
        const res = await api.get('/projects');
        setProjects(res.data);
      } catch (err) {
        console.error(err);
      }
    }
    fetch();
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">Student Dashboard</h1>
      <h2 className="mt-4 font-semibold">Assigned Projects</h2>
      <ul className="mt-2">
        {projects.map(p => (
          <li key={p._id} className="border p-2 my-2">
            <h3 className="font-semibold">{p.title}</h3>
            <p>{p.description}</p>
            <p>Status: {p.status}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
