import { combineReducers } from 'redux';
import todoSlice from '../slices/todoSlice';

export const rootReducer = combineReducers({
  todos: todoSlice,
});

export type RootState = ReturnType<typeof rootReducer>;
