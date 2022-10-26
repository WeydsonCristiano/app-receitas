import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import CardRecipes from './CardRecipes';
import recipeContext from '../context/recipeContext';
import Footer from './Footer';
import Loading from './Loading';
import CategoryButtons from './CategoryButtons';
import { ENDPOINT_FILTER_BUTTON_DRINK,
  ENDPOINT_FILTER_BUTTON_MEAL,
  requestAPI } from '../services/RequestAPI';

const recipesNumberRequest = 12;

function Recipes({ history }) {
  const [filterControl, setFilterControl] = useState(false);
  const [clickControl, setClickControl] = useState(false);
  const [categoryURL, setCategoryURL] = useState('');
  const [pageRouteInfo, setPageRouteInfo] = useState('');
  // const [buttonId, setButtonId] = useState('');
  const { renderMeals, renderDrinks, isLoading,
    mirrorMeals, mirrorDrinks, setRenderMeals, setRenderDrinks,
    mealsCategories, drinkCategories, setIsLoading,
    setHeaderTitle, setShowSearchBtn } = useContext(recipeContext);

  const filterButton = (category, URL, page) => {
    // const { id } = target;
    const customURL = URL + category.split(' ').join('');
    // setButtonId(id);
    setFilterControl(!filterControl);
    setClickControl(true);
    setCategoryURL(customURL);
    setPageRouteInfo(page);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const toggleFilter = async () => {
    if (filterControl) {
      setIsLoading(true);
      const requestRecipes = await requestAPI(categoryURL);
      console.log(requestRecipes);
      const first12Recipes = requestRecipes[pageRouteInfo].slice(0, recipesNumberRequest);
      if (pageRouteInfo === 'drinks') {
        setRenderDrinks(first12Recipes);
      }
      setRenderMeals(first12Recipes);
      setIsLoading(false);
    } else {
      if (pageRouteInfo === 'drinks') {
        setRenderDrinks(mirrorDrinks);
      }
      setRenderMeals(mirrorMeals);
    }
  };

  const allCategory = () => {
    if (pageRouteInfo === 'drinks') {
      setRenderDrinks(mirrorDrinks);
    }
    setRenderMeals(mirrorMeals);
    setFilterControl(false);
  };

  useEffect(() => {
    if (clickControl) {
      toggleFilter();
      setClickControl(false);
    }
  }, [clickControl, toggleFilter]);

  useEffect(() => {
    setShowSearchBtn(true);
    switch (window.location.pathname) {
    case '/meals':
      setHeaderTitle('Meals');
      break;
    case '/drinks':
      setHeaderTitle('Drinks');
      break;
    default:
      break;
    }
  }, [setHeaderTitle, setShowSearchBtn]);

  const { location: { pathname } } = history;
  if (pathname === '/drinks') {
    return (
      <div>
        {isLoading && <Loading /> }
        <Header />
        <h1>Drinks</h1>
        <section>
          {drinkCategories
            .map(({ strCategory }) => CategoryButtons(
              strCategory,
              () => filterButton(
                strCategory,
                ENDPOINT_FILTER_BUTTON_DRINK,
                'drinks',
              ),
            ))}
          <button
            data-testid="All-category-filter"
            type="button"
            onClick={ allCategory }
          >
            All

          </button>
        </section>
        {renderDrinks
          .map(({ strDrink,
            strDrinkThumb }, index) => CardRecipes(index, strDrink, strDrinkThumb))}
        <Footer />
      </div>
    );
  }
  return (
    <div>
      {isLoading && <Loading /> }
      <Header />
      <h1>Meals</h1>
      <section>
        {mealsCategories
          .map(({ strCategory }) => CategoryButtons(
            strCategory,
            () => filterButton(strCategory, ENDPOINT_FILTER_BUTTON_MEAL, 'meals'),
          ))}
        <button
          data-testid="All-category-filter"
          type="button"
          onClick={ allCategory }
        >
          All

        </button>
      </section>
      {renderMeals
        .map(({ strMeal,
          strMealThumb }, index) => CardRecipes(index, strMeal, strMealThumb))}
    </div>
  );
}

Recipes.propTypes = {
  history: PropTypes.shape({
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default Recipes;
