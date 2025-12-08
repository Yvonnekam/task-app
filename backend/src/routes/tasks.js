
const express = require('express');
const db = require('../db');
const { createTaskSchema } = require('../validators');

const router = express.Router();

router.get('/', (req, res) => {
  db.all('SELECT * FROM tasks ORDER BY createdAt DESC', [], (err, rows) => {
    if (err) {
      return res.status(500).json({ status: 500, message: 'Database error' });
    }
    res.json(rows);
  });
});

router.post('/', (req, res) => {
  const parse = createTaskSchema.safeParse(req.body);
  if (!parse.success) {
    return res.status(400).json({
      status: 400,
      message: 'Validation failed',
      errors: parse.error.issues.map(i => `${i.path.join('.')} : ${i.message}`)
    });
  }

  const { title, description, status, dueDateTime } = parse.data;
  const due = new Date(dueDateTime);
  if (isNaN(due.getTime()) || due <= new Date()) {
    return res.status(400).json({ status: 400, message: 'dueDateTime must be in the future' });
  }

  const nowIso = new Date().toISOString();

  const stmt = db.prepare(
    `INSERT INTO tasks (title, description, status, dueDateTime, createdAt, updatedAt)
     VALUES (?, ?, ?, ?, ?, ?)`
  );

  stmt.run(title, description ?? null, status, due.toISOString(), nowIso, nowIso, function (err) {
    if (err) {
      return res.status(500).json({ status: 500, message: 'Database error' });
    }
    const id = this.lastID;
    db.get(`SELECT * FROM tasks WHERE id = ?`, [id], (err, row) => {
      if (err) return res.status(500).json({ status: 500, message: 'Database error' });
      return res.status(201).json(row);
    });
  });
});

module.exports = router;
``
