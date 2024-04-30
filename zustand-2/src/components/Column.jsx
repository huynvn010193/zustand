import { useState } from "react";
import "./Colunm.css";
import Task from "./Task";
import { useStore } from "../store";
import classNames from "classnames";

// eslint-disable-next-line react/prop-types
export default function Column({ state }) {
  const [text, setText] = useState("");
  const [open, setOpen] = useState(false);
  const [drop, setDrop] = useState(false);

  const tasks = useStore((store) =>
    store.tasks.filter((task) => task.state === state)
  );
  const addTask = useStore((store) => store.addTask);

  const setDraggedTask = useStore((store) => store.setDraggedTask);

  const draggedTask = useStore((store) => store.draggedTask);
  const moveStask = useStore((store) => store.moveStask);

  return (
    <div
      className={classNames("column", { drop })}
      onDragOver={(e) => {
        setDrop(true);
        e.preventDefault();
      }}
      onDragLeave={() => {
        setDrop(false);
      }}
      onDrop={(e) => {
        setDrop(false);
        moveStask(draggedTask, state);
        setDraggedTask(null);
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
