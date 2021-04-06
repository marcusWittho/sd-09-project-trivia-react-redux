import React from 'react';
import { Link } from 'react-router-dom';

class Home extends React.Component {
  render() {
    return (
      <Link to="/settings" data-testid="btn-settings">Configurações</Link>
    );
  }
}

export default Home;
