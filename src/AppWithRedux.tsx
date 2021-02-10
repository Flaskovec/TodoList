import { AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import React from 'react';
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

  function removeTasks(id: string, todolistId: string) {
    dispatch(removeTaskAC(id, todolistId));
  }

  function addTask(title: string, todolistId: string) {
    dispatch(addTaskAC(title, todolistId));
  }

  function changeStatus(taskId: string, isDone: boolean, todolistId: string) {
    dispatch(changeTaskStatusAC(taskId, isDone, todolistId));
  }

  function changeTitle(taskId: string, newTitle: string, todolistId: string) {
    dispatch(changeTaskTitleAC(taskId, newTitle, todolistId));
  }

  function changeFilter(todolistId: string, value: FilterValuesType) {
    const action = changeTodolisFiltertAC(todolistId, value);
    dispatch(action);
  }

  const removeTodolist = (todolistId: string) => {
    const action = removeTodolistAC(todolistId);
    dispatch(action);
  };

  const changeTodolistTitle = (id: string, newTitle: string) => {
    const action = changeTodolisTitletAC(id, newTitle);
    dispatch(action);
  };

  function addTodolist(title: string) {
    const action = addTodolistAC(title);
    dispatch(action);
  }

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
        <Grid container spacing={3}>
          {todolists.map((tl) => {
            let tasksForTodoList = tasks[tl.id];
            if (tl.filter === 'completed') {
              tasksForTodoList = tasksForTodoList.filter((t) => t.isDone === true);
            }
            if (tl.filter === 'active') {
              tasksForTodoList = tasksForTodoList.filter((t) => t.isDone === false);
            }
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
