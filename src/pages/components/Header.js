import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gravatarUrl: '',
    };
    this.convertEmail = this.convertEmail.bind(this);
  }

  componentDidMount() {
    const { email } = this.props;
    const url = md5(email).toString();
    this.convertEmail(url);
  }

  convertEmail(url) {
    this.setState({ gravatarUrl: url });
  }

  render() {
    const { name } = this.props;
    const { gravatarUrl } = this.state;
    return (
      <div>
        <img
          data-testid="header-profile-picture"
          src={ `https://www.gravatar.com/avatar/${gravatarUrl}` }
          alt="gravatar"
        />
        <p data-testid="header-player-name">{ name }</p>
        <p data-testid="header-score">0</p>
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
