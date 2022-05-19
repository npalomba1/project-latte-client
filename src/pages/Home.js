import React from "react"; 
import {get} from "../authService/authService"; 
import { Routes, Route, Link } from "react-router-dom";  

const Home = () => {

    React.useEffect(()=>{
        let token = localStorage.getItem("authToken");
        console.log("this is the token", token); 
        get("/users/login/test")
        .then((results)=>{
            console.log("Are we logged in", results.data)
        })
        .catch((err)=>{
            console.log(err.message); 
        })
    }, [])
    return (
        <div>
            <h1>Welcome to CaffeIndex</h1>
        </div>
    )
}


export default Home;