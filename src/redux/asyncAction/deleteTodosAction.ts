import { createAsyncThunk } from '@reduxjs/toolkit';

export const deleteTodoWithAction = createAsyncThunk<
  { id: number },
  number,
  { rejectValue: string }
>('todos/deleteTodosAsync', async (id, { rejectWithValue }) => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/todos/${id}`,
    {
      method: 'DELETE',
    }
  );
  if (!response.ok) {
    return rejectWithValue("Can't delete todos");
  }
  return { id };
});
