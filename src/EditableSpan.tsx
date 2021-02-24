import { TextField } from '@material-ui/core';
import React, { ChangeEvent, useState } from 'react';
export type EditableSpanPropsType = {
  title: string;
  onChange: (newValue: string) => void;
};

export const EditableSpan = React.memo((props: EditableSpanPropsType) => {
  const [editMode, setEditMode] = useState(false);
  const [title, setTitle] = useState('');

  const activateEditMode = () => {
    setEditMode(true);
    setTitle(props.title);
  };
  const activateViewMode = () => {
    setEditMode(false);
    props.onChange(title);
  };
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value);

  return editMode ? (
    <TextField value={title} onChange={onChangeHandler} onBlur={activateViewMode} autoFocus />
  ) : (
    <span onDoubleClick={activateEditMode}>{props.title}</span>
  );
});
