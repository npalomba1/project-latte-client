import React from "react";
// import { get } from "../authService/authService";
import axios from "axios";
import { baseUrl } from "../authService/baseUrl";
import { get } from "../authService/authService";

// baseUrl = baseUrl + "/users/user-home"
// baseUrl = get(`/users/user-home`)

const UserProfile = () => {
    const [user, setUser] = React.useState({});
    const [drinks, setDrinks] = React.useState([]);
    // const baseUrl = baseUrl;

    // React.useEffect(()=>{
    //     axios
    //     .get(`http://localhost:5001/users/user-home`)
    //     .then((results)=>setUser(results.data))
    //     .catch((err)=>console.log("something went wrong", err.message))
    // }, [])

    //GET USER PROFILE INFORMATION
    React.useEffect(() => {
        // const seeUser = () =>{
        get("/users/user-home")
            .then((results) => {
                console.log(results.data);
                setUser(results.data);
            })
            .catch((err) => {
                console.log("Error occurred", err.message);
            });
        // }
        // seeUser()
    }, []);

    //GET USER'S DRINKS
    React.useEffect(() => {
        get("/users/user-profile/users-drinks")
            .then((results) => {
                console.log(results.data)
                setDrinks(results.data);
            })
            .catch((error) => {
                console.log("something went wrong loading the user's drinks", error.message)
            })
    }, []);


    return (
        <div>
            <header>
                <h2>Welcome back, {user.username}</h2>
                <img src={user.profileImage} alt="profile" />
            </header>
            <section>
                <h4>Your drinks</h4>
                {drinks.map((drink) => {

                    return (
                        <div className="user-drink">
                            <h5>{drink.name} | <em>{drink.title}</em></h5>
                            <p>see drink</p>
                        </div>
                    )
                })}


            </section>
        </div>
    );
};

export default UserProfile;
