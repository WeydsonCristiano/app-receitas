import React from 'react';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';

export default function RecommendationCard({ meals, drinks }) {
  const route = useLocation();
  const { pathname } = route;
  return (
    <div>
      <h1>Recomendações</h1>
      { pathname.includes('meals')
        ? (
          drinks.map((drink, index) => (
            <div key={ drink.idDrink } data-testid={ `${index}-recommendation-card` }>
              <div>
                <img
                  src={ drink.strDrinkThumb }
                  alt={ drink.strDrink }
                />
              </div>
              <h2 data-testid={ `${index}-recommendation-title` }>
                {drink.strDrink}
              </h2>
            </div>
          ))
        ) : (meals.map((meal, index) => (
          <div key={ meal.idMeal } data-testid={ `${index}-recommendation-card` }>
            <div>
              <img
                src={ meal.strMealThumb }
                alt={ meal.strMeal }
              />
            </div>
            <h2 data-testid={ `${index}-recommendation-title` }>
              {meal.strMeal}
            </h2>
          </div>
        )))}
    </div>
  );
}

RecommendationCard.propTypes = {
  meals: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  drinks: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};
