import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import recipeContext from '../context/recipeContext';

function Login({ history }) {
  const { setUserInfo } = useContext(recipeContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isBtnDisabled, setIsBtnDisabled] = useState(true);

  const verifyBtn = () => {
    const numeroMagico = 6;
    const regex = /\S+@\S+\.\S+/;
    const verifyEmail = regex.test(email);
    const verifyPassword = password.length >= numeroMagico;
    const btnState = verifyEmail && verifyPassword;
    return btnState;
  };

  const handlEmail = ({ target }) => {
    const { value } = target;
    verifyBtn();
    setEmail(value);
  };
  const handlePassword = ({ target }) => {
    const { value } = target;
    verifyBtn();
    setPassword(value);
    if (verifyBtn()) {
      setIsBtnDisabled(false);
    }
  };

  const handleBtn = (e) => {
    e.preventDefault();
    const user = { email, password };
    setUserInfo(user);
    localStorage.setItem('user', JSON.stringify({ email }));
    history.push('/meals');
  };

  return (
    <section className="login">
      <h1>App De Receitas Grupo 29</h1>
      <form>
        <label htmlFor="email">
          <input
            data-testid="email-input"
            placeholder="Digite seu Email"
            onChange={ handlEmail }
            value={ email }
            type="text"
            name="email"
            required
          />
        </label>
        <label htmlFor="password">
          <input
            data-testid="password-input"
            placeholder="Digite sua Senha"
            onChange={ handlePassword }
            value={ password }
            type="password"
            name="password"
            required
          />
        </label>
        <button
          data-testid="login-submit-btn"
          type="submit"
          onClick={ handleBtn }
          disabled={ isBtnDisabled }
        >
          Entrar
        </button>
      </form>
    </section>
  );
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Login;
