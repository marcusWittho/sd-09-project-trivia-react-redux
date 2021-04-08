import React from 'react';
import { connect } from 'react-redux';
import CryptoJS from 'crypto-js';
import { getGravatar } from '../services/api';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.getGravatarInfo = this.getGravatarInfo.bind(this);
    this.getScore = this.getScore.bind(this);
    this.state = { avatar: '' };
  }

  componentDidMount() {
    this.getGravatarInfo();
  }

  async getGravatarInfo() {
    const { email } = this.props;
    const hash = await CryptoJS.MD5(email).toString();
    const avatar = await getGravatar(hash);
    this.setState({ avatar });
  }

  getScore() {
    let score = 0;
    const timer = 0;
    const dificult = 0;
    const baseScore = 10;
    score = baseScore + (timer * dificult);
    return score;
  }

  render() {
    const { name } = this.props;
    const { avatar } = this.state;
    return (
      <header>
        <img data-testid="header-profile-picture" src={ avatar } alt="avatar" />
        <h3 data-testid="header-player-name">{ name }</h3>
        <h3>
          Placar:
          <span data-testid="header-score">{ this.getScore() }</span>
        </h3>
      </header>
    );
  }
}

const mapStateToProps = ({ user }) => ({
  name: user.name,
  email: user.email,
});

export default connect(mapStateToProps)(Header);
