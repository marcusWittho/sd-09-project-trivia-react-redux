export const SETPLAYER_ACTION = 'SETPLAYER_ACTION';

export const playerAction = (player) => ({ type: SETPLAYER_ACTION, player });

export const ASSERTIONS_ACTION = 'ASSERTIONS_ACTION';

export const correctAction = (score) => ({ type: ASSERTIONS_ACTION, score });
