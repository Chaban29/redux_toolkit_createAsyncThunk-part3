import { FC, Fragment, useState } from 'react';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { addNewTodo } from '../../redux/slices/todoSlice';

export const InputField: FC = () => {
  const [text, setText] = useState<string>('');
  const dispatch = useAppDispatch();

  const handleAddNewTodo = () => {
    if (text.trim().length) {
      dispatch(addNewTodo(text));
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
