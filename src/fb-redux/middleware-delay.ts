// https://blog.jakoblind.no/async-actions-with-redux-thunk-demystified/
// https://github.com/reduxjs/redux-thunk/blob/master/src/index.js#L10
// https://zapier.com/engineering/how-to-build-redux/

const delayMiddleware = () => next => action => {
  setTimeout(() => {
    next(action);
  }, 1000);
};

export default delayMiddleware;
