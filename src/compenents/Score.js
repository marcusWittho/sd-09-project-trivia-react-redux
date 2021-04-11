const score = (difficulty, timer, id) => {
  // Puxando o local Storage e convertendo-o
  const stateV = localStorage.getItem('state');
  const stateVa = JSON.parse(stateV);
  const somaScore = stateVa.player.score;

  if (id === 'correct-answer') {
    const constFormule = 10;
    const difHard = 3;
    const difMedium = 2;
    const difeasy = 1;
    let placar = 0;

    // Função para calcular o placar e guardar no local Storage
    const placarForm = (dif, time) => {
      placar = (constFormule + (dif * time));
      stateVa.player.score = placar + somaScore;
      console.log(somaScore);
      console.log(stateVa);
      localStorage.setItem('state', JSON.stringify(stateVa));
    };

    switch (difficulty) {
    case 'hard':
      placarForm(difHard, timer);
      return;
    case 'medium':
      placarForm(difMedium, timer);
      return;
    case 'easy':
      placarForm(difeasy, timer);
      return;
    default: return 0;
    }
  } else {
    const placar = 0;
    return placar;
  }
};

export default score;
