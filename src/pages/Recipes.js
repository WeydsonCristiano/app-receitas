import React, { useContext, useEffect } from 'react';
import Header from '../components/Header';
import recipeContext from '../context/recipeContext';
import Footer from '../components/Footer';

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
      <Footer />
    </div>
  );
}

export default Recipes;
