import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { settingAction } from '../actions/settingsAction';
import { getThunkCategory } from '../actions/apiTriviaAction';

class Settings extends React.Component {
  constructor(props) {
    super(props);

    this.selectCategory = this.selectCategory.bind(this);
    this.selectDifficulty = this.selectDifficulty.bind(this);
    this.selectType = this.selectType.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    const { getCategories } = this.props;
    getCategories();
  }

  handleChange({ target }) {
    const { setSettingAction } = this.props;
    const { name, value } = target;

    setSettingAction(name, value);
  }

  selectDifficulty() {
    return (
      <label htmlFor="difficulty">
        Dificuldade:
        <select name="difficulty" onChange={ this.handleChange }>
          <option value="">Custom</option>
          <option value="easy">Facil</option>
          <option value="medium">Medio</option>
          <option value="hard">Dificil</option>
        </select>
      </label>
    );
  }

  selectType() {
    return (
      <label htmlFor="type">
        Tipo:
        <select name="type" onChange={ this.handleChange }>
          <option value="">Custom</option>
          <option value="multiple">Multipla Escolha</option>
          <option value="boolean">Verdadeiro ou Falso</option>
        </select>
      </label>
    );
  }

  selectCategory() {
    const { categories } = this.props;
    return (
      <label htmlFor="category">
        Categoria:
        <select name="category" onChange={ this.handleChange }>
          <option value="">Custom</option>
          {categories.map((category) => (
            <option key={ category.id } value={ category.id }>{category.name}</option>))}
        </select>
      </label>
    );
  }

  render() {
    return (
      <div>
        <h1
          data-testid="settings-title"
        >
          CONFIGURAÇÕES
        </h1>
        <div>
          { this.selectDifficulty() }
          { this.selectCategory() }
          { this.selectType() }
        </div>
        <Link to="/">
          <button
            type="button"
          >
            Inicio
          </button>
        </Link>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  categories: state.gameReducer.categories,
});

const mapDispatchToProps = (dispatch) => ({
  setSettingAction: (name, value) => (dispatch(settingAction(name, value))),
  getCategories: () => dispatch(getThunkCategory()),
});

Settings.propTypes = {
  getCategories: PropTypes.arrayOf(PropTypes.object),
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
