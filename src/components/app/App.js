import React from 'react';
import TweetsPage from '../tweets/TweetsPage';
import LoginPage from '../auth/LoginPage';
import TweetPage from '../tweets/TweetPage';

import T from 'prop-types';
import { Route, Switch, Redirect } from 'react-router-dom';
import NewTweetPage from '../tweets/newTweetPage';
import PrivateRoute from '../auth/PrivateRoute';

const AuthContext = React.createContext();

console.log(AuthContext);

class App extends React.Component {
  state = {
    loggedUserId: this.props.inittiallyLoggedUserId,
  };

  handleLogin = (loggedUserId, cb) => this.setState({ loggedUserId }, cb);

  handleLogout = () => this.setState({ loggedUserId: null });

  render() {
    const { loggedUserId } = this.state;
    return (
      <AuthContext.Provider
        value={{
          isLogged: !!loggedUserId,
          onLogin: this.handleLogin,
          onLogout: this.handleLogout,
        }}
      >
        <div className="App">
          <Switch>
            <Route path="/" exact>
              {({ history }) => (
                <TweetsPage
                  isLogged={!!loggedUserId}
                  onLogout={this.handleLogout}
                  history={history}
                />
              )}
            </Route>
            <PrivateRoute path="/tweet" exact isLogged={!!loggedUserId}>
              <NewTweetPage />
            </PrivateRoute>
            <Route path="/tweet/:tweetid" exact component={TweetPage} />
            <Route path="/login" exact>
              {({ history }) => (
                <LoginPage onLogin={this.handleLogin} history={history} /> // Elige pasarle sólo la prop history al children
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
      </AuthContext.Provider>
    );
  }
}

App.propTypes = {
  inittiallyLoggedUserId: T.string,
};

export default App;
