import CustomerSchema from '../models/customerModel.js';

export const getCustomers = async (req, res) => {
    try {
        const customers = await CustomerSchema.find();
        res.status(200).json(customers);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const getCustomer = async (req, res) => {
    const { id } = req.params;
    try {
        const customer = await CustomerSchema.findById(id);
        res.status(200).json(customer);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};
 


//* Get all customers and return only the companyName and id
export const getCustomersCompanyNames = async (req, res) => {
    try {
        const customers = await CustomerSchema.find();
 
        const customersCompanyNames = customers.map(customer => {
            
            return {
                
                companyName: customer.companyName,
                _id: customer._id,
            }
        });
        res.status(200).json(customersCompanyNames);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};



export const createCustomer = async (req, res) => {
    const customer = req.body;
    const newCustomer = new CustomerSchema(customer);
    try {
        await newCustomer.save();
        res.status(201).json(newCustomer);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
};

export const updateCustomer = async (req, res) => { 
    const { id } = req.params;
    const customer = req.body;
    console.log("customer", customer);
    console.log("id", id);
    if (!CustomerSchema.findById(id)) {
        return res.status(404).json({ message: "Customer not found" });
    }
    const updatedCustomer = await CustomerSchema.findByIdAndUpdate(id, customer, { new: true });
    res.json({ data: updatedCustomer });
};

export const deleteCustomer = async (req, res) => {
    const { id } = req.params;
    if (!CustomerSchema.findById(id)) {
        return res.status(404).json({ message: "Customer not found" });
    }
    await CustomerSchema.findByIdAndRemove(id);
    res.json({ message: "Customer deleted successfully" });
};

export const deleteCustomersByIds = async (req, res) => {
    const { ids } = req.body;
    
    try{
        await CustomerSchema.deleteMany({ _id: { $in: ids } });
        res.json({ message: "Customers deleted successfully" });
    }
    catch (error) {
        res.status(409).json({ message: error.message });
    }
};

 