import { FC, useEffect, useState } from 'react';
import { addTodosActions } from './redux/asyncAction/addTodosAction';
import { deleteTodoWithAction } from './redux/asyncAction/deleteTodosAction';
import { toggleStatus } from './redux/asyncAction/toggleStatus';
import { fetchTodos } from './redux/asyncAction/fetchTodos';
import { useAppDispatch } from './hooks/useAppDispatch';
import { useAppSelector } from './hooks/useAppSelector';

export const App: FC = () => {
  const [text, setText] = useState<string>('');
  const { error, loading, todos } = useAppSelector((state) => state.todos);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error} 404</div>;
  }

  const handleAddNewTodoWithAction = () => {
    if (text.trim().length) {
      dispatch(addTodosActions(text));
      setText('');
    }
  };

  const handleToggleStatus = (id: number) => {
    dispatch(toggleStatus(id));
  };

  const handleDeleteTodo = (id: number) => {
    dispatch(deleteTodoWithAction(id));
  };

  return (
    <div>
      <ol>
        <input
          type='text'
          value={text}
          name='text'
          id='text'
          onChange={(event) => setText(event.target.value)}
        />
        <button onClick={handleAddNewTodoWithAction}>Add new todo</button>
        {todos.map((todo) => (
          <li key={todo.id}>
            <input
              type='checkbox'
              checked={todo.completed}
              onChange={() => handleToggleStatus(todo.id)}
            />
            {todo.title}
            <br />
            <button onClick={() => handleDeleteTodo(todo.id)}>
              Delete todo
            </button>
          </li>
        ))}
      </ol>
    </div>
  );
};
