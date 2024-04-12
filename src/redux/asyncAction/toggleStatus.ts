import { createAsyncThunk } from '@reduxjs/toolkit';
import { store } from '../store/store';
import { toggleTodoCompleted } from '../slices/todoSlice';

export const toggleStatus = createAsyncThunk(
  'status/toggleStatus',
  async (id: number, { dispatch, rejectWithValue, getState }) => {
    try {
      const todo = store.getState().todos.todos.find((todo) => todo.id === id);
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/todos/${id}?_limit=10`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            completed: !todo?.completed,
          }),
        }
      );
      if (!response.ok) {
        throw new Error('Can\t delete todos');
      }
      return dispatch(toggleTodoCompleted(id));
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
    }
  }
);
