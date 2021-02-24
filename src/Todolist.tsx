import { Button, IconButton } from '@material-ui/core';
import { Delete } from '@material-ui/icons';
import React, { useCallback } from 'react';
import { AddItemForm } from './AddItemForm';
import { FilterValuesType } from './App';
import { EditableSpan } from './EditableSpan';
import { Task } from './Task';

export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};

type PropsType = {
  id: string;
  title: string;
  tasks: Array<TaskType>;
  changeFilter: (todolistId: string, value: FilterValuesType) => void;
  addTask: (title: string, todolistId: string) => void;
  removeTasks: (id: string, todolistId: string) => void;
  changeTaskStatus: (taskId: string, isDone: boolean, todolistId: string) => void;
  changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void;
  filter: FilterValuesType;
  removeTodolist: (todolistId: string) => void;
  changeTodolistTitle: (id: string, newTitle: string) => void;
};

export const Todolist = React.memo((props: PropsType) => {
  console.log('todolistRender');

  const onAllChangeFilter = useCallback(() => props.changeFilter(props.id, 'all'), [props]);
  const onActiveChangeFilter = useCallback(() => props.changeFilter(props.id, 'active'), [props]);
  const onCompletedChangeFilter = useCallback(() => props.changeFilter(props.id, 'completed'), [props]);

  const removeTodolist = useCallback(() => {
    props.removeTodolist(props.id);
  }, [props]);

  const changeTodolistTitle = useCallback(
    (newTitle: string) => {
      props.changeTodolistTitle(props.id, newTitle);
    },
    [props]
  );

  const addTask = useCallback(
    (title: string) => {
      props.addTask(title, props.id);
    },
    [props]
  );

  let tasksForTodoList = props.tasks;

  if (props.filter === 'completed') {
    tasksForTodoList = props.tasks.filter((t) => t.isDone === true);
  }
  if (props.filter === 'active') {
    tasksForTodoList = props.tasks.filter((t) => t.isDone === false);
  }

  return (
    <div>
      <h3>
        <EditableSpan title={props.title} onChange={changeTodolistTitle} />
        <IconButton size="small" onClick={removeTodolist} aria-label="delete">
          <Delete />
        </IconButton>
      </h3>
      <AddItemForm addItem={addTask} />
      <ul>
        {tasksForTodoList.map((t) => {
          return (
            <Task
              key={t.id}
              task={t}
              todolistId={props.id}
              removeTasks={props.removeTasks}
              changeTaskStatus={props.changeTaskStatus}
              changeTaskTitle={props.changeTaskTitle}
            />
          );
        })}
      </ul>
      <div>
        <Button
          variant={props.filter === 'all' ? 'contained' : 'outlined'}
          size="small"
          color="primary"
          onClick={onAllChangeFilter}
        >
          All
        </Button>
        <Button
          variant={props.filter === 'active' ? 'contained' : 'outlined'}
          size="small"
          color="primary"
          onClick={onActiveChangeFilter}
        >
          Active
        </Button>
        <Button
          variant={props.filter === 'completed' ? 'contained' : 'outlined'}
          size="small"
          color="primary"
          onClick={onCompletedChangeFilter}
        >
          Completed
        </Button>
      </div>
    </div>
  );
});
