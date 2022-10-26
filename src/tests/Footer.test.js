import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import Recipes from '../pages/Recipes';
// import App from '../App';
import renderWithRouter from './helpers/renderWith';

describe('Teste o componente <Footer.js />', () => {
  it('se esta renderizando os dois icones', () => {
    renderWithRouter(<Recipes />);
    expect(screen.getAllByRole('img')).toHaveLength(2);
  });
  it('se ao clicar nos icones redireciona para a rota correta', () => {
    const { history } = renderWithRouter(<Recipes />, { initialEntries: ['/meals'] });
    const { location: { pathname } } = history;
    expect(pathname).toBe('/meals');
    const drinkIcon = screen.getByRole('img', {
      name: /drink/i,
    });
    userEvent.click(drinkIcon);
    expect(history.location.pathname).toBe('/drinks');
  });
});
