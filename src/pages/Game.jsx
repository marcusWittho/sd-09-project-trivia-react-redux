import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Game extends Component {
  render() {
    const { image } = this.props;
    const { player } = JSON.parse(localStorage.getItem('state'));
    return (
      <div>
        <header>
          <img data-testid="header-profile-picture" src={ image } alt="player avatar" />
          <span data-testid="header-player-name">{player.name}</span>
          <span data-testid="header-score">{player.score}</span>
        </header>
       <span>
          <Link to="/feedback">feedback</Link>
        </span>
      </div>
    );
  }
}

const mapStateToProps = ({ loginReducer }) => ({
  image: loginReducer.picture,
});

export default connect(mapStateToProps)(Game);
