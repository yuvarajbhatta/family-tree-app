const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../db');
require('dotenv').config();

// REGISTER
router.post('/register', async (req, res) => {
  const { username, email, password, role } = req.body;
  try {
    console.log('Register request body:', req.body);
    if (['admin', 'editor'].includes(role) && email !== 'yuva@example.com') {
      return res.status(403).json({ error: 'To create an admin/editor account, reach out to yuvarajbhatta@gmail.com' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    await db.query(
      'INSERT INTO users (username, email, password_hash, role) VALUES ($1, $2, $3, $4)',
      [username, email, hashedPassword, role || 'viewer']
    );
    console.log('User registered:', email);
    res.status(201).json({ message: 'User registered successfully!' });
  } catch (err) {
  if (err.code === '23505') {
    // Unique violation — likely email already exists
    return res.status(409).json({ error: 'Email is already registered' });
  }

  console.error('Registration Error:', err.message);
  res.status(500).json({ error: 'Registration failed' });
}
});

// LOGIN
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const result = await db.query('SELECT * FROM users WHERE email = $1', [email]);
    const user = result.rows[0];
    if (!user) return res.status(401).json({ error: 'Invalid email or password' });

    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) return res.status(401).json({ error: 'Invalid email or password' });

    const token = jwt.sign(
      { id: user.id, username: user.username, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '2h' }
    );

    res.json({ message: 'Login successful', token , role: user.role , username: user.username });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Login failed' });
  }
});
// DELETE PERSON (for cleaning dummy data)
router.delete('/person/:id', async (req, res) => {
  const personId = req.params.id;
  try {
    await db.query('DELETE FROM persons WHERE id = $1', [personId]);
    res.json({ message: 'Person deleted successfully' });
  } catch (err) {
    console.error('Delete Person Error:', err.message);
    res.status(500).json({ error: 'Failed to delete person' });
  }
});

module.exports = router;