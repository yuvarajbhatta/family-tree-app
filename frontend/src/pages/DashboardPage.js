import React from 'react';
import { useNavigate } from 'react-router-dom';

const DashboardPage = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
  };

  let user = null;
  try {
    user = JSON.parse(localStorage.getItem('user'));
  } catch (e) {
    user = null;
  }
  return (
    <div style={{ padding: '2rem' }}>
         <div style={{ marginBottom: '1rem' }}>
    <a href="/dashboard" style={{ textDecoration: 'none', color: 'black', fontSize: '1.5rem', fontWeight: 'bold' }}>
      🏠 Bhatta Family
    </a>
  </div>

      <h2>Family Tree Dashboard</h2>
      <button onClick={() => navigate('/add-person')} style={{ marginRight: 10 }}>
        Add Person
      </button>
      <button onClick={() => navigate('/relationship')} style={{ marginRight: 10 }}>
        Add Relationship
      </button>
      <button onClick={() => navigate('/people')} style={{ marginRight: 10 }}>
        Show Person
      </button>
      <button onClick={() => navigate('/remove-person')} style={{ marginRight: 10 }}>
        Remove Person
      </button>
      <button onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default DashboardPage;