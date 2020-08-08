import { combineReducers } from 'redux'

import filtersReducer from './filters/filtersReducer';

const rootReducer = combineReducers({
  filters: filtersReducer,
})

export default rootReducer;