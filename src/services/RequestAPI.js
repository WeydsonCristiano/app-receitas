export const URL_REQUEST_MEALS = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
export const URL_REQUEST_DRINKS = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
export const URL_REQUEST_CATEGORY_MEALS = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
export const URL_REQUEST_CATEGORY_DRINKS = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
export const ENDPOINT_FILTER_BUTTON_MEAL = 'https://www.themealdb.com/api/json/v1/1/filter.php?c=';
export const ENDPOINT_FILTER_BUTTON_DRINK = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=';
export const ENDPOINT_DRINK = 'https://www.thecocktaildb.com/api/json/v1/1/';
export const ENDPOINT_MEAL = 'https://www.themealdb.com/api/json/v1/1/';

export const requestAPI = async (endpoint) => {
  try {
    const request = await fetch(endpoint);
    return await request.json();
  } catch (e) {
    console.log('Ops algo deu errado');
    throw new Error(e);
  }
};
