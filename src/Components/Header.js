import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  render() {
    const { name, score } = this.props;
    return (
      <div>
        {/* colocado uma imagem aleatoria somente para teste de renderização */}
        <img alt="" data-testid="header-profile-picture" src="https://store-images.s-microsoft.com/image/apps.13155.7f01bca7-2380-4ec7-b6a8-cf488afa7800.4730a05c-e397-4c82-9935-9d53da020526.5ca39173-dd05-471e-a3cb-766172a62730" />
        <p data-testid="header-player-name">{name}</p>
        <p data-testid="header-player-name">{score}</p>
      </div>
    );
  }
}

const mapStatetoProps = (state) => ({
  name: state.player.name,
  score: state.player.score,
});

Header.propTypes = {
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};

export default connect(mapStatetoProps)(Header);
