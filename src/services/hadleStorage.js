const doneRecipes = [];

const favoriteRecipes = [];

export const inProgressRecipes = {
  drinks: {},
  meals: {},
};

export function handleStorage() {
  if (!JSON.parse(localStorage.getItem('doneRecipes'))) {
    localStorage.setItem('doneRecipes', JSON.stringify(doneRecipes));
  }
  if (!JSON.parse(localStorage.getItem('favoriteRecipes'))) {
    localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
  }
  if (!JSON.parse(localStorage.getItem('inProgressRecipes'))) {
    localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressRecipes));
  }
}
export const readlocalStorage = (key) => JSON.parse(localStorage.getItem(key));

export const saveLocalStore = (key, data) => localStorage
  .setItem(key, JSON.stringify(data));
