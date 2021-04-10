import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import getCategories from '../service/API';
import { setConfig } from '../redux/actions';

class Config extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      categories: [],
      quantity: 5,
      category: 'all',
      difficulty: 'all',
      type: 'all',
    };

    this.renderCategories = this.renderCategories.bind(this);
    this.renderDificulties = this.renderDificulties.bind(this);
    this.renderTypes = this.renderTypes.bind(this);
    this.renderQuantity = this.renderQuantity.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.setConfigurations = this.setConfigurations.bind(this);
  }

  componentDidMount() {
    const { configurations } = this.props;
    this.getOptions();
    configurations('https://opentdb.com/api.php?amount=5');
  }

  async getOptions() {
    this.setState({
      categories: [{ id: '', name: 'all' }, ...await getCategories()],
    });
  }

  setConfigurations() {
    const { configurations } = this.props;
    const { quantity, category, difficulty, type } = this.state;
    let URL = `https://opentdb.com/api.php?amount=${quantity}`;
    if (category !== 'all') URL += `&category=${category}`;
    if (difficulty !== 'all') URL += `&difficulty=${difficulty}`;
    if (type !== 'all') URL += `&type=${type}`;
    configurations(URL);
  }

  handleChange({ target: { name, value } }) {
    const minimumQuantity = 5;
    if (name === 'quantity' && value < minimumQuantity) value = minimumQuantity;
    this.setState({ [name]: value }, () => this.setConfigurations());
  }

  renderCategories() {
    const { categories, category } = this.state;

    return (
      <label htmlFor="category">
        Category:
        <select
          name="category"
          id="category"
          value={ category }
          onChange={ this.handleChange }
        >
          {categories.map((categ) => (
            <option
              value={ categ.id }
              key={ categ.id }
            >
              { categ.name }
            </option>))}
        </select>
      </label>
    );
  }

  renderDificulties() {
    const { difficulty } = this.state;
    const difficulties = ['all', 'easy', 'medium', 'hard'];

    return (
      <label htmlFor="dificulty">
        Difficulty:
        <select
          name="difficulty"
          id="difficulty"
          value={ difficulty }
          onChange={ this.handleChange }
        >
          {difficulties.map((dif) => (
            <option
              value={ dif }
              key={ dif }
            >
              { dif }
            </option>))}
        </select>
      </label>
    );
  }

  renderQuantity() {
    const { quantity } = this.state;
    return (
      <label htmlFor="quantity">
        <input
          type="number"
          name="quantity"
          value={ quantity }
          id="quantity"
          onChange={ this.handleChange }
        />
      </label>
    );
  }

  renderTypes() {
    const { type } = this.state;
    const types = [
      { name: 'all', type: 'all' },
      { name: 'multiple choice', type: 'multiple' },
      { name: 'true/false', type: 'boolean' },
    ];

    return (
      <label htmlFor="type">
        Type:
        <select
          name="type"
          id="type"
          value={ type }
          onChange={ this.handleChange }
        >
          {types.map((typ) => (
            <option
              value={ typ.type }
              key={ typ.name }
            >
              { typ.name }
            </option>))}
        </select>
      </label>
    );
  }

  render() {
    return (
      <div>
        <h1 data-testid="settings-title">Configurações</h1>
        <Link to="/">Home</Link>
        { this.renderQuantity() }
        { this.renderCategories() }
        { this.renderDificulties() }
        { this.renderTypes() }
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  configurations: (config) => dispatch(setConfig(config)),
});

Config.propTypes = {
  configurations: PropTypes.func,
}.isRequired;

export default connect(null, mapDispatchToProps)(Config);
