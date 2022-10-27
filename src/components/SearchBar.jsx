import React, { useState, useContext } from 'react';
import recipeContext from '../context/recipeContext';
import searchIcon from '../images/searchIcon.svg';

import { ENDPOINT_MEAL, ENDPOINT_DRINK, requestAPI } from '../services/RequestAPI';

function SearchBar() {
  const { headerTitle, setRenderMeals, setRenderDrinks } = useContext(recipeContext);
  const [searchValue, setSearchValue] = useState('');
  const [searchType, setSearchType] = useState('');

  const callApi = async (endpointType, renderFunction) => {
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
      break;
    }
    renderFunction(newArray[Object.keys(newArray)[0]]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    switch (headerTitle) {
    case 'Meals':
      callApi(ENDPOINT_MEAL, setRenderMeals);
      break;
    case 'Drinks':
      callApi(ENDPOINT_DRINK, setRenderDrinks);
      break;
    default:
      break;
    }
  };

  return (
    <form
      onSubmit={ handleSubmit }
    >
      <div>
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
      <fieldset>
        <legend> Chose a filter type: </legend>
        <label
          htmlFor="ingredient-search"
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