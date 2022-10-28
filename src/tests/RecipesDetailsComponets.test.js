import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import renderWithRouter from './helpers/renderWith';

const emailtest = 'cristiano@gmail.com';
const passWordTest = '1234567';
const datatestEmail = 'email-input';
const datatestPassword = 'password-input';
describe('Teste o componente <Footer.js />', () => {
  it('testando se tela', async () => {
    const { history } = renderWithRouter(<App />);
    const { location: { pathname } } = history;
    expect(pathname).toBe('/');
    const email = screen.getByTestId(datatestEmail);
    userEvent.type(email, emailtest);
    const passWord = screen.getByTestId(datatestPassword);
    userEvent.type(passWord, passWordTest);
    const botaoEntrar = screen.getByRole('button', {
      name: /entrar/i,
    });
    userEvent.click(botaoEntrar);
    expect(history.location.pathname).toBe('/meals');
    expect(screen.findByTestId('page-title'));
    expect(screen.findByTestId('search-top-btn'));
    expect(screen.findByTestId('profile-top-btn'));
    expect(screen.findByTestId('Beef-category-filter'));
    expect(screen.findByTestId('Breakfast-category-filter'));
    expect(screen.findByTestId('Chicken-category-filter'));
    expect(screen.findByTestId('Dessert-category-filter'));
    expect(screen.findByTestId('Goat-category-filter'));
    expect(screen.findByTestId('All-category-filter'));
    const detailsDrinks = screen.getByTestId('drinks-bottom-btn');
    userEvent.click(detailsDrinks);
    expect(history.location.pathname).toBe('/drinks');
    const detailsMeals = screen.getByTestId('meals-bottom-btn');
    userEvent.click(detailsMeals);
  });
  it('testando botao start/finish', async () => {
    renderWithRouter(<App />, { initialEntries: ['/meals/:id/in-progress'] });
    expect(screen.findByTestId('recipe-photo'));
    expect(screen.findByTestId('recipe-title'));
    expect(screen.findByTestId('TestId'));
    expect(screen.findByTestId('favorite-btn'));
    expect(screen.findByTestId('share-btn'));
    expect(screen.findByTestId('start-recipe-btn'));
    const buttonStartRecipes = screen.findByTestId('start-recipe-btn');
    userEvent.click(buttonStartRecipes);

    await waitFor(() => {
      expect(screen.findByAltText('finish-recipe-btn'));
    });
  });

  // it('testando botao favoritar', async () => {
  //   renderWithRouter(<App />, { initialEntries: ['/drinks/:id/in-progress'] });
  //   const buttonFavoritar = screen.findByTestId('favorite-btn');
  //   userEvent.click(buttonFavoritar);
  // });

  // it('testando botao compartilhar', async () => {
  //   renderWithRouter(<App />, { initialEntries: ['/drinks/:id/in-progress'] });
  //   const buttonCompartilhar = screen.findByTestId('share-btn');
  //   userEvent.click(buttonCompartilhar);
  // });
});
