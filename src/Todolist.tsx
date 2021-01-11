import React, { ChangeEvent } from "react";
import { AddItemForm } from "./AddItemForm";
import { FilterValuesType } from "./App";
import { EditableSpan } from "./EditableSpan";

export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};

type PropsType = {
  id: string;
  title: string;
  tasks: Array<TaskType>;
  removeTasks: (id: string, todolistId: string) => void;
  changeFilter: (value: FilterValuesType, todolistId: string) => void;
  addTask: (title: string, todolistId: string) => void;
  changeTaskStatus: (taskId: string, isDone: boolean, todolistId: string) => void;
  changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void;
  filter: FilterValuesType;
  removeTodolist: (todolistId: string) => void;
  changeTodolistTitle: (id: string, newTitle: string) => void;
};

export function Todolist(props: PropsType) {
  const onAllChangeFilter = () => props.changeFilter("all", props.id);
  const onActiveChangeFilter = () => props.changeFilter("active", props.id);
  const onCompletedChangeFilter = () => props.changeFilter("completed", props.id);

  const removeTodolist = () => {
    props.removeTodolist(props.id);
  };

  const changeTodolistTitle = (newTitle: string) => {
    props.changeTodolistTitle(props.id, newTitle);
  };

  function addTask(title: string) {
    props.addTask(title, props.id);
  }

  return (
    <div>
      <h3>
        <EditableSpan title={props.title} onChange={changeTodolistTitle} /> <button onClick={removeTodolist}>x</button>{" "}
      </h3>
      <AddItemForm addItem={addTask} />
      <ul>
        {props.tasks.map((t) => {
          const onRemoveHandler = () => props.removeTasks(t.id, props.id);
          const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
            props.changeTaskStatus(t.id, e.currentTarget.checked, props.id);
          };
          const onChangeTitleHandler = (newValue: string) => {
            props.changeTaskTitle(t.id, newValue, props.id);
          };

          return (
            <li key={t.id} className={t.isDone ? "is-done" : ""}>
              <input type="checkbox" onChange={onChangeStatusHandler} checked={t.isDone} />
              <EditableSpan title={t.title} onChange={onChangeTitleHandler} />
              <button onClick={onRemoveHandler}>x</button>
            </li>
          );
        })}
      </ul>
      <div>
        <button className={props.filter === "all" ? "active-filter" : ""} onClick={onAllChangeFilter}>
          All
        </button>
        <button className={props.filter === "active" ? "active-filter" : ""} onClick={onActiveChangeFilter}>
          Active
        </button>
        <button className={props.filter === "completed" ? "active-filter" : ""} onClick={onCompletedChangeFilter}>
          Completed
        </button>
      </div>
    </div>
  );
}
