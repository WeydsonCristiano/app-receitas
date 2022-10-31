import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import require from 'clipboard-copy';
import recipeContext from '../context/recipeContext';
import { requestAPI } from '../services/RequestAPI';
import RecipeDetailsComponents from '../components/RecipesDetailsComponets';
import Loading from '../components/Loading';

export const ENDPOINT_ID_MEALS = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=';
export const ENDPOINT_ID_DRINKS = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=';

function RecipeDetails({ match }) {
  const [copyed, setCopyed] = useState(false);
  const { setIsLoading, isLoading,
    setGlobalMealDetails,
    setGlobalDrinksDetails } = useContext(recipeContext);
  const [mealsDetails, setMealsDetails] = useState([]);
  const [drinksDetails, setDrinksDetails] = useState([]);
  const { params: { id } } = match;
  const history = useHistory();
  const { location: { pathname } } = history;

  useEffect(() => {
    const requestData = async () => {
      setIsLoading(true);
      if (pathname.includes('meals')) {
        const detailsMeals = await requestAPI(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
        setMealsDetails(detailsMeals.meals);
        setGlobalMealDetails(detailsMeals.meals);
      }
      if (pathname.includes('drinks')) {
        const detailsDrinks = await requestAPI(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
        setDrinksDetails(detailsDrinks.drinks);
        setGlobalDrinksDetails(detailsDrinks.drinks);
      }
      setIsLoading(false);
    };
    requestData();
  }, [id, pathname, setIsLoading, setGlobalDrinksDetails, setGlobalMealDetails]);

  const copy = require('clipboard-copy');

  const copyUrl = async () => {
    setCopyed(true);
    await copy(`http://localhost:3000${pathname}`);
  };

  return (
    <div>
      {copyed && <p>Link copied!</p>}
      {isLoading ? <Loading />
        : (
          <RecipeDetailsComponents
            foods={ mealsDetails }
            drinks={ drinksDetails }
            copyUrl={ copyUrl }
          />
        )}
      ;
      <div>
        <button
          data-testid="start-recipe-btn"
          className="botaoStartRecipes"
          onClick={ () => history.push(`${pathname}/in-progress`) }
          type="button"
        >
          Start Recipe
        </button>
      </div>
    </div>
  );
}

RecipeDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

export default RecipeDetails;
