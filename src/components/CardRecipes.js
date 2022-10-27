import React from 'react';
import Card from 'react-bootstrap/Card';

export default function CardRecipes(index, name, thumb) {
  return (
    <Card
      key={ index }
      data-testid={ `${index}-recipe-card` }
    >
      <Card.Img
        variant="top"
        data-testid={ `${index}-card-img` }
        src={ thumb }
        alt={ name }
      />
      <Card.Footer data-testid={ `${index}-card-name` }>{name}</Card.Footer>
    </Card>
  );
}
