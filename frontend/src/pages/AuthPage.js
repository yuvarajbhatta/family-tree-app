import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('viewer');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  React.useEffect(() => {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');
    if (token && username) {
      navigate('/dashboard');
    }
  }, []);

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setUsername('');
    setEmail('');
    setPassword('');
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      if (isLogin) {
        const res = await axios.post('http://localhost:5050/api/login', { email, password });
        console.log('Login response:', res.data);
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('username', res.data.username);
        localStorage.setItem('role', res.data.role);
        setEmail('');
        setPassword('');
        navigate('/dashboard');
      } else {
        await axios.post('http://localhost:5050/api/register', { username, email, password, role });
        setIsLogin(true); // After registering, go to login
        setUsername('');
        setEmail('');
        setPassword('');
        setRole('viewer');
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Something went wrong');
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: 'auto', padding: '2rem' }}>
      {localStorage.getItem('username') && (
        <div style={{ marginBottom: 10 }}>
          Logged in as: {localStorage.getItem('username')} ({localStorage.getItem('role')})
          <button
            style={{ marginLeft: 10 }}
            onClick={() => {
              localStorage.clear();
              navigate('/');
            }}
          >
            Logout
          </button>
        </div>
      )}
      <h2>{isLogin ? 'Login' : 'Register'}</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        {!isLogin && (
          <>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              style={{ width: '100%', marginBottom: 10 }}
            />
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              style={{ width: '100%', marginBottom: 10 }}
            >
              <option value="viewer">Viewer</option>
              <option value="editor">Editor</option>
              <option value="admin">Admin</option>
            </select>
          </>
        )}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ width: '100%', marginBottom: 10 }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ width: '100%', marginBottom: 10 }}
        />
        <button type="submit">{isLogin ? 'Login' : 'Register'}</button>
      </form>

      <p style={{ marginTop: 10 }}>
        {isLogin ? 'New here?' : 'Already have an account?'}{' '}
        <button type="button" onClick={toggleMode} style={{ color: 'blue', background: 'none', border: 'none' }}>
          {isLogin ? 'Register instead' : 'Login instead'}
        </button>
      </p>
    </div>
  );
};

export default AuthPage;