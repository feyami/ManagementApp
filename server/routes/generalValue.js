import express from "express";
import { getGeneralValues, getGeneralValue, createGeneralValue, updateGeneralValue, deleteGeneralValue } from "../controllers/generalValue.js";

const router = express.Router();

router.get('/', getGeneralValues);
router.get('/:id', getGeneralValue);
router.post('/' , createGeneralValue);
router.patch('/:id', updateGeneralValue);
router.delete('/:id', deleteGeneralValue);

export default router;


