import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import renderWithRouter from './helpers/renderWith';

describe('Teste o componente <Footer.js />', () => {
  jest.spyOn(window, 'alert').mockImplementation(() => {});

  it('testando rota search', async () => {
    renderWithRouter(<App />, { initialEntries: ['/meals'] });
    expect(screen.findByTestId('page-title'));
    expect(screen.findByTestId('search-top-btn'));
    const botaoSearch = await screen.findByRole('img', {
      name: /icone de pesquisa/i,
    });
    userEvent.click(botaoSearch);
    expect(screen.getByText(/chose a filter type:/i));
    expect(screen.findByTestId('ingredient-search-radio'));
    expect(screen.findByTestId('first-letter-search-radio'));
    expect(screen.findByTestId('name-search-radio'));
    const inputPesquisa = screen.findByTestId('search-input');
    userEvent.type(inputPesquisa, 'beef dumpling stew');
    const botaoNamePesquisa = screen.getByRole('img', {
      name: /search button/i,
    });
    userEvent.click(botaoNamePesquisa);
    expect(screen.findByTestId('recipe-photo'));
    expect(screen.findByTestId('favorite-btn'));
    expect(screen.findByTestId('recipe-title'));
    expect(screen.findByTestId('start-recipe-btn'));
  });

  it('testando rota profile', async () => {
    renderWithRouter(<App />, { initialEntries: ['/meals'] });
    expect(screen.findByTestId('profile-top-btn'));
    const botaoProfile = screen.getByRole('img', {
      name: /icone de perfil/i,
    });
    userEvent.click(botaoProfile);
  });

  it('testando rota category filter', async () => {
    renderWithRouter(<App />, { initialEntries: ['/meals'] });
    expect(screen.findByTestId('Beef-category-filter'));
  });

  it('testando rota breakfast', async () => {
    renderWithRouter(<App />, { initialEntries: ['/meals'] });
    expect(screen.findByTestId('Breakfast-category-filter'));
    // const botaoBreakFast = screen.getByRole('button', {
    //   name: /breakfast/i,
    // });
    // userEvent.click(botaoBreakFast);
  });

  it('testando rota chiken', async () => {
    renderWithRouter(<App />, { initialEntries: ['/meals'] });
    expect(screen.findByTestId('Chicken-category-filter'));
    // const botaoChicken = screen.getByRole('button', {
    //   name: /chicken/i,
    // });
    // userEvent.click(botaoChicken);
  });

  it('testando rota Dessert', async () => {
    renderWithRouter(<App />, { initialEntries: ['/meals'] });
    expect(screen.findByTestId('Dessert-category-filter'));
    // const botaoDessert = screen.getByRole('button', {
    //   name: /dessert/i,
    // });
    // userEvent.click(botaoDessert);
  });

  it('testando rota allFilter', async () => {
    renderWithRouter(<App />, { initialEntries: ['/meals'] });
    expect(screen.findByTestId('All-category-filter'));
    const botaoAllCategory = screen.getByRole('button', {
      name: /all/i,
    });
    userEvent.click(botaoAllCategory);
  });

  it('testando rota category filter', async () => {
    renderWithRouter(<App />, { initialEntries: ['/meals'] });
    expect(screen.findByTestId('Goat-category-filter'));
    // const botaoGoat = screen.getByRole('button', {
    //   name: /goat/i,
    // });
    // userEvent.click(botaoGoat);
  });
});
