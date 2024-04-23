import { useState } from "react";
import "./Colunm.css";
import Task from "./Task";
import { useStore } from "../store";

// eslint-disable-next-line react/prop-types
export default function Column({ state }) {
  const [text, setText] = useState("");
  const [open, setOpen] = useState(false);

  const tasks = useStore((store) =>
    store.tasks.filter((task) => task.state === state)
  );

  const addTask = useStore((store) => store.addTask);

  return (
    <div
      className='column'
      onDragOver={(e) => {
        e.preventDefault();
      }}
      onDrop={(e) => {
        console.log("Drop");
      }}
    >
      <div className='titleWrapper'>
        <p>{state}</p>
        <button
          onClick={() => {
            setOpen(true);
          }}
        >
          Add Task
        </button>
      </div>

      {tasks.map((task) => (
        <Task key={task.title} title={task.title} />
      ))}
      {open && (
        <div className='Modal'>
          <div className='modalContent'>
            <input onChange={(e) => setText(e.target.value)} value={text} />
            <button
              onClick={() => {
                addTask(text, state);
                setText("");
                setOpen(false);
              }}
            >
              Submit
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
