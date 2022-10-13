import SectionScheme from '../models/section';

export const getSections = async (req, res) => {
    try {
        const sections = await SectionScheme.find().populate('status').populate('project').populate('tasks').populate('teams').populate('leads').populate('members').populate('creator');
        res.status(200).json(sections);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const getSection = async (req, res) => {
    const { id } = req.params;
    try {
        const section = await SectionScheme.findById(id).populate('status').populate('project').populate('tasks').populate('teams').populate('leads').populate('members').populate('creator');
        res.status(200).json(section);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const createSection = async (req, res) => {
    const section = req.body;
    const newSection = new SectionScheme(section);
    try {
        await newSection.save();
        res.status(201).json(newSection);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
};

export const updateSection = async (req, res) => {
    const { id } = req.params;
    const section = req.body;
    if (!SectionScheme.findById(id)) {
        return res.status(404).json({ message: "Section not found" });
    }
    const updatedSection = await SectionScheme.findByIdAndUpdate(id, section, { new: true });
    res.json({ data: updatedSection });
};

export const deleteSection = async (req, res) => {
    const { id } = req.params;
    if (!SectionScheme.findById(id)) {
        return res.status(404).json({ message: "Section not found" });
    }
    await SectionScheme.findByIdAndRemove(id);
    res.json({ message: "Section deleted successfully" });
};




