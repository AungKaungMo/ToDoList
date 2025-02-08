import { createContext, useContext, useEffect, useState } from "react";
import { TaskContextType, TaskType } from "../types";
import { checkDate } from "../utils/format-date-time";

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider = ({ children }: { children: React.ReactNode }) => {
  const [openNewTask, setOpenNewTask] = useState(false);
  const [openCalendar, setOpenCalendar] = useState(false);
  const [tasks, setTasks] = useState<TaskType[]>([]);
  const [filterTasks, setFilterTasks] = useState<TaskType[]>([]);

  useEffect(() => {
    const saveTasks = localStorage.getItem("tasks");
    if (saveTasks && saveTasks.length > 0) {
      setTasks(JSON.parse(saveTasks));
      filterByDate(new Date())
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (task: TaskType) => {
    const newTasks = [...tasks, task];
    setTasks(newTasks);
  };

  const getTaskById = (id: string) => {
    const task = tasks?.find((task) => task.id === id);
    return task as TaskType;
  };

  const editTaskById = (id: string, updatedTask: TaskType) => {
    if (updatedTask && id) {
      setTasks((prevTask) =>
        prevTask.map((task) =>
          task.id === id ? { ...task, ...updatedTask } : task
        )
      );
    }
  };

  const deleteTaskById = (id: string) => {
    const filterTasks = tasks?.filter((task) => task.id !== id);
    setTasks(filterTasks);
    return filterTasks as TaskType[];
  };

  const filterByDate = (date: Date) => {
    const filtered = tasks.filter((task) => {
      return (
        checkDate(new Date(task.startDate), date) ||
        checkDate(new Date(task.endDate), date)
      );
    });
    setFilterTasks(filtered);
  };
  
  return (
    <TaskContext.Provider
      value={{
        openNewTask,
        setOpenNewTask,
        openCalendar,
        setOpenCalendar,
        tasks,
        setTasks,
        addTask,
        getTaskById,
        deleteTaskById,
        editTaskById,
        filterByDate,
        filterTasks, 
        setFilterTasks
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTask = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTask must be used within a TaskProvider");
  }
  return context;
};
