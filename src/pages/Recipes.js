import React, { useContext, useEffect } from 'react';
import Header from '../components/Header';
import recipeContext from '../context/recipeContext';

function Recipes() {
  const { setHeaderTitle, setShowSearchBtn } = useContext(recipeContext);

  useEffect(() => {
    setShowSearchBtn(true);
    switch (window.location.pathname) {
    case '/meals':
      setHeaderTitle('Meals');
      break;
    case '/drinks':
      setHeaderTitle('Drinks');
      break;
    default:
      break;
    }
  }, [setHeaderTitle, setShowSearchBtn]);

  return (
    <div>
      <Header />
    </div>
  );
}

export default Recipes;
