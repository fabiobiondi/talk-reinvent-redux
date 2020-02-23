export const LOAD_USERS = 'LOAD_USERS';
export const LOAD_USERS_SUCCESS = 'LOAD_USERS_SUCCESS';

export function loadUsers() {
  return function(dispatch) {
    dispatch({ type: LOAD_USERS})

    return fetch('https://jsonplaceholder.typicode.com/users')
      .then(res => res.json())
      .then((result) => dispatch({ type: LOAD_USERS_SUCCESS, payload: result}));
  };
}
