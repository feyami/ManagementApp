import generalValueSchema from '../models/generalValueModel.js';

export const getGeneralValues = async (req, res) => {
    try {
        const generalValues = await generalValueSchema.find();
        res.status(200).json(generalValues);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const getGeneralValue = async (req, res) => {
    const { id } = req.params;
    try {
        const generalValue = await generalValueSchema.findById(id);
        res.status(200).json(generalValue);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const createGeneralValue = async (req, res) => {
    const generalValue = req.body;
    const newGeneralValue = new generalValueSchema(generalValue);
    try {
        await newGeneralValue.save();
        res.status(201).json(newGeneralValue);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
};

export const updateGeneralValue = async (req, res) => {
    const { id } = req.params;
    const generalValue = req.body;
    if (!generalValueSchema.findById(id)) {
        return res.status(404).json({ message: "GeneralValue not found" });
    }
    const updatedGeneralValue = await generalValueSchema.findByIdAndUpdate(id, generalValue, { new: true });
    res.json({ data: updatedGeneralValue });
};

export const deleteGeneralValue = async (req, res) => {
    const { id } = req.params;
    if (!generalValueSchema.findById(id)) {
        return res.status(404).json({ message: "GeneralValue not found" });
    }
    await generalValueSchema.findByIdAndRemove(id);
    res.json({ message: "GeneralValue deleted successfully" });
};

