import { applyMiddleware, compose, createStore } from "redux";
import thunk from "redux-thunk";

import reducer from "./reducer";

const INITIAL_STATE = {};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // eslint-disable-line no-undef

const MIDDLEWARE = composeEnhancers(applyMiddleware(thunk));

export default createStore(reducer, INITIAL_STATE, MIDDLEWARE);
