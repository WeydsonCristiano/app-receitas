import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import renderWithRouter from './helpers/renderWith';

const emailtest = 'cristiano@gmail.com';

describe('Teste o componente <Footer.js />', () => {
  it('se esta renderizando os dois icones', () => {
    const { history } = renderWithRouter(<App />);
    const { location: { pathname } } = history;
    expect(pathname).toBe('/');
    const email = screen.getByTestId('email-input');
    userEvent.type(email, emailtest);
    const passWord = screen.getByTestId('password-input');
    userEvent.type(passWord, '1234567');
    const botaoEntrar = screen.getByRole('button', {
      name: /entrar/i,
    });
    userEvent.click(botaoEntrar);
    expect(history.location.pathname).toBe('/meals');
    const drinkIcon = screen.getByRole('img', {
      name: /drink/i,
    });
    userEvent.click(drinkIcon);
    expect(history.location.pathname).toBe('/drinks');
  });
});
