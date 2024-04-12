import { FC } from 'react';
import { useAppSelector } from '../../hooks/useAppSelector';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { deleteTodo, toggleTodoCompleted } from '../../redux/slices/todoSlice';

export const TodoItem: FC = () => {
  const todos = useAppSelector((state) => state.todos);
  const dispatch = useAppDispatch();

  const handleDeleteTodo = (todoId: number) => {
    dispatch(deleteTodo(todoId));
  };

  const handleToggleTodoCompleted = (todoId: number) => {
    dispatch(toggleTodoCompleted(todoId));
  };
  return (
    <ul>
      {todos.map((todo) => (
        <li key={todo.id}>
          <input
            type='checkbox'
            checked={todo.completed}
            onChange={() => handleToggleTodoCompleted(todo.id)}
          />
          <span
            style={{ textDecoration: todo.completed ? 'line-through' : '' }}
          >
            {todo.name}
          </span>
          <button type='button' onClick={() => handleDeleteTodo(todo.id)}>
            Delete todo
          </button>
        </li>
      ))}
    </ul>
  );
};
