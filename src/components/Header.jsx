import React from 'react';
import { connect } from 'react-redux';
import { string, number } from 'prop-types';
import createGravatar from '../services/gravatar';

class Header extends React.Component {
  render() {
    const { userName, userEmail, score } = this.props;

    return (
      <header>
        <img
          src={ createGravatar(userEmail) }
          alt="avatar"
          data-testid="header-profile-picture"
        />
        <p data-testid="header-player-name">{ userName }</p>
        <p data-testid="header-score">{ score }</p>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  userName: state.loginReducer.name,
  userEmail: state.loginReducer.email,
  score: state.scoreReducer.score,
});

Header.propTypes = {
  userName: string,
  userEmail: string,
  score: number,
}.isRequired;

export default connect(mapStateToProps)(Header);
