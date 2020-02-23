
// create redux
// https://medium.com/@guokai83524/building-redux-from-scratch-e12eb0e484c8
// https://codeburst.io/build-your-own-redux-from-scratch-1fb1c348b2f8

// BEST (inspired): https://levelup.gitconnected.com/learn-redux-by-building-redux-from-scratch-dcbcbd31b0d0
// CombineReducer: https://blog.jakoblind.no/code-your-own-combinereducers/

// https://blog.jakoblind.no/learn-redux-by-coding-a-mini-redux/

// MIDDLEWARE: https://zapier.com/engineering/how-to-build-redux/

const devTools =  (window as any).__REDUX_DEVTOOLS_EXTENSION__;

export const createStore = (reducers, middleware = null) => {
  const store: any = {};
  devTools(reducers);

  store.listeners = [];
  store.getState = () => store.state;
  store.subscribe = listener => {
    store.listeners.push(listener);
  };

  store.dispatch = action => {
    // console.log('> Action', action);
    devTools.send(
      action.type,
      reducers(store.getState(), action)
    );
    store.state = reducers(store.state, action);
    store.listeners.forEach(listener => listener());
  };

  if (middleware) {
    const dispatch = action => store.dispatch(action);
    store.dispatch = middleware({
      dispatch,
      getState: store.getState
    })(store.dispatch);
  }
  store.dispatch({type: '@@redux/INITT'});

  return store;
};

export type Store = ReturnType<typeof createStore>


// TIP https://blog.jakoblind.no/code-your-own-combinereducers/
export function combineReducers(reducers) {
  // First get an array with all the keys of the reducers (the reducer names)
  const reducerKeys = Object.keys(reducers);

  return function combination(state = {}, action) {
    // This is the object we are going to return.
    const nextState = {}

    // Loop through all the reducer keys
    for (let i = 0; i < reducerKeys.length; i++) {
      // Get the current key name
      const key = reducerKeys[i];

      // Get the current reducer
      const reducer = reducers[key]

      // Get the the previous state
      const previousStateForKey = state[key]

      // Get the next state by running the reducer
      const nextStateForKey = reducer(previousStateForKey, action)
      // Update the new state for the current reducer
      nextState[key] = nextStateForKey;
    }
    return nextState;
  }
}

