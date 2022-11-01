import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import { readlocalStorage, saveLocalStore } from '../services/hadleStorage';
import './styles/checkIngredients.css';
import recipeContext from '../context/recipeContext';

export default function CheckIngredients({ ingredientsList, meals, drinks }) {
  const { globalIngrd, setIsDesable } = useContext(recipeContext);
  const [checkedList, setCheckedList] = useState([]);

  console.log(globalIngrd);

  const history = useHistory();
  const { location: { pathname } } = history;
  const recipeType = pathname.includes('meals') ? 'meals' : 'drinks';
  const recipeId = pathname.includes('meals') ? meals[0].idMeal
    : drinks[0].idDrink;

  // console.log(readlocalStorage('inProgressRecipes')[recipeType][recipeId].length === globalIngrd.length);

  useEffect(() => {
    const getCheckedItens = readlocalStorage('inProgressRecipes');
    let storageCheckedList = getCheckedItens[recipeType][recipeId];
    if (storageCheckedList === undefined) {
      storageCheckedList = [];
    }
    if (storageCheckedList.length === globalIngrd.length) {
      setIsDesable(false);
    }
    setCheckedList(storageCheckedList);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (checkedList?.length > 0) {
      const prevState = readlocalStorage('inProgressRecipes');
      prevState[recipeType][recipeId] = checkedList;
      saveLocalStore('inProgressRecipes', prevState);
    }
    if (checkedList?.length === 0) {
      const prevState = readlocalStorage('inProgressRecipes');
      prevState[recipeType][recipeId] = [];
      saveLocalStore('inProgressRecipes', prevState);
    }
  }, [checkedList, recipeId, recipeType]);

  const genericHandleChange = ({ target: { checked, id } }) => {
    if (checked && !checkedList?.some((item) => item === id)) {
      setCheckedList((state) => [...state, id]);
    }
    if (!checked) {
      setCheckedList(checkedList?.filter((item) => item !== id));
    }
  };
  return (

    <div>
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
