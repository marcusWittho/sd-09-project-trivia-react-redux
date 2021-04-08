import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class FeedbackHeader extends Component {
  render() {
    const { scoreState } = this.props;
    return (
      <header className="feedback-header">
        <div className="header-left">
          <img
            data-testid="header-profile-picture"
            alt=""
            src=""
            className="header-profile-picture"
          />
          <span
            data-testid="header-player-name"
            className="header-player-name"
          >
            Nome da pessoa
          </span>
        </div>
        <span
          data-testid="header-score"
          className="header-score"
        >
          { scoreState }
        </span>
      </header>
    );
  }
}

FeedbackHeader.propTypes = {
  scoreState: PropTypes.string,
}.isRequired;

const mapStateToProps = (state) => ({
  scoreState: state.scoreReducer.currentScore,
});

export default connect(mapStateToProps, null)(FeedbackHeader);
