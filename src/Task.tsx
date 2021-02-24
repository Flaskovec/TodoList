import { Checkbox, IconButton } from '@material-ui/core';
import { Delete } from '@material-ui/icons';
import React, { ChangeEvent, useCallback } from 'react';
import { EditableSpan } from './EditableSpan';
import { TaskType } from './Todolist';

export type TaskPropsType = {
  removeTasks: (id: string, todolistId: string) => void;
  changeTaskStatus: (taskId: string, isDone: boolean, todolistId: string) => void;
  changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void;
  task: TaskType;
  todolistId: string;
};
export const Task = React.memo((props: TaskPropsType) => {
  const onRemoveHandler = () => props.removeTasks(props.task.id, props.todolistId);
  const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
    props.changeTaskStatus(props.task.id, e.currentTarget.checked, props.todolistId);
  };
  const onChangeTitleHandler = useCallback((newValue: string) => {
    props.changeTaskTitle(props.task.id, newValue, props.todolistId);
  }, [props]);

  return (
    <li key={props.task.id} className={props.task.isDone ? 'is-done' : ''}>
      <Checkbox color="primary" checked={props.task.isDone} onChange={onChangeStatusHandler} />
      <EditableSpan title={props.task.title} onChange={onChangeTitleHandler} />
      <IconButton size="small" onClick={onRemoveHandler} aria-label="delete">
        <Delete />
      </IconButton>
    </li>
  );
});
