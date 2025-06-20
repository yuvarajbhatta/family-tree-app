import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PeoplePage = () => {
  const [people, setPeople] = useState([]);
  const [view, setView] = useState('list'); // 'list' or 'tree'
  const [error, setError] = useState('');

  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchPeople = async () => {
      try {
        const res = await axios.get('http://localhost:5050/api/people', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPeople(res.data);
      } catch (err) {
        console.error(err);
        setError('Failed to load people.');
      }
    };

    fetchPeople();
  }, [token]);

  return (
    <div style={{ padding: '2rem' }}>
       <div style={{ marginBottom: '1rem' }}>
    <a href="/dashboard" style={{ textDecoration: 'none', color: 'black', fontSize: '1.5rem', fontWeight: 'bold' }}>
      🏠 Bhatta Family
    </a>
  </div>

  {/* Optional back link */}
  <div style={{ marginBottom: '1rem' }}>
    <a href="/dashboard">← Back to Dashboard</a>
  </div>
      <h2>People</h2>
      <div style={{ marginBottom: 10 }}>
        <button onClick={() => setView('list')} style={{ marginRight: 10 }}>
          📋 List View
        </button>
        <button onClick={() => setView('tree')}>🌳 Tree View</button>
      </div>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {view === 'list' ? (
        <ol>
        {people.map((p) => {
          //Uncomment if dob wants to be displayed ->
            //const cleanDob = p.dob ? new Date(p.dob).toISOString().split('T')[0] : 'N/A';
            return (
            <li key={p.id}>
                {p.first_name} {p.middle_name || ''} {p.last_name || ''} {/*— DOB: cleanDob*/} 
            </li>
            );
        })}
        </ol>
      ) : (
        <p>🌳 Tree view coming soon — will display generations based on relationships.</p>
      )}
    </div>
  );
};

export default PeoplePage;