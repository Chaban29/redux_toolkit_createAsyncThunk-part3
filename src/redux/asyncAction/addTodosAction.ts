import { createAsyncThunk } from '@reduxjs/toolkit';
import { ITodo } from '../../interfaces/ITodo';
import { addNewTodo } from '../slices/todoSlice';

export const addTodosActions = createAsyncThunk(
  'todo/addNewTodo',
  async (text: string, { dispatch, rejectWithValue }) => {
    try {
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
        throw new Error('Can\t add new todo');
      }
      const data = await response.json();
      console.log(data);

      return dispatch(addNewTodo(data));
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
    }
  }
);
