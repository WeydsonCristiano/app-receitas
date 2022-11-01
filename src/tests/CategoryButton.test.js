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
});
