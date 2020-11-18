import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import App from './components/app/App';

import storage from './utils/storage';
import { configureClient } from './api/client';

const auth = storage.get('auth') || { id: null, accesstoken: null };

configureClient(auth.accessToken);

ReactDOM.render(
  <BrowserRouter>
    <App inittiallyLoggedUserId={auth.id} />
  </BrowserRouter>,
  document.getElementById('root')
);
