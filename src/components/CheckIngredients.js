import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import { readlocalStorage, saveLocalStore } from '../services/hadleStorage';
import './styles/checkIngredients.css';
import recipeContext from '../context/recipeContext';

export default function CheckIngredients({ ingredientsList, meals, drinks }) {
  const { globalIngrd, setIsDesable } = useContext(recipeContext);
  const [checkedList, setCheckedList] = useState([]);

  const history = useHistory();
  const { location: { pathname } } = history;
  const recipeType = pathname.includes('meals') ? 'meals' : 'drinks';
  const recipeId = pathname.includes('meals') ? meals[0].idMeal
    : drinks[0].idDrink;

  useEffect(() => {
    const getCheckedItens = readlocalStorage('inProgressRecipes') || {
      drinks: {},
      meals: {},
    };
    const storageCheckedList = getCheckedItens[recipeType][recipeId] || [];
    setCheckedList(storageCheckedList);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (checkedList?.length > 0) {
      const prevState = readlocalStorage('inProgressRecipes');
      prevState[recipeType][recipeId] = checkedList || [];
      saveLocalStore('inProgressRecipes', prevState);
    }
    if (checkedList?.length === 0) {
      const prevState = readlocalStorage('inProgressRecipes') || {
        drinks: {},
        meals: {},
      };
      prevState[recipeType][recipeId] = [];
      saveLocalStore('inProgressRecipes', prevState);
    }
    if (checkedList.length === globalIngrd.length) {
      setIsDesable(false);
    } else {
      setIsDesable(true);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checkedList]);

  const genericHandleChange = ({ target: { checked, id } }) => {
    console.log(checkedList[0] === id);
    if (checked && !checkedList?.some((item) => item === id)) {
      console.log('entro aqui');
      setCheckedList((state) => [...state, id]);
    }
    if (!checked) {
      console.log('entro aqui');
      setCheckedList(checkedList?.filter((item) => item !== id));
    }
  };
  return (
    <div className="listaReceitas1">
      { ingredientsList.map((item, index) => (
        <label
          className={ checkedList?.some((e) => Number(e) === index)
            ? 'igredientChecked' : null }
          key={ `${index}${item[1]}` }
          htmlFor={ index }
          data-testid={ `${index}-ingredient-step` }
        >
          {item[1]}
          <input
            onChange={ (e) => genericHandleChange(e) }
            type="checkbox"
            id={ index }
            checked={ checkedList?.some((e) => Number(e) === index) }
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
