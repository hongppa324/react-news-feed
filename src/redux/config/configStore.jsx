import { createStore } from "redux";
import { combineReducers, applyMiddleware } from "redux";
import UserInfo from "../modules/UserInfo";
import { thunk } from "redux-thunk";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import newsFeed from "../modules/newsFeed";
import MyProfile from "../modules/MyProfile";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["UserInfo"]
};

const rootReducer = combineReducers({
  UserInfo,
  MyProfile,
  newsFeed
});

const perReducer = persistReducer(persistConfig, rootReducer);

const middlewares = [thunk];
const enhancer = applyMiddleware(...middlewares);

const store = createStore(perReducer, enhancer);

export default store;
