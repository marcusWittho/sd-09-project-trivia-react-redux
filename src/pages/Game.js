import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchingQuestionsToApi } from '../redux/actions/questActions';
import CardQuestion from '../compenents/cardQuestion';
import Header from '../compenents/Header';

class Game extends React.Component {
  componentDidMount() {
    const { token, fetchQuestions } = this.props;
    fetchQuestions(token);
  }

  render() {
    const { loading, email, user } = this.props;
    return (
      <div>
        <Header email={ email } name={ user } />
        <p>As configurações do jogo vão ficar aqui</p>
        { loading ? '' : <CardQuestion /> }
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.tokenReducer.token,
  loading: state.questionsReducer.isFetching,
  user: state.userRegisterReducer.user,
  email: state.userRegisterReducer.email,
});

const mapDispatchToProps = (dispatch) => ({
  fetchQuestions: (token) => dispatch(fetchingQuestionsToApi(token)),
});

Game.propTypes = {
  token: PropTypes.string.isRequired,
  fetchQuestions: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  user: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);
