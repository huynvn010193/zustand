import React, { useState } from "react";
import { useTodoStore } from "./zustand/TodoStore";

export interface AddTodoFormProps {
  onAdd: (todo_text: string) => void;
}

export default function AddTodoForm() {
  const [value, setValue] = useState("");
  const { addTodo, todos } = useTodoStore((state) => state);

  const handleSubmit = (e) => {
    e.preventDefault();
    addTodo({
      id: todos.length + 1,
      title: value,
      completed: false,
    });
    setValue("");
  };

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className='flex gap-3 justify-center mt-5'>
        <input
          type='text'
          value={value}
          onChange={handleChange}
          className='rounded-md text-black text-xl pl-2'
        ></input>
        <button className='bg-indigo-500 p-2 rounded-md' type='submit'>
          Add Todo
        </button>
      </div>
    </form>
  );
}
