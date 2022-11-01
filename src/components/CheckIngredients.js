import React from 'react';
import PropTypes from 'prop-types';

export default function CheckIngredients({ ingredientsList }) {
  return (
    <div className="listaReceitas1">
      { ingredientsList.map((item, index) => (
        <label
          key={ `${index}${item}` }
          htmlFor="item"
          data-testid={ `${index}-ingredient-step` }
        >
          {item}
          <input
            type="checkbox"
            id={ item }
            value={ item }
            name={ item }
          />
        </label>

      ))}
    </div>
  );
}

CheckIngredients.propTypes = {
  ingredientsList: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};
