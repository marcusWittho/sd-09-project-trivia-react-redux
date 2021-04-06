import { REQUEST_API } from '../actions/gameActions';

  const INITIAL_STATE = {
    questions: []
  };

  const game = (state = INITIAL_STATE, action) => {
    switch (action.type) {
    case REQUEST_API:
      return ({ ...state,
        questions: action.data,
      });
    }
  }

export default game;
