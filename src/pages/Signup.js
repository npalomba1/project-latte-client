import React from "react"; 
// import axios from "axios";
import { post } from "../authService/authService"
import { useNavigate } from "react-router-dom"; 
// import { post} from "../authService/authService"; 

const Signup = () => {

    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [image, setImage] = React.useState('');
    const [statusMessage, setStatusMessage] = React.useState('')
    // const [statusMessage, setStatusMessage] = React.useState('')

    const navigate = useNavigate()

    //add checkFields function 

    //axios call to backend 
    const register = (e) => {
        // console.log("signup", username, password); 
        e.preventDefault();
        
        checkFields(e);

        post("/users/signup", {
            username: username,
            password: password,
            profileImage: image
        })
        .then((results)=>{
            console.log("results", results.data.token)
            localStorage.setItem("authToken", results.data.token)
            navigate("/user-profile")
        })
        .catch((err)=>{
            console.log("Error occurred", err.message); 
        })
    }

    const checkFields = (e) => {
        e.preventDefault();

        if (username.length < 4){
            setStatusMessage("username must be at least 4 characters")
        } else if (password.length < 6) {
            setStatusMessage("Password must be at least 6 characters")
        } else if (password === 'password') {
            setStatusMessage(`You can't call the password "password"`)
        }
    }

    const handleFileUpload = (e) =>{
        //create FormData
        const uploadData = new FormData()

        uploadData.append("imageUrl", e.target.files[0])

        post("/users/signup-image", uploadData)
        .then((results)=>{
            console.log("results", results.data)
            setImage(results.data)
        })
        .catch((err)=>{
            console.log("error", err.message); 
        })
    }


    return (
        <div>
            <h1>Signup</h1>
            <div className="signup-form" >
                <form onSubmit={register} method="post" action="/users/signup" class="login">
                    <label>Username</label>
                    <input value={username} onChange={(e)=>setUsername(e.target.value)}/>
                    <label>Password</label>
                    <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
                    <label>Profile Picture</label>
                    <input type="file" onChange={(e)=>handleFileUpload(e)}/>
                    <button type="submit">Sign up</button>



                </form>

                <p>{statusMessage}</p>

            </div>
        </div>
    )
}


export default Signup;