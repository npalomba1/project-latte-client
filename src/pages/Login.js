import React from "react"; 
import { post } from "../authService/authService";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [statusMessage, setStatusMessage] = React.useState('')

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
            setStatusMessage('username or password incorrect')
        })

        checkFields(e)
    }

    const checkFields = (e) => {
        e.preventDefault();

        if (username.length === 0){
            setStatusMessage("username or password required")
        } else if (password.length === 0) {
            setStatusMessage("username or password required")
        } else if (password === 'password') {
            setStatusMessage(`You can't call the password "password"`)
        
        }
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
            <p>{statusMessage}</p>
        </div>
    )
}


export default Login;