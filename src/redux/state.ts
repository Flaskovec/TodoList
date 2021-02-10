import { combineReducers, createStore } from 'redux';
import { tasksReducer } from './tasks-reducer';
import { todolistReducer } from './todolists-reducer';

export type AppRootType = ReturnType<typeof rootReducer>

export const rootReducer = combineReducers({
  todolists: todolistReducer,
  tasks: tasksReducer,
});

export const store = createStore(rootReducer);

//@ts-ignore
window.store = store;
