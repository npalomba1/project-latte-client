import React from "react"; 
import { post, get } from "../authService/authService";
import { useNavigate } from "react-router-dom"

const UserDetails = () =>{

    const [username, setUsername] = React.useState('')
    const [image, setImage] = React.useState(''); 

    const navigate = useNavigate(); 


    //GET user information to show up in fields to be updated
    React.useEffect(()=>{
        get("/users/user-update")
        .then((results)=>{
            console.log(results.data)
            setUsername(results.data.username)
            setImage(results.data.profileImage)
        })
        .catch((err)=>{
            console.log(err.message)
        })
    }, []); 

    //POST user update information
    const update = (e) => {
            e.preventDefault()

            post("/users/user-update", {
                username: username,
                profileImage: image
            })
            .then(()=>navigate("/user-profile"))
            .catch((err)=>console.log(err.message))
        
    }

    const handleFileUpload = (e) =>{
        //create FormData 
        const uploadData = new FormData(); 

        uploadData.append("imageUrl", e.target.files[0])

        post('/users/signup-image', uploadData)
        .then((results)=>{
            console.log("results", results.data)
            setImage(results.data)
        })
        .catch((err)=>{
            console.log("error", err.message); 
        })
    }

    const deleteAccount = () =>{

        post("/users/delete")
        .then((results)=>{
            localStorage.clear()
            console.log("results.data.token", results.data.token)
            navigate("/")
        })
        .catch((err)=>{
            console.log("something went wrong", err.message); 
        })
    }




    return (
        <div>
            <h2>User Details</h2>
            <form onSubmit={update} method="post" action="/users/user-update">
                <label>Username</label>
                <input value={username} onChange={(e)=>setUsername(e.target.value)}/>
                <label>Profile Picture</label>
                <input type="file" onChange={(e)=>handleFileUpload(e)}/>

                <button type="submit">Update account</button>
            </form>
            <button onClick={deleteAccount}>Delete account</button>

        </div>
    )
}

export default UserDetails; 