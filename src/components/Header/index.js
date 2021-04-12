import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './styles.css';

class Header extends React.Component {
  render() {
    const { name, score, avatar } = this.props;
    return (
      <header className="container-page-header">
        <div className="container-page-header-align">
          <div className="player-info">
            <img
              className="image-avatar"
              src={ avatar }
              alt="userImage"
              data-testid="header-profile-picture"
            />
            <p
              className="header-player-name"
              data-testid="header-player-name"
            >
              { name }
            </p>
          </div>
          <p
            className="header-score"
            data-testid="header-score"
          >
            <i className="fas fa-star" />
            <span className="header-score-text">{` ${score} `}</span>
            pontos
          </p>
        </div>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  name: state.player.name,
  avatar: state.player.gravatarEmail,
  score: state.player.score,
});

Header.propTypes = {
  name: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Header);
