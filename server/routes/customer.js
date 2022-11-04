import express from "express";
import { getCustomers, getCustomer, createCustomer, updateCustomer, deleteCustomer, deleteCustomersByIds, getCustomersCompanyNames } from "../controllers/customer.js";

const router = express.Router();

router.get('/', getCustomers);
router.get('/:id', getCustomer);
router.post('/' , createCustomer);
router.put('/:id', updateCustomer);
router.delete('/:id', deleteCustomer);
router.delete('/', deleteCustomersByIds);
//* Get all customers and return only the companyName and id
router.get('/getSpecific/companyNames', getCustomersCompanyNames);



export default router;


