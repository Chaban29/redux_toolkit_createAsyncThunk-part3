import { createAsyncThunk } from '@reduxjs/toolkit';
import { ITodo } from '../../interfaces/ITodo';
import { todosState, toggleTodoCompleted } from '../slices/todoSlice';

export const toggleStatus = createAsyncThunk<
  ITodo,
  number,
  { state: { todos: typeof todosState } }
>(
  'status/toggleStatus',
  async (id: number, { dispatch, rejectWithValue, getState }) => {
    try {
      const todo = getState().todos.todos.find((todo) => todo.id === id);
      if (!todo) {
        throw new Error(`Todo with id ${id} not found`);
      }

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
        throw new Error('Failed to update todo status');
      }

      dispatch(toggleTodoCompleted(id));

      return todo;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : 'Unknown error'
      );
    }
  }
);
