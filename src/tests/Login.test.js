import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import renderWithRouter from './helpers/renderWith';

describe('Teste o componente <App.js />', () => {
  const emailtest = 'cristiano@gmail.com';
  test('Verifica login tela', () => {
    renderWithRouter(<App />);
    const email = screen.getByTestId('email-input');
    expect(email).toBeInTheDocument();
    userEvent.type(email, emailtest);
    expect(email.value).toBe(emailtest);
    const passWord = screen.getByTestId('password-input');
    expect(passWord).toBeInTheDocument();
    userEvent.type(passWord, '123456');
    expect(passWord.value).toBe('123456');
    const botaoEntrar = screen.getByRole('button', {
      name: /entrar/i,
    });
    expect(botaoEntrar).toBeInTheDocument();
    userEvent.click(botaoEntrar);
  });

  test('testa se ao clickar no botão muda para a rota "/meals', () => {
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
  });
});
