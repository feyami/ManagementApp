import express from "express";
import { getUsers, getUser, createUser, updateUser, deleteUser,generateRandomData } from "../controllers/user.js";
 
const router = express.Router();


 
router.get('/', getUsers);
router.get('/:id', getUser);
router.post('/' , createUser);
router.patch('/:id', updateUser);
router.delete('/:id', deleteUser);
router.get('/getSpecific/generateRandomData', generateRandomData);


export default router;