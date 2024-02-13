import { createStore } from "redux";
import { combineReducers, applyMiddleware } from "redux";
import UserInfo from "../modules/UserInfo";
import { thunk } from "redux-thunk";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import FeedRedux from "../modules/FeedRedux";
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["UserInfo"]
};

const rootReducer = combineReducers({
  UserInfo,
  FeedRedux
});

const perReducer = persistReducer(persistConfig, rootReducer);

const middlewares = [thunk];
const enhancer = applyMiddleware(...middlewares);

const store = createStore(perReducer, enhancer);

export default store;
