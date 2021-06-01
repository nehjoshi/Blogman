import { createStore, combineReducers } from "redux";
import AuthReducer from './redux/reducers/AuthReducer';

const allReducers = combineReducers({ authState: AuthReducer });
const store = createStore(allReducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
// const store = createStore(allReducers);

export default store;