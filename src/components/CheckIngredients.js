import PropTypes from 'prop-types';
import './styles/checkIngredients.css';

export default function CheckIngredients({ ingredientsList,
  handleChange, checked }) {
  return (
    <div>
      { ingredientsList.map((item, index) => (
        <label
          className={ checked
            .some((e) => e === item[1]) ? 'igredientChecked' : null }
          key={ `${index}${item[1]}` }
          htmlFor={ item[1] }
          data-testid={ `${index}-ingredient-step` }
        >
          {item[1]}
          <input
            onChange={ handleChange }
            type="checkbox"
            id={ item[1] }
            // checked={}
            name="ingredient"
          />
        </label>

      ))}
    </div>
  );
}

CheckIngredients.propTypes = {
  ingredientsList: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  handleChange: PropTypes.func.isRequired,
  checked: PropTypes.arrayOf(PropTypes.string).isRequired,
};
