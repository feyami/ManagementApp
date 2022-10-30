import{post,get,put,remove} from "./request"

export const getContacts=()=>get('/Contact') ;
export const getContactDetail=id=>get(`/Contact/${id}`) ;
export const newContact=data=>post('/Contact',data) ;
export const getCustomersCompanyNames=()=>get('/Contact/customersCompanyNames') ;
export const updateContact=(id,data)=>put(`/Contact/${id}`,data) ;
export const deleteContact=(id)=>remove(`/Contact/${id}`) ;
export const deleteContacts=()=>remove('/Contact') ;

