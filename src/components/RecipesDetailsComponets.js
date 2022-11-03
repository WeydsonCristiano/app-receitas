import PropTypes from 'prop-types';
import React, { useEffect, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import recipeContext from '../context/recipeContext';
import { readlocalStorage } from '../services/hadleStorage';
import CheckIngredients from './CheckIngredients';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

function RecipesDetailsComponents({ meals, drinks, copyUrl, id }) {
  const { setGlobalIngrd, handleFavorite, favorited,
    setFavorited } = useContext(recipeContext);
  const [ingredientsList, setIngredientsList] = useState([]);
  const [measuresList, setMeasuresList] = useState([]);
  const [currentRecipe, setCurrentRecipe] = useState([]);
  const history = useHistory();
  const { location: { pathname } } = history;

  useEffect(() => {
    if (meals.length && pathname.includes('/meals')) {
      const ingredients = Object.entries(meals[0])
        .filter((item) => item[0].includes('Ingredient'))
        .filter((item) => item[1] !== '' && item[1] !== null && item[1] !== ' ');
      const measures = Object.entries(meals[0])
        .filter((item) => item[0].includes('Measure'))
        .filter((item) => item[1] !== '' && item[1] !== null && item[1] !== ' ');
      setMeasuresList(measures);
      setIngredientsList(ingredients);
      setGlobalIngrd(ingredients);
      setCurrentRecipe(meals[0]);
    }

    if (drinks.length && pathname.includes('/drinks')) {
      const ingredients = Object.entries(drinks[0])
        .filter((item) => item[0].includes('Ingredient'))
        .filter((item) => item[1] !== '' && item[1] !== null && item[1] !== ' ');
      const measures = Object.entries(drinks[0])
        .filter((item) => item[0].includes('Measure'))
        .filter((item) => item[1] !== '' && item[1] !== null && item[1] !== ' ');
      setMeasuresList(measures);
      setIngredientsList(ingredients);
      setGlobalIngrd(ingredients);
      setCurrentRecipe(drinks[0]);
    }
    if (readlocalStorage('favoriteRecipes')?.some((recipe) => recipe.id === id)) {
      setFavorited(true);
    } else {
      setFavorited(false);
    }
  }, [meals, drinks, pathname, setGlobalIngrd, id, setFavorited]);

  return (
    <div className="testeimage">
      {
        pathname.includes('drinks')
          ? (
            drinks.map((e, i) => (
              <div key={ i }>
                <div>
                  <div className="divFavoritoCompartilhar">
                    <button
                      src={ favorited ? blackHeartIcon : whiteHeartIcon }
                      alt="favoriteIcon"
                      onClick={ () => handleFavorite(currentRecipe) }
                      data-testid="favorite-btn"
                      type="button"
                    >
                      { favorited ? (<img
                        src={ blackHeartIcon }
                        alt="favoriteIcon"
                      />) : (
                        <img
                          src={ whiteHeartIcon }
                          alt="favoriteIcon"
                        />
                      )}
                    </button>
                    <button
                      data-testid="share-btn"
                      type="button"
                      onClick={ copyUrl }
                    >
                      Compartilhar
                    </button>
                  </div>
                  <img
                    width="300px"
                    data-testid="recipe-photo"
                    src={ e.strDrinkThumb }
                    alt={ e.strDrink }
                  />
                </div>
                <h2 data-testid="recipe-title">{e.strDrink}</h2>
                <h3 data-testid="recipe-category">
                  {e.strAlcoholic}
                </h3>
                <div className="listaReceitas">
                  <ul>
                    {
                      ingredientsList?.map((item, index) => (
                        <li
                          key={ index }
                          data-testid={ `${index}-ingredient-name-and-measure` }
                        >
                          { `${item[1]} ${measuresList[index]
                            && measuresList[index][1]}` }
                        </li>))
                    }
                  </ul>
                </div>
                <div><p data-testid="instructions">{e.strInstructions}</p></div>
                {pathname.includes('progress')
                    && <CheckIngredients
                      meals={ meals }
                      drinks={ drinks }
                      ingredientsList={ ingredientsList }
                    />}
                <h3>{e.strAlcoholic}</h3>
              </div>
            ))
          )
          : (
            meals.map((el, ind) => (
              <div key={ ind }>
                <div>
                  <div className="divFavoritoCompartilhar">
                    <button
                      src={ favorited ? blackHeartIcon : whiteHeartIcon }
                      onClick={ () => handleFavorite(currentRecipe) }
                      data-testid="favorite-btn"
                      type="button"
                    >
                      { favorited ? (<img
                        src={ blackHeartIcon }
                        alt="favoriteIcon"
                      />) : (
                        <img
                          src={ whiteHeartIcon }
                          alt="favoriteIcon"
                        />
                      )}

                    </button>
                    <button
                      data-testid="share-btn"
                      type="button"
                      onClick={ copyUrl }
                    >
                      Compartilhar
                    </button>
                  </div>
                  <img
                    width="300px"
                    data-testid="recipe-photo"
                    src={ el.strMealThumb }
                    alt={ el.strMeal }
                  />
                </div>
                <h2
                  data-testid="recipe-title"
                >
                  {el.strMeal}
                </h2>
                <h3
                  data-testid="recipe-category"
                >
                  {el.strCategory}
                </h3>
                <div>
                  <div className="listaReceitas">
                    <ul>
                      {ingredientsList.map((item, index) => (
                        <li
                          key="index"
                          data-testid={ `${index}-ingredient-name-and-measure` }
                        >
                          { `${item[1]} ${measuresList[index]
                            && measuresList[index][1]}` }
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div>
                  <p data-testid="instructions">{el.strInstructions}</p>
                </div>
                <div>
                  <iframe
                    data-testid="video"
                    width="560"
                    height="315"
                    src={ el.strYoutube.replace('watch?v=', 'embed/') }
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer;
                     autoplay;
                     clipboard-write;
                      encrypted-media;
                       gyroscope;
                        picture-in-picture"
                    allowFullScreen
                  />
                </div>
                {pathname.includes('progress')
                    && <CheckIngredients
                      meals={ meals }
                      drinks={ drinks }
                      ingredientsList={ ingredientsList }
                    />}
              </div>
            )))
      }
    </div>

  );
}

RecipesDetailsComponents.propTypes = {
  meals: PropTypes.arrayOf(PropTypes.shape()),
  drinks: PropTypes.arrayOf(PropTypes.shape()),
  copyUrl: PropTypes.func,
}.isRequired;

export default RecipesDetailsComponents;
