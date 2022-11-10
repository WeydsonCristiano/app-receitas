import React, { useContext, useEffect } from 'react';
/* eslint-disable */
import { useAutoAnimate } from '@formkit/auto-animate/react'
/* eslint-enable */
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import recipeContext from '../context/recipeContext';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import { readlocalStorage, saveLocalStore } from '../services/hadleStorage';
import Loading from '../components/Loading';
import LinkCopied from '../components/LinkCopied';

function FavoriteRecipes() {
  const { setHeaderTitle, setShowSearchBtn, handleFilter, isLoading,
    copyed, copyUrl, setIsLoading, recipes, setRecipes } = useContext(recipeContext);
  const [parent] = useAutoAnimate();
  useEffect(() => {
    setHeaderTitle('Favorite Recipes');
    setShowSearchBtn(false);
    const getDoneRecipes = readlocalStorage('favoriteRecipes') || [];
    setRecipes(getDoneRecipes);
    setIsLoading(false);
  }, [setHeaderTitle, setShowSearchBtn, setRecipes, setIsLoading]);

  const handleDeslike = ({ target: { id } }) => {
    if (readlocalStorage('favoriteRecipes')
    && readlocalStorage('favoriteRecipes').length > 0
    && readlocalStorage('favoriteRecipes').some((recipe) => recipe.id === id)) {
      saveLocalStore('favoriteRecipes', readlocalStorage('favoriteRecipes')
        .filter((recipe) => recipe.id !== id));
    }
    setRecipes(readlocalStorage('favoriteRecipes'));
  };

  return (
    <div className="flexContainer direction doneRecipes">
      <Header />
      <div>
        {copyed && (
          <LinkCopied />
        )}
        <section className="doneRecipesMenu flexContainer">
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
        </section>
        {isLoading && <Loading />}
        <section className="flexContainer doneRecipesCardsRender" ref={ parent }>
          {!isLoading && recipes.map((recipe, index) => (
            <div
              key={ recipe.id }
              className="favoriteRecipesCards flexContainer direction"
            >
              <Link to={ `/${recipe.type}s/${recipe.id}` } className="doneRecipeImg">
                <img
                  data-testid={ `${index}-horizontal-image` }
                  src={ recipe.image }
                  alt={ recipe.name }
                />
              </Link>
              <section className="doneDescription flexContainer direction">
                <Link to={ `/${recipe.type}s/${recipe.id}` }>
                  <p
                    data-testid={ `${index}-horizontal-name` }
                  >
                    {recipe.name}
                  </p>
                </Link>
                <p data-testid={ `${index}-horizontal-top-text` }>
                  {recipe.type === 'meal' ? `${recipe.nationality} - ${recipe.category}`
                    : `${recipe.alcoholicOrNot}`}
                </p>
              </section>
              <p data-testid={ `${index}-horizontal-done-date` }>
                {recipe.doneDate}
              </p>
              <div className="flexContainer favoriteButtons">
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
            </div>
          ))}
        </section>
      </div>
    </div>
  );
}

export default FavoriteRecipes;
