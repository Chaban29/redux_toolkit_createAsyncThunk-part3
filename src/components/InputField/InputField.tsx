import { FC, Fragment, useState } from 'react';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { addTodosActions } from '../../redux/asyncAction/addTodosAction';

export const InputField: FC = () => {
  const [text, setText] = useState<string>('');
  const dispatch = useAppDispatch();

  const handleAddNewTodo = () => {
    if (text.trim().length) {
      dispatch(addTodosActions(text));
      setText('');
    }
  };
  return (
    <Fragment>
      <label htmlFor='text'>
        <input
          type='text'
          name='text'
          id='text'
          value={text}
          onChange={(event) => setText(event.target.value)}
        />
      </label>
      <button type='button' onClick={handleAddNewTodo}>
        Add new Todo
      </button>
    </Fragment>
  );
};
