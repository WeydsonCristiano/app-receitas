import React, { useState, useContext } from 'react';
/* eslint-disable-next-line */
import { useAutoAnimate } from '@formkit/auto-animate/react';
import recipeContext from '../context/recipeContext';
import searchIcon from '../images/searchIcon.svg';
import profileIcon from '../images/profileIcon.svg';
import SearchBar from './SearchBar';
import './styles/header.css';

function Header() {
  const {
    headerTitle,
    showSearchBtn,
    history,
  } = useContext(recipeContext);
  const [togleSearch, setTogleSearch] = useState(false);
  const [parent] = useAutoAnimate();
  return (
    <header className="globalHeader">
      <h1
        className="headerTitle"
        data-testid="page-title"
      >
        { headerTitle }
      </h1>
      <section
        className="flexContainer headerMenu"
      >
        <button
          className="headerBtn profileBtn"
          type="button"
          onClick={ () => history.push('/profile') }
        >
          <img src={ profileIcon } alt="icone de perfil" data-testid="profile-top-btn" />
        </button>
        {
          showSearchBtn
            && (
              <button
                className="headerBtn searchBtn"
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
      <section ref={ parent }>
        {
          showSearchBtn
            && togleSearch
            && <SearchBar />
        }
      </section>
    </header>
  );
}

export default Header;
