import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import recipeContext from '../context/recipeContext';
import { requestAPI, URL_REQUEST_MEALS,
  URL_REQUEST_DRINKS } from '../services/RequestAPI';
import RecipesDetailsComponents from '../components/RecipesDetailsComponets';
import LinkCopied from '../components/LinkCopied';
import RecommendationCard from '../components/RecommendationCard';
import { readlocalStorage } from '../services/hadleStorage';
import './styles/recipeDetails.css';

const maxRecommendation = 6;

function RecipeDetails({ match }) {
  const { recipeDetail, setRecipeDetail, copyed,
    setGlobalId, setRec } = useContext(recipeContext);
  const [isLoading, setIsLoading] = useState(true);
  const { params: { id } } = match;
  const history = useHistory();
  const { location: { pathname } } = history;
  const recipeType = pathname.includes('meals') ? 'meals' : 'drinks';

  const getCheckedIngredients = () => {
    const getStorage = readlocalStorage('inProgressRecipes') || {
      drinks: {},
      meals: {},
    };
    if (!getStorage[recipeType][id]) {
      return false;
    }
    return getStorage[recipeType][id];
  };

  useEffect(() => {
    let details;
    let recomendations;
    setGlobalId(id);
    const requestData = async () => {
      if (pathname === `/meals/${id}`) {
        details = await requestAPI(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
        recomendations = await requestAPI(URL_REQUEST_DRINKS);
      }
      if (pathname === `/drinks/${id}`) {
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

  return (
    <div>
      {!isLoading && (
        <div>
          {copyed && <LinkCopied />}
          {(recipeDetail.length > 0) && <RecipesDetailsComponents />}
          <RecommendationCard />
        </div>
      )}
      <button
        data-testid="start-recipe-btn"
        className="startRecipes"
        onClick={ () => history.push(`${pathname}/in-progress`) }
        type="button"
        hidden={ readlocalStorage('doneRecipes')
          && readlocalStorage('doneRecipes')
            .some((recipe) => recipe.id === id) }
      >
        <p>
          {getCheckedIngredients()
            ? 'Continue Recipe' : 'Start Recipe'}
        </p>
      </button>
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
