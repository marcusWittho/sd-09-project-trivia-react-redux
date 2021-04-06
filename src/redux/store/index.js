import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import reducer from '../reducers';

const storee = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(thunk)),
);

export default storee;
