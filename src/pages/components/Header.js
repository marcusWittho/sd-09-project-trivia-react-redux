import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gravatarUrl: '',
      score: 0,
    };
    this.convertEmail = this.convertEmail.bind(this);
    this.startState = this.startState.bind(this);
  }

  componentDidMount() {
    const { email } = this.props;
    const url = md5(email).toString();
    this.convertEmail(url);
  }

  componentDidUpdate(_, prevState) {
    const { score } = this.state;
    if (prevState.score !== score) {
      this.startState();
    }
  }

  startState() {
    const player = JSON.parse(localStorage.getItem('player'));
    console.log('atualizei');
    const { score } = player;
    this.setState({
      score,
    });
  }

  convertEmail(url) {
    this.setState({ gravatarUrl: url });
  }

  render() {
    const { name } = this.props;
    const { gravatarUrl, score } = this.state;
    return (
      <div>
        <img
          data-testid="header-profile-picture"
          src={ `https://www.gravatar.com/avatar/${gravatarUrl}` }
          alt="gravatar"
        />
        <p data-testid="header-player-name">{ name }</p>
        <p data-testid="header-score">{ score }</p>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  name: state.loginUser.name,
  email: state.loginUser.email,
});

Header.propTypes = {
  name: PropTypes.string,
}.isRequired;

export default connect(mapStateToProps)(Header);
