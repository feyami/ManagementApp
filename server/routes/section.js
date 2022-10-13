import express from "express";
import { getSections, getSection, createSection, updateSection, deleteSection } from "../controllers/Section.js";
 
const router = express.Router();


 
router.get('/', getSections);
router.get('/:id', getSection);
router.post('/' , createSection);
router.patch('/:id', updateSection);
router.delete('/:id', deleteSection);


export default router;