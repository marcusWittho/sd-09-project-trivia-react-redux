import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends React.Component {
  render() {
    const { name, avatar } = this.props;
    return (
      <header className="feedback-header">
        <img src={ avatar } alt="player-avatar" data-testid="header-profile-picture" />
        <span data-testid="header-player-name">{ name }</span>
        <span data-testid="header-score">0</span>
      </header>
    );
  }
}

Header.propTypes = {
  userEmailDispatcher: PropTypes.func,
  name: PropTypes.string,
  avatar: PropTypes.string,
}.isRequired;

const mapStatetoProps = (state) => ({
  name: state.user.name,
  avatar: state.user.avatar,
});

export default connect(mapStatetoProps)(Header);
