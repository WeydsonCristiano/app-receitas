import React, { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import recipeContext from '../context/recipeContext';

export default function RecommendationCard() {
  const { rec } = useContext(recipeContext);
  const route = useLocation();
  const { pathname } = route;
  return (
    <div>
      <h2 className="recomendationsTitle">Recomendations</h2>
      <section className="flexContainer carrousel">
        {
          rec.map((e, index) => (
            <div
              className="recomendationCard"
              key={ pathname.includes('meal') ? e.idDrink : e.idMeal }
              data-testid={ `${index}-recommendation-card` }
            >
              <div>
                <img
                  className="recomendationImg"
                  src={ pathname.includes('meal') ? e.strDrinkThumb : e.strMealThumb }
                  alt={ pathname.includes('meal') ? e.strDrink : e.strMeal }
                />
              </div>
              <h3
                data-testid={ `${index}-recommendation-title` }
                className="recomendationName"
              >
                { pathname.includes('meal') ? e.strDrink : e.strMeal }
              </h3>
            </div>
          ))
        }
      </section>
    </div>
  );
}
