import { FC, Fragment } from 'react';
import { TodoItem } from '../TodoItem/TodoItem';
import { InputField } from '../InputField/InputField';

export const TodoList: FC = () => {
  return (
    <Fragment>
      <InputField />
      <TodoItem />
    </Fragment>
  );
};
