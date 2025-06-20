import React, { useState, useEffect } from 'react';
import axios from 'axios';

const RelationshipPage = () => {
  const [personId, setPersonId] = useState('');
  const [relatedToId, setRelatedToId] = useState('');
  const [relationType, setRelationType] = useState('');
  const [message, setMessage] = useState('');
  const [people, setPeople] = useState([]);

  useEffect(() => {
    const fetchPeople = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get('http://localhost:5050/api/people', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPeople(response.data);
      } catch (err) {
        console.error('Failed to load people:', err);
      }
    };
    fetchPeople();
  }, []);

  const handleAddRelationship = async (e) => {
    e.preventDefault();
    setMessage('');

    const token = localStorage.getItem('token');

    if (!token) {
      setMessage('You must be logged in to add a relationship.');
      return;
    }

    try {
      const response = await axios.post(
        'http://localhost:5050/api/relationship',
        {
          person_id: parseInt(personId),
          related_to_id: parseInt(relatedToId),
          relation_type: relationType,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMessage(`Relationship added: ${response.data.relationship.relation_type}`);
      setPersonId('');
      setRelatedToId('');
      setRelationType('');
    } catch (err) {
      setMessage('Failed to add relationship.');
      console.error(err);
    }
  };

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
      <h2>Add Relationship</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleAddRelationship}>
        <select
          value={personId}
          onChange={(e) => setPersonId(e.target.value)}
          required
          style={{ width: '100%', marginBottom: 10 }}
        >
          <option value="">Select Person</option>
          {people.map((p) => (
            <option key={p.id} value={p.id}>
              {p.first_name} {p.middle_name}
            </option>
          ))}
        </select>

        <select
          value={relatedToId}
          onChange={(e) => setRelatedToId(e.target.value)}
          required
          style={{ width: '100%', marginBottom: 10 }}
        >
          <option value="">Related To</option>
          {people.map((p) => (
            <option key={p.id} value={p.id}>
              {p.first_name} {p.middle_name}
            </option>
          ))}
        </select>

        <select
          value={relationType}
          onChange={(e) => setRelationType(e.target.value)}
          required
          style={{ width: '100%', marginBottom: 10 }}
        >
          <option value="">Select Relation</option>
          <option value="father">Father</option>
          <option value="mother">Mother</option>
          <option value="son">Son</option>
          <option value="daughter">Daughter</option>
          <option value="sibling">Sibling</option>
          <option value="spouse">Spouse</option>
          <option value="other">Other</option>
        </select>
        <button type="submit">Add Relationship</button>
      </form>
    </div>
  );
};

export default RelationshipPage;