import React, { useEffect, useState } from 'react';
import api from '../api';

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    async function load() {
      try {
        const u = await api.get('/admin/users');
        setUsers(u.data);
        const p = await api.get('/admin/projects');
        setProjects(p.data);
      } catch (err) {
        console.error(err);
      }
    }
    load();
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>
      <div className="mt-4">
        <h2 className="font-semibold">Users</h2>
        <ul className="mt-2">
          {users.map(u => (
            <li key={u._id}>{u.email} ({u.role})</li>
          ))}
        </ul>
      </div>
      <div className="mt-6">
        <h2 className="font-semibold">Projects</h2>
        <ul className="mt-2">
          {projects.map(p => (
            <li key={p._id}>{p.title} - {p.status}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
