import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import renderWithRouter from './helpers/renderWith';

describe('Teste o componente <App.js />', () => {
  beforeEach(() => {
    renderWithRouter(<App />);
  });
  test('Verifica login tela', () => {
    const email = screen.getByTestId('email-input');
    expect(email).toBeInTheDocument();
    userEvent.type(email, 'cristiano@gmail.com');
    expect(email.value).toBe('cristiano@gmail.com');
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
});
