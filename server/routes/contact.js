import express from "express";
import { getContacts, getContact, createContact, updateContact, deleteContact, deleteContactsByIds } from "../controllers/Contact.js";

const router = express.Router();

router.get('/', getContacts);
router.get('/:id', getContact);
router.post('/' , createContact);
router.put('/:id', updateContact);
router.delete('/:id', deleteContact);
//* Delete contacts by ids
router.delete('/', deleteContactsByIds);

export default router;