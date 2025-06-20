import React, { useEffect, useState } from 'react';

function RemovePersonPage() {
  const [people, setPeople] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    fetch('http://localhost:5050/api/people', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => res.json())
      .then(data => {
        console.log('People loaded:', data);
        setPeople(data);
      })
      .catch(err => console.error('Error loading people:', err));
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this person?')) return;

    try {
      const response = await fetch(`http://localhost:5050/api/person/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setPeople(people.filter(p => p.id !== id));
        alert('Person deleted');
      } else {
        alert('Failed to delete person');
      }
    } catch (error) {
      console.error('Error deleting person:', error);
      alert('Error deleting person');
    }
  };

  return (
    <div style={{ padding: 20 }}>
       <div style={{ marginBottom: '1rem' }}>
    <a href="/dashboard" style={{ textDecoration: 'none', color: 'black', fontSize: '1.5rem', fontWeight: 'bold' }}>
      🏠 Bhatta Family
    </a>
  </div>

  {/* Optional back link */}
  <div style={{ marginBottom: '1rem' }}>
    <a href="/dashboard">← Back to Dashboard</a>
  </div>
      <h2>Remove Person</h2>
      {people.length === 0 ? (
        <p>No people available to delete.</p>
      ) : (
        <ol>
          {people.map((person) => (
            <li key={person.id}>
              {person.first_name} {person.last_name || ''} ({person.dob?.split('T')[0]})
              <button
                onClick={() => handleDelete(person.id)}
                style={{ marginLeft: 10, color: 'white', backgroundColor: 'red' }}
              >
                Delete
              </button>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}

export default RemovePersonPage;
