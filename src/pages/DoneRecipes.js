import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import recipeContext from '../context/recipeContext';
import { readlocalStorage } from '../services/hadleStorage';
import shareIcon from '../images/shareIcon.svg';
import Loading from '../components/Loading';
import './styles/doneRecipes.css';
import LinkCopied from '../components/LinkCopied';

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
  return (
    <div className="flexContainer direction doneRecipes">
      <Header />
      {copyed && (
        <LinkCopied />
      )}
      <section className="doneRecipesMenu flexContainer">
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
      </section>
      <section className="flexContainer doneRecipesCardsRender">
        {isLoading && <Loading />}
        {!isLoading && recipes.map((recipe, index) => (
          <div key={ recipe.id } className="doneRecipesCards flexContainer direction">
            <Link className="doneRecipeImg" to={ `/${recipe.type}s/${recipe.id}` }>
              <img
                data-testid={ `${index}-horizontal-image` }
                src={ recipe.image }
                alt={ recipe.name }
              />
            </Link>
            <section className="doneDescription flexContainer direction">
              <div className="flexContainer direction doneDescription">
                <Link
                  to={ `/${recipe.type}s/${recipe.id}` }
                  data-testid={ `${index}-horizontal-name` }
                >
                  {recipe.name}
                </Link>
                <p data-testid={ `${index}-horizontal-top-text` }>
                  {recipe.type === 'meal' ? `${recipe.nationality} - ${recipe.category}`
                    : `${recipe.alcoholicOrNot}`}
                </p>
              </div>
              <p data-testid={ `${index}-horizontal-done-date` }>
                {recipe.doneDate}
              </p>
              {recipe.tags && recipe.tags
                .filter((tagF) => tagF[0] && tagF[1]).map((tag, i) => (
                  <span
                    className="doneMealName"
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
            </section>
          </div>
        ))}
      </section>
    </div>
  );
}

export default DoneRecipes;
