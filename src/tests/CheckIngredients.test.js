import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import renderWithRouter from './helpers/renderWith';

const ingredientes = ['Olive Oil',
  'Butter',
  'Beef',
  'Plain Flour',
  'Garlic',
  'Onions',
  'Celery',
  'Carrots',
  'Leek',
  'Swede',
  'Red Wine',
  'Beef Stock',
  'Bay Leaf',
  'Thyme',
  'Parsley',
  'Plain Flour',
  'Baking Powder',
  'Suet',
  'Water',
];

describe('Teste o componente <Footer.js />', () => {
  jest.spyOn(window, 'alert').mockImplementation(() => {});

  it('testando rota search', async () => {
    renderWithRouter(<App />, { initialEntries: ['/meals'] });
    expect(screen.findByTestId('search-top-btn'));
    const botaoSearch = await screen.findByRole('img', {
      name: /icone de pesquisa/i,
    });
    userEvent.click(botaoSearch);
    expect(screen.findByTestId('name-search-radio'));
    const inputPesquisa = screen.findByTestId('search-input');
    userEvent.type(inputPesquisa, 'beef dumpling stew');
    const botaoNamePesquisa = await screen.findByRole('img', {
      name: /search button/i,
    });
    userEvent.click(botaoNamePesquisa);
    expect(screen.findByTestId('recipe-photo'));
    expect(screen.findByTestId('favorite-btn'));
    expect(screen.findByTestId('recipe-title'));
    expect(screen.findByTestId('start-recipe-btn'));
    const listIngredient = screen.findByText(ingredientes);
    expect(listIngredient.innerHTML).toBe();
  });
});
