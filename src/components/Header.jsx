import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as api from '../services/fetchApi';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imgUrl: '',
    };
  }

  componentDidMount() {
    const { email } = this.props;
    api.fetchGravatar(email).then((imgUrl) => this.setState({ imgUrl }));
  }

  render() {
    const { username } = this.props;
    const { imgUrl } = this.state;
    return (
      <div>
        <header>
          <img data-testid="header-profile-picture" src={ imgUrl } alt="Foto do Perfil" />
          <span data-testid="header-player-name">
            { username }
          </span>
        </header>
        <span data-testid="header-score">Score: 0</span>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  username: state.user.username,
  email: state.user.email,
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Header);
