import { compose, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducers from './rootReducers';

const reduxOptions = { name: 'Store', serialize: true };

const composeEnhancers = (process.env.NODE_ENV === 'development' && composeWithDevTools(reduxOptions)) || compose;
const enhancer = composeEnhancers();

const store = createStore(rootReducers, enhancer);

export default store;