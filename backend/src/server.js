
const express = require('express');
const cors = require('cors');
const tasksRouter = require('./routes/tasks');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (_req, res) => res.send('HMCTS Task API'));
app.use('/api/tasks', tasksRouter);

app.get('/docs', (_req, res) => {
  res.type('text/plain').send(`
POST /api/tasks
  body: { title, description?, status: todo|in_progress|done, dueDateTime: ISO }
  201 -> created task
  400 -> validation errors
`);
});

// Only listen when running directly (not in tests)
if (require.main === module) {
  const port = process.env.PORT || 3000;
  app.listen(port, () => console.log(`API listening on http://localhost:${port}`));
}

module.exports = app;