// @ts-nocheck
import './style.css';

import { combineReducers, createStore } from './fb-redux';
import thunkMiddleware from './fb-redux/middleware-thunk';
import delayMiddleware from './fb-redux/middleware-delay';

import { counterReducer } from './store/counter.reducers';
import { createUI } from './main';
import { usersReducer } from './store/users.reducer';

// ==================
// Store Creation
const reducers = combineReducers({
  count: counterReducer,
  users: usersReducer
});

// ==================
// Middleware
// 1. Simple Delay Middleware (only works with plain actions)
// const store = createStore(reducers, delayMiddleware);

// 2. Thunk Middleware
const store = createStore(reducers, thunkMiddleware);

// ==================
// Create UI
const ui = createUI(store);

const display = () => {
  const state = store.getState();
  const count = state.count;
  const users = state.users.list;
  ui.innerHTML = `Counter: ${count.value} - Users: ${users.length}` ;
};

// Store updates
store.subscribe(display);

// display store when app inits
display();
