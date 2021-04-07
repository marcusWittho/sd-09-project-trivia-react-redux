import React, { Component } from 'react';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import PropTypes from 'prop-types';

class Feedback extends Component {
  render() {
    const { email } = this.props;
    const cryptoEmail = md5(email).toString();
    const { player } = JSON.parse(localStorage.getItem('state'));

    return (
      <div>
        <header>
          <span data-testid="header-profile-picture">
            <img src={ `https://www.gravatar.com/avatar/${cryptoEmail}` } alt="profile" />
          </span>
          <span data-testid="header-player-name">
            <h1>{ player.name }</h1>
          </span>
          <span data-testid="header-score">
            <p>{ player.score }</p>
          </span>
        </header>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.loginReducer.email,
});

Feedback.propTypes = {
  email: PropTypes.string,
}.isRequired;

export default connect(mapStateToProps)(Feedback);
