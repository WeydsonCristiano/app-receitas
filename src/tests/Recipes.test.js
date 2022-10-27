import { screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import React from 'react';
import App from '../App';
import renderWithRouter from './helpers/renderWith';

describe('testa a tela Recipes', () => {
  beforeEach(async () => {
    await waitForElementToBeRemoved(() => screen.getByText(/carregando.../i));
  });
  it('se os título é renderizado na tela', async () => {
    renderWithRouter(<App />, { initialEntries: ['/meals'] });

    await waitFor(() => {
      expect(screen.getAllByRole('button')).toHaveLength(6);
    });
  });
});
