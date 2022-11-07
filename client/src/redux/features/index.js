//* index file for calling all slices from one place
import { useSelector, useDispatch } from "react-redux";
import * as projectSlice from "./project/projectSlice";
import * as contactSlice from "./contact/contactSlice";
import * as customerSlice from "./customer/customerSlice";
import * as globalValuesSlice from "./globalValues";


export const useProjectSlice = () => {
    const dispatch = useDispatch();
    const { getProjects, getProjectsNames, getProjectsByCustomer, updateProject, deleteProject } = projectSlice;
    const { setProject,filterProjectByGivenValue } = globalValuesSlice;
    const project = useSelector((state) => state.project.project);
    const projects= useSelector((state) => state.project.projects);
    return {
        project,
        projects,
        getProjects: () => dispatch(getProjects()),
        getProjectsNames: () => dispatch(getProjectsNames()),
        getProjectsByCustomer: (id) => dispatch(getProjectsByCustomer(id)),
        updateProject: (data) => dispatch(updateProject(data)),
        deleteProject: (id) => dispatch(deleteProject(id)),
        setProject: (data) => dispatch(setProject(data)),
        filterProjectByGivenValue: (data) => dispatch(filterProjectByGivenValue(data))
    };
};

export const useContactSlice = () => {
    const dispatch = useDispatch();
    const { getContacts, getContactsByCustomer, getContactsByProject, updateContact, deleteContact } = contactSlice;
    const { setContact } = globalValuesSlice;
    const contact = useSelector((state) => state.contact.contact);
    const contacts = useSelector((state) => state.contact.contacts);
    return {
        contact,
        contacts,
        getContacts: () => dispatch(getContacts()),
        getContactsByCustomer: (id) => dispatch(getContactsByCustomer(id)),
        getContactsByProject: (id) => dispatch(getContactsByProject(id)),
        updateContact: (data) => dispatch(updateContact(data)),
        deleteContact: (id) => dispatch(deleteContact(id)),
        setContact: (data) => dispatch(setContact(data)),
    };
};

export const useCustomerSlice = () => {
    const dispatch = useDispatch();
    const { getCustomers, getCustomersNames, updateCustomer, deleteCustomer } = customerSlice;
    const { setCustomer } = globalValuesSlice;
    const customer = useSelector((state) => state.customer.customer);
    const customers = useSelector((state) => state.customer.customers);
    return {
        customer,
        customers,
        getCustomers: () => dispatch(getCustomers()),
        getCustomersNames: () => dispatch(getCustomersNames()),
        updateCustomer: (data) => dispatch(updateCustomer(data)),
        deleteCustomer: (id) => dispatch(deleteCustomer(id)),
        setCustomer: (data) => dispatch(setCustomer(data)),
    };
};


 

 


