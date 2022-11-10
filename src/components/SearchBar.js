import React, { useState, useContext } from 'react';
/* eslint-disable-next-line */
import { useAutoAnimate } from '@formkit/auto-animate/react';
import recipeContext from '../context/recipeContext';
import searchIcon from '../images/searchIcon.svg';
import './styles/searchBar.css';

import { ENDPOINT_MEAL, ENDPOINT_DRINK, requestAPI } from '../services/RequestAPI';

const recipesNumberRequest = 12;

function SearchBar() {
  const { headerTitle,
    setRenderMeals,
    setRenderDrinks,
    history,
  } = useContext(recipeContext);
  const [searchValue, setSearchValue] = useState('');
  const [searchType, setSearchType] = useState('');
  const [parent] = useAutoAnimate();

  const callApi = async (endpointType, renderFunction, path, getId) => {
    let newArray;
    switch (searchType) {
    case 'name':
      newArray = await requestAPI(`${endpointType}search.php?s=${searchValue}`);
      break;
    case 'first-letter':
      if (searchValue.length > 1) {
        return global.alert('Your search must have only 1 (one) character');
      }
      newArray = await requestAPI(`${endpointType}search.php?f=${searchValue}`);
      break;
    case 'ingredient':
      newArray = await requestAPI(`${endpointType}filter.php?i=${searchValue}`);
      break;
    default:
      return global.alert('Empty search.');
    }
    const response = newArray[Object.keys(newArray)[0]];
    if (response === null) {
      return global.alert('Sorry, we haven\'t found any recipes for these filters.');
    }
    if (response.length === 1) {
      return history.push(`/${path}/${response[0][getId]}`);
    }
    renderFunction(response.slice(0, recipesNumberRequest));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (headerTitle === 'Meals') {
      return callApi(ENDPOINT_MEAL, setRenderMeals, 'meals', 'idMeal');
    }
    return callApi(ENDPOINT_DRINK, setRenderDrinks, 'drinks', 'idDrink');
  };

  return (
    <form
      className="flexContainer direction"
      onSubmit={ handleSubmit }
    >
      <div className="searchBar">
        <input
          type="text"
          data-testid="search-input"
          onChange={ ({ target: { value } }) => setSearchValue(value) }
          required
        />
        <button
          data-testid="exec-search-btn"
          type="submit"
        >
          <img
            src={ searchIcon }
            alt="Search button"
          />
        </button>
      </div>
      <fieldset className="flexContainer direction radioSelection" ref={ parent }>
        <legend> Chose a filter type </legend>
        <label
          htmlFor="ingredient-search"
          className="radioLabel"
        >
          <input
            type="radio"
            name="radioFilter"
            data-testid="ingredient-search-radio"
            id="ingredient-search"
            value="ingredient"
            onChange={ ({ target: { value } }) => setSearchType(value) }
          />
          <span>
            Ingredient
          </span>
        </label>
        <label
          htmlFor="name-search"
          className="radioLabel"
        >
          <input
            type="radio"
            name="radioFilter"
            data-testid="name-search-radio"
            id="name-search"
            value="name"
            onChange={ ({ target: { value } }) => setSearchType(value) }
          />
          <span>
            Name
          </span>
        </label>
        <label
          htmlFor="first-letter-search"
          className="radioLabel"
        >
          <input
            type="radio"
            name="radioFilter"
            data-testid="first-letter-search-radio"
            id="first-letter-search"
            value="first-letter"
            onChange={ ({ target: { value } }) => setSearchType(value) }
          />
          <span>
            First letter
          </span>
        </label>
      </fieldset>
    </form>
  );
}

export default SearchBar;
