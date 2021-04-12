import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

class Feedback extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      goHome: false,
      goRanking: false,
    };
  }

  render() {
    const { user, image, assertions, score } = this.props;
    const { goHome, goRanking } = this.state;
    const bad = 'Podia ser melhor...';
    const good = 'Mandou bem!';
    return (
      <header>
        <h1>Resultados</h1>
        <img data-testid="header-profile-picture" src={ image } alt="imagen gravatar" />
        <p data-testid="header-player-name">{ user }</p>
        <p data-testid="header-score">{score}</p>
        <p data-testid="feedback-total-score">{score}</p>
        <p data-testid="feedback-total-question">{assertions}</p>

        <button
          type="button"
          onClick={ () => this.setState({ goHome: true }) }
          data-testid="btn-play-again"
        >
          Jogar novamente
        </button>
        <button
          type="button"
          onClick={ () => this.setState({ goRanking: true }) }
          data-testid="btn-ranking"
        >
          Ver Ranking
        </button>

        <p data-testid="feedback-text">{ (assertions > 1) ? good : bad }</p>

        { goHome ? <Redirect to="/" /> : '' }
        { goRanking ? <Redirect to="/ranking" /> : '' }
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.userRegisterReducer.user,
  image: state.userRegisterReducer.image,
  score: state.userRegisterReducer.score,
  assertions: state.userRegisterReducer.assertions,
});

Feedback.propTypes = {
  user: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  assertions: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Feedback);
