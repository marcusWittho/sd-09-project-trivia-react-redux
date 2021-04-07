import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Question from '../components/Question';
import { fetchQuestions } from '../redux/actions';

class GamePage extends React.Component {
  componentDidMount() {
    const { getQuestions } = this.props;
    getQuestions();
  }

  render() {
    const { questions, isFetching } = this.props;
    if (isFetching) {
      return <div>Loading</div>;
    }
    if (questions.length === 0) {
      return (<div>empty question list</div>);
    }
    return (
      <Question questionObj={ questions[0] } />
    );
  }
}

const mapStateToProps = (state) => ({
  questions: state.gameReducer.questions,
  isFetching: state.gameReducer.isFetching,
});

const mapDispatchToPropos = (dispatch) => ({
  getQuestions: () => dispatch(fetchQuestions()),
});

GamePage.propTypes = {
  questions: PropTypes.arrayOf(PropTypes.string),
  isFetching: PropTypes.bool,
  getQuestions: PropTypes.func,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToPropos)(GamePage);
