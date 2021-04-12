import React from 'react';
import PropTypes from 'prop-types';

class OptionsButtons extends React.Component {
  render() {
    const { options, painting, disableOptions } = this.props;
    return (
      <div>
        {
          options.map(({ id, option }) => (
            <button
              className={ id }
              id="choiceButton"
              key={ id }
              type="button"
              disabled={ disableOptions }
              data-testid={
                (id === 'correct-answer') ? 'correct-answer' : 'wrong-answer'
              }
              onClick={ painting }
            >
              { option }
            </button>
          ))
        }
      </div>
    );
  }
}

OptionsButtons.propTypes = {
  options: PropTypes.arrayOf(Object).isRequired,
  painting: PropTypes.func.isRequired,
  disableOptions: PropTypes.bool.isRequired,
};

export default OptionsButtons;
