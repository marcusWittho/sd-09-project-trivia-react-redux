import { BTN_STATE } from './actionsType';

const btnStateAction = (btnState) => ({
  type: BTN_STATE,
  btnState,
});

export default btnStateAction;
