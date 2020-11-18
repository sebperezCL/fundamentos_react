import React from 'react';
import T from 'prop-types';

import Button from '../shared/Button';
import FormField from '../shared/FormField';

import { login } from '../../api/auth';

import './LoginPage.css';

class LoginPage extends React.Component {
  state = {
    form: {
      email: '',
      password: '',
    },
    submitting: false,
    error: null,
  };

  handleChange = (event) => {
    this.setState((state) => ({
      form: { ...state.form, [event.target.name]: event.target.value },
    }));
  };

  handleSubmit = async (event) => {
    const { onLogin, history } = this.props;
    const { form: credentials } = this.state;
    event.preventDefault();
    this.setState({ submitting: true });
    try {
      const loggedUserId = await login(credentials);
      this.setState({ submitting: false, error: null });
      onLogin(loggedUserId, () => history.push('/tweet'));
    } catch (error) {
      this.setState({ submitting: false, error: error });
    }
  };

  canSubmit = () => {
    const {
      form: { email, password },
      submitting,
    } = this.state;
    return !submitting && email && password;
  };

  render() {
    const {
      form: { email, password },
      error,
    } = this.state;

    return (
      <div className="loginPage">
        <h1 className="loginPage-title">Log in to Twitter</h1>
        <form onSubmit={this.handleSubmit}>
          <FormField
            type="text"
            name="email"
            label="phone, email or username"
            className="loginPage-field"
            value={email}
            onChange={this.handleChange}
            focus="true"
          />
          <FormField
            type="password"
            name="password"
            label="password"
            className="loginPage-field"
            value={password}
            onChange={this.handleChange}
          />
          <Button
            type="submit"
            className="loginPage-submit"
            variant="primary"
            disabled={!this.canSubmit()}
          >
            Log in
          </Button>
        </form>
        {error && <div className="loginPage-error">{error.message}</div>}
      </div>
    );
  }
}

LoginPage.propTypes = {
  onLogin: T.func.isRequired,
};

export default LoginPage;
