import React, { useState, useContext } from 'react';
import recipeContext from '../context/recipeContext';
import searchIcon from '../images/searchIcon.svg';
import profileIcon from '../images/profileIcon.svg';
import SearchBar from './SearchBar';

function Header() {
  const {
    headerTitle,
    showSearchBtn,
    history } = useContext(recipeContext);
  const [togleSearch, setTogleSearch] = useState(false);
  return (
    <header>
      <h1
        data-testid="page-title"
      >
        { headerTitle }
      </h1>
      <section>
        <button
          type="button"
          onClick={ () => history.push('/profile') }
        >
          <img src={ profileIcon } alt="icone de perfil" data-testid="profile-top-btn" />
        </button>
        {
          showSearchBtn
            && (
              <button
                type="button"
                onClick={ () => setTogleSearch(!togleSearch) }
              >
                <img
                  src={ searchIcon }
                  alt="icone de pesquisa"
                  data-testid="search-top-btn"
                />
              </button>
            )
        }
      </section>
      {
        showSearchBtn
          && togleSearch
          && <SearchBar />
      }
    </header>
  );
}

export default Header;
