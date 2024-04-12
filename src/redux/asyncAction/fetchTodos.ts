import { createAsyncThunk } from '@reduxjs/toolkit';
import { ITodo } from '../../interfaces/ITodo';

export const fetchTodos = createAsyncThunk<
  ITodo[],
  void,
  { rejectValue: string }
>('todos/fetchTodos', async (_, { rejectWithValue }) => {
  const response = await fetch(
    'https://jsonplaceholder.typicode.com/todos?_limit=10'
  );
  if (!response.ok) {
    throw new Error('Failed to fetch 404');
  }
  const data = await response.json();
  return data;
});
