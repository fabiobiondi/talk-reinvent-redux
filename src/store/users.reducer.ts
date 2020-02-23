
export const usersReducer = (
  state = {list: [], active: null}, action
) => {
  switch (action.type) {
    case 'LOAD_USERS_SUCCESS':
      return {
        list: [...state.list, ...action.payload],
        active: {...action.payload[0]}
      };
    default:
      return state;
  }
};
