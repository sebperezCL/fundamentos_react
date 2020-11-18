import React from 'react';
import { Redirect } from 'react-router-dom';

class NewTweetPage extends React.Component {
  componentDidMount() {
    /*const { history, loggedUserId } = this.props;
    if (!loggedUserId) {
      // return history.push('/login'); puede ser así para redirigir
    }*/
  }

  render() {
    /*const { loggedUserId } = this.props;
    if (!loggedUserId) {
      return <Redirect to="/login" />;
    }*/
    return 'New Tweet Page';
  }
}

export default NewTweetPage;
