import React, { useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import RecipeDetailsComponents from '../components/RecipesDetailsComponets';
import { requestAPI } from '../services/RequestAPI';
import recipeContext from '../context/recipeContext';
import Loading from '../components/Loading';
import { readlocalStorage, saveLocalStore } from '../services/hadleStorage';

function RecipeInProgress({ match }) {
  const { setIsLoading, isLoading,
    isDesable, copyUrl, copyed } = useContext(recipeContext);
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

  console.log(localDrink);

  const finisheRecipe = () => {
    const currentRecipe = pathname.includes('meals') ? (
      {
        id: localMeal[0].idMeal,
        type: 'meal',
        nationality: localMeal[0].strArea,
        category: localMeal[0].strCategory,
        alcoholicOrNot: '',
        name: localMeal[0].strMeal,
        image: localMeal[0].strMealThumb,
        doneDate: new Date().toISOString(),
        tags: localMeal[0].strTags?.split(',') || [],
      }
    ) : (
      {
        id: localDrink[0].idDrink,
        type: 'drink',
        nationality: '',
        category: localDrink[0].strCategory,
        alcoholicOrNot: localDrink[0].strAlcoholic,
        name: localDrink[0].strDrink,
        image: localDrink[0].strDrinkThumb,
        doneDate: new Date().toISOString(),
        tags: localDrink[0].strTags?.split(',') || [],
      }
    );
    console.log(currentRecipe);
    const prevState = readlocalStorage('doneRecipes') || [];
    if (prevState && !prevState.some((recipe) => recipe.id === currentRecipe.id)) {
      saveLocalStore('doneRecipes', [...prevState, currentRecipe]);
    }
    history.push('/done-recipes');
  };

  return (
    <div>
      <h1>RecipeInProgress</h1>
      {copyed && (
        <div>
          <p>Link copied!</p>
        </div>
      )}
      {
        isLoading
          ? <Loading /> : (
            <RecipeDetailsComponents
              meals={ localMeal }
              drinks={ localDrink }
              copyUrl={ copyUrl }
              id={ id }
            />
          )
      }
      <div>
        <button
          data-testid="finish-recipe-btn"
          type="button"
          onClick={ finisheRecipe }
          disabled={ isDesable }
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
