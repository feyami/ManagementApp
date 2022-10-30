import TaskSchema from '../models/taskModel.js';

export const getTasks = async (req, res) => {
    try {
        const tasks = await TaskSchema.find().populate('status').populate('section').populate('project').populate('teams').populate('leads').populate('members').populate('creator');
        res.status(200).json(tasks);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
    };

export const getTask = async (req, res) => {
    const { id } = req.params;
    try {
        const task = await TaskSchema.findById(id).populate('status').populate('section').populate('project').populate('teams').populate('leads').populate('members').populate('creator');
        res.status(200).json(task);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
    };

export const createTask = async (req, res) => {
    const task = req.body;
    const newTask = new TaskSchema(task);
    try {
        await newTask.save();
        res.status(201).json(newTask);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
    };

export const updateTask = async (req, res) => {
    const { id } = req.params;
    const task = req.body;
    if (!TaskSchema.findById(id)) {
        return res.status(404).json({ message: "Task not found" });
    }
    const updatedTask = await TaskSchema.findByIdAndUpdate(id, task, { new: true });
    res.json({ data: updatedTask });
    };

export const deleteTask = async (req, res) => {
    const { id } = req.params;
    if (!TaskSchema.findById(id)) {
        return res.status(404).json({ message: "Task not found" });
    }
    await TaskSchema.findByIdAndRemove(id);
    res.json({ message: "Task deleted successfully" });
    };



