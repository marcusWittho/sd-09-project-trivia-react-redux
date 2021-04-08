import React from 'react';
import { connect } from 'react-redux';
import { number, shape } from 'prop-types';

class Feedback extends React.Component {
  render() {
    const { player } = this.props;
    const { assertions, name, score, gravatarEmail } = player;
    return (
      <div>
        <header>
          <p data-testid="header-player-name">{ name }</p>
          <img
            data-testid="header-profile-picture"
            src={ gravatarEmail }
            alt={ `Avatar de ${name}` }
          />
          <p data-testid="header-score">{ score }</p>
        </header>
        <p data-testid="feedback-text">
          { assertions > 2 ? 'Mandou bem!' : 'Podia ser melhor...' }
        </p>
      </div>
    );
  }
}

Feedback.propTypes = {
  player: shape({
    assertions: number,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  player: state.playerReducer.player,
});

export default connect(mapStateToProps)(Feedback);
