import{post,get,put,remove} from "./request"

export const getSkills=()=>get('/Skill') ;
export const getSkillDetail=id=>get(`/Skill/${id}`) ;
export const newSkill=data=>post('/Skill',data) ;
export const toggleCompletedStatus=(id,data)=>put(`/Skill/${id}`,data) ;
export const updateSkill=(id,data)=>put(`/Skill/${id}`,data) ;
export const deleteSkill=(id)=>remove(`/Skill/${id}`) ;