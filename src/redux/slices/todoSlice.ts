import { ITodo } from '../../interfaces/ITodo';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const todosState: ITodo[] = [];

const todoSlice = createSlice({
  name: 'todos',
  initialState: todosState,
  reducers: {
    addNewTodo(state, action: PayloadAction<string>) {
      state.push({ id: +new Date(), name: action.payload, completed: false });
    },
    deleteTodo(state, action: PayloadAction<number>) {
      return state.filter((todo) => todo.id !== action.payload);
    },
    toggleTodoCompleted(state, action: PayloadAction<number>) {
      const toggleId = state.find((todo) => todo.id === action.payload);
      toggleId!.completed = !toggleId!.completed;
    },
  },
});

export default todoSlice.reducer;
export const { addNewTodo, deleteTodo, toggleTodoCompleted } =
  todoSlice.actions;
