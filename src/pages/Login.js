import React from "react"; 
import { post } from "../authService/authService";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');

    const navigate = useNavigate(); 

    const loginAccount = (e) =>{
        e.preventDefault(); 

        post("/users/login", {
            username: username,
            password: password
        })
        .then((results)=>{
            localStorage.setItem("authToken", results.data.token)
            navigate("/user-profile"); 
        })
        .catch((err)=>{
            console.log("something went wrong", err.message)
        })



    }

    return (
        <div >
            <h1>Login</h1>
            <form onSubmit={loginAccount} className="login">
                <label>Username</label>
                <input onChange={(e)=>setUsername(e.target.value)} value={username}/>
                <label>Password</label>
                <input onChange={(e)=>setPassword(e.target.value)} value={password} type="password"/>

                <button type="submit">Log in</button>
            </form>
        </div>
    )
}


export default Login;