import React, { Component } from 'react';
import Header from '../components/Header';
import RankingList from '../components/Ranking';

export default class RankingScreen extends Component {
  render() {
    return (
      <>
        <Header />
        <button type="button" data-testid="btn-go-home">Voltar para home</button>
        <RankingList />
      </>
    );
  }
}
