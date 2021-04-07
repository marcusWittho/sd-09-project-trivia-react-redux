import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';

class Header extends React.Component {
  constructor() {
    super();

    this.state = {
      gravatar: '',
    };

    this.fetchGravatar = this.fetchGravatar.bind(this);
  }

  componentDidMount() {
    this.fetchGravatar();
  }

  fetchGravatar() {
    const { email } = this.props;
    const hash = md5(email).toString();
    const linkGravatar = `https://www.gravatar.com/avatar/${hash}`;
    console.log(hash);
    this.setState({
      gravatar: linkGravatar,
    });
  }

  render() {
    const { name } = this.props;
    const { gravatar } = this.state;
    return (
      <div>
        <img
          src={ gravatar }
          alt="gravatar"
          data-testid="header-profile-picture"
        />
        <p data-testid="header-player-name">{name}</p>
        <p data-testid="header-score">0</p>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.loginReducer.email,
  name: state.loginReducer.name,
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Header);
