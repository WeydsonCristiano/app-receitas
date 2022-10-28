import React, { useContext, useEffect, useState } from 'react';
import Header from '../components/Header';
import recipeContext from '../context/recipeContext';
import Footer from '../components/Footer';

function Profile() {
  const {
    setHeaderTitle,
    setShowSearchBtn,
    history,
  } = useContext(recipeContext);
  const [emailTela, setEmailTela] = useState('');

  useEffect(() => {
    if (localStorage.user !== undefined) {
      setEmailTela(JSON.parse(localStorage.getItem('user')).email);
    }
  }, [setEmailTela]);

  const clicou = () => {
    localStorage.clear();
    history.push('/');
  };

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
        type="button"
        data-testid="profile-done-btn"
        onClick={ () => history.push('/done-recipes') }
      >
        Done Recipes
      </button>
      <button
        type="button"
        data-testid="profile-favorite-btn"
        onClick={ () => history.push('favorite-recipes') }
      >
        Favorite Recipes
      </button>
      <button
        type="button"
        data-testid="profile-logout-btn"
        onClick={ clicou }
      >
        Logout
      </button>
    </div>
  );
}

export default Profile;
