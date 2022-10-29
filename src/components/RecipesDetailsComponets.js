import PropTypes from 'prop-types';
import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import recipeContext from '../context/recipeContext';
import CheckIngredients from './CheckIngredients';

function RecipeDetailsComponents({ foods, drinks }) {
  const { setGlobalCheckedLis } = useContext(recipeContext);
  const [ingredientsList, setIngredientsList] = useState([]);
  const [measuresList, setMeasuresList] = useState([]);
  const [checkedList, setCheckedList] = useState([{ drinks: {} }]);
  const [currentId, setcurrentId] = useState('');
  const [route, setRoute] = useState('');
  const history = useHistory();
  const { location: { pathname } } = history;

  useEffect(() => {
    if (foods.length && pathname.includes('meals')) {
      const ingredients = Object.entries(foods[0])
        .filter((item) => item[0].includes('Ingredient'))
        .filter((item) => item[1] !== '' && item[1] !== null && item[1] !== ' ');
      setIngredientsList(ingredients);
      const measures = Object.entries(foods[0])
        .filter((item) => item[0].includes('Measure'))
        .filter((item) => item[1] !== '' && item[1] !== null && item[1] !== ' ');
      setMeasuresList(measures);
    }
    if (drinks.length && pathname.includes('drinks')) {
      const ingredients = Object.entries(drinks[0])
        .filter((item) => item[0].includes('Ingredient'))
        .filter((item) => item[1] !== '' && item[1] !== null && item[1] !== ' ');
      setIngredientsList(ingredients);
      const measures = Object.entries(drinks[0])
        .filter((item) => item[0].includes('Measure'))
        .filter((item) => item[1] !== '' && item[1] !== null && item[1] !== ' ');
      setMeasuresList(measures);
    }
  }, [foods, drinks, pathname]);

  // useEffect(() => {
  //   if (checkedList.length) {
  //     const storage = {
  //       [route]: {
  //         [currentId]: checkedList,
  //       },
  //     };
  //     console.log(storage);
  //   }
  // }, [checkedList, route]);
  console.log(checkedList);

  const genericHandleChange = ({ target: { checked, id } }, idFood, type) => {
    console.log(type, idFood, id);
    if (checked && !checkedList.some((item) => item === id)) {
      setCheckedList((state) => [...state, { ...state[route],
        [idFood]: [...state[route][idFood], id] }]);
      setcurrentId(idFood);
      setRoute(type);
    }
    // setGlobalCheckedLis((state) => [...state, id]);
    if (!checked) {
      setCheckedList(checkedList.filter((item) => item !== id));
      setcurrentId(idFood);
      setRoute(type);
      // setGlobalCheckedLis(checkedList.filter((item) => item !== id));
    }
  };

  return (
    <div>
      {
        pathname.includes('drinks')
          ? (
            drinks?.map((e, i) => (
              <div key={ i }>
                <div>
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
                </div>
                <div><p data-testid="instructions">{e.strInstructions}</p></div>
                {pathname.includes('progress')
                    && <CheckIngredients
                      ingredientsList={ ingredientsList }
                      handleChange={ (event) => genericHandleChange(
                        event,
                        e.idDrink,

                        'drinks',
                      ) }
                      checked={ checkedList }
                    />}
                <h3>{e.strAlcoholic}</h3>
                <div>
                  <button
                    data-testid="favorite-btn"
                    type="button"
                  >
                    Favoritar

                  </button>
                </div>
                <div>
                  <button
                    data-testid="share-btn"
                    type="button"
                  >
                    Compartilhar
                  </button>
                </div>
              </div>
            ))
          )
          : (
            foods?.map((el, ind) => (
              <div key={ ind }>
                <div>
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
                      ingredientsList={ ingredientsList }
                      handleChange={ genericHandleChange }
                      checkedList={ setCheckedList }
                      checked={ checkedList }
                    />}
                <div>
                  <button
                    data-testid="favorite-btn"
                    type="button"
                  >
                    Favoritar

                  </button>
                </div>
                <div>
                  <button
                    data-testid="share-btn"
                    type="button"
                  >
                    Compartilhar
                  </button>
                </div>
              </div>
            )))
      }

    </div>

  );
}

RecipeDetailsComponents.propTypes = {
  foods: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  drinks: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

export default RecipeDetailsComponents;
