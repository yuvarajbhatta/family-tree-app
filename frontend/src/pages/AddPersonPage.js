import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const AddPersonPage = () => {
  const [firstName, setFirstName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dob, setDob] = useState('');
  const [message, setMessage] = useState('');

  const handleAddPerson = async (e) => {
    e.preventDefault();
    setMessage('');

    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;

    if (!token || !user) {
      setMessage('You must be logged in to add a person.');
      return;
    }

    if (user.role !== 'admin' && user.role !== 'editor') {
      setMessage('Log in as admin/editor to make changes.');
      return;
    }

    // Set default last name if missing
    const resolvedLastName = lastName || (firstName ? 'Bhatta' : '');

    const payload = {
      first_name: firstName,
      middle_name: middleName,
      last_name: resolvedLastName,
    };

    if (dob) {
      payload.dob = dob;
    }

    try {
      const response = await axios.post(
        'http://localhost:5050/api/person',
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMessage(`Person added: ${response.data.person.first_name}`);
      setFirstName('');
      setMiddleName('');
      setLastName('');
      setDob('');
    } catch (err) {
      setMessage('Failed to add person.');
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
      <h2>Add Person</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleAddPerson}>
        <input
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
          style={{ width: '100%', marginBottom: 10 }}
        />
        <input
          type="text"
          placeholder="Middle Name"
          value={middleName}
          onChange={(e) => setMiddleName(e.target.value)}
          style={{ width: '100%', marginBottom: 10 }}
        />
        <input
          type="text"
          placeholder="Last Name (Default: Bhatta)"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          style={{ width: '100%', marginBottom: 10 }}
        />
        <input
          type="date"
          placeholder="Date of Birth"
          value={dob}
          onChange={(e) => setDob(e.target.value)}
          style={{ width: '100%', marginBottom: 10 }}
        />
        <button type="submit">Add Person</button>
      </form>
    </div>
  );
};

export default AddPersonPage;