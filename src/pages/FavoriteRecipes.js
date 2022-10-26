import React, { useContext, useEffect } from 'react';
import Header from '../components/Header';
import recipeContext from '../context/recipeContext';

function FavoriteRecipes() {
  const { setHeaderTitle, setShowSearchBtn } = useContext(recipeContext);

  useEffect(() => {
    setHeaderTitle('Favorite Recipes');
    setShowSearchBtn(false);
  }, [setHeaderTitle, setShowSearchBtn]);
  return (
    <div>
      <Header />
    </div>
  );
}

export default FavoriteRecipes;
