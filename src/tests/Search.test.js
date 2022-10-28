import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import renderWithRouter from './helpers/renderWith';

const email = 'email@email.com';
const password = '12345678';

describe('Teste o componente <SearchBar />', () => {
  jest.spyOn(window, 'alert').mockImplementation(() => {});
  const searchInput = 'search-input';
  it('Renderiza a search bar', () => {
    renderWithRouter(<App />);
    const putMail = screen.getByPlaceholderText(/digite seu email/i);
    const putPassword = screen.getByPlaceholderText(/digite sua senha/i);
    const loginBtn = screen.getByText(/entrar/i);

    expect(putMail).toBeInTheDocument();
    expect(putPassword).toBeInTheDocument();
    expect(loginBtn).toBeInTheDocument();

    userEvent.type(putMail, email);
    userEvent.type(putPassword, password);
    userEvent.click(loginBtn);

    const pageTitle = screen.getByRole('heading', {
      name: /meals/i,
    });

    const searchTogle = screen.getByRole('img', {
      name: /icone de pesquisa/i,
    });

    userEvent.click(searchTogle);

    const typeFilter = screen.getByTestId(searchInput);

    expect(pageTitle).toBeInTheDocument();
    expect(typeFilter).toBeInTheDocument();

    userEvent.click(searchTogle);

    expect(typeFilter).not.toBeInTheDocument();
  });

  it('renderiza searchbar em drinks', () => {
    renderWithRouter(<App />);
    const putMail = screen.getByPlaceholderText(/digite seu email/i);
    const putPassword = screen.getByPlaceholderText(/digite sua senha/i);
    const loginBtn = screen.getByText(/entrar/i);

    expect(putMail).toBeInTheDocument();
    expect(putPassword).toBeInTheDocument();
    expect(loginBtn).toBeInTheDocument();

    userEvent.type(putMail, email);
    userEvent.type(putPassword, password);
    userEvent.click(loginBtn);

    const drinksBtn = screen.getByRole('img', {
      name: /drink/i,
    });

    userEvent.click(drinksBtn);

    const pageTitle = screen.getByRole('heading', {
      name: /drinks/i,
    });

    const searchTogle = screen.getByRole('img', {
      name: /icone de pesquisa/i,
    });

    userEvent.click(searchTogle);

    const typeFilter = screen.getByTestId(searchInput);

    expect(pageTitle).toBeInTheDocument();
    expect(typeFilter).toBeInTheDocument();

    userEvent.click(searchTogle);

    expect(typeFilter).not.toBeInTheDocument();
  });

  it('Executa corretamente a pesquisa por nome', async () => {
    renderWithRouter(<App />);
    const putMail = screen.getByPlaceholderText(/digite seu email/i);
    const putPassword = screen.getByPlaceholderText(/digite sua senha/i);
    const loginBtn = screen.getByText(/entrar/i);

    userEvent.type(putMail, email);
    userEvent.type(putPassword, password);
    userEvent.click(loginBtn);

    const searchTogle = screen.getByRole('img', {
      name: /icone de pesquisa/i,
    });

    userEvent.click(searchTogle);

    const searchBtn = screen.getByRole('button', {
      name: /search button/i,
    });

    const name = screen.getByText(/name/i);

    const typeFilter = screen.getByTestId(searchInput);

    userEvent.click(name);
    userEvent.type(typeFilter, 'rice');
    userEvent.click(searchBtn);

    const recipe = await screen.findByText(/japanese gohan rice/i);

    expect(recipe).toBeInTheDocument();
  });

  it('Executa corretamente a pesquisa pela primeira letra', async () => {
    renderWithRouter(<App />);
    const putMail = screen.getByPlaceholderText(/digite seu email/i);
    const putPassword = screen.getByPlaceholderText(/digite sua senha/i);
    const loginBtn = screen.getByText(/entrar/i);

    userEvent.type(putMail, email);
    userEvent.type(putPassword, password);
    userEvent.click(loginBtn);

    const searchTogle = screen.getByRole('img', {
      name: /icone de pesquisa/i,
    });

    userEvent.click(searchTogle);

    const searchBtn = screen.getByRole('button', {
      name: /search button/i,
    });

    const firstLetter = screen.getByRole('radio', {
      name: /first letter/i,
    });

    const typeFilter = screen.getByTestId(searchInput);

    userEvent.click(firstLetter);
    userEvent.type(typeFilter, 'a');
    userEvent.click(searchBtn);

    const recipe = await screen.findByText(/apple frangipan tart/i);

    expect(recipe).toBeInTheDocument();
  });

  it('Executa corretamente a pesquisa por ingrediente', async () => {
    renderWithRouter(<App />);
    const putMail = screen.getByPlaceholderText(/digite seu email/i);
    const putPassword = screen.getByPlaceholderText(/digite sua senha/i);
    const loginBtn = screen.getByText(/entrar/i);

    userEvent.type(putMail, email);
    userEvent.type(putPassword, password);
    userEvent.click(loginBtn);

    const searchTogle = screen.getByRole('img', {
      name: /icone de pesquisa/i,
    });

    userEvent.click(searchTogle);

    const searchBtn = screen.getByRole('button', {
      name: /search button/i,
    });

    const ingredient = screen.getByRole('radio', {
      name: /ingredient/i,
    });

    const typeFilter = screen.getByTestId(searchInput);

    userEvent.click(ingredient);
    userEvent.type(typeFilter, 'chicken');
    userEvent.click(searchBtn);

    const recipe = await screen.findByText(/brown stew chicken/i);

    expect(recipe).toBeInTheDocument();
  });

  it('Teste de alert primeira letra', () => {
    renderWithRouter(<App />);
    const putMail = screen.getByPlaceholderText(/digite seu email/i);
    const putPassword = screen.getByPlaceholderText(/digite sua senha/i);
    const loginBtn = screen.getByText(/entrar/i);

    userEvent.type(putMail, email);
    userEvent.type(putPassword, password);
    userEvent.click(loginBtn);

    const searchTogle = screen.getByRole('img', {
      name: /icone de pesquisa/i,
    });

    userEvent.click(searchTogle);

    const searchBtn = screen.getByRole('button', {
      name: /search button/i,
    });

    const firstLetter = screen.getByRole('radio', {
      name: /first letter/i,
    });

    const typeFilter = screen.getByTestId(searchInput);
    userEvent.click(firstLetter);
    userEvent.type(typeFilter, 'ab');
    userEvent.click(searchBtn);

    expect(window.alert).toBeCalledWith('Your search must have only 1 (one) character');
  });

  it('Teste alert por nome', async () => {
    renderWithRouter(<App />);
    const putMail = screen.getByPlaceholderText(/digite seu email/i);
    const putPassword = screen.getByPlaceholderText(/digite sua senha/i);
    const loginBtn = screen.getByText(/entrar/i);

    userEvent.type(putMail, email);
    userEvent.type(putPassword, password);
    userEvent.click(loginBtn);

    const searchTogle = screen.getByRole('img', {
      name: /icone de pesquisa/i,
    });

    userEvent.click(searchTogle);

    const searchBtn = screen.getByRole('button', {
      name: /search button/i,
    });

    const name = screen.getByText(/name/i);

    const typeFilter = screen.getByTestId(searchInput);

    userEvent.click(name);
    userEvent.type(typeFilter, 'asssdadab');
    userEvent.click(searchBtn);

    try {
      await fetch().resolves;
    } catch {
      expect(window.alert).toBeCalledWith('Sorry, we haven\'t found any recipes for these filters.');
    }
  });

  it('Teste alert por ingrediente', async () => {
    renderWithRouter(<App />);
    const putMail = screen.getByPlaceholderText(/digite seu email/i);
    const putPassword = screen.getByPlaceholderText(/digite sua senha/i);
    const loginBtn = screen.getByText(/entrar/i);

    userEvent.type(putMail, email);
    userEvent.type(putPassword, password);
    userEvent.click(loginBtn);

    const searchTogle = screen.getByRole('img', {
      name: /icone de pesquisa/i,
    });

    userEvent.click(searchTogle);

    const searchBtn = screen.getByRole('button', {
      name: /search button/i,
    });

    const ingredient = screen.getByRole('radio', {
      name: /ingredient/i,
    });

    const typeFilter = screen.getByTestId(searchInput);

    userEvent.click(ingredient);
    userEvent.type(typeFilter, 'asasasas');
    userEvent.click(searchBtn);

    try {
      await fetch().resolves;
    } catch {
      expect(window.alert).toBeCalledWith('Sorry, we haven\'t found any recipes for these filters.');
    }
  });

  it('Campos de pesquisa vazios', () => {
    renderWithRouter(<App />);
    const putMail = screen.getByPlaceholderText(/digite seu email/i);
    const putPassword = screen.getByPlaceholderText(/digite sua senha/i);
    const loginBtn = screen.getByText(/entrar/i);

    userEvent.type(putMail, email);
    userEvent.type(putPassword, password);
    userEvent.click(loginBtn);

    const searchTogle = screen.getByRole('img', {
      name: /icone de pesquisa/i,
    });

    userEvent.click(searchTogle);

    const searchBtn = screen.getByRole('button', {
      name: /search button/i,
    });

    userEvent.click(searchBtn);

    expect(window.alert).toBeCalledWith('Empty search.');
  });

  it('Testando se um elemento leva para a pagina de detalhes', async () => {
    const { history } = renderWithRouter(<App />);
    const { location: { pathname } } = history;
    const putMail = screen.getByPlaceholderText(/digite seu email/i);
    const putPassword = screen.getByPlaceholderText(/digite sua senha/i);
    const loginBtn = screen.getByText(/entrar/i);

    userEvent.type(putMail, email);
    userEvent.type(putPassword, password);
    userEvent.click(loginBtn);

    const searchTogle = screen.getByRole('img', {
      name: /icone de pesquisa/i,
    });

    userEvent.click(searchTogle);

    const searchBtn = screen.getByRole('button', {
      name: /search button/i,
    });

    const ingredient = screen.getByRole('radio', {
      name: /ingredient/i,
    });

    const typeFilter = screen.getByTestId(searchInput);

    userEvent.click(ingredient);
    userEvent.type(typeFilter, 'quinoa');
    userEvent.click(searchBtn);

    try {
      await fetch().resolves;
    } catch {
      expect(pathname).toBe('/meals/53011');
    }
  });

  it('Testa pesquisa por ingredientes drinks', async () => {
    renderWithRouter(<App />);
    const putMail = screen.getByPlaceholderText(/digite seu email/i);
    const putPassword = screen.getByPlaceholderText(/digite sua senha/i);
    const loginBtn = screen.getByText(/entrar/i);

    userEvent.type(putMail, email);
    userEvent.type(putPassword, password);
    userEvent.click(loginBtn);

    const drinksBtn = screen.getByRole('img', {
      name: /drink/i,
    });

    userEvent.click(drinksBtn);

    const searchTogle = screen.getByRole('img', {
      name: /icone de pesquisa/i,
    });

    userEvent.click(searchTogle);

    const searchBtn = screen.getByRole('button', {
      name: /search button/i,
    });

    const ingredient = screen.getByRole('radio', {
      name: /ingredient/i,
    });

    const typeFilter = screen.getByTestId(searchInput);

    userEvent.click(ingredient);
    userEvent.type(typeFilter, 'vodka');
    userEvent.click(searchBtn);

    const recipe = await screen.findByText(/155 belmont/i);

    expect(recipe).toBeInTheDocument();
  });

  it('Testa pesquisa por nome drinks', async () => {
    renderWithRouter(<App />);
    const putMail = screen.getByPlaceholderText(/digite seu email/i);
    const putPassword = screen.getByPlaceholderText(/digite sua senha/i);
    const loginBtn = screen.getByText(/entrar/i);

    userEvent.type(putMail, email);
    userEvent.type(putPassword, password);
    userEvent.click(loginBtn);

    const drinksBtn = screen.getByRole('img', {
      name: /drink/i,
    });

    userEvent.click(drinksBtn);

    const searchTogle = screen.getByRole('img', {
      name: /icone de pesquisa/i,
    });

    userEvent.click(searchTogle);

    const searchBtn = screen.getByRole('button', {
      name: /search button/i,
    });

    const name = screen.getByRole('radio', {
      name: /name/i,
    });

    const typeFilter = screen.getByTestId(searchInput);

    userEvent.click(name);
    userEvent.type(typeFilter, 'margarita');
    userEvent.click(searchBtn);

    const recipe = await screen.findByText(/blue margarita/i);

    expect(recipe).toBeInTheDocument();
  });

  it('Testa pesquisa pela primeira letra drinks', async () => {
    renderWithRouter(<App />);
    const putMail = screen.getByPlaceholderText(/digite seu email/i);
    const putPassword = screen.getByPlaceholderText(/digite sua senha/i);
    const loginBtn = screen.getByText(/entrar/i);

    userEvent.type(putMail, email);
    userEvent.type(putPassword, password);
    userEvent.click(loginBtn);

    const drinksBtn = screen.getByRole('img', {
      name: /drink/i,
    });

    userEvent.click(drinksBtn);

    const searchTogle = screen.getByRole('img', {
      name: /icone de pesquisa/i,
    });

    userEvent.click(searchTogle);

    const searchBtn = screen.getByRole('button', {
      name: /search button/i,
    });

    const firstLetter = screen.getByRole('radio', {
      name: /first letter/i,
    });

    const typeFilter = screen.getByTestId(searchInput);

    userEvent.click(firstLetter);
    userEvent.type(typeFilter, 'a');
    userEvent.click(searchBtn);

    const recipe = await screen.findByText(/a1/i);

    expect(recipe).toBeInTheDocument();
  });
});
