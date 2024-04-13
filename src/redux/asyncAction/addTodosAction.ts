import { createAsyncThunk } from '@reduxjs/toolkit';
import { ITodo } from '../../interfaces/ITodo';

export const addTodosActions = createAsyncThunk<
  ITodo,
  string,
  { rejectValue: string }
>('todo/addNewTodo', async (text, { rejectWithValue }) => {
  const todo: ITodo = {
    id: 1,
    title: text,
    completed: false,
  };

  const response = await fetch(
    `https://jsonplaceholder.typicode.com/todos?_limit=10`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(todo),
    }
  );
  if (!response.ok) {
    rejectWithValue('Can\t add new todo');
  }
  const data = (await response.json()) as ITodo;

  return data;
});
