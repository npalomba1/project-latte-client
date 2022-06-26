import React from "react";
import axios from "axios";
import DropDown from "../components/DropDown";
import { Link } from "react-router-dom";
import { get } from "../authService/authService"

const DrinkBuilder = () => {
  const [isHot, setIsHot] = React.useState("");
  const [hasEspresso, setHasEspresso] = React.useState("");
  const [hasMilk, setHasMilk] = React.useState("");
  const [fullDrinkList, setFullDrinkList] = React.useState([]);
  const [drinks, setDrinks] = React.useState([]);

  //use effect axios call for my backend

  //old use effect using third party api
  // React.useEffect(() => { 
  //   axios
  //     .get(`https://api.sampleapis.com/coffee/${isHot}`)
  //     .then((results) => {
  //       console.log('THE RESULTS', results.data)
  //       setDrinks(results.data);
  //       setFullDrinkList(results.data);
  //     })
  //     .catch((error) => {
  //       console.log(error.message);
  //     });
  // }, [isHot] );//add isHot again 

//new use effect using seed data
React.useEffect(()=>{
  get("/drink/drink-types")
  .then((results) => {
    console.log("THE RESULTS", results.data);
    setDrinks(results.data);
    setFullDrinkList(results.data);
  })
  .catch((error)=>{
    console.log(error.message);
  })
}, []); // trying to fix this

  React.useEffect(() => {
    filterDrinks();
  }, [hasEspresso, hasMilk]);

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

  const filterDrinks = () => {
    let filteredDrinksArr = fullDrinkList.filter((drink) => {
      return drink.ingredients.includes(hasEspresso);
    });
    if (hasMilk) {
      filteredDrinksArr = filteredDrinksArr.filter((drink) => {
        return drink.ingredients.includes(hasMilk);
      });
    }
    setDrinks(filteredDrinksArr);
  };

  return (
    <div className="drink-builder-page">

      <h2>Drink Builder</h2>

      <div className="dropdown-forms">
      <DropDown
        label="Hot or Iced?"
        value={isHot}
        onChange={hotHandleChange}
        options={[
          { label: " ", value: " "}, 
          { label: "Hot", value: "hot" },
          { label: "Iced", value: "iced" },
        ]}
      />

      <DropDown
        label="Espresso?"
        value={hasEspresso}
        onChange={espressoHandleChange}
        options={[
          { label: " ", value: " "},
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
          { label: " ", value: " "},  
          { label: "Milk", value: "Milk" },
          { label: "Steamed Milk", value: "Steamed Milk" },
          { label: "No Milk", value: " " },
        ]}
      />
      </div>


      {drinks.map((coffee) => {
        return (
          <div className="drink-schema">
            <h4>{coffee.title}</h4>
            <Link to={`/create-drink/${isHot}/${coffee.id}`}>Build</Link>
            <p>{coffee.description}</p>
            <p>Ingredients:</p>
            <ul>
              {coffee.ingredients &&
                coffee.ingredients.map((ingredient) => {
                  return <li>{ingredient}</li>
                })}
            </ul>
          </div>
        );
      })}
    </div>
  );
};

export default DrinkBuilder;
