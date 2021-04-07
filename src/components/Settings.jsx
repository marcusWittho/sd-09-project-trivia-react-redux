import React from 'react';

class Settings extends React.Component {
  render() {
    return (
      <div>
        <title data-testid="settings-title">Settings</title>
        <section>
          <h2>Settings</h2>
          <label htmlFor="category">
            Category
            <select id="category">
              <option value="empty">Selecione</option>
              <option value="cat1">categoria 1</option>
              <option value="cat2">categoria 2</option>
              <option value="cat3">categoria 3</option>
            </select>
          </label>
          <label htmlFor="category">
            Difficulty
            <select id="difficulty">
              <option value="empty">Selecione</option>
              <option value="easy">Easy</option>
              <option value="normal">Normal</option>
              <option value="hard">Hard</option>
            </select>
          </label>
          <label htmlFor="category">
            Type
            <select id="type">
              <option value="empty">Selecione</option>
              <option value="type1">Tipo 1</option>
              <option value="type2">Tipo 2</option>
              <option value="type3">Tipo 3</option>
            </select>
          </label>
        </section>
      </div>
    );
  }
}

export default Settings;
