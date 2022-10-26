import React from 'react';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import './styles/footer.css';

function Footer() {
  return (
    <Container className="footer-container" fluid data-testid="footer">
      <div className="icons-container">
        <Link to="/drinks">
          <img
            data-testid="drinks-bottom-btn"
            src={ drinkIcon }
            alt="drink"
          />
        </Link>
        <Link to="/meals">
          <img
            data-testid="meals-bottom-btn"
            src={ mealIcon }
            alt="meal"
          />
        </Link>
      </div>
    </Container>
  );
}

export default Footer;
