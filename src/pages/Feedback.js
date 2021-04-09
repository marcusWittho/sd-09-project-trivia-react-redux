import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Feedback extends React.Component {
  render() {
    const { user, image, score } = this.props;
    console.log(image);
    return (
      <header>
        <h1>Resultados</h1>
        <img data-testid="header-profile-picture" src={ image } alt="imagen gravatar" />
        <p data-testid="header-player-name">{ user }</p>
        <p data-testid="header-score">{`Score:${score}`}</p>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.userRegisterReducer.user,
  image: state.userRegisterReducer.image,
  score: state.userRegisterReducer.score,
});

Feedback.propTypes = {
  user: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Feedback);
