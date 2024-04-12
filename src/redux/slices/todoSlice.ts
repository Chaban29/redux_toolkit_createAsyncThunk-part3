import { ITodo, ITodos } from '../../interfaces/ITodo';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { fetchTodos } from '../asyncAction/fetchTodos';
import { deleteTodoWithAction } from '../asyncAction/deleteTodosAction';

export const todosState: ITodos = {
  todos: [],
  status: false,
  error: '',
};

const initialState = todosState;

const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addNewTodo(state, action: PayloadAction<ITodo>) {
      state.todos.push(action.payload);
    },
    deleteTodo(state, action: PayloadAction<number>) {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    },
    toggleTodoCompleted(state, action: PayloadAction<number>) {
      const toggleCompleted = state.todos.find(
        (todo) => todo.id === action.payload
      );
      if (toggleCompleted) {
        toggleCompleted.completed = !toggleCompleted.completed;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.status = false;
        state.error = null;
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.status = true;
        state.todos = action.payload;
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.status = false;
        state.error = action.payload as unknown as string;
      })
      .addCase(deleteTodoWithAction.rejected, (state, action) => {
        state.status = false;
        state.error = action.error.message as unknown as string;
      });
  },
});

export default todoSlice.reducer;
export const { addNewTodo, deleteTodo, toggleTodoCompleted } =
  todoSlice.actions;
