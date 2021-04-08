import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchGameQuestions } from '../actions';
import PlayerHeaderInfo from '../components/PlayerHeaderInfo';
import Loading from '../components/Loading';
import CardQuestion from '../components/CardQuestion';

class Game extends React.Component {
  componentDidMount() {
    const { getToken, dispatchQuestions } = this.props;
    dispatchQuestions(getToken.token);
  }

  render() {
    const { isLoading } = this.props;

    return isLoading ? (
      <Loading />
    ) : (
      <main>
        <PlayerHeaderInfo />
        <CardQuestion />
      </main>
    );
  }
}

Game.propTypes = {
  getToken: PropTypes.shape({
    token: PropTypes.string,
  }),
  isLoading: PropTypes.bool,
  dispatchQuestions: PropTypes.func,
};

Game.defaultProps = {
  getToken: PropTypes.shape({
    token: PropTypes.string,
  }),
  isLoading: PropTypes.bool,
  dispatchQuestions: PropTypes.func,
};

const mapStateToProps = (state) => ({
  getToken: state.token,
  isLoading: state.questions.loading,
  getQuestions: state.questions,
  name: state.player.name,
  email: state.player.email,
  score: state.player.score,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchQuestions: (token) => dispatch(fetchGameQuestions(token)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);
