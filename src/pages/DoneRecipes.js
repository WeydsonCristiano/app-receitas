import React, { useContext, useEffect } from 'react';
import Header from '../components/Header';
import recipeContext from '../context/recipeContext';

function DoneRecipes() {
  const { setHeaderTitle, setShowSearchBtn } = useContext(recipeContext);

  useEffect(() => {
    setHeaderTitle('Done Recipes');
    setShowSearchBtn(false);
  }, [setHeaderTitle, setShowSearchBtn]);

  return (
    <div>
      <Header />
    </div>
  );
}

export default DoneRecipes;
