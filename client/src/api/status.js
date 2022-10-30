import{post,get,put,remove} from "./request"

export const getStatuses=()=>get('/Status') ;
export const getStatusDetail=id=>get(`/Status/${id}`) ;
export const newStatus=data=>post('/Status',data) ;
export const toggleCompletedStatus=(id,data)=>put(`/Status/${id}`,data) ;
export const updateStatus=(id,data)=>put(`/Status/${id}`,data) ;
export const deleteStatus=(id)=>remove(`/Status/${id}`) ;