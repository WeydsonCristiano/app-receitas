import React, { useContext, useEffect, useState } from 'react';
/* eslint-disable */
import { useAutoAnimate } from '@formkit/auto-animate/react'
/* eslint-enable */
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import CardRecipes from '../components/CardRecipes';
import recipeContext from '../context/recipeContext';
import Footer from '../components/Footer';
import Loading from '../components/Loading';
import CategoryButtons from '../components/CategoryButtons';
import { handleStorage } from '../services/hadleStorage';
import { ENDPOINT_FILTER_BUTTON_DRINK,
  ENDPOINT_FILTER_BUTTON_MEAL,
  requestAPI } from '../services/RequestAPI';
import './styles/recipes.css';

const recipesNumberRequest = 12;

function Recipes() {
  const { renderMeals, renderDrinks, isLoading,
    mirrorMeals, mirrorDrinks, setRenderMeals, setRenderDrinks,
    mealsCategories, drinkCategories, setIsLoading,
    setHeaderTitle, setShowSearchBtn } = useContext(recipeContext);
  const [clickControl, setClickControl] = useState(false);
  const [categoryURL, setCategoryURL] = useState('');
  const [pageRouteInfo, setPageRouteInfo] = useState('');
  const [clickedCategory, setClickedCategory] = useState(['']);
  const [toggleControl, setToggleControl] = useState(false);
  const [parent] = useAutoAnimate();
  handleStorage();

  const history = useHistory();

  const filterButton = (category, URL, page) => {
    const customURL = URL + category.split(' ').join(' ');
    setClickControl(true);
    setCategoryURL(customURL);
    setPageRouteInfo(page);
    setClickedCategory((state) => [state[state.length - 1], category]);
    setToggleControl(!toggleControl);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const toggleFilter = async () => {
    setIsLoading(true);
    const requestRecipes = await requestAPI(categoryURL);
    const first12Recipes = requestRecipes[pageRouteInfo].slice(0, recipesNumberRequest);
    if (clickedCategory[0] !== clickedCategory[1] && pageRouteInfo === 'drinks') {
      setRenderDrinks(first12Recipes);
      setRenderMeals(mirrorMeals);
      setIsLoading(false);
    }
    if (clickedCategory[0] !== clickedCategory[1] && pageRouteInfo === 'meals') {
      setRenderMeals(first12Recipes);
      setRenderDrinks(mirrorDrinks);
      setIsLoading(false);
    }
    if (clickedCategory[0] === clickedCategory[1]
      && toggleControl && pageRouteInfo === 'drinks') {
      setRenderDrinks(first12Recipes);
      setIsLoading(false);
    }
    if (clickedCategory[0] === clickedCategory[1]
      && toggleControl && pageRouteInfo === 'meals') {
      setRenderMeals(first12Recipes);
      setIsLoading(false);
    }
    if (clickedCategory[0] === clickedCategory[1] && !toggleControl) {
      setRenderMeals(mirrorMeals);
      setRenderDrinks(mirrorDrinks);
      setIsLoading(false);
    }
  };

  const allCategory = () => {
    if (pageRouteInfo === 'drinks') {
      setRenderDrinks(mirrorDrinks);
      setClickedCategory((state) => [state[state.length - 1], '']);
      setToggleControl(false);
    }
    setRenderMeals(mirrorMeals);
    setClickedCategory((state) => [state[state.length - 1], '']);
    setToggleControl(false);
  };

  useEffect(() => {
    const { location: { pathname } } = history;
    if (clickControl && pathname === '/meals') {
      toggleFilter();
      setClickControl(false);
    }
    if (clickControl && pathname === '/drinks') {
      toggleFilter();
      setClickControl(false);
    }
  }, [clickControl, toggleFilter, history,
    mirrorDrinks, mirrorMeals, renderDrinks, renderMeals]);

  const { location: { pathname } } = history;

  if (pathname === '/drinks') {
    return (
      <div className="recipesPage flexContainer direction">
        { setHeaderTitle('Drinks') }
        { setShowSearchBtn(true) }
        <Header />
        <section className="categoryScroll flexContainer" ref={ parent }>
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
            className="categBtn"
            data-testid="All-category-filter"
            type="button"
            onClick={ allCategory }
          >
            All
          </button>
        </section>
        <section className="renderCards flexContainer" ref={ parent }>
          {
            isLoading
              ? <Loading />
              : renderDrinks
                .map(({ strDrink,
                  strDrinkThumb,
                  idDrink }, index) => CardRecipes(
                  index,
                  strDrink,
                  strDrinkThumb,
                  idDrink,
                ))
          }
        </section>
        <Footer />
      </div>
    );
  }
  return (
    <div className="recipesPage flexContainer direction">
      { setHeaderTitle('Meals') }
      { setShowSearchBtn(true) }
      <Header />
      <section className="categoryScroll flexContainer" ref={ parent }>
        {mealsCategories
          .map(({ strCategory }) => CategoryButtons(
            strCategory,
            () => filterButton(strCategory, ENDPOINT_FILTER_BUTTON_MEAL, 'meals'),
          ))}
        <button
          className="categBtn"
          data-testid="All-category-filter"
          type="button"
          onClick={ allCategory }
        >
          All
        </button>
      </section>
      <section className="renderCards flexContainer" ref={ parent }>
        {
          isLoading
            ? <Loading />
            : renderMeals
              .map(({ strMeal,
                strMealThumb, idMeal }, index) => CardRecipes(
                index,
                strMeal,
                strMealThumb,
                idMeal,
              ))
        }
      </section>
      <Footer />
    </div>
  );
}

export default Recipes;
