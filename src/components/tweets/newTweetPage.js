import React from 'react';
import Layout from '../layout';
import { Button, Photo } from '../shared';
import defaultPhoto from '../../assets/default_profile.png';
import './NewTweetPage.css';
class NewTweetPage extends React.Component {
  render() {
    return (
      <Layout title="What are you thinking?">
        <div className="newTweetPage bordered">
          <div className="left">
            <Photo src={defaultPhoto} alt="" />
          </div>
          <div className="right">
            <form>
              <textarea></textarea>
              <div className="newTweetPage-footer">
                <span className="newTweetPage-characters"></span>
                <Button
                  type="submit"
                  className="newTweetPage-submit"
                  variant="primary"
                  disabled
                >
                  Let&apos;s go
                </Button>
              </div>
            </form>
          </div>
        </div>
      </Layout>
    );
  }
}

export default NewTweetPage;
