import{post,get,put,remove} from "./request"

export const getSections=()=>get('/Section') ;
export const getSectionDetail=id=>get(`/Section/${id}`) ;
export const newSection=data=>post('/Section',data) ;
export const toggleCompletedStatus=(id,data)=>put(`/Section/${id}`,data) ;
export const updateSection=(id,data)=>put(`/Section/${id}`,data) ;
export const deleteSection=(id)=>remove(`/Section/${id}`) ;