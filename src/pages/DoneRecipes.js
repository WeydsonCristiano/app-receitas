import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import recipeContext from '../context/recipeContext';
import { readlocalStorage } from '../services/hadleStorage';
import shareIcon from '../images/shareIcon.svg';
import Loading from '../components/Loading';

function DoneRecipes() {
  const { setHeaderTitle, setShowSearchBtn, handleFilter, isLoading, setIsLoading,
    copyed, copyUrl, setRecipes, recipes } = useContext(recipeContext);

  useEffect(() => {
    setHeaderTitle('Done Recipes');
    setShowSearchBtn(false);
    const getDoneRecipes = readlocalStorage('doneRecipes') || [];
    setRecipes(getDoneRecipes);
    setIsLoading(false);
  }, [setHeaderTitle, setShowSearchBtn, setRecipes, setIsLoading]);

  console.log(recipes);

  return (
    <div>
      <Header />
      {copyed && (
        <div>
          <p>Link copied!</p>
        </div>
      )}
      <button
        onClick={ (e) => handleFilter(e, 'doneRecipes') }
        id="all"
        data-testid="filter-by-all-btn"
        type="button"
      >
        All
      </button>
      <button
        id="meal"
        onClick={ (e) => handleFilter(e, 'doneRecipes') }
        data-testid="filter-by-meal-btn"
        type="button"
      >
        Meals
      </button>
      <button
        id="drink"
        onClick={ (e) => handleFilter(e, 'doneRecipes') }
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
          {recipe.tags && recipe.tags
            .filter((tagF) => tagF[0] && tagF[1]).map((tag, i) => (
              <span
                key={ i }
                data-testid={ `${index}-${tag}-horizontal-tag` }
              >
                {tag}
              </span>
            ))}
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
        </div>
      ))}
    </div>
  );
}

export default DoneRecipes;
