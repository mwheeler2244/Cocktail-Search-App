import React, { useState } from "react";

function Search() {
  const [searchTerm, setSearchTerm] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [drinkImage, setDrinkImage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [drinkName, setDrinkName] = useState("");

  // Fetch drink data based on the search term
  async function fetchDrink(searchTerm) {
    try {
      const response = await fetch(
        `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchTerm}`
      );
      if (!response.ok) {
        throw new Error("Drink not found!");
      }
      const data = await response.json();
      console.log(data);

      // Check if data exists and get ingredients for the first drink
      if (data.drinks) {
        const firstDrink = data.drinks[0]; // Get the first drink
        const allIngredients = [];

        // Loop through the drink's ingredients properties (strIngredient1, strIngredient2, etc.)

        for (let i = 1; i <= 10; i++) {
          const ingredient = firstDrink[`strIngredient${i}`];
          console.log(ingredient);
          if (ingredient) {
            allIngredients.push(ingredient);
          }
        }

        setIngredients(allIngredients);
        setDrinkImage(firstDrink.strDrinkThumb);
        setDrinkName(firstDrink.strDrink);
        setErrorMessage(""); // Clear error message on successful data fetch
      } else {
        setIngredients([]);
        setErrorMessage("No drinks found for that search term.");
      }
    } catch (error) {
      setErrorMessage(error.message);
    }
  }

  // Handle the search button click or form submission
  const handleSearch = (e) => {
    e.preventDefault(); // Prevent form submission from reloading the page
    if (searchTerm) {
      setErrorMessage(""); // Clear previous error message when starting a new search
      fetchDrink(searchTerm);
    }
  };

  return (
    <div className="search-container">
      <form onSubmit={handleSearch}>
        <div className="header">
          <h1>Search Cocktails</h1>
          <p className="subtitle">Find your favorite cocktails!</p>
        </div>
        <div className="search-bar">
          <input
            className="search-input"
            type="text"
            placeholder="Search for a drink"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button type="submit" className="search-button">
            Search
          </button>
        </div>
      </form>

      <div className="drink-card">
        <h2>{drinkName}</h2>
        <h3>Ingredients:</h3>
        <ul>
          {ingredients.map((ingredient, index) => (
            <li key={index}>{ingredient}</li>
          ))}
        </ul>
      </div>

      <div className="drink-image">
        {drinkImage && <img src={drinkImage} alt="Drink" />}
      </div>

      {/* Display error message after the image */}
      {errorMessage && <p>{errorMessage}</p>}
    </div>
  );
}

export default Search;
