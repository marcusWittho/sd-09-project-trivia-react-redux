import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as api from '../services/fetchApi';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imgUrl: '',
    };
  }

  componentDidMount() {
    const { email, username } = this.props;
    const player = {
      name: username,
      assertions: 0,
      score: 0,
      gravatarEmail: email,
    };
    // possivelmente o teste limpe o localSto..., talvez tenha que ser salvo no redux
    if (!localStorage.getItem('state')) {
      localStorage.setItem('state', JSON.stringify(player));
    }
    api.fetchGravatar(email).then((imgUrl) => this.setState({ imgUrl }));
  }

  render() {
    const { username, score } = this.props;
    const { imgUrl } = this.state;
    return (
      <div>
        <header>
          <img data-testid="header-profile-picture" src={ imgUrl } alt="Foto do Perfil" />
          <span data-testid="header-player-name">
            { username }
          </span>
        </header>
        <p data-testid="header-score">{score}</p>
        <Link to="/Ranking">
          <button data-testid="btn-ranking" type="button">
            Ver ranking
          </button>
        </Link>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  username: state.user.username,
  email: state.user.email,
  score: state.score.score,
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Header);
