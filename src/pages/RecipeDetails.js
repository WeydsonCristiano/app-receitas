import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import require from 'clipboard-copy';
import recipeContext from '../context/recipeContext';
import { requestAPI, URL_REQUEST_MEALS,
  URL_REQUEST_DRINKS } from '../services/RequestAPI';
import RecipeDetailsComponents from '../components/RecipesDetailsComponets';
import Loading from '../components/Loading';
import RecommendationCard from '../components/RecommendationCard';
import { readlocalStorage } from '../services/hadleStorage';

const maxRecommendation = 6;

function RecipeDetails({ match }) {
  const { setRecipeDetail, globalIngrd } = useContext(recipeContext);
  const [copyed, setCopyed] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [mealsDetails, setMealsDetails] = useState([]);
  const [drinksDetails, setDrinksDetails] = useState([]);
  const [drinksRecommendation, setDrinkRec] = useState([]);
  const [mealsRecommendation, setMealRec] = useState([]);
  const { params: { id } } = match;
  const history = useHistory();
  const { location: { pathname } } = history;
  const recipeType = pathname.includes('meals') ? 'meals' : 'drinks';

  const getCheckedIngredients = () => {
    const getStorage = readlocalStorage('inProgressRecipes');

    const checkList = getStorage[recipeType][id];
    if (checkList) {
      return checkList.length;
    }
    return 0;
  };

  useEffect(() => {
    const requestData = async () => {
      if (pathname === `/meals/${id}`) {
        const detailsMeals = await requestAPI(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
        const requestRecommendation = await requestAPI(URL_REQUEST_DRINKS);
        const first6 = requestRecommendation.drinks
          .slice(0, maxRecommendation);
        setMealRec(first6);
        setMealsDetails(detailsMeals.meals);
        setRecipeDetail(detailsMeals.meals);
      }
      if (pathname === `/drinks/${id}`) {
        const detailsDrinks = await requestAPI(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
        const requestRecommendation = await requestAPI(URL_REQUEST_MEALS);
        const first6 = requestRecommendation.meals
          .slice(0, maxRecommendation);
        setDrinksDetails(detailsDrinks.drinks);
        setRecipeDetail(detailsDrinks.drinks);
        setDrinkRec(first6);
      }
      setIsLoading(false);
    };
    requestData();
  }, [id, pathname, setIsLoading, setRecipeDetail]);

  const copy = require('clipboard-copy');

  const copyUrl = async () => {
    setCopyed(true);
    await copy(`http://localhost:3000${pathname}`);
  };

  if (isLoading) {
    return <Loading />;
  }
  return (
    <div>
      {copyed && <p>Link copied!</p>}
      {(mealsDetails.length > 0 || drinksDetails.length > 0) && <RecipeDetailsComponents
        meals={ mealsDetails }
        drinks={ drinksDetails }
        copyUrl={ copyUrl }
        id={ id }
      />}
      <div>
        <RecommendationCard
          meals={ drinksRecommendation }
          drinks={ mealsRecommendation }
          id={ id }
        />
        <button
          onClick={ () => history.push(`${pathname}/in-progress`) }
          data-testid="start-recipe-btn"
          type="button"
          hidden={ readlocalStorage('doneRecipes')?.some((recipe) => recipe.id === id) }
        >
          {getCheckedIngredients() !== 0 && getCheckedIngredients() < globalIngrd.length
            ? 'Continue Recipe' : 'Start Recipe'}
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
