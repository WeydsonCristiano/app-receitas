import PropTypes from 'prop-types';
import React, { useEffect, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import recipeContext from '../context/recipeContext';
import CheckIngredients from './CheckIngredients';


function RecipeDetailsComponents({ meals, drinks, copyUrl }) {
  const { setGlobalIngrd } = useContext(recipeContext);
  const [ingredientsList, setIngredientsList] = useState([]);
  const [measuresList, setMeasuresList] = useState([]);
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
      console.log(ingredients, 'use effect');
    }
    if (drinks?.length && pathname.includes('drinks')) {
      const ingredients = Object.entries(drinks[0])
        .filter((item) => item[0].includes('Ingredient'))
        .filter((item) => item[1] !== '' && item[1] !== null && item[1] !== ' ');
      const measures = Object.entries(drinks[0])
        .filter((item) => item[0].includes('Measure'))
        .filter((item) => item[1] !== '' && item[1] !== null && item[1] !== ' ');
      console.log(ingredients);
      setMeasuresList(measures);
      setIngredientsList(ingredients);
      setGlobalIngrd(ingredients);
    }

  }, [meals, drinks, pathname, setGlobalIngrd]);
  return (
    <div>
      {
        pathname.includes('drinks')
          ? (
            drinks.map((e, i) => (
              <div key={ i }>
                <div>
                  <div className="divFavoritoCompartilhar">
                    <button
                      data-testid="favorite-btn"
                      type="button"
                    >
                      Favoritar
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
                {console.log(ingredientsList)}
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
            meals?.map((el, ind) => (
              <div key={ ind }>
                <div>
                  <div className="divFavoritoCompartilhar">
                    <button
                      data-testid="favorite-btn"
                      type="button"
                    >
                      Favoritar

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

RecipeDetailsComponents.propTypes = {
  meals: PropTypes.arrayOf(PropTypes.shape()),
  drinks: PropTypes.arrayOf(PropTypes.shape()),
  copyUrl: PropTypes.func,
}.isRequired;

export default RecipeDetailsComponents;
