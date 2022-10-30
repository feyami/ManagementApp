import{post,get,put,remove} from "./request"

export const getTasks=()=>get('/Task') ;
export const getTaskDetail=id=>get(`/Task/${id}`) ;
export const newTask=data=>post('/Task',data) ;
export const toggleCompletedStatus=(id,data)=>put(`/Task/${id}`,data) ;
export const updateTask=(id,data)=>put(`/Task/${id}`,data) ;
export const deleteTask=(id)=>remove(`/Task/${id}`) ;