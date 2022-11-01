import { screen, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import fetch from '../../cypress/mocks/fetch';
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
    const botaoNamePesquisa = await screen.findByRole('img', {
      name: /search button/i,
    });
    userEvent.click(botaoNamePesquisa);
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
    jest.spyOn(global, 'fetch').mockImplementation(fetch);
    renderWithRouter(<App />, { initialEntries: ['/meals'] });
    const loading = screen.getByText(/carregando/i);
    await waitForElementToBeRemoved(loading);

    expect(await screen.findByTestId('Breakfast-category-filter'));
    const botaoBreakFast = screen.getByRole('button', {
      name: /breakfast/i,
    });
    userEvent.click(botaoBreakFast);
  });

  it('testando rota chiken', async () => {
    jest.spyOn(global, 'fetch').mockImplementation(fetch);
    renderWithRouter(<App />, { initialEntries: ['/meals'] });
    const loading = screen.getByText(/carregando/i);
    await waitForElementToBeRemoved(loading);
    expect(screen.findByTestId('Chicken-category-filter'));
    const botaoChicken = screen.getByRole('button', {
      name: /chicken/i,
    });
    userEvent.click(botaoChicken);
  });

  it('testando rota Dessert', async () => {
    jest.spyOn(global, 'fetch').mockImplementation(fetch);
    renderWithRouter(<App />, { initialEntries: ['/meals'] });
    const loading = screen.getByText(/carregando/i);
    await waitForElementToBeRemoved(loading);
    expect(screen.findByTestId('Dessert-category-filter'));
    const botaoDessert = screen.getByRole('button', {
      name: /dessert/i,
    });
    userEvent.click(botaoDessert);
  });

  it('testando rota allFilter', async () => {
    jest.spyOn(global, 'fetch').mockImplementation(fetch);
    renderWithRouter(<App />, { initialEntries: ['/meals'] });
    const loading = screen.getByText(/carregando/i);
    await waitForElementToBeRemoved(loading);
    expect(screen.findByTestId('All-category-filter'));
    const botaoAllCategory = screen.getByRole('button', {
      name: /all/i,
    });
    userEvent.click(botaoAllCategory);
  });

  it('testando rota category filter', async () => {
    jest.spyOn(global, 'fetch').mockImplementation(fetch);
    renderWithRouter(<App />, { initialEntries: ['/meals'] });
    const loading = screen.getByText(/carregando/i);
    await waitForElementToBeRemoved(loading);
    expect(screen.findByTestId('Goat-category-filter'));
    const botaoGoat = screen.getByRole('button', {
      name: /goat/i,
    });
    userEvent.click(botaoGoat);
  });
  it('se esta renderizando drink', async () => {
    jest.spyOn(global, 'fetch').mockImplementation(fetch);
    renderWithRouter(<App />, { initialEntries: ['/meals'] });
    const loading = screen.getByText(/carregando/i);
    await waitForElementToBeRemoved(loading);
    const drinkIcon = screen.getByRole('img', {
      name: /drink/i,
    });
    userEvent.click(drinkIcon);
  });
  it('se esta renderizando  meals', async () => {
    jest.spyOn(global, 'fetch').mockImplementation(fetch);
    renderWithRouter(<App />, { initialEntries: ['/meals'] });
    const loading = screen.getByText(/carregando/i);
    await waitForElementToBeRemoved(loading);
    const mealsIcon = screen.getByTestId('meals-bottom-btn');
    userEvent.click(mealsIcon);
  });
  it('se esta renderizando profile', async () => {
    jest.spyOn(global, 'fetch').mockImplementation(fetch);
    renderWithRouter(<App />, { initialEntries: ['/meals'] });
    const loading = screen.getByText(/carregando/i);
    await waitForElementToBeRemoved(loading);
    const profile = screen.getByTestId('profile-top-btn');
    userEvent.click(profile);
  });
  it('teste rota category', async () => {
    jest.spyOn(global, 'fetch').mockImplementation(fetch);
    renderWithRouter(<App />, { initialEntries: ['/meals'] });
    const loading = screen.getByText(/carregando/i);
    await waitForElementToBeRemoved(loading);
    expect(screen.getByRole('img', {
      name: /corba/i,
    }));
    const testerotaFood = await screen.findByRole('button', {
      name: /beef/i,
    });
    userEvent.click(testerotaFood);
    expect(await screen.findByRole('img', {
      name: /beef and mustard pie/i,
    }));
    userEvent.click(testerotaFood);
    await expect(screen.findByRole('img', {
      name: /corba/i,
    }));
  });
  it('teste rotas togout', async () => {
    jest.spyOn(global, 'fetch').mockImplementation(fetch);
    renderWithRouter(<App />, { initialEntries: ['/meals'] });
    const loading = screen.getByText(/carregando/i);
    await waitForElementToBeRemoved(loading);
    const drinkIcon = await screen.findByRole('img', {
      name: /drink/i,
    });
    userEvent.click(drinkIcon);
    expect(await screen.getByRole('img', {
      name: /gg/i,
    }));
    const rotaDrink = await screen.findByRole('button', {
      name: /ordinary drink/i,
    });
    userEvent.click(rotaDrink);
    expect(screen.findByText(/3\.-mile long island iced tea/i));
    userEvent.click(rotaDrink);
    expect(await screen.findByRole('img', {
      name: /gg/i,
    }));
    const botaoMeals = await screen.findByRole('img', {
      name: /meal/i,
    });
    userEvent.click(botaoMeals);
    expect(screen.getByRole('img', {
      name: /corba/i,
    }));
    const botaodrinks = await screen.findByTestId('drinks-bottom-btn');
    userEvent.click(botaodrinks);
  });
  it('teste rotas togout', async () => {
    jest.spyOn(global, 'fetch').mockImplementation(fetch);
    renderWithRouter(<App />, { initialEntries: ['/meals'] });
    const loading = screen.getByText(/carregando/i);
    await waitForElementToBeRemoved(loading);
    const botaoSearch = await screen.findByRole('img', {
      name: /icone de pesquisa/i,
    });
    userEvent.click(botaoSearch);
    expect(screen.findByTestId('first-letter-search-radio'));
    const inputPesquisa = screen.getAllByTestId('search-input');
    userEvent.type(inputPesquisa, 'b');
    expect(screen.findByText(/bakewell tart/i));
    expect(screen.findByRole('img', {
      name: /bread and butter pudding/i,
    }));
    expect(screen.findByRole('img', {
      name: /beef wellington/i,
    }));
    expect(screen.findByRole('img', {
      name: /beef sunday roast/i,
    }));
    const botaoNamePesquisa = await screen.findByRole('img', {
      name: /search button/i,
    });
    userEvent.type(inputPesquisa, 'm');
    userEvent.click(botaoNamePesquisa);
    expect(screen.getAllByTestId(/card-img/i)).toHaveLength(12);
    expect(screen.findByRole('img', {
      name: /mediterranean pasta salad/i,
    }));
  });

  it('teste ingredients', async () => {
    jest.spyOn(global, 'fetch').mockImplementation(fetch);
    renderWithRouter(<App />, { initialEntries: ['/meals'] });
    const loading = screen.getByText(/carregando/i);
    await waitForElementToBeRemoved(loading);
    const botaoSearch = await screen.findByRole('img', {
      name: /icone de pesquisa/i,
    });
    userEvent.click(botaoSearch);
    expect(screen.findByTestId('ingredient-search-radio'));
    userEvent.click(botaoSearch);
    expect(screen.findByRole('img', {
      name: /bubble & squeak/i,
    }));
    expect(screen.findByRole('img', {
      name: /apam balik/i,
    }));
    expect(screen.findByRole('img', {
      name: /apple & blackberry crumble/i,
    }));
  });

  it('teste ingredients', async () => {
    jest.spyOn(global, 'fetch').mockImplementation(fetch);
    renderWithRouter(<App />, { initialEntries: ['/meals'] });
    const loading = screen.getByText(/carregando/i);
    await waitForElementToBeRemoved(loading);
    const BeefClick = screen.getByRole('button', {
      name: /beef/i,
    });
    userEvent.click(BeefClick);
    expect(screen.findByRole('img', {
      name: /beef bourguignon/i,
    }));
    const breakfastButton = screen.getByRole('button', {
      name: /breakfast/i,
    });
    userEvent.click(breakfastButton);
    expect(screen.findByRole('img', {
      name: /breakfast potatoes/i,
    }));
    const chickenButton = screen.getByRole('button', {
      name: /chicken/i,
    });
    userEvent.click(chickenButton);
    expect(screen.findByRole('img', {
      name: /chicken alfredo primavera/i,
    }));
    const dessertbutton = screen.getByRole('button', {
      name: /dessert/i,
    });
    userEvent.click(dessertbutton);
    expect(screen.findByRole('img', {
      name: /beavertails/i,
    }));
  });
});
