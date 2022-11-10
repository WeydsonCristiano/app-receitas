import React, { useContext, useEffect, useState } from 'react';
import Header from '../components/Header';
import recipeContext from '../context/recipeContext';
import Footer from '../components/Footer';
import './styles/profile.css';

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

  const handleClick = () => {
    localStorage.clear();
    history.push('/');
  };

  useEffect(() => {
    setHeaderTitle('Profile');
    setShowSearchBtn(false);
  }, [setHeaderTitle, setShowSearchBtn]);

  return (
    <div className="flexContainer direction profilePage">
      <Header />
      <section className="flexContainer direction profileSection">
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
          onClick={ () => history.push('chefs') }
        >
          Chefs
        </button>
        <button
          type="button"
          data-testid="profile-logout-btn"
          onClick={ handleClick }
        >
          Logout
        </button>
      </section>
      <Footer />
    </div>
  );
}

export default Profile;
