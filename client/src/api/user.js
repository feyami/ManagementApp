import{post,get,put,remove} from "./request"

export const getUsers=()=>get('/User') ;
export const getUserDetail=id=>get(`/User/${id}`) ;
export const newUser=data=>post('/User',data) ;
export const toggleCompletedStatus=(id,data)=>put(`/User/${id}`,data) ;
export const updateUser=(id,data)=>put(`/User/${id}`,data) ;
export const deleteUser=(id)=>remove(`/User/${id}`) ;