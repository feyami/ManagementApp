import{post,get,put,remove} from "./request"

export const getProjects=()=>get('/Project') ;
export const getProjectDetail=id=>get(`/Project/${id}`) ;
export const newProject=data=>post('/Project',data) ;
export const toggleCompletedStatus=(id,data)=>put(`/Project/${id}`,data) ;
export const updateProject=(id,data)=>put(`/Project/${id}`,data) ;
export const deleteProject=(id)=>remove(`/Project/${id}`) ;