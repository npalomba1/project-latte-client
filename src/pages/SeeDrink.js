import React from "react"
import { get } from "../authService/authService";
import { useNavigate, useParams, Link } from "react-router-dom";
import axios from "axios";

const SeeDrink = () => {

    const [user, setUser] = React.useState({});
    const [drink, setDrink] = React.useState({});

    const [isHot, setIsHot] = React.useState("");
    // const [hasEspresso, setHasEspresso] = React.useState("");
    const [hasMilk, setHasMilk] = React.useState("");
    const [ingredients, setIngredients] = React.useState([]);
    const [alternativeMilk, setAlternativeMilk] = React.useState('');
    const [name, setName] = React.useState("");
    const [flavor, setFlavor] = React.useState("");
    const [description, setDescription] = React.useState("");
    const [title, setTitle] = React.useState("");

    const navigate = useNavigate();
    const params = useParams();

    //GET USER'S DRINK
    React.useEffect(() => {
        get(`/drink/${params.id}/update-drink`)
            .then((results) => {
                
                setDrink(results.data);
                setIngredients(results.data.ingredients);
                setHasMilk(results.data.hasMilk);
                setIsHot(results.data.hotOrIced);
                setName(results.data.name);
                setFlavor(results.data.flavors);
                setDescription(results.data.description);
                setTitle(results.data.title)
                setAlternativeMilk(results.data.alternativeMilks)
            })
            .catch((error) => {
                console.log(
                    "something went wrong loading the user's drinks",
                    error.message
                );
            });
    }, []);

    return (
        <div className="full-drink-card">
            <h2>{name}</h2>
            <div className="drink-schema">
            <p>Type of Drink: {title}</p>
            <p>Hot or iced? {isHot}</p>
            <p>Description: {description}</p>
            <p>Milk? {hasMilk}</p>
            <p>Alternative Milk? {alternativeMilk}</p>
            <p>Flavoring? {flavor}</p>
            </div>
        <Link to="/user-profile">Back home</Link>
        </div>
    )
}

export default SeeDrink; 