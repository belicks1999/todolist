// back-end/routes/tasks.js

import express from 'express';
import { Op } from 'sequelize';
import Task from '../models/Task.js';

const router = express.Router();

// Add a new task
router.post('/add', (req, res) => {
  const { title, description, userId } = req.body;
  const newTask = new Task({
    title,
    description,
    userId,
    important: false
  });
  newTask.save()
    .then(task => res.json(task))
    .catch(err => console.log(err));
});

// Get tasks for a specific user
router.get('/:userId', (req, res) => {
  Task.findAll({ where: { userId: req.params.userId } })
    .then(tasks => res.json(tasks))
    .catch(err => console.log(err));
});

// Mark a task as important
router.put('/important/:id', (req, res) => {
    Task.findByPk(req.params.id)
      .then(task => {
        if (!task) {
          return res.status(404).json({ error: 'Task not found' });
        }
        task.important = !task.important; // Toggle the important status
        return task.save()
          .then(() => res.json({ message: 'Task importance status toggled', important: task.important }))
          .catch(err => console.log(err));
      })
      .catch(err => console.log(err));
  });

// Delete a task by ID
router.delete('/delete/:id', (req, res) => {
  const taskId = req.params.id;

  Task.findByPk(taskId)
    .then(task => {
      if (!task) {
        return res.status(404).json({ error: 'Task not found' });
      }
      return task.destroy()
        .then(() => res.json({ message: 'Task deleted successfully' }))
        .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
});

// Filter tasks by today, week, important, etc.
router.get('/filter/:userId/:filter', (req, res) => {
  const { userId, filter } = req.params;
  let filterCondition = { userId };

  if (filter === 'today') {
    const today = new Date();
    filterCondition = { 
      ...filterCondition, 
      createdAt: {
        [Op.gte]: new Date(today.setHours(0, 0, 0, 0)),
        [Op.lt]: new Date(today.setHours(23, 59, 59, 999))
      }
    };
  } else if (filter === 'week') {
    const today = new Date();
    const weekStart = new Date(today.setDate(today.getDate() - today.getDay()));
    filterCondition = { 
      ...filterCondition, 
      createdAt: { 
        [Op.gte]: weekStart
      }
    };
  } else if (filter === 'important') {
    filterCondition = { 
      ...filterCondition, 
      important: true 
    };
  }

  Task.findAll({ where: filterCondition })
    .then(tasks => res.json(tasks))
    .catch(err => console.log(err));
});

export default router;
