import React from "react";
import { get, post } from "../authService/authService";
import axios from "axios";
import { useNavigate, useParams, Link } from "react-router-dom";
import DropDown from "../components/DropDown";

const EditDrink = () => {
  const [user, setUser] = React.useState({});
  const [drink, setDrink] = React.useState({});

  const [isHot, setIsHot] = React.useState("");
  const [hasEspresso, setHasEspresso] = React.useState("");
  const [hasMilk, setHasMilk] = React.useState("");
  const [ingredients, setIngredients] = React.useState([]);
  const [alternativeMilk, setAlternativeMilk] = React.useState([]);
  const [name, setName] = React.useState("");
  const [flavor, setFlavor] = React.useState("");
  const [description, setDescription] = React.useState("");

  const navigate = useNavigate();
  const params = useParams();

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

  //GET USER'S DRINK
  React.useEffect(() => {
    get(`/drink/${params.id}/update-drink`)
      .then((results) => {
        console.log("drink", results.data);
        setDrink(results.data);
        setIngredients(results.data.ingredients);
        setHasMilk(results.data.hasMilk);
        setIsHot(results.data.hotOrIced);
        setName(results.data.name);
        setFlavor(results.data.flavors);
        setDescription(results.data.description);
        setAlternativeMilk(results.data.alternativeMilks);
      })
      .catch((error) => {
        console.log(
          "something went wrong loading the user's drinks",
          error.message
        );
      });
  }, []);

  //POST UPDATE USER'S DRINKS
  const updateDrink = () =>{
    console.log("built drink")
  //   e.preventDefault(); 
    post(`/drink/${params.id}/update-drink`, {
      name: name,
      title: drink.title,
      hotOrIced: params.isHot,
      hasMilk: drink.hasMilk,
      description: description,
      ingredients: ingredients,
      flavor: flavor,
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
//DELETE DRINK 
const deleteDrink = () =>{

  post(`/drink/delete-drink/${params.id}`)
  .then(()=>{
      console.log("trying to delete")
      navigate("/user-profile")
  })
  .catch((err)=>{
      console.log("something went wrong", err.message); 
  })
}

  const hotHandleChange = (e) => {
    e.preventDefault();
    setIsHot(e.target.value);
  };

  const espressoHandleChange = (e) => {
    e.preventDefault();
    setHasEspresso(e.target.value);
    // setHasMilk(e.target.value)

    // filterDrinks()
  };

  const milkHandleChange = (e) => {
    e.preventDefault();
    // setHasEspresso(e.target.value)
    setHasMilk(e.target.value);

    // filterDrinks()
  };

  const flavorHandleChange = (e) => {
    e.preventDefault();
    setFlavor(e.target.value);
  };

  const altMilkHandleChange = (e) => {
    e.preventDefault();
    console.log(e.target.value)
    setAlternativeMilk(alternativeMilk.concat(e.target.value));

  };
  console.log(alternativeMilk)


  return (
    <div>
      <h2>"{drink.name}"</h2>

      <form>
        <DropDown
          label="Hot or Iced?"
          value={isHot}
          onChange={hotHandleChange}
          options={[
            { label: " ", value: " " },
            { label: "Hot", value: "hot" },
            { label: "Iced", value: "iced" },
          ]}
        />

        <DropDown
          label="Espresso?"
          value={hasEspresso}
          onChange={espressoHandleChange}
          options={[
            { label: " ", value: " " },
            { label: "Coffee", value: "Coffee" },
            { label: "Espresso", value: "Espresso" },
            { label: "Coffee and Espresso", value: "Coffee and Espresso" },
          ]}
        />

        <DropDown
          label="Milk?"
          value={hasMilk}
          onChange={milkHandleChange}
          options={[
            { label: " ", value: " " },
            { label: "Milk", value: "Milk" },
            { label: "Steamed Milk", value: "Steamed Milk" },
            { label: "No Milk", value: " " },
          ]}
        />

        <DropDown
          label="Flavors"
          value={flavor}
          onChange={flavorHandleChange}
          options={[
            { label: " ", value: " " },
            { label: "Simple Syrup", value: "Simple Syrup" },
            { label: "Vanilla", value: "Vanilla" },
            { label: "Hazelnut", value: "Hazelnut" },
            { label: "Caramel", value: "Caramel" },
            { label: "Mocha", value: "Mocha" },
            { label: "Peppermint", value: "Peppermint" },
          ]}
        />
        <DropDown
          label="Alternative Milks"
          value={alternativeMilk}
          onChange={altMilkHandleChange}
          options={[
            { label: " ", value: " " },
            { label: "Almond Milk", value: "Almond Milk" },
            { label: "Soy Milk", value: "Soy Milk" },
            { label: "Oat Milk", value: "Oat Milk" },
            { label: "Coconut Milk", value: "Coconut Milk" },
            { label: "Pistachio Milk", value: "Pistachio Milk" },
            { label: "Whole Milk", value: "Whole Milk" },
            { label: "2% Milk", value: "2% Milk" },
            { label: "Nonfat Milk", value: "Nonfat Milk" },
            { label: "Half-and-Half", value: "Half-and-Half" },
          ]}
        />

        <label>Ingredients</label>
        <input
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
        />
        <label>Description</label>
        <input value={description} onChange={(e) => setDescription(e.target.value)} />

        <label>Name this drink</label>
        <input value={name} onChange={(e) => setName(e.target.value)} />
        {/* <input type="submit" value="Build"/> */}
        <button type="button" onClick={updateDrink}>
          Update drink
        </button>
      </form>
        <button onClick={deleteDrink}>Delete drink</button>
      <Link to="/user-profile">Back home</Link>
    </div>
  );
};

export default EditDrink;
