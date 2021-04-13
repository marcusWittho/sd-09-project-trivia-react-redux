const savePerformanceData = () => {
  const state = JSON.parse(localStorage.getItem('state'));
  const { player: { name, score, gravatarEmail: picture } } = state;
  const performanceData = {
    name,
    score,
    picture,
  };
  const ranking = JSON.parse(localStorage.getItem('ranking'));
  ranking.push(performanceData);
  localStorage.setItem('ranking', JSON.stringify(ranking));
};

export default savePerformanceData;
