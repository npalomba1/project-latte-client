import React from "react"; 
// import { get } from "../authService/authService"; 
import axios from 'axios'; 
import { baseUrl } from "../authService/baseUrl";
import { get } from "../authService/authService";

// baseUrl = baseUrl + "/users/user-home"
// baseUrl = get(`/users/user-home`)

const UserProfile = () => {

    const [user, setUser] = React.useState({})
    // const baseUrl = baseUrl;


    // React.useEffect(()=>{
    //     axios
    //     .get(`http://localhost:5001/users/user-home`)
    //     .then((results)=>setUser(results.data))
    //     .catch((err)=>console.log("something went wrong", err.message))
    // }, [])

    

    React.useEffect(()=>{
        const seeUser = () =>{
            get("/users/user-home")
            .then((results)=>{
                console.log(results.data)
                setUser(results.data) 
            })
            .catch((err)=>{
                console.log("Error occurred", err.message); 
            })
        }
        seeUser()
        
    }, [])

    // seeUser()


    return (
        <div>
            <h2>Welcome back, {user.username}</h2>


        </div>
    )
}

export default UserProfile; 

