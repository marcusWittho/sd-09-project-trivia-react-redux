import React from 'react';
import { connect } from 'react-redux';
import { number, shape } from 'prop-types';
import { Redirect } from 'react-router-dom';
import Header from '../../components/Header/Header';

class Feedback extends React.Component {
  render() {
    const { player } = this.props;
    const { assertions, score, validLogin } = player;
    if (!validLogin) return <Redirect exact to="/" />;
    return (
      <div>
        {/* <header>
          <p data-testid="header-player-name">{ name }</p>
          <img
            data-testid="header-profile-picture"
            src={ gravatarEmail }
            alt={ `Avatar de ${name}` }
          />
          <p data-testid="header-score">{ score }</p>
        </header> */}
        <Header />
        <p data-testid="feedback-text">
          { assertions > 2 ? 'Mandou bem!' : 'Podia ser melhor...' }
        </p>
        <p>
          Você acertou
          <span data-testid="feedback-total-question">
            { assertions }
          </span>
          questões!
        </p>
        <p>
          Um total de
          <span data-testid="feedback-total-score">
            { score }
          </span>
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
