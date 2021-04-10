import React from 'react';
import { connect } from 'react-redux';
import { string } from 'prop-types';
import CryptoJS from 'crypto-js';
import { getGravatar } from '../services/api';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.getGravatarInfo = this.getGravatarInfo.bind(this);
    this.state = { avatar: '' };
  }

  componentDidMount() {
    this.getGravatarInfo();
  }

  componentDidUpdate() {
    const { score, name, email, correct } = this.props;
    localStorage.state = JSON.stringify({ player: {
      score,
      assertions: correct,
      name,
      gravatarEmail: email,
    } });
  }

  async getGravatarInfo() {
    const { email } = this.props;
    const hash = CryptoJS.MD5(email).toString();
    const avatar = await getGravatar(hash);
    this.setState({ avatar });
  }

  render() {
    const { name, score } = this.props;
    const { avatar } = this.state;
    return (
      <header>
        <img data-testid="header-profile-picture" src={ avatar } alt="user-avatar" />
        <h3>
          Player:
          <span data-testid="header-player-name">{ name }</span>
        </h3>
        <h3>
          Score:
          <span data-testid="header-score">{ score }</span>
        </h3>
      </header>
    );
  }
}

Header.propTypes = { name: string, email: string }.isRequired;

const mapStateToProps = ({ user: { name, email, score, correct } }) => (
  { name, email, score, correct });

export default connect(mapStateToProps)(Header);
