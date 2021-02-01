import { TasksStateType, TodolistType } from '../App';
import { tasksReducer } from './tasks-reducer';
import { addTodolistAC, removeTodolistAC, todolistReducer } from './todolists-reducer';

test('id should be equal', () => {
  const startTasksState: TasksStateType = {};
  const startTodolistsState: Array<TodolistType> = [];

  const action = addTodolistAC('new todolist')

  const endTasksState = tasksReducer(startTasksState, action)
  const endTodolistsState = todolistReducer(startTodolistsState, action)

  const keys = Object.keys(endTasksState) 
  const idFromTasks = keys[0]
  const idFromTodolists= endTodolistsState[0].id

  expect(idFromTasks).toBe(action.todolistId)
  expect(idFromTodolists).toBe(action.todolistId)

});
test('property with todolistId shoukd be deleted', () => {
  const startState: TasksStateType = {
    todolistId1: [
      { id: '1', title: 'HTML&CSS', isDone: true },
      { id: '2', title: 'JS', isDone: true },
      { id: '3', title: 'React', isDone: true },
    ],
    todolistId2: [
      { id: '1', title: 'milk', isDone: true },
      { id: '2', title: 'bread', isDone: true },
      { id: '3', title: 'Redux', isDone: true },
    ],
  };

  const action = removeTodolistAC('todolistId2');
  const endState = tasksReducer(startState, action);

  const keys = Object.keys(endState) 
  

  expect(keys.length).toBe(1)
  expect(endState['todolistId2']).toBeUndefined()

});
