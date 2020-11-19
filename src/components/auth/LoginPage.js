import React, { useState } from 'react';
import T from 'prop-types';

import Button from '../shared/Button';
import FormField from '../shared/FormField';

import { login } from '../../api/auth';

import './LoginPage.css';

import { AuthContextConsumer } from '../auth/context';
import useForm from '../hooks/useForms';

function LoginPage({ onLogin, history }) {
  const [form, handleFormChange] = useForm({ email: '', password: '' });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const { email, password } = form;

  const handleSubmit = async (event) => {
    const credentials = form;
    event.preventDefault();
    setSubmitting(true);
    try {
      const loggedUserId = await login(credentials);
      setError(null);
      onLogin(loggedUserId).then(history.push('/tweet'));
    } catch (error) {
      setError(error);
    } finally {
      setSubmitting(false);
    }
  };

  const canSubmit = () => {
    return !submitting && email && password;
  };

  return (
    <div className="loginPage">
      <h1 className="loginPage-title">Log in to Twitter</h1>
      <form onSubmit={handleSubmit}>
        <FormField
          type="text"
          name="email"
          label="phone, email or username"
          className="loginPage-field"
          value={email}
          onChange={handleFormChange}
        />
        <FormField
          type="password"
          name="password"
          label="password"
          className="loginPage-field"
          value={password}
          onChange={handleFormChange}
        />
        <Button
          type="submit"
          className="loginPage-submit"
          variant="primary"
          disabled={!canSubmit()}
        >
          Log in
        </Button>
      </form>
      {error && <div className="loginPage-error">{error.message}</div>}
    </div>
  );
}

LoginPage.propTypes = {
  onLogin: T.func.isRequired,
};

const ConnectedToAuthLogin = (props) => (
  <AuthContextConsumer>
    {({ isLogged, onLogin }) => (
      <LoginPage {...props} isLogged={isLogged} onLogin={onLogin} />
    )}
  </AuthContextConsumer>
);

export default ConnectedToAuthLogin;
