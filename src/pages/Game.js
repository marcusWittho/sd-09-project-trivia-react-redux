import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchingQuestionsToApi } from '../redux/actions/questActions';
import CardQuestion from '../compenents/cardQuestion';

class Game extends React.Component {
  componentDidMount() {
    const { token, fetchQuestions } = this.props;
    fetchQuestions(token);
  }

  render() {
    const { loading } = this.props;
    return (
      <div>
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
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);
