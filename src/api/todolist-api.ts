import axios from 'axios';

const settings = {
  withCredentials: true,
  headers: {
    'API-KEY': 'd32a81db-66c7-4cab-b21a-fa1ec25064dc',
  },
};
const instance = axios.create({
  baseURL: 'https://social-network.samuraijs.com/api/1.1/',
  ...settings,
});

type TodolistType = {
  id: string;
  addedDate: string;
  order: number;
  title: string;
};

type ResponseType<D> = {
  resultCode: number;
  messages: Array<string>;
  data: D;
};

export const todolistAPI = {
  getTodolist() {
    const promise = instance.get<Array<TodolistType>>(`todo-lists`);
    return promise;
  },
  createTodolist(title: string) {
    const promise = instance.post<ResponseType<{ item: TodolistType }>>(`todo-lists`, { title: title });
    return promise;
  },
  deleteTodolist(todolistId: string) {
    const promise = instance.delete<ResponseType<{}>>(`todo-lists/${todolistId}`);
    return promise;
  },
  updateTodolist(todolistId: string, title: string) {
    const promise = instance.put<ResponseType<{}>>(`/todo-lists/${todolistId}`, { title: title });
    return promise;
  },
};
