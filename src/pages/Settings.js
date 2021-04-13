import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { configureQuestions } from '../actions';

class Settings extends Component {
  constructor() {
    super();
    this.state = {
      type: '',
      difficulty: '',
      category: null,
    };
    this.renderTypesDropdown = this.renderTypesDropdown.bind(this);
    this.renderDifficultyDropdown = this.renderDifficultyDropdown.bind(this);
    this.renderCategoryDropdown = this.renderCategoryDropdown.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.completeSettings = this.completeSettings.bind(this);
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({ [name]: value });
  }

  completeSettings() {
    const { configureQuestionsDispatch } = this.props;
    const { type, difficulty, category } = this.state;
    const suffixList = [];
    let suffixUrl = '';
    if (type) {
      suffixList.push(`&type=${type}`);
    } if (difficulty) {
      suffixList.push(`&difficulty=${difficulty}`);
    } if (category) {
      suffixList.push(`&category=${category}`);
    }
    for (let index = 0; index < suffixList.length;) {
      suffixUrl += suffixList[index];
      index += 1;
    }
    configureQuestionsDispatch(suffixUrl);
  }

  renderTypesDropdown() {
    const { type } = this.state;
    const questionTypes = { Select: '',
      'Multiple Choice': 'multiple',
      'True/False': 'boolean' };
    return (
      <select name="type" value={ type } onChange={ this.handleChange }>
        {Object.keys(questionTypes).map((item, index) => (
          <option value={ questionTypes[item] } key={ index }>{item}</option>
        ))}
      </select>
    );
  }

  renderCategoryDropdown() {
    const { category } = this.state;
    const questionCategories = { Select: '',
      'General Knowledge': 9,
      'Entertainment: Books': 10,
      'Entertainment: FIlm': 11,
      'Entertainment: Music': 12,
      'Entertainment: Musicals & Theatres': 13,
      'Entertainment: Television': 14,
      'Entertainment: Video Games': 15,
      'Entertainment: Board Games': 16,
      'Science & Nature': 17,
      'Science: Computers': 18,
      'Science: Mathematics': 19,
      Mythology: 20,
      Sports: 21,
      Geography: 22,
      History: 23,
      Politics: 24,
      Art: 25,
      Celebrities: 26,
      Animals: 27,
      Vehicles: 28,
      'Entertainment: Comics': 29,
      'Science: Gadgets': 30,
      'Entertainment: Japanese Anime & Manga': 31,
      'Entertainment: Cartoons & Animations': 32,
    };
    return (
      <select name="category" value={ category } onChange={ this.handleChange }>
        {Object.keys(questionCategories).map((item, index) => (
          <option value={ questionCategories[item] } key={ index }>{item}</option>
        ))}
      </select>
    );
  }

  renderDifficultyDropdown() {
    const { difficulty } = this.state;
    const questionDifficulties = { Select: '',
      Easy: 'easy',
      Medium: 'medium',
      Hard: 'hard',
    };
    return (
      <select name="difficulty" value={ difficulty } onChange={ this.handleChange }>
        {Object.keys(questionDifficulties).map((item, index) => (
          <option value={ questionDifficulties[item] } key={ index }>{item}</option>
        ))}
      </select>
    );
  }

  render() {
    return (
      <main>
        <h1 data-testid="settings-title">
          Settings
        </h1>
        <form>
          {this.renderTypesDropdown()}
          {this.renderDifficultyDropdown()}
          {this.renderCategoryDropdown()}
          <button
            type="button"
            onClick={ this.completeSettings }
          >
            Configurar
          </button>
          <Link to="/">
            <button
              type="button"
            >
              Volta para a tela inicial
            </button>
          </Link>
        </form>
      </main>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  configureQuestionsDispatch: (urlSuffix) => (dispatch(configureQuestions(urlSuffix))),
});

Settings.propTypes = {
  configureQuestionsDispatch: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Settings);
