import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import recipeContext from '../context/recipeContext';
import './styles/login.css';

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
    <div className="login-container">
      <Form>
        <Card className="login-card">
          <Form.Label htmlFor="email">
            <Form.Control
              data-testid="email-input"
              placeholder="Digite seu Email"
              onChange={ handlEmail }
              value={ email }
              type="text"
              name="email"
              required
            />
          </Form.Label>
          <Form.Label htmlFor="password">
            <Form.Control
              data-testid="password-input"
              placeholder="Digite sua Senha"
              onChange={ handlePassword }
              value={ password }
              type="password"
              name="password"
              required
            />
          </Form.Label>
          <Button
            variant="warning"
            data-testid="login-submit-btn"
            type="submit"
            onClick={ handleBtn }
            disabled={ isBtnDisabled }
          >
            Entrar
          </Button>
        </Card>
      </Form>
    </div>
  );
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Login;
