import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import { useContext } from 'react';
import recipeContext from '../context/recipeContext';

export default function CardRecipes(index, name, thumb, id) {
  const { history } = useContext(recipeContext);
  const { location: { pathname } } = history;
  return (
    <Link
      to={
        pathname === '/meals' ? `/meals/${id}` : `/drinks/${id}`
      }
      key={ index }
      data-testid={ `${index}-recipe-card` }
    >
      <Card>
        <Card.Img
          variant="top"
          data-testid={ `${index}-card-img` }
          src={ thumb }
          alt={ name }
        />
        <Card.Footer data-testid={ `${index}-card-name` }>{name}</Card.Footer>
      </Card>
    </Link>
  );
}

