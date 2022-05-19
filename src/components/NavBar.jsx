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
    <div>
        {token ? (
        <nav>
          <Link to="/user-profile">Home</Link>
          <Link to="/drink-builder">Drink Builder</Link>
          <Link to="/user-details">Account Details</Link>
          <button onClick={logout}>Log out</button>
          {/* <Link to="/login">Login</Link> */}
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