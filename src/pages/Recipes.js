import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
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
  const { renderMeals, renderDrinks, isLoading,
    mirrorMeals, mirrorDrinks, setRenderMeals, setRenderDrinks,
    mealsCategories, drinkCategories, setIsLoading,
    setHeaderTitle, setShowSearchBtn } = useContext(recipeContext);
  const [clickControl, setClickControl] = useState(false);
  const [categoryURL, setCategoryURL] = useState('');
  const [pageRouteInfo, setPageRouteInfo] = useState('');

  const history = useHistory();

  const compareArrays = (render, mirror, food) => {
    if (food === '/meals') {
      return render.length === mirror.length
      && render.every((item, index) => item.idMeal === mirror[index].idMeal);
    }
    if (food === '/drinks') {
      return render.length === mirror.length
        && render.every((item, index) => item.idDrink === mirror[index].idDrink);
    }
  };

  const filterButton = (category, URL, page) => {
    const customURL = URL + category.split(' ').join(' ');
    setClickControl(true);
    setCategoryURL(customURL);
    setPageRouteInfo(page);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const toggleFilter = async (render, mirror) => {
    const { location: { pathname } } = history;
    if (compareArrays(render, mirror, pathname)) {
      setIsLoading(true);
      const requestRecipes = await requestAPI(categoryURL);
      const first12Recipes = requestRecipes[pageRouteInfo].slice(0, recipesNumberRequest);
      if (pageRouteInfo === 'drinks') {
        setRenderDrinks(first12Recipes);
        setRenderMeals(mirrorMeals);
      }
      if (pageRouteInfo === 'meals') {
        setRenderMeals(first12Recipes);
        setRenderDrinks(mirrorDrinks);
        setIsLoading(false);
      }
    } else {
      setRenderDrinks(mirrorDrinks);
      setRenderMeals(mirrorMeals);
    }
  };

  const allCategory = () => {
    if (pageRouteInfo === 'drinks') {
      setRenderDrinks(mirrorDrinks);
    }
    setRenderMeals(mirrorMeals);
  };

  useEffect(() => {
    const { location: { pathname } } = history;
    if (clickControl && pathname === '/meals') {
      toggleFilter(renderMeals, mirrorMeals);
      setClickControl(false);
    }
    if (clickControl && pathname === '/drinks') {
      toggleFilter(renderDrinks, mirrorDrinks);
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
            strDrinkThumb,
            idDrink }, index) => CardRecipes(index, strDrink, strDrinkThumb, idDrink))}
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
          strMealThumb, idMeal }, index) => CardRecipes(
          index,
          strMeal,
          strMealThumb,
          idMeal,
        ))}
      <Footer />
    </div>
  );
}

export default Recipes;
