import ContactSchema from '../models/contactModel.js';

export const getContacts = async (req, res) => {
    
    try {
        const contacts = await ContactSchema.find();
        res.status(200).json(contacts);
         
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const getContact = async (req, res) => {
    const { id } = req.params;
    try {
        const contact = await ContactSchema.findById(id);
        res.status(200).json(contact);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const createContact = async (req, res) => {
     
    const contact = req.body;
    const newContact = new ContactSchema(contact);
    try {
        await newContact.save();
        res.status(201).json(newContact);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
};

export const updateContact = async (req, res) => {
     
    const { id } = req.params;
    const contact = req.body;
    if (!ContactSchema.findById(id)) {
        return res.status(404).json({ message: "Contact not found" });
    }
    const updatedContact = await ContactSchema.findByIdAndUpdate(id, contact, { new: true });
    res.json({ data: updatedContact });
};

export const deleteContact = async (req, res) => {
    const { id } = req.params;
    if (!ContactSchema.findById(id)) {
        return res.status(404).json({ message: "Contact not found" });
    }
    await ContactSchema.findByIdAndRemove(id);
    res.json({ message: "Contact deleted successfully" });
};

//* Delete contacts by ids
export const deleteContactsByIds = async (req, res) => {
    const { ids } = req.body;
    try{
        await ContactSchema.deleteMany({ _id: { $in: ids } });
        res.json({ message: "Contacts deleted successfully" });
    }
    catch(error){
        res.status(409).json({ message: error.message });
    }
}