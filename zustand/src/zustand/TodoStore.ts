import { create } from "zustand";
import { Todo } from "../App";
import { devtools, persist } from "zustand/middleware";

interface TodoStote {
  todos: Todo[] | [];
  addTodo: (todo: Todo) => void;
  loadTodos: () => Promise<void>;
  removeTodo: (id: number) => void;
  toggleTodo: (id: number) => void;
  editTodo: (id: number, title: string) => void;
}

export const useTodoStore = create<TodoStote>()(
  devtools(
    persist(
      (set) => ({
        todos: [],
        loadTodos: async () => {
          const response = await fetch(
            "https://jsonplaceholder.typicode.com/todos"
          );
          const data: Todo[] = await response.json();
          set({ todos: data });
        },
        addTodo: (todo) => set((state) => ({ todos: [...state.todos, todo] })),
        removeTodo: (id) =>
          set((state) => ({
            todos: state.todos.filter((todo) => todo.id !== id),
          })),
        toggleTodo: (id) =>
          set((state) => ({
            todos: state.todos.map((todo) =>
              todo.id === id ? { ...todo, completed: !todo.completed } : todo
            ),
          })),
        editTodo: (id, title) =>
          set((state) => ({
            todos: state.todos.map((todo) =>
              todo.id === id ? { ...todo, title } : todo
            ),
          })),
      }),
      { name: "todos" }
    )
  )
);
