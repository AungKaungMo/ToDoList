import { Link } from "react-router-dom";
import {
  StatusButtonPropsType,
  TaskListPropsType,
  TaskType,
} from "../../../types";
import StatusButton from "./StatusButton";

const TaskList = ({ tasks }: TaskListPropsType) => {
  const checkStatusAndGetValue = (status: StatusButtonPropsType["status"]) => {
    if (status === "To Do") return "bg-neutral-bg-active";
    if (status === "Processing") return "bg-primary-bg-strong";
    if (status === "Completed") return "bg-success-bg-strong";
  };

  if (!tasks || tasks?.length === 0)
    return (
      <div className="text-center h-full flex-col flex items-center justify-center">
        No data record found.
      </div>
    );

  return (
    <div className="space-y-4 lg:w-6/12 mx-auto">
      {tasks.map((task: TaskType, index) => (
        <Link to={`/task/` + task.id} 
        key={index}>
          <div
            className="h-20 mt-4 rounded-md bg-base-white border border-border-color shadow-md overflow-hidden flex"
          >
            <div
              className={`p-1 h-full w-1 ${checkStatusAndGetValue(
                task.status
              )}`}
            />
            <div className="flex gap-2 ms-3 mt-3">
              <div
                className={`w-2 h-2 rotate-45 mt-2 ${checkStatusAndGetValue(
                  task.status
                )}`}
              />
              <div>
                <h5 className="text-lg">
                  {task.title?.length > 26
                    ? task.title?.substring(0, 26).concat("...")
                    : task.title}
                </h5>
                <p className="text-sm opacity-60">
                  {task.description?.length > 33
                    ? task.description?.substring(0, 33).concat("...")
                    : task.description}
                </p>
              </div>
            </div>
            <div className="flex flex-col items-center justify-center ms-auto me-3">
              <StatusButton status={task.status} onChange={() => {}} />
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default TaskList;
