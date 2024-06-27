const express = require('express');
const router = express.Router();

// array task example
let tasks = [
    { "id": "1", "TaskName": "t1", "Tasktime": "1min" },
    { "id": "2", "TaskName": "t2", "Tasktime": "2min" },
    { "id": "3", "TaskName": "t3", "Tasktime": "3min" }
];

// GET all tasks
router.get('/task', (req, res) => {
    res.json(tasks);
});

// GET task by ID
router.get('/task/:id', (req, res) => {
    const taskId = req.params.id;
    const task = tasks.find(task => task.id === taskId);

    if (task) {
        res.status(200).json(task);
    } else {
        res.status(404).json({ error: "Task not found" });
    }
});

// POST a new task
router.post('/task', (req, res) => {
    const task = req.body;
    tasks.push(task);
    res.status(201).json({ msg: "Successfully added" });
});

// PUT (update,new array added) a task
router.put('/task/:id', (req, res) => {
    const taskId = req.params.id;
    const updatedTask = req.body;

    tasks = tasks.map(task => {
        if (task.id === taskId) {
            return updatedTask;
        } else {
            return task;
        }
    });

    res.status(200).json({ msg: "Successfully updated" });
});

// PATCH (partial update) a task
router.patch('/task/:id', (req, res) => {
    const taskId = req.params.id;
    const updates = req.body;

    tasks = tasks.map(task => {
        if (task.id === taskId) {
            return { ...task, ...updates };
        } else {
            return task;
        }
    });

    res.status(200).json({ msg: "Successfully updated" });
});

// DELETE a task
router.delete('/task/:id', (req, res) => {
    const taskId = req.params.id;
    tasks = tasks.filter(task => task.id !== taskId);
    res.status(200).json({ msg: "Successfully deleted" });
});

module.exports = router;
