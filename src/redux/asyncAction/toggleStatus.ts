import { createAsyncThunk } from '@reduxjs/toolkit';
import { ITodo } from '../../interfaces/ITodo';
import { todosState } from '../slices/todoSlice';

export const toggleStatus = createAsyncThunk<
  ITodo,
  number,
  { rejectValue: string; state: { todos: typeof todosState } }
>('status/toggleStatus', async (id: number, { rejectWithValue, getState }) => {
  const todo = getState().todos.todos.find((todo) => todo.id === id);
  if (todo) {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/todos/${id}?_limit=10`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          completed: !todo.completed,
        }),
      }
    );

    if (!response.ok) {
      return rejectWithValue('Failed to update todo status');
    }

    const updatedTodo = (await response.json()) as ITodo;
    return updatedTodo;
  }
  return rejectWithValue(`No todo found with id ${id}`);
});
