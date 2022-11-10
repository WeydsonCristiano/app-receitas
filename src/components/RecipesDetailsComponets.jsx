import React, { useEffect, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
/* eslint-disable */
import { useAutoAnimate } from '@formkit/auto-animate/react'
/* eslint-enable */
import recipeContext from '../context/recipeContext';
import { readlocalStorage } from '../services/hadleStorage';
import CheckIngredients from './CheckIngredients';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';

function RecipesDetailsComponents() {
  const { recipeDetail, setGlobalIngrd, handleFavorite, favorited,
    setFavorited, globalId, copyUrl } = useContext(recipeContext);
  const [ingredientsList, setIngredientsList] = useState([]);
  const [measuresList, setMeasuresList] = useState([]);
  const [currentRecipe, setCurrentRecipe] = useState([]);
  const [togleFavMenu, setTogleFavMenu] = useState(false);
  const [isDrink, setIsDrink] = useState(false);
  const [parent] = useAutoAnimate();
  const history = useHistory();
  const { location: { pathname } } = history;

  useEffect(() => {
    const getIgredients = (param) => Object.entries(recipeDetail[0])
      .filter((item) => item[0].includes(param))
      .filter((item) => item[1] !== '' && item[1] !== null && item[1] !== ' ');

    if (pathname.includes('drink')) {
      setIsDrink(true);
    }
    if (recipeDetail.length) {
      const ingredients = getIgredients('Ingredient');
      const measures = getIgredients('Measure');
      setMeasuresList(measures);
      setIngredientsList(ingredients);
      setGlobalIngrd(ingredients);
      setCurrentRecipe(recipeDetail[0]);
      if (readlocalStorage('favoriteRecipes')?.some((recipe) => recipe.id === globalId)) {
        setFavorited(true);
      } else {
        setFavorited(false);
      }
    }
  }, [recipeDetail, pathname, setGlobalIngrd, globalId, setFavorited]);

  return (
    <div className="flexContainer direction">
      <div className="detailsBtn flexContainer direction" ref={ parent }>
        <button
          className="togleFavMenuBtn"
          type="button"
          onClick={ () => setTogleFavMenu(!togleFavMenu) }
        >
          <div
            className={
              togleFavMenu
                ? 'togleFavMenuBtn togleMenuIcon togled'
                : 'togleFavMenuBtn togleMenuIcon'
            }
          >
            <span> </span>
            <span> </span>
            <span> </span>
          </div>
        </button>
        {
          togleFavMenu
            && (
              <button
                className="favButton"
                src={ favorited ? blackHeartIcon : whiteHeartIcon }
                alt="favoriteIcon"
                onClick={ () => handleFavorite(currentRecipe) }
                data-testid="favorite-btn"
                type="button"
              >
                <img
                  src={ favorited ? blackHeartIcon : whiteHeartIcon }
                  alt="favoriteIcon"
                />
              </button>
            )
        }
        {
          togleFavMenu
            && (
              <button
                className="shareButton"
                data-testid="share-btn"
                type="button"
                onClick={ copyUrl }
              >
                <img src={ shareIcon } alt="share icon" />
              </button>
            )
        }
      </div>
      {
        recipeDetail.map((e, i) => (
          <div key={ i }>
            <header
              style={ isDrink
                ? { backgroundImage: `url(${e.strDrinkThumb})` }
                : { backgroundImage: `url(${e.strMealThumb})` } }
              className="recipeBanner"
            >
              <div
                className="recipeTitle"
              >
                <h2 data-testid="recipe-title">
                  { isDrink ? e.strDrink : e.strMeal }
                </h2>
                <h3 data-testid="recipe-category">
                  { isDrink ? e.strAlcoholic : e.strCategory }
                </h3>
                {
                  pathname.includes('progress')
                    && <h3>Recipe in progress</h3>
                }
              </div>
            </header>
            <div className="detailsDescription">
              {
                pathname.includes('progress')
                  ? <CheckIngredients />
                  : (
                    <ul className="ingredientList">
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
                  )
              }
              <div className="flexContainer direction">
                <p
                  className="instructions"
                  data-testid="instructions"
                >
                  {e.strInstructions}
                </p>
                {
                  pathname.includes('meals')
                    && (
                      <iframe
                        data-testid="video"
                        src={ e.strYoutube.replace('watch?v=', 'embed/') }
                        title="YouTube video player"
                        allow="accelerometer;
                        autoplay;
                        clipboard-write;
                          encrypted-media;
                          gyroscope;
                            picture-in-picture"
                        allowFullScreen
                      />
                    )
                }
              </div>
            </div>
          </div>
        ))
      }
    </div>
  );
}

export default RecipesDetailsComponents;
