// https://blog.jakoblind.no/async-actions-with-redux-thunk-demystified/
// https://github.com/reduxjs/redux-thunk/blob/master/src/index.js#L10
// https://zapier.com/engineering/how-to-build-redux/

export function createThunkMiddleware(extraArgument = null) {
  return ({ dispatch, state }) => next => action => {
    // Invoke async action creator function (i.e. loadUsers())
    if (typeof action === 'function') {
      return action(dispatch, state, extraArgument);
    }

    // invoke sync action (i.e. { type: ..., payload: ...})
    return next(action);
  };
}
const thunkMiddleware = createThunkMiddleware();
export default thunkMiddleware;

/*


export  const applyMiddleware = (...middlewares) => store => {
  if (middlewares.length === 0) {
    return dispatch => dispatch;
  }
  if (middlewares.length === 1) {
    return middlewares[0](store);
  }
  const boundMiddlewares = middlewares.map(middleware =>
    middleware(store)
  );
  return boundMiddlewares.reduce((a, b) =>
    next => a(b(next))
  );
};

/*export const thunkMiddleware = () => ({dispatch, getState}) => next => action => {
  if (typeof action === 'function') {
    return action(dispatch, getState);
  }
  return next(action);
};
const thunk = thunkMiddleware;
export default thunk;*/
// thunk.withExtraArgument = createThunkMiddleware;
