import { TasksStateType } from '../App';
import { addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer } from './tasks-reducer';
import { addTodolistAC } from './todolists-reducer';

test('correct task should be deleted from correct array', () => {
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

  const action = removeTaskAC('2', 'todolistId2');
  const endState = tasksReducer(startState, action);

  expect(endState['todolistId1'].length).toBe(3);
  expect(endState['todolistId2'].length).toBe(2);
  expect(endState['todolistId2'].every((t) => t.id !== '2')).toBeTruthy();
});
test('correct task should be added to correct array', () => {
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

  const action = addTaskAC('newTask', 'todolistId2');
  const endState = tasksReducer(startState, action);

  expect(endState['todolistId1'].length).toBe(3);
  expect(endState['todolistId2'].length).toBe(4);
  expect(endState['todolistId2'][0].id).toBeDefined();
  expect(endState['todolistId2'][0].title).toBe('newTask');
  expect(endState['todolistId2'][0].isDone).toBe(false);
});
test('status of the task should be changed', () => {
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

  const action = changeTaskStatusAC('2', false, 'todolistId2');
  const endState = tasksReducer(startState, action);

  expect(endState['todolistId1'][1].isDone).toBe(true);
  expect(endState['todolistId2'][1].isDone).toBe(false);
});
test('title of the task should be changed', () => {
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

  const action = changeTaskTitleAC('2', 'changedTitle', 'todolistId2');
  const endState = tasksReducer(startState, action);

  expect(endState['todolistId1'][1].title).toBe('JS');
  expect(endState['todolistId2'][1].title).toBe('changedTitle');
});
test('new property with new array should be adde when todolist is added', () => {
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

  const action = addTodolistAC('title doesnt matter');
  const endState = tasksReducer(startState, action);

  const keys = Object.keys(endState);
  const newKey = keys.find((k) => k !== 'todolistId1' && k !== 'todolistId2');

  if (!newKey) {
    throw new Error('new key should be added');
  }

  expect(keys.length).toBe(3);
  expect(endState[newKey]).toEqual([]);
});
