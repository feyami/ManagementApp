import express from "express";
import { getUsers, getUser, createUser, updateUser, deleteUser,generateRandomData,getUsersBySearch } from "../controllers/user.js";
 
const router = express.Router();


 
router.get('/', getUsers);
router.get('/:id', getUser);
router.post('/' , createUser);
router.patch('/:id', updateUser);
router.delete('/:id', deleteUser);
router.get('/getSpecific/generateRandomData', generateRandomData);
router.get('/getSpecific/getUsersBySearch', getUsersBySearch);


export default router;