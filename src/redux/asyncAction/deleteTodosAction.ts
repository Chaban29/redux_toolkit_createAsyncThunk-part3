import { createAsyncThunk } from '@reduxjs/toolkit';
import { deleteTodo } from '../slices/todoSlice';

export const deleteTodoWithAction = createAsyncThunk(
  'todos/deleteTodosAsync',
  async (id: number, { rejectWithValue, dispatch }) => {
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/todos/${id}`,
        {
          method: 'DELETE',
        }
      );
      if (!response.ok) {
        throw new Error('Can\t delete todos');
      }
      console.log(response);
      return dispatch(deleteTodo(id));
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(`${error.name} ${error.message} `);
      }
    }
  }
);
