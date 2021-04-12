import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { nextQuestion } from '../actions/game';

class NextButton extends React.Component {
  constructor() {
    super();
    this.click = this.click.bind(this);
  }

  click() {
    const { getQuestionIndex } = this.props;
    const { next } = this.props;
    next();
    getQuestionIndex();
    console.log(getQuestionIndex())
  }

  render() {
    return (
      <button type="button" data-testid="btn-next" onClick={ this.click }>Próxima</button>
    );
  }
}

NextButton.propTypes = {
  next: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  next: () => dispatch(nextQuestion()),
});

export default connect(null, mapDispatchToProps)(NextButton);
