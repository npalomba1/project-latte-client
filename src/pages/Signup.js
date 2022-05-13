import React from "react"; 
// import axios from "axios";
import { post } from "../authService/authService"
import { useNavigate } from "react-router-dom"; 

const Signup = () => {

    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    // const [statusMessage, setStatusMessage] = React.useState('')

    const navigate = useNavigate()

    //add checkFields function 

    //axios call to backend 
    const register = (e) => {
        console.log("signup", username, password); 
        e.preventDefault();
        post("/users/signup", {
            username: username,
            password: password
        })
        .then((results)=>{
            console.log("results", results.data.token)
            localStorage.setItem("authToken", results.data.token)
            navigate("/")
        })
        .catch((err)=>{
            console.log("Error occurred", err.message); 
        })
    }

    // const checkFields = (e) => {
    //     e.preventDefault();

    //     if (username.length < 4){
    //         setErrorMessage("user")
    //     }
    // }


    return (
        <div>
            <h1>This is Signup</h1>
            <div className="signup-form">
                <form onSubmit={register} method="post" action="/users/signup">
                    <label>Username</label>
                    <input value={username} onChange={(e)=>setUsername(e.target.value)}/>
                    <label>Password</label>
                    <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)}/>

                    <button type="submit">Sign up</button>



                </form>

            </div>
        </div>
    )
}


export default Signup;