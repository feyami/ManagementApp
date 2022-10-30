import{post,get,put,remove} from "./request"

export const getTeams=()=>get('/Team') ;
export const getTeamDetail=id=>get(`/Team/${id}`) ;
export const newTeam=data=>post('/Team',data) ;
export const toggleCompletedStatus=(id,data)=>put(`/Team/${id}`,data) ;
export const updateTeam=(id,data)=>put(`/Team/${id}`,data) ;
export const deleteTeam=(id)=>remove(`/Team/${id}`) ;