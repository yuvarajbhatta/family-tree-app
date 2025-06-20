const express = require('express');
const router = express.Router();
const db = require('../db');
const authenticateToken = require('../middleware/auth');

// POST /api/person - Add a person to the family tree
router.post('/person', authenticateToken, async (req, res) => {
  const { first_name, middle_name, last_name, dob } = req.body;
  const created_by = req.user.id;

  try {
    const result = await db.query(
      'INSERT INTO persons (first_name, middle_name, last_name, dob, created_by) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [first_name, middle_name, last_name, dob, created_by]
    );
    res.status(201).json({ message: 'Person added', person: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to add person' });
  }
});

// GET /api/people - Retrieve all people in the family tree
router.get('/people', authenticateToken, async (req, res) => {
  try {
    const result = await db.query(
      'SELECT id, first_name, middle_name, last_name, dob FROM persons ORDER BY id ASC'
    );
    res.json(result.rows);
  } catch (err) {
    console.error('Error loading people:', err.message);
    res.status(500).json({ error: 'Failed to fetch people' });
  }
});

// DELETE /api/person/:id - Remove a person from the family tree
router.delete('/person/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;

  try {
    const result = await db.query('DELETE FROM persons WHERE id = $1 RETURNING *', [id]);

    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Person not found' });
    }

    res.json({ message: 'Person deleted', person: result.rows[0] });
  } catch (err) {
    console.error('Error deleting person:', err.message);
    res.status(500).json({ error: 'Failed to delete person' });
  }
});

module.exports = router;