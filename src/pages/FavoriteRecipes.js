import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import recipeContext from '../context/recipeContext';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import { readlocalStorage, saveLocalStore } from '../services/hadleStorage';
import Loading from '../components/Loading';

function FavoriteRecipes() {
  const { setHeaderTitle, setShowSearchBtn, handleFilter, isLoading,
    setIsLoading, recipes, setRecipes, copyUrl, copyed } = useContext(recipeContext);

  useEffect(() => {
    setHeaderTitle('Favorite Recipes');
    setShowSearchBtn(false);
    const getDoneRecipes = readlocalStorage('favoriteRecipes') || [];
    setRecipes(getDoneRecipes);
    setIsLoading(false);
  }, [setHeaderTitle, setShowSearchBtn, setRecipes, setIsLoading]);

  const handleDeslike = ({ target: { id } }) => {
    console.log(id);
    console.log('eu funciono');
    if (readlocalStorage('favoriteRecipes')
    && readlocalStorage('favoriteRecipes').length > 0
    && readlocalStorage('favoriteRecipes').some((recipe) => recipe.id === id)) {
      console.log('entrei aqui');
      saveLocalStore('favoriteRecipes', readlocalStorage('favoriteRecipes')
        .filter((recipe) => recipe.id !== id));
    }
    setRecipes(readlocalStorage('favoriteRecipes'));
  };

  return (
    <div>
      <Header />
      <div>
        {copyed && (
          <div>
            <p>Link copied!</p>
          </div>
        )}
        <button
          onClick={ (e) => handleFilter(e, 'favoriteRecipes') }
          id="all"
          data-testid="filter-by-all-btn"
          type="button"
        >
          All
        </button>
        <button
          id="meal"
          onClick={ (e) => handleFilter(e, 'favoriteRecipes') }
          data-testid="filter-by-meal-btn"
          type="button"
        >
          Meals
        </button>
        <button
          id="drink"
          onClick={ (e) => handleFilter(e, 'favoriteRecipes') }
          data-testid="filter-by-drink-btn"
          type="button"
        >
          Drinks
        </button>
        {isLoading && <Loading />}
        {!isLoading && recipes.map((recipe, index) => (

          <div key={ recipe.id }>
            <div>
              <Link to={ `/${recipe.type}s/${recipe.id}` }>
                <img
                  data-testid={ `${index}-horizontal-image` }
                  width="200px"
                  src={ recipe.image }
                  alt={ recipe.name }
                />
              </Link>
            </div>
            <Link to={ `/${recipe.type}s/${recipe.id}` }>
              <h2
                data-testid={ `${index}-horizontal-name` }
              >
                {recipe.name}
              </h2>
            </Link>
            <h3 data-testid={ `${index}-horizontal-top-text` }>
              {recipe.type === 'meal' ? `${recipe.nationality} - ${recipe.category}`
                : `${recipe.alcoholicOrNot}`}
            </h3>
            <h4 data-testid={ `${index}-horizontal-done-date` }>
              {recipe.doneDate}
            </h4>
            <button
              src={ shareIcon }
              onClick={ () => copyUrl(recipe.type, recipe.id) }
              type="button"
              data-testid={ `${index}-horizontal-share-btn` }
            >
              <img
                src={ shareIcon }
                alt="shareIcon"
              />
            </button>
            <button
              src={ blackHeartIcon }
              onClick={ handleDeslike }
              id={ recipe.id }
              type="button"
              data-testid={ `${index}-horizontal-favorite-btn` }
            >
              <img
                id={ recipe.id }
                src={ blackHeartIcon }
                alt="shareIcon"
              />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FavoriteRecipes;
