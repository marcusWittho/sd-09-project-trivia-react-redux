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
          <span>
            <img data-testid="header-profile-picture" src={ `https://www.gravatar.com/avatar/${cryptoEmail}` } alt="profile" />
          </span>
          <span>
            <h1 data-testid="header-player-name">{ player.name }</h1>
          </span>
          <span>
            <p data-testid="header-score">{ player.score }</p>
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
