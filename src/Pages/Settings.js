import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setConfigs } from '../Actions/setConfigs';

class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      category: '',
      difficulty: '',
      type: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.dispatchConfigs = this.dispatchConfigs.bind(this);
  }

  handleChange({ target }) {
    this.setState({
      [target.name]: target.value,
    });
  }

  dispatchConfigs() {
    const { setConfig } = this.props;
    setConfig(this.state);
  }

  renderCategorys() {
    return (
      <label htmlFor="category">
        Select Category:
        <select name="category" onChange={ this.handleChange }>
          <option value="">Any Category</option>
          <option value="9">General Knowledge</option>
          <option value="10">Entertainment: Books</option>
          <option value="11">Entertainment: Film</option>
          <option value="12">Entertainment: Music</option>
          <option value="13">Entertainment: Musicals &amp; Theatres</option>
          <option value="14">Entertainment: Television</option>
          <option value="15">Entertainment: Video Games</option>
          <option value="16">Entertainment: Board Games</option>
          <option value="17">Science &amp; Nature</option>
          <option value="18">Science: Computers</option>
          <option value="19">Science: Mathematics</option>
          <option value="20">Mythology</option>
          <option value="21">Sports</option>
          <option value="22">Geography</option>
          <option value="23">History</option>
          <option value="24">Politics</option>
          <option value="25">Art</option>
          <option value="26">Celebrities</option>
          <option value="27">Animals</option>
          <option value="28">Vehicles</option>
          <option value="29">Entertainment: Comics</option>
          <option value="30">Science: Gadgets</option>
          <option value="31">Entertainment: Japanese Anime &amp; Manga</option>
          <option value="32">Entertainment: Cartoon &amp; Animations</option>
        </select>
      </label>
    );
  }

  renderDifficultys() {
    return (
      <label htmlFor="difficulty">
        Select Difficulty:
        <select name="difficulty" onChange={ this.handleChange }>
          <option value="">Any Difficulty</option>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
      </label>
    );
  }

  renderTypes() {
    return (
      <label htmlFor="type">
        Select Type:
        <select name="type" onChange={ this.handleChange }>
          <option value="">Any Type</option>
          <option value="multiple">Multiple Choice</option>
          <option value="boolean">True / False</option>
        </select>
      </label>
    );
  }

  render() {
    return (
      <div>
        <h2
          data-testid="settings-title"
        >
          Configurações
        </h2>
        { this.renderCategorys() }
        { this.renderDifficultys() }
        { this.renderTypes() }
        <Link to="/">
          <button type="button" onClick={ this.dispatchConfigs }>
            Back
          </button>
        </Link>
      </div>
    );
  }
}

Settings.propTypes = {
  setConfig: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  setConfig: (state) => dispatch(setConfigs(state)),
});

export default connect(null, mapDispatchToProps)(Settings);
