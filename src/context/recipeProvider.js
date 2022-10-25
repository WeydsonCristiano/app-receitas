import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import recipeContext from './recipeContext';

function RecipeProvider({ children }) {
  const [initialState, setInitialState] = useState('');

  const state = useMemo(() => ({
    initialState,
    setInitialState,
  }), [initialState]);

  return (
    <recipeContext.Provider value={ state }>
      {children}
    </recipeContext.Provider>
  );
}

export default RecipeProvider;

RecipeProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.node,
  ]).isRequired,
};
