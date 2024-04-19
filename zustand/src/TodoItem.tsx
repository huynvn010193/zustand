import * as React from "react";
import { Todo } from "./App";
import { MdDelete } from "react-icons/md";
import { useTodoStore } from "./zustand/TodoStore";

export interface TodoItemProps {
  todo: Todo;
}

export default function App({ todo }: TodoItemProps) {
  const { toggleTodo, editTodo, removeTodo } = useTodoStore((state) => state);
  return (
    <li className='flex bg-slate-700 p-2 rounded-md align-middle justify-center mb-2'>
      <input
        type='checkbox'
        checked={todo.completed}
        readOnly
        className='mr-2'
        onClick={() => toggleTodo(todo.id)}
      />
      <input
        className={`flex-1 bg-transparent ${
          todo.completed ? "line-through" : ""
        }`}
        value={todo.title}
        onChange={(e) => editTodo(todo.id, e.target.value)}
      />
      <button onClick={() => removeTodo(todo.id)}>
        <MdDelete></MdDelete>
      </button>
    </li>
  );
}
