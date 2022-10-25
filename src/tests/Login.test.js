import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import renderWithRouter from './helpers/renderWith';

describe('Teste o componente <App.js />', () => {
  beforeEach(() => {
    renderWithRouter(<App />);
  });
  const emailtest = 'cristiano@gmail.com';
  test('Verifica login tela', () => {
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

  test.only('test localstorage', () => {
    // either of these lines will work:
    jest.spyOn(Storage.prototype, 'setItem');
    Storage.prototype.setItem = jest.fn();

    // assertions as usual:
    const email = screen.getByTestId('email-input');
    userEvent.type(email, emailtest);
    const passWord = screen.getByTestId('password-input');
    userEvent.type(passWord, '123456');
    const botaoEntrar = screen.getByRole('button', {
      name: /entrar/i,
    });
    userEvent.click(botaoEntrar);
    expect(window.localStorage.setItem).toHaveBeenCalled();
  });
});
