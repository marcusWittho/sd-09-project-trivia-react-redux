import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';

class Game extends React.Component {
  constructor() {
    super();

    this.renderPlayerInfo = this.renderPlayerInfo.bind(this);
  }

  renderPlayerInfo() {
    const { name, email, score } = this.props;
    const hash = md5(email.toLowerCase()).toString();
    const API_URL = `https://www.gravatar.com/avatar/${hash}?s=100`;
    console.log(hash);

    return (
      <header>
        <img
          data-testid="header-profile-picture"
          src={ API_URL }
          alt={ `${name} avatar` }
        />
        <span data-testid="header-player-name">{ name }</span>
        <span data-testid="header-score">{ score }</span>
      </header>
    );
  }

  render() {
    return (
      <main>
        { this.renderPlayerInfo() }
      </main>
    );
  }
}

Game.propTypes = {
  name: PropTypes.string,
  email: PropTypes.string,
  score: PropTypes.number,
};

Game.defaultProps = {
  name: '',
  email: '',
  score: 0,
};

const mapStateToProps = ({ player }) => ({
  name: player.name,
  email: player.email,
  score: player.score,
});

export default connect(mapStateToProps)(Game);
