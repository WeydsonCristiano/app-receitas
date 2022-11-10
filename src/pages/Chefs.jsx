import React, { useContext, useEffect } from 'react';
import Header from '../components/Header';
import recipeContext from '../context/recipeContext';
import './styles/chefs.css';

export default function Chefs() {
  const { setHeaderTitle, setShowSearchBtn } = useContext(recipeContext);
  const chefName = [
    'marcoskern',
    'weydson-cristiano-dev',
    'alyssontobias',
    'israel-pereira-dev',
    'chrystian-avaetê-silva-lunetta-726880226',
  ];

  useEffect(() => {
    const script = document.createElement('script');

    script.src = 'https://platform.linkedin.com/badges/js/profile.js';
    script.async = true;

    document.body.appendChild(script);
  }, []);

  return (
    <div>
      { setHeaderTitle('Chefs') }
      { setShowSearchBtn(false) }
      <Header />
      <section className="displayLinkedin flexContainer">
        {
          chefName.map((e, index) => (
            <div
              key={ index }
              className="badge-base LI-profile-badge"
              data-locale="pt_BR"
              data-size="large"
              data-theme="light"
              data-type="VERTICAL"
              data-vanity={ e }
              data-version="v1"
            />
          ))
        }
      </section>
    </div>
  );
}
