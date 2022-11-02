import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import recipeContext from '../context/recipeContext';
import { readlocalStorage } from '../services/hadleStorage';
import shareIcon from '../images/shareIcon.svg';

function DoneRecipes() {
  const { setHeaderTitle, setShowSearchBtn,
    copyUrl, copyed } = useContext(recipeContext);
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    setHeaderTitle('Done Recipes');
    setShowSearchBtn(false);
    const getDoneRecipes = readlocalStorage('doneRecipes') || [];
    setRecipes(getDoneRecipes);
  }, [setHeaderTitle, setShowSearchBtn]);

  const handleFilter = ({ target: { id } }) => {
    const all = readlocalStorage('doneRecipes') || [];
    if (id === 'meal') {
      const mealsFilter = all.filter((recipe) => recipe.type === 'meal');
      setRecipes(mealsFilter);
    }
    if (id === 'drink') {
      const mealsFilter = all.filter((recipe) => recipe.type === 'drink');
      setRecipes(mealsFilter);
    }
    if (id === 'all') {
      setRecipes(all);
    }
  };

  return (
    <div>
      <Header />
      {copyed && (
        <div>
          <p>Link copied!</p>
        </div>
      )}
      <button
        onClick={ handleFilter }
        id="all"
        data-testid="filter-by-all-btn"
        type="button"
      >
        All
      </button>
      <button
        id="meal"
        onClick={ handleFilter }
        data-testid="filter-by-meal-btn"
        type="button"
      >
        Meals
      </button>
      <button
        id="drink"
        onClick={ handleFilter }
        data-testid="filter-by-drink-btn"
        type="button"
      >
        Drinks
      </button>
      { recipes.map((recipe, index) => (

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
          {recipe.tags.filter((tagF) => tagF[0] && tagF[1]).map((tag, i) => (
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
