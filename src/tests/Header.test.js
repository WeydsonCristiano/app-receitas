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
  it('testando se tela rota "/drinks"', async () => {
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
    expect(screen.findByTestId('Beef-category-filter'));
    expect(screen.findByTestId('Breakfast-category-filter'));
    expect(screen.findByTestId('Chicken-category-filter'));
    expect(screen.findByTestId('Dessert-category-filter'));
    expect(screen.findByTestId('Goat-category-filter'));
    expect(screen.findByTestId('All-category-filter'));
    expect(screen.findByTestId('profile-top-btn'));
    expect(screen.findByTestId('meals-bottom-btn'));
    expect(screen.findByTestId('drinks-bottom-btn'));
    expect(screen.findAllByTestId('0-card-img'));
    const botaoDrink = screen.getByRole('img', {
      name: /drink/i,
    });
    userEvent.click(botaoDrink);
    expect(history.location.pathname).toBe('/drinks');
    const botaoMeal = screen.getByRole('img', {
      name: /meal/i,
    });
    userEvent.click(botaoMeal);
    expect(history.location.pathname).toBe('/meals');
  });
  it('testando se tela rota "/drinks"', async () => {
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
    const botaoPesquisa = screen.getByTestId('search-top-btn');
    userEvent.click(botaoPesquisa);
  });
});
