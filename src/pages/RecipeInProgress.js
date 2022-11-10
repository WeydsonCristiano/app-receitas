import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import RecipeDetailsComponents from '../components/RecipesDetailsComponets';
import recipeContext from '../context/recipeContext';
import { readlocalStorage, saveLocalStore } from '../services/hadleStorage';
import { requestAPI,
  URL_REQUEST_DRINKS,
  URL_REQUEST_MEALS } from '../services/RequestAPI';
import LinkCopied from '../components/LinkCopied';

const maxRecommendation = 6;

function RecipeInProgress({ match }) {
  const { copyed, recipeDetail,
    isDesable, setGlobalId, setIsLoading,
    setRecipeDetail, setRec } = useContext(recipeContext);
  const history = useHistory();
  const { params: { id } } = match;
  const { location: { pathname } } = history;

  useEffect(() => {
    let details;
    let recomendations;
    setGlobalId(id);
    const requestData = async () => {
      if (pathname === `/meals/${id}/in-progress`) {
        details = await requestAPI(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
        recomendations = await requestAPI(URL_REQUEST_DRINKS);
      }
      if (pathname === `/drinks/${id}/in-progress`) {
        details = await requestAPI(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
        recomendations = await requestAPI(URL_REQUEST_MEALS);
      }
      const first6 = recomendations[Object.keys(recomendations)[0]]
        .slice(0, maxRecommendation);
      setRec(first6);
      setRecipeDetail(details[Object.keys(details)[0]]);
      setIsLoading(false);
    };
    requestData();
  }, [id, pathname, setIsLoading, setRecipeDetail, setGlobalId, setRec]);

  const finisheRecipe = () => {
    const currentRecipe = pathname.includes('meals') ? (
      {
        id: recipeDetail[0].idMeal,
        type: 'meal',
        nationality: recipeDetail[0].strArea,
        category: recipeDetail[0].strCategory,
        alcoholicOrNot: '',
        name: recipeDetail[0].strMeal,
        image: recipeDetail[0].strMealThumb,
        doneDate: new Date().toISOString(),
        tags: recipeDetail[0].strTags?.split(',') || [],
      }
    ) : (
      {
        id: recipeDetail[0].idDrink,
        type: 'drink',
        nationality: '',
        category: recipeDetail[0].strCategory,
        alcoholicOrNot: recipeDetail[0].strAlcoholic,
        name: recipeDetail[0].strDrink,
        image: recipeDetail[0].strDrinkThumb,
        doneDate: new Date().toISOString(),
        tags: recipeDetail[0].strTags?.split(',') || [],
      }
    );
    const prevState = readlocalStorage('doneRecipes') || [];
    if (prevState && !prevState.some((recipe) => recipe.id === currentRecipe.id)) {
      saveLocalStore('doneRecipes', [...prevState, currentRecipe]);
    }
    history.push('/done-recipes');
  };

  return (
    <div>
      {copyed && (
        <LinkCopied />
      )}
      <RecipeDetailsComponents />
      <button
        className="startRecipes"
        data-testid="finish-recipe-btn"
        type="button"
        onClick={ finisheRecipe }
        disabled={ isDesable }
      >
        <p>
          Finalizar Receita
        </p>
      </button>
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
