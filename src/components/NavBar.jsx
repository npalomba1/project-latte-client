import React from 'react'; 
import { Routes, Route, Link, useNavigate } from "react-router-dom";  

const NavBar = () =>{

    const navigate = useNavigate(); 

    let token = localStorage.getItem("authToken")
    console.log("TOKEN", token)

    function logout () {
        localStorage.clear()
        navigate('/')
    }

    return (
    <div className="navbar">
        <img src="cup.png" alt="spilled coffee" />
        {token ? (
        <nav>
          <Link to="/user-profile">Home</Link>
          <Link to="/drink-builder">Drink Builder</Link>
          <Link to="/user-details">Account Details</Link>
          {/* <Link to="/login">Login</Link> */}
          <button onClick={logout}>Log out</button>
        </nav>
         ) : (
        <nav>
          <Link to="/">Home</Link>
          <Link to="/signup">Signup</Link>
          <Link to="/login">Login</Link>
          {/* <Link to="/login">Login</Link> */}
        </nav>
         )}
    </div>
    )
         }


export default NavBar; 