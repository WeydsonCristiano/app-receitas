import { screen } from '@testing-library/react';
import React from 'react';
import App from '../App';
import renderWithRouter from './helpers/renderWith';

describe('Teste App.js', () => {
  it('testando rota meals', () => {
    renderWithRouter(<App />);
    expect(screen.findByTestId('recipe-photo'));
    expect(screen.findByTestId('recipe-title'));
    expect(screen.findByTestId('TestId'));
    expect(screen.findByTestId('favorite-btn'));
    expect(screen.findByTestId('share-btn'));
    expect(screen.findByTestId('start-recipe-btn'));
    expect(screen.findByTestId('finish-recipe-btn'));
  });
});
