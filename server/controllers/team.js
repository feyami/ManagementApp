import TeamSchema from '../models/teamModel.js';

export const getTeams = async (req, res) => {
    try {
        const teams = await TeamSchema.find().populate('skills').populate('leads').populate('members').populate('creator');
        res.status(200).json(teams);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
    };

export const getTeam = async (req, res) => {
    const { id } = req.params;
    try {
        const team = await TeamSchema.findById(id).populate('skills').populate('leads').populate('members').populate('creator');
        res.status(200).json(team);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
    };

export const createTeam = async (req, res) => {
    const team = req.body;
    const newTeam = new TeamSchema(team);
    try {
        await newTeam.save();
        res.status(201).json(newTeam);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
    };

export const updateTeam = async (req, res) => {
    const { id } = req.params;
    const team = req.body;
    if (!TeamSchema.findById(id)) {
        return res.status(404).json({ message: "Team not found" });
    }
    const updatedTeam = await TeamSchema.findByIdAndUpdate(id, team, { new: true });
    res.json({ data: updatedTeam });
    };

export const deleteTeam = async (req, res) => {
    const { id } = req.params;
    if (!TeamSchema.findById(id)) {
        return res.status(404).json({ message: "Team not found" });
    }
    await TeamSchema.findByIdAndRemove(id);
    res.json({ message: "Team deleted successfully" });
    };


