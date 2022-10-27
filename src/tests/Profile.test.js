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
    const botaoPerfil = screen.getByRole('img', {
      name: /icone de perfil/i,
    });
    expect(botaoPerfil).toBeInTheDocument();
    userEvent.click(botaoPerfil);
    expect(history.location.pathname).toBe('/profile');
    const emailTela = screen.getByText(/cristiano@gmail.com/i);
    expect(emailTela.innerHTML).toBe(emailtest);
    const botaoLogout = screen.getByTestId('profile-logout-btn');
    userEvent.click(botaoLogout);
    expect(pathname).toBe('/');
  });

  it('testando se vai para (/done-recipes)', async () => {
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
    const botaoPerfil = screen.getByRole('img', {
      name: /icone de perfil/i,
    });
    expect(botaoPerfil).toBeInTheDocument();
    userEvent.click(botaoPerfil);
    expect(history.location.pathname).toBe('/profile');
    const datatestDoneRecipes = screen.getByTestId('profile-done-btn');
    expect(datatestDoneRecipes).toBeInTheDocument();
    userEvent.click(datatestDoneRecipes);
    // expect(pathname).toBe('/done-recipes');
  });

  it('testando se vai para (/favorite-recipes)', async () => {
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
    const botaoPerfil = screen.getByRole('img', {
      name: /icone de perfil/i,
    });
    expect(botaoPerfil).toBeInTheDocument();
    userEvent.click(botaoPerfil);
    expect(history.location.pathname).toBe('/profile');
    const emailTela = screen.getByText(/cristiano@gmail.com/i);
    expect(emailTela.innerHTML).toBe('cristiano@gmail.com');
    expect(screen.getByRole('button', {
      name: /done recipes/i,
    }));
    const datatestDoneRecipes = screen.getByTestId('profile-done-btn');
    expect(datatestDoneRecipes).toBeInTheDocument();
    expect(screen.getByRole('button', {
      name: /favorite recipes/i,
    }));
    const datatestFavorites = screen.getByTestId('profile-favorite-btn');
    expect(datatestFavorites).toBeInTheDocument();
    userEvent.click(datatestFavorites);
    // expect(pathname).toBe('/favorite-recipes');
  });
});
