import { loadUsers } from './store/users.actions';


// UI Creation
export function createUI(store) {
  const wrapper: HTMLDivElement = document.createElement('div');
  const btnCount: HTMLButtonElement = document.createElement('button');
  const btnUsers: HTMLButtonElement = document.createElement('button');
  let content: HTMLSpanElement = document.createElement('span');

  btnCount.innerHTML = '+';
  btnCount.onclick = () => {
    store.dispatch({ type: 'INCREMENT', payload: { count: 5 }});
  }
  btnUsers.innerHTML = 'Load Users';
  btnUsers.onclick = () => store.dispatch(loadUsers());
  wrapper.appendChild(btnCount);
  wrapper.appendChild(btnUsers);
  wrapper.appendChild(content);
  document.body.appendChild(wrapper);
  return content;
}
