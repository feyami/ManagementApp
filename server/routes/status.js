import express from "express";
import { getStatuss, getStatus, createStatus, updateStatus, deleteStatus } from "../controllers/Status.js";
 
const router = express.Router();


 
router.get('/', getStatuss);
router.get('/:id', getStatus);
router.post('/' , createStatus);
router.patch('/:id', updateStatus);
router.delete('/:id', deleteStatus);


export default router;