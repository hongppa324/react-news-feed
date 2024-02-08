import { createStore } from 'redux'
import { combineReducers } from 'redux'

import Reducer from '../modules/BoardItems';

const rootReducer = combineReducers({
  Reducer
  });
const store = createStore(rootReducer);

export default store


