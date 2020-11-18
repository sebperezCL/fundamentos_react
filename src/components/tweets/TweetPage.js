import React from 'react';

import { getTweetDetail } from '../../api/tweets';
import Layout from '../layout';
import { Redirect } from 'react-router-dom';

class TweetPage extends React.Component {
  state = {
    tweet: null,
    error: null,
  };

  getTweetDetail = () => {
    const { tweetid } = this.props.match.params;
    getTweetDetail(tweetid)
      .then((tweet) => this.setState({ tweet }))
      .catch((error) => this.setState({ error }));
  };

  componentDidMount() {
    this.getTweetDetail();
  }

  renderContent = () => {
    const { tweet, error } = this.state;
    if (error) return <Redirect to="/404" />;
    if (!tweet) {
      return null;
    }
    return JSON.stringify(tweet);
  };

  render() {
    return (
      <Layout title="Tweet Detail">
        <div className="tweetPage">{this.renderContent()}</div>
      </Layout>
    );
  }
}

export default TweetPage;
