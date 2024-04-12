import { FC, useEffect } from 'react';
import { useAppSelector } from './hooks/useAppSelector';
import { useAppDispatch } from './hooks/useAppDispatch';
import { fetchTodos } from './redux/asyncAction/fetchTodos';
import { deleteTodoWithAction } from './redux/asyncAction/deleteTodosAction';
import { toggleStatus } from './redux/asyncAction/toggleStatus';
import { InputField } from './components/InputField/InputField';

export const App: FC = () => {
  const { error, status, todos } = useAppSelector((state) => state.todos);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  if (!status) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error} 404</div>;
  }

  return (
    <div>
      {
        <ol>
          <InputField />
          {todos.map((todo) => (
            <li key={todo.id}>
              <input
                type='checkbox'
                checked={todo.completed}
                onChange={() => dispatch(toggleStatus(todo.id))}
              />
              {todo.title}
              <br />
              <button onClick={() => dispatch(deleteTodoWithAction(todo.id))}>
                Delete todo
              </button>
            </li>
          ))}
        </ol>
      }
    </div>
  );
};
