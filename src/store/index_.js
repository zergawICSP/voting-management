// EXTERNAL IMPORTS
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

// COMPONENT IMPORTS
import rootReducer from "../reducer/rootReducer";

const initialState = {};
const middleware = [thunk];

const store = createStore(rootReducer, initialState, applyMiddleware(...middleware));

export default store;