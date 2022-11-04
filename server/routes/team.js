import express from "express";
import { getTeams, getTeam, createTeam, updateTeam, deleteTeam } from "../controllers/team.js";
 
const router = express.Router();


 
router.get('/', getTeams);
router.get('/:id', getTeam);
router.post('/' , createTeam);
router.patch('/:id', updateTeam);
router.delete('/:id', deleteTeam);


export default router;