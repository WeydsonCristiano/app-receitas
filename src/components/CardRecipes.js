import { Link } from 'react-router-dom';
import { useContext } from 'react';
import recipeContext from '../context/recipeContext';
import './styles/cardRecipes.css';

export default function CardRecipes(index, name, thumb, id) {
  const { history } = useContext(recipeContext);
  const { location: { pathname } } = history;
  return (
    <Link
      className="recipeCard"
      to={
        pathname === '/meals' ? `/meals/${id}` : `/drinks/${id}`
      }
      key={ index }
      data-testid={ `${index}-recipe-card` }
    >
      <img
        data-testid={ `${index}-card-img` }
        src={ thumb }
        alt={ name }
      />
      <footer className="recipeName" data-testid={ `${index}-card-name` }>{name}</footer>
    </Link>
  );
}
