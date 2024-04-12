import { FC } from 'react';
import { TodoList } from './components/TodoList/TodoList';

export const App: FC = () => {
  return (
    <div style={{ paddingLeft: '30px' }}>
      <h1 style={{ textAlign: 'center' }}>Todo List</h1>
      <TodoList />
    </div>
  );
};
