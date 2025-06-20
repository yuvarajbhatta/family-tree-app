var express = require('express');
var router = express.Router();
const db = require('../db'); // Ensure this is pointing to your db.js

router.get('/', async function(req, res, next) {
  try {
    const result = await db.query('SELECT NOW()');
    res.json({ message: 'DB connected!', time: result.rows[0].now });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'DB connection failed' });
  }
});

module.exports = router;