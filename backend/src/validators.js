const { z } = require('zod');

const createTaskSchema = z.object({
  title: z.string().min(1).max(255),
   description: z.string().max(1000).optional(),
  status: z.enum(['todo', 'in_progress', 'done']),
  // Accepts ISO date-time strings; we also re-check "future" in the route
  dueDateTime: z.string().datetime()
});

module.exports = { createTaskSchema }; 
