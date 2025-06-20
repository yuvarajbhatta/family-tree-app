const express = require('express');
const router = express.Router();
const db = require('../db');
const authenticateToken = require('../middleware/auth');

// POST /api/relationship
router.post('/relationship', authenticateToken, async (req, res) => {
  const { person_id, related_to_id, relation_type } = req.body;
  try {
    const result = await db.query(
      'INSERT INTO relationships (person_id, related_to_id, relation_type) VALUES ($1, $2, $3) RETURNING *',
      [person_id, related_to_id, relation_type]
    );
    res.status(201).json({ message: 'Relationship created', relationship: result.rows[0] });
  } catch (err) {
    console.error('Relationship error:', err);
    res.status(500).json({ error: 'Failed to create relationship' });
  }
});

module.exports = router;