import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import recipeContext from './recipeContext';

function RecipeProvider({ children }) {
  const [userInfo, setUserInfo] = useState({});
  const [showSearchBtn, setShowSearchBtn] = useState(true);
  const [headerTitle, setHeaderTitle] = useState('');

  const state = useMemo(
    () => ({
      userInfo,
      setUserInfo,
      headerTitle,
      setHeaderTitle,
      showSearchBtn,
      setShowSearchBtn,
    }),
    [
      userInfo,
      setUserInfo,
      headerTitle,
      setHeaderTitle,
      showSearchBtn,
      setShowSearchBtn,
    ],
  );

  return (
    <recipeContext.Provider value={ state }>{children}</recipeContext.Provider>
  );
}

export default RecipeProvider;

RecipeProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.func, PropTypes.node]).isRequired,
};
