import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { readlocalStorage, saveLocalStore } from '../services/hadleStorage';
import './styles/checkIngredients.css';

export default function CheckIngredients({ ingredientsList, meals, drinks }) {
  const [checkedList, setCheckedList] = useState([]);

  const history = useHistory();
  const { location: { pathname } } = history;
  const recipeType = pathname.includes('meals') ? 'meals' : 'drinks';
  const recipeId = pathname.includes('meals') ? meals[0].idMeal
    : drinks[0].idDrink;

  useEffect(() => {
    console.log('entrei');
    const getCheckedItens = readlocalStorage('inProgressRecipes');
    setCheckedList(getCheckedItens[recipeType][recipeId]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (checkedList?.length > 0) {
      const prevState = readlocalStorage('inProgressRecipes');
      prevState[recipeType][recipeId] = checkedList;
      saveLocalStore('inProgressRecipes', prevState);
    }
    if (checkedList.length === 0) {
      const prevState = readlocalStorage('inProgressRecipes');
      console.log(readlocalStorage('inProgressRecipes'));
      prevState[recipeType][recipeId] = [];
      saveLocalStore('inProgressRecipes', prevState);
    }
  }, [checkedList, recipeId, recipeType]);

  const genericHandleChange = ({ target: { checked, id } }) => {
    if (checked && !checkedList.some((item) => item === id)) {
      setCheckedList((state) => [...state, id]);
    }
    if (!checked) {
      setCheckedList(checkedList.filter((item) => item !== id));
    }
  };
  return (

    <div>
      {console.log(checkedList)}
      { ingredientsList.map((item, index) => (
        <label
          className={ checkedList?.some((e) => e === item[1])
            ? 'igredientChecked' : null }
          key={ `${index}${item[1]}` }
          htmlFor={ item[1] }
          data-testid={ `${index}-ingredient-step` }
        >
          {item[1]}
          <input
            onChange={ (e) => genericHandleChange(e) }
            type="checkbox"
            id={ item[1] }
            checked={ checkedList?.some((e) => e === item[1]) }
            name="ingredient"
          />
        </label>

      ))}
    </div>
  );
}

CheckIngredients.propTypes = {
  ingredientsList: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  meals: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  drinks: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};
