import React, { useContext, useState, useEffect } from 'react';
import RecipeDetailsComponents from '../components/RecipesDetailsComponets';
import recipeContext from '../context/recipeContext';

function RecipeInProgress() {
  const { globalDrinksDetails, globalMealsDetails } = useContext(recipeContext);
  const [localMeal, setLocalMeal] = useState([]);
  const [localDrink, setLocalDrink] = useState([]);
  console.log(globalDrinksDetails);
  console.log(globalMealsDetails);

  useEffect(() => {
    if (globalMealsDetails.length) {
      setLocalMeal(globalMealsDetails);
    }
    if (globalDrinksDetails.length) {
      setLocalDrink(globalDrinksDetails);
    }
  }, [globalDrinksDetails, globalMealsDetails]);

  return (
    <div>
      <h1>RecipeInProgress</h1>
      <RecipeDetailsComponents
        foods={ localMeal }
        drinks={ localDrink }
      />
      <div>
        <button
          data-testid="finish-recipe-btn"
          type="button"
        >
          Finalizar Receita

        </button>
      </div>
    </div>
  );
}

export default RecipeInProgress;
