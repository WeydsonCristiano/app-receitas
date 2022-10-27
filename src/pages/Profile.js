import React, { useContext, useEffect } from 'react';
import Header from '../components/Header';
import recipeContext from '../context/recipeContext';
import Footer from '../components/Footer';

function Profile() {
  const { setHeaderTitle,
    setShowSearchBtn,
    history } = useContext(recipeContext);

  const clicou = () => {
    localStorage.clear();
    history.push('/');
  };

  const emailTela = JSON.parse(localStorage.getItem('user')).email;
  console.log(emailTela);

  useEffect(() => {
    setHeaderTitle('Profile');
    setShowSearchBtn(false);
  }, [setHeaderTitle, setShowSearchBtn]);
  return (
    <div>
      <Header />
      <Footer />
      <p data-testid="profile-email">{emailTela}</p>
      <button
        type="submit"
        data-testid="profile-done-btn"
        onClick={ () => history.push('/done-recipes') }
      >
        Done Recipes
      </button>
      <button
        type="submit"
        data-testid="profile-favorite-btn"
        onClick={ () => history.push('favorite-recipes') }
      >
        Favorite Recipes
      </button>
      <button
        type="submit"
        data-testid="profile-logout-btn"
        onClick={ clicou }
      >
        Logout
      </button>
    </div>
  );
}

export default Profile;
