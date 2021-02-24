import { AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AddItemForm } from './AddItemForm';
import './App.css';
import { AppRootType } from './redux/state';
import { addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC } from './redux/tasks-reducer';
import {
  addTodolistAC,
  changeTodolisFiltertAC,
  changeTodolisTitletAC,
  removeTodolistAC,
} from './redux/todolists-reducer';
import { TaskType, Todolist } from './Todolist';

export type FilterValuesType = 'all' | 'completed' | 'active';

export type TodolistType = {
  id: string;
  title: string;
  filter: FilterValuesType;
};

export type TasksStateType = {
  [key: string]: Array<TaskType>;
};

function AppWithRedux() {
  const dispatch = useDispatch();
  const todolists = useSelector<AppRootType, Array<TodolistType>>((state) => state.todolists);
  const tasks = useSelector<AppRootType, TasksStateType>((state) => state.tasks);

  const removeTasks = useCallback((id: string, todolistId: string) => {
    dispatch(removeTaskAC(id, todolistId));
  }, [dispatch]);

  const addTask = useCallback((title: string, todolistId: string) => {
    dispatch(addTaskAC(title, todolistId));
  }, [dispatch]);

  const changeStatus = useCallback((taskId: string, isDone: boolean, todolistId: string) => {
    dispatch(changeTaskStatusAC(taskId, isDone, todolistId));
  }, [dispatch]);

  const changeTitle = useCallback((taskId: string, newTitle: string, todolistId: string) => {
    dispatch(changeTaskTitleAC(taskId, newTitle, todolistId));
  }, [dispatch]);

  const changeFilter = useCallback((todolistId: string, value: FilterValuesType) => {
    const action = changeTodolisFiltertAC(todolistId, value);
    dispatch(action);
  }, [dispatch]);

  const removeTodolist = useCallback((todolistId: string) => {
    const action = removeTodolistAC(todolistId);
    dispatch(action);
  }, [dispatch]);

  const changeTodolistTitle = useCallback((id: string, newTitle: string) => {
    const action = changeTodolisTitletAC(id, newTitle);
    dispatch(action);
  }, [dispatch]);

  const addTodolist = useCallback((title: string) => {
    const action = addTodolistAC(title);
    dispatch(action);
  }, [dispatch]);

  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6">News</Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
      <Container fixed>
        <Grid container style={{ padding: '20px' }}>
          <AddItemForm addItem={addTodolist} />
        </Grid>
        <Grid container spacing={2}>
          {todolists.map((tl) => {
            let tasksForTodoList = tasks[tl.id];

            return (
              <Grid item>
                <Paper style={{ padding: '10px' }}>
                  <Todolist
                    key={tl.id}
                    id={tl.id}
                    title={tl.title}
                    tasks={tasksForTodoList}
                    removeTasks={removeTasks}
                    changeFilter={changeFilter}
                    addTask={addTask}
                    changeTaskStatus={changeStatus}
                    changeTaskTitle={changeTitle}
                    filter={tl.filter}
                    removeTodolist={removeTodolist}
                    changeTodolistTitle={changeTodolistTitle}
                  />
                </Paper>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </div>
  );
}

export default AppWithRedux;
