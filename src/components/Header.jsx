import React from 'react';
import { connect } from 'react-redux';
import { string } from 'prop-types';
import createGravatar from '../services/gravatar';

class Header extends React.Component {
  render() {
    const { userName, userEmail } = this.props;

    return (
      <header>
        <img
          src={ createGravatar(userEmail) }
          alt="avatar"
          data-testid="header-profile-picture"
        />
        <p data-testid="header-player-name">{ userName }</p>
        <p data-testid="header-score">0</p>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  userName: state.loginReducer.name,
  userEmail: state.loginReducer.email,
});

Header.propTypes = {
  userName: string.isRequired,
  userEmail: string.isRequired,
};

export default connect(mapStateToProps)(Header);
