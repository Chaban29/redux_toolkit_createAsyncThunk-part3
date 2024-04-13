import { ITodos } from '../../interfaces/ITodo';
import { AnyAction, PayloadAction, createSlice } from '@reduxjs/toolkit';
import { fetchTodos } from '../asyncAction/fetchTodos';
import { deleteTodoWithAction } from '../asyncAction/deleteTodosAction';
import { addTodosActions } from '../asyncAction/addTodosAction';
import { toggleStatus } from '../asyncAction/toggleStatus';

export const todosState: ITodos = {
  todos: [],
  loading: false,
  error: '',
};

const initialState = todosState;

const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.todos = action.payload;
        state.loading = false;
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as unknown as string;
      })
      .addCase(deleteTodoWithAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message as unknown as string;
      })
      .addCase(addTodosActions.pending, (state) => {
        state.error = null;
      })
      .addCase(addTodosActions.fulfilled, (state, action) => {
        state.todos.push(action.payload);
      })
      .addCase(toggleStatus.fulfilled, (state, action) => {
        const toggleTodo = state.todos.find(
          (todo) => todo.id === action.payload.id
        );
        if (toggleTodo) {
          toggleTodo.completed = !toggleTodo.completed;
        }
      })
      .addCase(deleteTodoWithAction.fulfilled, (state, action) => {
        state.todos = state.todos.filter(
          (todo) => todo.id !== action.payload.id
        );
      })
      .addMatcher(isError, (state, action: PayloadAction<string>) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

// function predicate
const isError = (action: AnyAction) => {
  return action.type.endsWith('rejected');
};

export default todoSlice.reducer;

