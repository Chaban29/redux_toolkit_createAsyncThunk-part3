import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchTodos = createAsyncThunk(
  'todos/fetchTodos',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(
        'https://jsonplaceholder.typicode.com/todos?_limit=10'
      );
      if (!response.ok) {
        throw new Error('Failed to fetch 404');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(`${error.name} ${error.message}`);
      }
    }
  }
);
