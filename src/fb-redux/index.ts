// INSPIRATION
// Redux:
// https://medium.com/@guokai83524/building-redux-from-scratch-e12eb0e484c8
// https://codeburst.io/build-your-own-redux-from-scratch-1fb1c348b2f8
// ***: https://levelup.gitconnected.com/learn-redux-by-building-redux-from-scratch-dcbcbd31b0d0

// CombineReducer:
// https://blog.jakoblind.no/code-your-own-combinereducers/

// Middlewares:
// https://blog.jakoblind.no/learn-redux-by-coding-a-mini-redux/
// https://zapier.com/engineering/how-to-build-redux/

const devTools =  (window as any).__REDUX_DEVTOOLS_EXTENSION__;

export const createStore = (reducers, middleware = null) => {
  // 1. init with fake data
  // devTools(() => ({value: 123}));
  // 2. init with reducers
  devTools(reducers);

  // Store Creation
  const store = {
    state: {},
    listeners: [],
    getState: () => store.state,
    subscribe: listener => {
      // add subscribers
      store.listeners.push(listener);
    },
    dispatch: action => {
      // update state;
      store.state = reducers(store.getState(), action);

      // Send action to dev tools
      devTools.send(action.type, store.state);

      // Invoke each subscriber function
      store.listeners.forEach(listener => listener());
    }
  };

  const { dispatch, getState: state } = store;

  // Apply middleware
  if (middleware) {
    store.dispatch = middleware({ dispatch, state })(dispatch);
  }

  // populate store when app inits
  store.state = reducers(state, dispatch);
  store.listeners.forEach(listener => listener());

  return store;
};

//  export type Store = ReturnType<typeof createStore>


// INSPIRED:
// https://blog.jakoblind.no/code-your-own-combinereducers/
export function combineReducers(reducers) {
  // First get an array with all the keys of the reducers (the reducer names)
  const reducerKeys = Object.keys(reducers);

  return function combination(state = {}, action) {
    // This is the object we are going to return.
    const nextState = {};

    // Loop through all the reducer keys
    for (let i = 0; i < reducerKeys.length; i++) {
      // Get the current key name
      const key = reducerKeys[i];

      // Get the current reducer
      const reducer = reducers[key]

      // Get the the previous state
      const previousStateForKey = state[key]

      // Update the new state for the current reducer
      nextState[key] = reducer(previousStateForKey, action);
    }
    return nextState;
  }
}

