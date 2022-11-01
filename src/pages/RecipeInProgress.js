import React, { useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import RecipeDetailsComponents from '../components/RecipesDetailsComponets';
import { requestAPI } from '../services/RequestAPI';
import recipeContext from '../context/recipeContext';
import Loading from '../components/Loading';

function RecipeInProgress({ match }) {
  const { setIsLoading, isLoading } = useContext(recipeContext);
  const [localMeal, setLocalMeal] = useState([]);
  const [localDrink, setLocalDrink] = useState([]);
  const history = useHistory();
  const { params: { id } } = match;
  const { location: { pathname } } = history;

  useEffect(() => {
    const requestData = async () => {
      setIsLoading(true);
      if (pathname.includes('meals')) {
        const detailsMeals = await requestAPI(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
        setLocalMeal(detailsMeals.meals);
      }
      if (pathname.includes('drinks')) {
        const detailsDrinks = await requestAPI(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
        setLocalDrink(detailsDrinks.drinks);
      }
      setIsLoading(false);
    };
    requestData();
  }, [id, pathname, setIsLoading]);

  return (
    <div>
      <h1>RecipeInProgress</h1>
      {
        isLoading
          ? <Loading /> : (
            <RecipeDetailsComponents
              meals={ localMeal }
              drinks={ localDrink }
              id={ id }
            />
          )
      }
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

RecipeInProgress.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

export default RecipeInProgress;
