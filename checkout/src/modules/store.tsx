import { createRouterMiddleware } from '@lagunovsky/redux-react-router'
import { createBrowserHistory } from 'history';
import initializers from 'src/modules/initializers';
import createRootReducer from 'src/modules/reducers';
import { applyMiddleware, createStore } from 'redux';
import {thunk} from 'redux-thunk';

export const history = createBrowserHistory();

let store;

export function configureStore(preloadedState?) {
  const middlewares:any = [
    thunk,
    createRouterMiddleware(history),
  ].filter(Boolean);
  store = createStore(
    createRootReducer(history),
    preloadedState,
    applyMiddleware(...middlewares),
  );

  for (const initializer of initializers) {
    initializer(store);
  }

  return store;
}

export function getHistory() {
  return history;
}

export default function getStore() {
  return store;
}

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch