import React, { useContext, useEffect, useState } from 'react';
import Header from '../components/Header';
import CardRecipes from '../components/CardRecipes';
import recipeContext from '../context/recipeContext';
import Footer from '../components/Footer';
import Loading from '../components/Loading';
import CategoryButtons from '../components/CategoryButtons';
import { ENDPOINT_FILTER_BUTTON_DRINK,
  ENDPOINT_FILTER_BUTTON_MEAL,
  requestAPI } from '../services/RequestAPI';

const recipesNumberRequest = 12;

function Recipes() {
  const [filterControl, setFilterControl] = useState(false);
  const [clickControl, setClickControl] = useState(false);
  const [categoryURL, setCategoryURL] = useState('');
  const [pageRouteInfo, setPageRouteInfo] = useState('');
  // const [buttonId, setButtonId] = useState('');
  const { renderMeals, renderDrinks, isLoading,
    mirrorMeals, mirrorDrinks, setRenderMeals, setRenderDrinks,
    mealsCategories, drinkCategories, setIsLoading,
    setHeaderTitle, setShowSearchBtn, history } = useContext(recipeContext);

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

  const { location: { pathname } } = history;
  if (pathname === '/drinks') {
    return (
      <div>
        { setHeaderTitle('Drinks') }
        { setShowSearchBtn(true) }
        {isLoading && <Loading /> }
        <Header />
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
      { setHeaderTitle('Meals') }
      { setShowSearchBtn(true) }
      {isLoading && <Loading /> }
      <Header />
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
      <Footer />
    </div>
  );
}

export default Recipes;
