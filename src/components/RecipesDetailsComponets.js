import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import CheckIngredients from './CheckIngredients';

function RecipeDetailsComponents({ foods, drinks, copyUrl }) {
  const [ingredientsList, setIngredientsList] = useState([]);
  const [measuresList, setMeasuresList] = useState([]);

  const history = useHistory();
  const { location: { pathname } } = history;

  // const handleRouterMeals = () => {
  //   history.push('/meail');
  // };
  // const handleRouteDrink = () => {
  //   history.push('/drinks');
  // };

  console.log(drinks[0]);

  useEffect(() => {
    if (foods.length && pathname.includes('meals')) {
      const ingredients = Object.entries(foods[0])
        .filter((item) => item[0].includes('Ingredient'))
        .filter((item) => item[1] !== '');
      setIngredientsList(ingredients);
      const measures = Object.entries(foods[0])
        .filter((item) => item[0].includes('Measure'))
        .filter((item) => item[1] !== ' ');
      setMeasuresList(measures);
    }
    if (drinks?.length && pathname.includes('drinks')) {
      const ingredients = Object.entries(drinks[0])
        .filter((item) => item[0].includes('Ingredient'))
        .filter((item) => item[1] !== null);
      setIngredientsList(ingredients);
      const measures = Object.entries(drinks[0])
        .filter((item) => item[0].includes('Measure'))
        .filter((item) => item[1] !== null);
      setMeasuresList(measures);
    }
  }, [foods, drinks, pathname]);

  // manga verde

  return (
    <div>
      {
        pathname.includes('drinks')
          ? (
            drinks?.map((e, i) => (
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
                      ingredientsList.map((item, index) => (
                        <li
                          key={ index }
                          data-testid={ `${index}-ingredient-name-and-measure` }
                        >
                          {item[1] }
                        </li>))
                    }
                  </ul>
                  <ul>
                    {
                      measuresList.map((items, indexs) => (
                        <li
                          key={ indexs }
                          data-testid={ `${indexs}-ingredient-name-and-measure` }
                        >
                          {items[1] }
                        </li>))
                    }
                  </ul>
                  {pathname.includes('progress')
                    && <CheckIngredients ingredientsList={ ingredientsList } />}
                </div>
                <div><p data-testid="instructions">{e.strInstructions}</p></div>
                <div>
                  <iframe
                    title="video"
                    data-testid="video"
                    src={ e.strYoutube }
                  />
                </div>
                <h3>{e.strAlcoholic}</h3>
              </div>
            ))
          )
          : (
            foods?.map((el, ind) => (
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
                          {item[1] }
                        </li>
                      ))}
                    </ul>
                    <ul>
                      {
                        measuresList.map((itemsfood, indexsfood) => (
                          <li
                            key={ indexsfood }
                            data-testid={ `${indexsfood}-ingredient-name-and-measure` }
                          >
                            {itemsfood[1] }
                          </li>))
                      }
                    </ul>
                    {pathname.includes('progress')
                    && <CheckIngredients ingredientsList={ ingredientsList } />}
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
              </div>
            )))
      }

    </div>

  );
}

RecipeDetailsComponents.propTypes = {
  foods: PropTypes.arrayOf(PropTypes.shape()),
  drinks: PropTypes.arrayOf(PropTypes.shape()),
  copyUrl: PropTypes.func,
}.isRequired;
//
export default RecipeDetailsComponents;
