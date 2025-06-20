import React, { useEffect, useState } from 'react';

const UserStatus = () => {
  const [username, setUsername] = useState(localStorage.getItem('username') || 'Unknown');
  const [role, setRole] = useState(localStorage.getItem('role') || 'guest');

  useEffect(() => {
    const handleStorageChange = () => {
      setUsername(localStorage.getItem('username') || 'Unknown');
      setRole(localStorage.getItem('role') || 'guest');
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  return (
    <div style={{ textAlign: 'right', padding: '10px', fontSize: '0.9em', color: '#444' }}>
      Logged in as: <strong>{username} ({role})</strong>
    </div>
  );
};

export default UserStatus;