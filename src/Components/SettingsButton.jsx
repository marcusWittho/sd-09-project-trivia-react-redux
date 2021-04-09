import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { dispatchLoading } from '../Actions/setQuestions';

class SettingsButton extends Component {
  render() {
    const { returnLoading } = this.props;
    return (
      <Link to="/settings">
        <button
          data-testid="btn-settings"
          type="button"
          onClick={ returnLoading }
        >
          Settings
        </button>
      </Link>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  returnLoading: () => dispatch(dispatchLoading()),
});

SettingsButton.propTypes = {
  returnLoading: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(SettingsButton);
