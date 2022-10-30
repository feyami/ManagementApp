import{post,get,put,remove} from "./request"

export const getCustomers =()=>get('/Customer') ;
export const getCustomerDetail=id=>get(`/Customer/${id}`) ;
export const newCustomer=data=>post('/Customer',data) ;
export const getCustomersCompanyNames=()=>get('/Customer/getSpecific/companyNames') ;
export const updateCustomer=(id,data)=>put(`/Customer/${id}`,data) ;
export const deleteCustomer=(id)=>remove(`/Customer/${id}`) ;
export const deleteCustomers=()=>remove('/Customer') ;



 
