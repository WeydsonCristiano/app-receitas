import React from 'react';
import { NavLink } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import './styles/footer.css';

function Footer() {
  return (
    <section className="footer-container" fluid data-testid="footer">
      <div className="icons-container">
        <NavLink to="/drinks">
          <img
            className="changeBtn"
            data-testid="drinks-bottom-btn"
            src={ drinkIcon }
            alt="drink"
          />
        </NavLink>
        <NavLink to="/meals">
          <img
            className="changeBtn"
            data-testid="meals-bottom-btn"
            src={ mealIcon }
            alt="meal"
          />
        </NavLink>
      </div>
    </section>
  );
}

export default Footer;
