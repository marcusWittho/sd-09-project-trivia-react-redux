import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class Feedback extends React.Component {
  constructor(props) {
    super(props);

    this.getFeedback = this.getFeedback.bind(this);
    this.makeRanking = this.makeRanking.bind(this);
  }

  componentDidMount() {
    this.makeRanking();
  }

  getFeedback(assertions) {
    const medianScore = 3;
    const bellowThree = assertions < medianScore;
    switch (bellowThree) {
    case true:
      return 'Podia ser melhor...';
    default:
      return 'Mandou bem!';
    }
  }

  makeRanking() {
    const { player } = JSON.parse(localStorage.getItem('state'));
    let ranking = JSON.parse(localStorage.getItem('ranking'));
    if (!ranking) ranking = [];
    const scoreToRanking = {
      name: player.name,
      score: player.score,
      picture: `https://www.gravatar.com/avatar/${player.gravatarEmail}`,
    };
    ranking.push(scoreToRanking);
    localStorage.setItem('ranking', JSON.stringify(ranking));
  }

  render() {
    const { gravatar } = this.props;
    const { player } = JSON.parse(localStorage.getItem('state'));
    return (
      <main>
        <header>
          <img data-testid="header-profile-picture" src={ `https://www.gravatar.com/avatar/${gravatar}` } alt={ player.name } />
          <span data-testid="header-player-name">{player.name}</span>
          <span data-testid="header-score">{Number(player.score)}</span>
        </header>
        <section>
          <h3 data-testid="feedback-text">
            {this.getFeedback(Number(player.assertions))}
          </h3>
          <h2 data-testid="feedback-total-score">{Number(player.score)}</h2>
          <h3 data-testid="feedback-total-question">{Number(player.assertions)}</h3>
        </section>
        <section>
          <button type="button" data-testid="btn-play-again">
            <Link to="/">Jogar novamente</Link>
          </button>
        </section>
      </main>
    );
  }
}

Feedback.propTypes = {
  gravatar: PropTypes.string.isRequired,
};

const stateToProps = (state) => ({
  gravatar: state.trivia.gravatar,
});

export default connect(stateToProps)(Feedback);
