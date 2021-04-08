import React from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
// import { connect } from 'react-redux';
// import PropTypes from 'prop-types';

class Game extends React.Component {
  render() {
    const { location: { state: { email, a } } } = this.props;
    return (
      <>
        <Header email={ email } name={ a } />
        <p>As configurações do jogo vão ficar aqui</p>
      </>
    );
  }
}

Game.propTypes = {
  location: PropTypes.objectOf(Object).isRequired,
};

// const mapStateToProps = (state) => ({
//   token: state.tokenReducer.token,
// });

// Game.propTypes = {
//   token: PropTypes.string.isRequired,
// };

// export default connect(mapStateToProps)(Game);

export default Game;
