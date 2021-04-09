import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Feedback extends React.Component {
  showMessage() {
    const { user } = this.props;
    const number = 3;
    if (user.assertions < number) {
      return 'Podia ser melhor...';
    }
    return 'Mandou bem!';
  }

  render() {
    const { user } = this.props;
    return (
      <div>
        <h1 data-testid="feedback-text">Feedback</h1>
        <header>
          <img
            data-testid="header-profile-picture"
            src={ user.gravatarImg }
            alt="avatar do usuário"
          />
          <p data-testid="header-player-name">
            { user.name }
          </p>
          <p data-testid="header-score">
            { user.score }
          </p>
        </header>
        <main data-testid="feedback-text">
          { this.showMessage() }
        </main>
        <p data-testid="feedback-total-score">
          { user.score }
        </p>
        <p data-testid="feedback-total-question">
          { user.assertions }
        </p>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.userInfoReducer,
});

Feedback.propTypes = {
  user: PropTypes.shape({
    gravatarImg: PropTypes.string,
    name: PropTypes.string,
    score: PropTypes.number,
    assertions: PropTypes.number,
  }).isRequired,
};

export default connect(mapStateToProps)(Feedback);
