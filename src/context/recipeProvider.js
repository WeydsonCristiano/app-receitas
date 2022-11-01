import React, { useEffect, useMemo, useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import recipeContext from './recipeContext';
import { requestAPI,
  URL_REQUEST_CATEGORY_DRINKS,
  URL_REQUEST_CATEGORY_MEALS,
  URL_REQUEST_DRINKS, URL_REQUEST_MEALS } from '../services/RequestAPI';

const recipesNumberRequest = 12;
const categoryNumberRequest = 5;

function RecipeProvider({ children }) {
  const [userInfo, setUserInfo] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [renderMeals, setRenderMeals] = useState([]);
  const [renderDrinks, setRenderDrinks] = useState([]);
  const [mirrorMeals, setMirrorMeals] = useState([]);
  const [mirrorDrinks, setMirrorDrinks] = useState([]);
  const [recipeDetail, setRecipeDetail] = useState([]);
  const [mealsCategories, setMealsCategories] = useState([]);
  const [drinkCategories, setDrinkCategories] = useState([]);
  const [showSearchBtn, setShowSearchBtn] = useState(true);
  const [headerTitle, setHeaderTitle] = useState('');
  const [globalIngrd, setGlobalIngrd] = useState([]);
  const [isDesable, setIsDesable] = useState(true);

  const history = useHistory();

  useEffect(() => {
    const requestData = async () => {
      setIsLoading(true);

      const meals = await requestAPI(URL_REQUEST_MEALS);
      const first12Meals = meals.meals.slice(0, recipesNumberRequest);
      const drinks = await requestAPI(URL_REQUEST_DRINKS);
      const first12Drinks = drinks.drinks.slice(0, recipesNumberRequest);
      const categoriesMeals = await requestAPI(URL_REQUEST_CATEGORY_MEALS);
      const first5MealsCategories = categoriesMeals.meals.slice(0, categoryNumberRequest);
      const categoriesDrinks = await requestAPI(URL_REQUEST_CATEGORY_DRINKS);
      const first5DrinksCategories = categoriesDrinks.drinks
        .slice(0, categoryNumberRequest);

      setRenderMeals(first12Meals);
      setRenderDrinks(first12Drinks);
      setMirrorMeals(first12Meals);
      setMirrorDrinks(first12Drinks);
      setMealsCategories(first5MealsCategories);
      setDrinkCategories(first5DrinksCategories);
      setIsLoading(false);
    };
    requestData();
  }, []);

  const state = useMemo(() => ({
    setHeaderTitle,
    setRecipeDetail,
    recipeDetail,
    showSearchBtn,
    isDesable,
    setIsDesable,
    setShowSearchBtn,
    headerTitle,
    userInfo,
    setUserInfo,
    setIsLoading,
    globalIngrd,
    setGlobalIngrd,
    setRenderMeals,
    setRenderDrinks,
    renderMeals,
    renderDrinks,
    isLoading,
    mirrorMeals,
    mirrorDrinks,
    mealsCategories,
    drinkCategories,
    history,
  }), [userInfo, renderMeals, renderDrinks,
    isLoading, mirrorMeals, mirrorDrinks,
    mealsCategories, drinkCategories,
    setRecipeDetail,
    globalIngrd,
    recipeDetail,
    setUserInfo,
    headerTitle,
    setHeaderTitle,
    showSearchBtn,
    setShowSearchBtn,
    history,
  ]);

  return (
    <recipeContext.Provider value={ state }>{children}</recipeContext.Provider>
  );
}

export default RecipeProvider;

RecipeProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.func, PropTypes.node]).isRequired,
};
