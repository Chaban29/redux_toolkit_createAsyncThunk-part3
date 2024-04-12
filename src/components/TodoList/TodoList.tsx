import { FC, Fragment, useEffect } from 'react';
import { TodoItem } from '../TodoItem/TodoItem';
import { InputField } from '../InputField/InputField';
import { useAppSelector } from '../../hooks/useAppSelector';

export const TodoList: FC = () => {
  const todos = useAppSelector((state) => state.todos);

  useEffect(() => {
    console.log(todos);
  }, [todos]);

  return (
    <Fragment>
      <InputField />
      <TodoItem />
    </Fragment>
  );
};
