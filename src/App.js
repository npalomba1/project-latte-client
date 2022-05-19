import React from "react";
import "./App.css";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import NotFound from "./pages/NotFound"
// import LandingPage from "./pages/LandingPage";
import DrinkBuilder from "./pages/DrinkBuilder";
import DrinkDetails from "./pages/DrinkDetails";
import UserProfile from "./pages/UserProfile";

import NavBar from "./components/NavBar"; 


function App() {

  

  let token = localStorage.getItem("authToken")
  console.log("TOKEN", token)

  return (
    <div>
      <header>
        <NavBar/>
      </header>
      


      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/user-profile' element={<UserProfile/>}/>
        <Route path='/drink-builder' element={<DrinkBuilder/>}/>
        <Route path='/create-drink/:isHot/:id' element={<DrinkDetails/>}/>
        <Route path='*' element={<NotFound/>}/>
      </Routes>
    </div>
  );
}

export default App;
