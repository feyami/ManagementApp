import ProjectSchema from '../models/projectModel.js';


//* GET all projects
export const getProjects = async (req, res) => {
    try {
        const projects = await ProjectSchema.find().populate('teams').populate('leads').populate('members').populate('sections').populate('status').populate('creator');
        res.status(200).json(projects);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

//* GET project by id
export const getProject = async (req, res) => {
    const { id } = req.params;
    try {
        const project = await ProjectSchema.findById(id).populate('teams').populate('leads').populate('members').populate('sections').populate('status').populate('creator');
        res.status(200).json(project);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

//* POST create project
export const createProject = async (req, res) => {

    const project = req.body;
    const newProject = new ProjectSchema(project);
    try {
        await newProject.save();
        res.status(201).json(newProject);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

//* PATCH update project
export const updateProject = async (req, res) => {
    const { id } = req.params;
    const project = req.body;
    if (!ProjectSchema.findById(id)) {
        return res.status(404).json({ message: "Project not found" });
    }
    const updatedProject = await ProjectSchema.findByIdAndUpdate(id, project, { new: true });
    res.json({ data: updatedProject });
}

//* DELETE delete project
export const deleteProject = async (req, res) => {
    const { id } = req.params;
    if (!ProjectSchema.findById(id)) {
        return res.status(404).json({ message: "Project not found" });
    }
    await ProjectSchema.findByIdAndRemove(id);
    res.json({ message: "Project deleted successfully" });
}

