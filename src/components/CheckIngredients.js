import { useHistory } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import { readlocalStorage, saveLocalStore } from '../services/hadleStorage';
import recipeContext from '../context/recipeContext';

export default function CheckIngredients() {
  const { globalIngrd, setIsDesable, globalId } = useContext(recipeContext);
  const [checkedList, setCheckedList] = useState([]);

  const history = useHistory();
  const { location: { pathname } } = history;
  const recipeType = pathname.includes('meals') ? 'meals' : 'drinks';

  useEffect(() => {
    const getCheckedItens = readlocalStorage('inProgressRecipes') || {
      drinks: {},
      meals: {},
    };
    const storageCheckedList = getCheckedItens[recipeType][globalId] || [];
    setCheckedList(storageCheckedList);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (checkedList?.length > 0) {
      const prevState = readlocalStorage('inProgressRecipes');
      prevState[recipeType][globalId] = checkedList || [];
      saveLocalStore('inProgressRecipes', prevState);
    }
    if (checkedList?.length === 0) {
      const prevState = readlocalStorage('inProgressRecipes') || {
        drinks: {},
        meals: {},
      };
      prevState[recipeType][globalId] = [];
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
    if (checked && !checkedList?.some((item) => item === id)) {
      setCheckedList((state) => [...state, id]);
    }
    if (!checked) {
      setCheckedList(checkedList?.filter((item) => item !== id));
    }
  };
  return (
    <div className="ingredientList">
      { globalIngrd.map((item, index) => (
        <label
          className={ checkedList?.some((e) => Number(e) === index)
            ? 'igredientChecked' : 'dontChecked' }
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
