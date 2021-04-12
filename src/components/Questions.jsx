import React, { Component } from 'react';
import { connect } from 'react-redux';
import { arrayOf } from 'prop-types';
import Logotipo from './Logotipo';
import Question from './Question';

class Questions extends Component {
  render() {
    const { questions } = this.props;

    return (
      <div>
        {
          !questions.length
            ? <Logotipo />
            : (
              <main className="container-game">
                {
                  questions.map((question, index) => (
                    <Question data={ question } key={ index } />
                  ))
                }
              </main>
            )
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  questions: state.gameReducer.questions,
});

Questions.propTypes = {
  questions: arrayOf(),
}.isRequired;

export default connect(mapStateToProps)(Questions);
