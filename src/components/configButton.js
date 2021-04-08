import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Configurations extends Component {
  render() {
    return (
      <div>
        <Link to="/settings">
          <button
            type="button"
            data-testid="btn-settings"
          >
            Configuração
          </button>
        </Link>
      </div>
    );
  }
}

export default Configurations;
