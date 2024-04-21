import classNames from "classnames";
import "./Task.css";

const STATUS = "PLANNED";

// eslint-disable-next-line react/prop-types
export default function Task({ title }) {
  return (
    <div className="task">
      <div>{title}</div>
      <div className="bottomWrapper">
        <div></div>
        <div className={classNames("status", STATUS)}>{STATUS}</div>
      </div>
    </div>
  );
}
