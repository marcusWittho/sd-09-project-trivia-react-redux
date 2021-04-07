import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends React.Component {
  render() {
    const { player } = this.props;
    return (
      <heading>
        <img data-testid="header-profile-picture" src="" alt="gravatar" />
        <h1 data-testid="header-player-name">{ player.name }</h1>
        <h2 data-testid="header-score">
          { player.score }
        </h2>
      </heading>
    );
  }
}

const mapStateToProps = (state) => ({
  player: state.userInfoReducer,
});

Header.propTypes = {
  player: PropTypes.shape({
    name: PropTypes.string,
    score: PropTypes.number,
    gravatarEmail: PropTypes.string,
  }).isRequired,
};

export default connect(mapStateToProps)(Header);
