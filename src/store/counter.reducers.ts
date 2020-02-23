
export const counterReducer = (state = { value: 0}, action) => {
  console.log(action)
  switch (action.type) {
    case 'INCREMENT':
      return {
        value: state.value  + action.payload.count,
      };
    default:
      return state;
  }
};
