import { v1 } from 'uuid';
import { FilterValuesType, TodolistType } from '../App';
import {
  todolistReducer,
  removeTodolistAC,
  addTodolistAC,
  changeTodolisTitletAC,
  changeTodolisFiltertAC,
} from './todolists-reducer';

test('correct todolist should be removed', () => {
  let todolistId1 = v1();
  let todolistId2 = v1();

  const startState: Array<TodolistType> = [
    { id: todolistId1, title: 'what to learn', filter: 'all' },
    { id: todolistId2, title: 'what to buy', filter: 'all' },
  ];

  const endState = todolistReducer(startState, removeTodolistAC(todolistId1));

  expect(endState.length).toBe(1);
  expect(endState[0].id).toBe(todolistId2);
});

test('todolist should be added correctly', () => {
  let todolistId1 = v1();
  let todolistId2 = v1();

  let newTodolistTitle = 'New Todolist';

  const startState: Array<TodolistType> = [
    { id: todolistId1, title: 'what to learn', filter: 'all' },
    { id: todolistId2, title: 'what to buy', filter: 'all' },
  ];

  const endState = todolistReducer(startState, addTodolistAC(newTodolistTitle));

  expect(endState.length).toBe(3);
  expect(endState[2].title).toBe(newTodolistTitle);
  expect(endState[2].filter).toBe('all');
});

test('todolist should change its name correctly', () => {
  let todolistId1 = v1();
  let todolistId2 = v1();

  let newTodolistTitle = 'New Todolist';

  const startState: Array<TodolistType> = [
    { id: todolistId1, title: 'what to learn', filter: 'all' },
    { id: todolistId2, title: 'what to buy', filter: 'all' },
  ];

  const action = changeTodolisTitletAC(todolistId2, newTodolistTitle);

  const endState = todolistReducer(startState, action);

  expect(endState[0].title).toBe('what to learn');
  expect(endState[1].title).toBe(newTodolistTitle);
});

test('filter of todolist should be changed correctly', () => {
  let todolistId1 = v1();
  let todolistId2 = v1();

  let newFilter: FilterValuesType = 'completed';

  const startState: Array<TodolistType> = [
    { id: todolistId1, title: 'what to learn', filter: 'all' },
    { id: todolistId2, title: 'what to buy', filter: 'all' },
  ];

  const action = changeTodolisFiltertAC(todolistId2, newFilter);

  const endState = todolistReducer(startState, action);

  expect(endState[0].filter).toBe('all');
  expect(endState[1].filter).toBe(newFilter);
});
