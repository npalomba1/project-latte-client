import axios from "axios"; 
import {baseUrl} from "./baseUrl"


export const get = (route) => {
   
   let token = localStorage.getItem("authToken")
    
   return axios.get(baseUrl + route, { headers: { Authorization: `Bearer ${token}`} })
    
}

export const post = (route, body) => {; 
   
   let token = localStorage.getItem("authToken")
    
    return axios.post(baseUrl + route, body, { headers: { Authorization: `Bearer ${token}`} })
    
}


// export const signup = (body) => {
//     post("/users/signup", body)
//     .then((token)=> {

//     })
//     .catch((err)=>{
//         console.log("Error ocurred", err.message)
//     })
// }