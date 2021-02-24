import { IconButton, TextField } from '@material-ui/core';
import { AddCircle } from '@material-ui/icons';

import React, { ChangeEvent, KeyboardEvent, useState } from 'react';

export type AddItemFormPropsType = {
  addItem: (title: string) => void;
};
export const AddItemForm = React.memo((props: AddItemFormPropsType) => {
  const [newTaskTitle, setNewTaskTitle] = useState('');

  const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTaskTitle(e.currentTarget.value);
  };

  const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (error) {
      setError(null);
    }
    if (e.key === 'Enter') {
      props.addItem(newTaskTitle);
      setNewTaskTitle('');
    }
  };

  const [error, setError] = useState<string | null>(null);

  const addTask = () => {
    if (newTaskTitle.trim() !== '') {
      props.addItem(newTaskTitle.trim());
      setNewTaskTitle('');
    } else {
      setError('Field is required');
    }
  };

  return (
    <div>
      <TextField
        value={newTaskTitle}
        onChange={onNewTitleChangeHandler}
        onKeyPress={onKeyPressHandler}
        id="outlined-basic"
        label="Enter the name"
        variant="outlined"
        size="small"
        error={!!error}
        helperText={error}
      />
      <IconButton size="small" color="primary" onClick={addTask}>
        <AddCircle fontSize="large" />
      </IconButton>
    </div>
  );
});
