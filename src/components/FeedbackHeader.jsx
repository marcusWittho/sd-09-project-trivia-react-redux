import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class FeedbackHeader extends Component {
  render() {
    const { currentScoreState } = this.props;
    const userToken = localStorage.getItem('token');
    const { player: { name } } = JSON.parse(localStorage.getItem('state'));
    return (
      <header className="feedback-header">
        <div className="header-left">
          <img
            data-testid="header-profile-picture"
            alt={ name }
            src={ userToken }
            className="header-profile-picture"
          />
          <span
            data-testid="header-player-name"
            className="header-player-name"
          >
            {name}
          </span>
        </div>
        <span
          data-testid="header-score"
          className="header-score"
        >
          { currentScoreState }
        </span>
      </header>
    );
  }
}

FeedbackHeader.propTypes = {
  scoreState: PropTypes.string,
}.isRequired;

const mapStateToProps = (state) => ({
  currentScoreState: state.scoreReducer.currentScore,
});

export default connect(mapStateToProps, null)(FeedbackHeader);
