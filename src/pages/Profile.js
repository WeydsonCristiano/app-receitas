import React, { useContext, useEffect } from 'react';
import Header from '../components/Header';
import recipeContext from '../context/recipeContext';

function Profile() {
  const { setHeaderTitle, setShowSearchBtn } = useContext(recipeContext);

  useEffect(() => {
    setHeaderTitle('Profile');
    setShowSearchBtn(false);
  }, [setHeaderTitle, setShowSearchBtn]);
  return (
    <div>
      <Header />
    </div>
  );
}

export default Profile;
