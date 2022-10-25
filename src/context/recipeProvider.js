import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import recipeContext from './recipeContext';

function RecipeProvider({ children }) {
  const [userInfo, setUserInfo] = useState({});

  const state = useMemo(() => ({
    userInfo,
    setUserInfo,
  }), [userInfo, setUserInfo]);

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
