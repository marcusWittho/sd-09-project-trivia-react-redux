import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import '../css/header.css';

class Header extends Component {
  render() {
    const { name, email, score } = this.props;
    return (
      <div className="header">
        <div>
          <img
            src={ `https://www.gravatar.com/avatar/${md5(email).toString()}` }
            alt={ `${name} profile` }
            data-testid="header-profile-picture"
          />
        </div>
        <div>
          <h1 data-testid="header-player-name">{ name }</h1>
        </div>
        <div>
          <p data-testid="header-score">{ score }</p>
        </div>
      </div>
    );
  }
}

Header.propTypes = {
  profile: PropTypes.string,
  player: PropTypes.string,
  score: PropTypes.number,
}.isRequired;

const mapStateToProps = ({ actionsReducer: { name, email, score } }) => ({
  name, email, score,
});

export default connect(mapStateToProps)(Header);
