import { create } from "zustand";
import { devtools, persist, subscribeWithSelector } from "zustand/middleware";
import produce from "immer";

const store = (set) => ({
  tasks: [],
  draggedTask: null,
  tasksInOngoing: 0,
  addTask: (title, state) =>
    set(
      // (store) => ({ tasks: [...store.tasks, { title, state }] }),
      produce((store) => {
        store.tasks.push({ title, state });
      }),
      false,
      "addTask"
    ),
  deleteTask: (title) =>
    set((store) => ({
      tasks: store.tasks.filter((task) => task.title !== title),
    })),
  setDraggedTask: (title) => set({ draggedTask: title }),
  moveStask: (title, state) =>
    set((store) => ({
      tasks: store.tasks.map((task) =>
        task.title === title ? { title, state } : task
      ),
    })),
});

const log = (config) => (set, get, api) =>
  config(
    (...args) => {
      console.log("args", args);
      set(...args);
    },
    get,
    api
  );

export const useStore = create(
  subscribeWithSelector(log(persist(devtools(store), { name: "store" })))
);

useStore.subscribe(
  (store) => store.tasks,
  (newTasks, prevTasks) => {
    useStore.setState({
      tasksInOngoing: newTasks.filter((task) => task.state === "ONGOING")
        .length,
    });
  }
);
