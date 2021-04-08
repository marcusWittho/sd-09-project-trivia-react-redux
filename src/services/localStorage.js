const STATE_KEY = 'state';

const addPointsToScore = (timer, difficulty) => {
    const pontuation = 10 + (parseInt(timer) * parseInt(difficulty));
    const playerJSON = localStorage.getItem(STATE_KEY);
    const player = getPlayer();
    player.score += pontuation;
    localStorage.setItem(JSON.stringify(player));
}

const getPlayer = () => {
    const playerJSON = localStorage.getItem(STATE_KEY);
    const player = JSON.parse(playerJSON);
    return player;
}

export default {
    addPointsToScore,
}