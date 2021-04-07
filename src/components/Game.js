import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Game extends React.Component {
  constructor(props) {
    super(props);

    this.changeQuest = this.changeQuest.bind(this);
    this.booleanQuest = this.booleanQuest.bind(this);

    this.state = {
      index: 0,
    };
  }

  changeQuest() {
    this.setState((prevState) => ({
      index: prevState.index + 1,
    }));
  }

  booleanQuest(index) {
    const { questions } = this.props;
    let t = [...questions[index].incorrect_answers, questions[index].correct_answer];
    const random = 0.5;
    t = t.sort(() => Math.random() - random);

    return (
      <div>
        { t.map((response, indexRep) => {
          if (response === questions[index].correct_answer) {
            return (
              <button
                type="button"
                key={ response }
                data-testid="correct-answer"
              >
                {response}
              </button>);
          }
          return (
            <button
              type="button"
              key={ response }
              data-testid={ `wrong-answer-${indexRep}` }
            >
              {response}
            </button>);
        }) }
      </div>
    );
  }

  render() {
    const { questions, loading } = this.props;
    const { index } = this.state;

    if (loading) {
      return (<p>Loading...</p>);
    }

    return (
      <div>
        <h1 data-testid="question-category">{questions[index].category}</h1>
        <p data-testid="question-text">{questions[index].question}</p>
        { this.booleanQuest(index) }
        <button
          type="button"
          onClick={ this.changeQuest }
        >
          Proxima
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  questions: state.gameReducer.questions,
  loading: state.gameReducer.loading,
});

Game.propTypes = {
  questions: PropTypes.objectOf(PropTypes.objectOf()).isRequired,
  loading: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps)(Game);
