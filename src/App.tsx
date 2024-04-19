import AddTodoForm from "./AddTodoForm";
import TodoItem from "./TodoItem";

import React, { useState } from "react";
import { useTodoStore } from "./zustand/TodoStore";

export type Todo = {
  id: number;
  title: string;
  completed: boolean;
};

function App() {
  const { todos, loadTodos } = useTodoStore((state) => state);

  return (
    <div className='bg-slate-900 text-gray-100 min-h-screen'>
      <div className='container m-auto px-5 pt-5 '>
        <h1 className='text-center text-3xl'>TODO APP</h1>
        <AddTodoForm />
        <button className='bg-indigo-500 p-2 rounded-md' onClick={loadTodos}>
          Load Todos
        </button>
        <ul className='mt-5'>
          {todos.length < 1
            ? "No Todos"
            : todos.map((todo) => (
                <TodoItem key={todo.id} todo={todo}></TodoItem>
              ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
