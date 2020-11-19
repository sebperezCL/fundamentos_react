import React, { useState } from 'react';
import TweetsPage from '../tweets/TweetsPage';
import LoginPage from '../auth/LoginPage';
import TweetPage from '../tweets/TweetPage';

import T from 'prop-types';
import { Route, Switch, Redirect } from 'react-router-dom';
import NewTweetPage from '../tweets/NewTweetPage';
import PrivateRoute from '../auth/PrivateRoute';
import { AuthContextProvider } from '../auth/context';

function App({ inittiallyLoggedUserId }) {
  const [loggedUserId, setloggedUserId] = useState(inittiallyLoggedUserId);

  const handleLogin = (loggedUserId) =>
    new Promise((resolve) => {
      setloggedUserId(loggedUserId);
      resolve();
    });

  const handleLogout = () => setloggedUserId(null);

  return (
    <AuthContextProvider
      value={{
        isLogged: !!loggedUserId,
        onLogin: handleLogin,
        onLogout: handleLogout,
      }}
    >
      <div className="App">
        <Switch>
          <Route path="/" exact>
            {({ history }) => <TweetsPage history={history} />}
          </Route>
          <PrivateRoute path="/tweet" exact>
            <NewTweetPage />
          </PrivateRoute>
          <Route path="/tweet/:tweetid" exact component={TweetPage} />
          <Route path="/login" exact>
            {({ history }) => (
              <LoginPage history={history} /> // Elige pasarle sólo la prop history al children
            )}
          </Route>
          <Route path="/404" exact>
            <div
              style={{
                textAlign: 'center',
                fontSize: 48,
                fontWeight: 'bold',
              }}
            >
              404 | Not found page
            </div>
          </Route>
          <Route>
            <Redirect to="/404" />
          </Route>
        </Switch>
      </div>
    </AuthContextProvider>
  );
}

App.propTypes = {
  inittiallyLoggedUserId: T.string,
};

export default App;
