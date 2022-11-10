import React, { useState, useContext } from 'react';
import recipeContext from '../context/recipeContext';
import './styles/login.css';

function Login() {
  const { setUserInfo, history } = useContext(recipeContext);
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
    <div className="loginPage flexContainer direction">
      <div className="cabecarioLogin">
        <h1 className="bolder">Recipes</h1>
        <h1>app</h1>
      </div>
      <form>
        <h2 className="loginTitle">Login</h2>
        <div className="loginForm flexContainer direction">
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
            variant="warning"
            data-testid="login-submit-btn"
            type="submit"
            onClick={ handleBtn }
            disabled={ isBtnDisabled }
          >
            Entrar
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
