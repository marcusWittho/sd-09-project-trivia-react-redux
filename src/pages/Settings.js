import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { func } from 'prop-types';
import { setCategory, setDifficulty, setType } from '../actions';
import './Settings.css';

class Settings extends React.Component {
  constructor(props) {
    super(props);
    this.dispatchActions = this.dispatchActions.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.createDropDown = this.createDropDown.bind(this);
    this.state = { category: '', difficulty: '', type: '' };
  }

  componentDidUpdate() {
    this.dispatchActions();
  }

  dispatchActions() {
    const { updateCategory, updateDifficulty, updateType } = this.props;
    const { category, difficulty, type } = this.state;
    if (category) updateCategory(`&category=${category}`);
    if (difficulty) updateDifficulty(`&difficulty=${difficulty}`);
    if (type) updateType(`&type=${type}`);
  }

  handleChange({ target: { id, value } }) {
    this.setState({ [id]: value });
  }

  createDropDown(name, options, optionsValues) {
    return (
      <label htmlFor={ name }>
        { name }
        <select id={ name } onChange={ this.handleChange }>
          <option value="">{ `any ${name}` }</option>
          { options.map((option, index) => (
            <option key={ option } value={ optionsValues[index] }>
              { option }
            </option>))}
        </select>
      </label>);
  }

  render() {
    const categ = {
      'general knowledge': 9,
      'entertainment: books': 10,
      'entertainment: film': 11,
      'entertainment: music': 12,
      'entertainment: musicals & theatres': 13,
      'entertainment: television': 14,
      'entertainment: video games': 15,
      'entertainment: board games': 16,
      'science & nature': 17,
      'science: computers': 18,
      'science: mathematics': 19,
      mythology: 20,
      sports: 21,
      geography: 22,
      history: 23,
      politics: 24,
      art: 25,
      celebrities: 26,
      animals: 27,
      vehicles: 28,
      'entertainment: comics': 29,
      'science: gadgets': 30,
      'entertainment: japanese anime & manga': 31,
      'entertainment: cartoon & animations': 32,
    };
    const difficulty = ['easy', 'medium', 'hard'];
    const type = ['multiple', 'boolean'];
    return (
      <div>
        <h1 data-testid="settings-title">Game Settings</h1>
        { this.createDropDown('category', Object.keys(categ), Object.values(categ)) }
        { this.createDropDown('difficulty', difficulty, difficulty) }
        { this.createDropDown('type', type, type) }
        <Link to="/">
          <button
            data-testid="btn-go-home"
            type="button"
          >
            Go Home
          </button>
        </Link>
      </div>
    );
  }
}

Settings.propTypes = {
  updateCategory: func,
  updateDifficulty: func,
  updateType: func,
}.isRequired;

const mapDispatchToProps = (dispatch) => ({
  updateCategory: (category) => dispatch(setCategory(category)),
  updateDifficulty: (difficulty) => dispatch(setDifficulty(difficulty)),
  updateType: (qtype) => dispatch(setType(qtype)),
});

export default connect(null, mapDispatchToProps)(Settings);
