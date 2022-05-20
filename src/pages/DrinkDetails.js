import React from "react";
import axios from "axios"
import DrinkBuilder from "./DrinkBuilder";
import { useParams, useNavigate } from "react-router-dom";
import DropDown from "../components/DropDown"
import { post } from "../authService/authService"

const DrinkDetails = () =>{

    const [coffee, setCoffee] = React.useState({})
    const [flavor, setFlavor] = React.useState("");
    const [alternativeMilk, setAlternativeMilk] = React.useState("");
    const [name, setName] = React.useState("");

    const params = useParams()
    const navigate = useNavigate()

    React.useEffect(() => {
        axios
          .get(`https://api.sampleapis.com/coffee/${params.isHot}/${params.id}`)
          .then((results) => {
            setCoffee(results.data)
          })
          .catch((error) => {
            console.log(error.message);
          });
      }, []);

      const flavorHandleChange = (e) =>{
          e.preventDefault();
          setFlavor(e.target.value); 
      }

      const altMilkHandleChange = (e) =>{
          e.preventDefault();
          setAlternativeMilk(e.target.value); 
      }

      const buildDrink = () =>{
          console.log("built drink", flavor, alternativeMilk)
        //   e.preventDefault(); 
          post("/drink/build-drink", {
            name: name,
            title: coffee.title,
            hotOrIced: params.isHot,
            description: coffee.description,
            ingredients: coffee.ingredients,
            flavors: flavor,
            alternativeMilks: alternativeMilk
          })
          .then((results)=>{
              console.log("results", results.data)
              navigate("/user-profile");
          })
          .catch((err)=>{
              console.log("Error occurred creating drink", err.message)
          })

      }

    return (
        <div>
            <h2>Build your drink</h2>

            <div>
            <h4>{coffee.title}</h4>
            {/* <Link to={`/create-drink/${isHot}/${coffee.id}`}>Build</Link> */}
            <p>{coffee.description}</p>
            <p>Ingredients:</p>
            <ul>
              {coffee.ingredients &&
                coffee.ingredients.map((ingredient) => {
                  return <li>{ingredient}</li>
                })}
            </ul>
        <form >
            <DropDown 
            label="Flavors"
            value={flavor}
            onChange={flavorHandleChange}
            options={[
                {label:" ", value:" "},
                {label:"Simple Syrup", value:"Simple Syrup"},
                {label:"Vanilla", value:"Vanilla"},
                {label:"Hazelnut", value:"Hazelnut"},
                {label:"Caramel", value:"Caramel"},
                {label:"Mocha", value:"Mocha"},
                {label:"Peppermint", value:"Peppermint"}
            ]}
            />
            <DropDown 
            label="Alternative Milks"
            value={alternativeMilk}
            onChange={altMilkHandleChange}
            options={[
                {label:" ", value:" "},
                {label:"Almond Milk", value:"Almond Milk"},
                {label:"Soy Milk", value:"Soy Milk"},
                {label:"Oat Milk", value:"Oat Milk"},
                {label:"Coconut Milk", value:"Coconut Milk"},
                {label:"Pistachio Milk", value:"Pistachio Milk"},
                {label:"Whole Milk", value:"Whole Milk"},
                {label:"2% Milk", value:"2% Milk"},
                {label:"Nonfat Milk", value:"Nonfat Milk"},
                {label:"Half-and-Half", value:"Half-and-Half"}

            ]}
            />
            <label>Name this drink</label>
            <input value={name} onChange={(e)=>setName(e.target.value)}/>
            {/* <input type="submit" value="Build"/> */}
            <button type="button" onClick={buildDrink}>Build</button>
        </form>

          </div>
        </div>
    )
}

export default DrinkDetails 