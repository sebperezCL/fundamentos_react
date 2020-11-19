import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import App from './components/app/App';

import storage from './utils/storage';
import { configureClient } from './api/client';

const auth = storage.get('auth') || { id: null, accesstoken: null };

configureClient(auth.accessToken);

class ErrorBoundary extends React.Component {
  state = {
    hasError: false,
  };

  // eslint-disable-next-line no-unused-vars
  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  render() {
    const { hasError } = this.state;
    if (hasError) {
      return <div>Something went wrong</div>;
    }

    return this.props.children;
  }
}

ReactDOM.render(
  <ErrorBoundary>
    <BrowserRouter>
      <App inittiallyLoggedUserId={auth.id} />
    </BrowserRouter>
  </ErrorBoundary>,
  document.getElementById('root')
);
