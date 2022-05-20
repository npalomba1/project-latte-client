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
        <div className="home-page">
            <header className="home-header">
            <h1>Welcome to CaffeIndex</h1>
            <img src="cup.png" alt="spilled coffee" />
            </header>
            <section className="about-card">
                <h3>What is CaffeIndex?</h3>
                <p>CaffeIndex is the tool to use for new coffee enthusiasts!</p>
                <p>Study different types of classic coffee drinks, build your own to your preference, and reference it at your next coffee run.</p>
            </section>
        </div>
    )
}


export default Home;