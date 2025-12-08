
const request = require('supertest');
const app = require('../src/server');

describe('POST /api/tasks', () => {
  test('creates a task', async () => {
    const due = new Date(Date.now() + 3600_000).toISOString();
    const res = await request(app).post('/api/tasks').send({
      title: 'Review case ABC123',
      status: 'todo',
      dueDateTime: due
    });
    expect(res.status).toBe(201);
    expect(res.body.title).toBe('Review case ABC123');
    expect(res.body.status).toBe('todo');
  });

  test('rejects invalid status', async () => {
    const due = new Date(Date.now() + 3600_000).toISOString();
    const res = await request(app).post('/api/tasks').send({
      title: 'X',
      status: 'invalid',
      dueDateTime: due
    });
    expect(res.status).toBe(400);
  });

  test('rejects past due date', async () => {
    const past = new Date(Date.now() - 3600_000).toISOString();
    const res = await request(app).post    const res = await request(app).post('/api/tasks').send({
      title: 'X',
      status: 'todo',
      dueDateTime: past
    });
    expect(res.status).toBe(400);
  });
