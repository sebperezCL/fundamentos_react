import React from 'react';

import { getLatestTweets } from '../../api/tweets';
import Layout from '../layout';
import Tweet from './Tweet';

class TweetsPage extends React.Component {
  state = {
    tweets: null,
    loading: true,
  };

  getTweets = async () => {
    const tweets = await getLatestTweets();
    // await this.sleep(1000); //para retrasar un poco la carga y probar el loading
    const loading = false;
    this.setState({ tweets, loading });
  };

  sleep = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  componentDidMount() {
    this.getTweets();
  }

  renderContent = () => {
    const { history } = this.props;
    const { tweets, loading } = this.state;
    if (loading) {
      return <h1>Loading.....</h1>;
    }
    if (!tweets) {
      return null;
    }
    return tweets.map((tweet) => (
      <Tweet key={tweet.id} {...tweet} history={history} />
    ));
  };

  render() {
    return (
      <Layout title="What's going on...">
        <div className="tweetsPage">{this.renderContent()}</div>
      </Layout>
    );
  }
}

export default TweetsPage;
