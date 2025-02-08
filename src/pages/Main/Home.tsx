import { useEffect, useMemo, useState } from "react";
import { Dropdown, Filter, Menu, Search } from "../../assets/icons";
import DayHeader from "../../components/Main/Task/DayHeader";
import TaskList from "../../components/Main/Task/TaskList";
import { useTask } from "../../context/TaskContext";
import AddTask from "./AddTask";
import Calendar from "./Calendar";
import { checkDate } from "../../utils/format-date-time";

const Home = () => {
  const {
    openNewTask,
    tasks,
    setOpenNewTask,
    filterTasks,
    openCalendar,
    setOpenCalendar,
    filterByDate,
  } = useTask();
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  const checkTodayDate = useMemo(
    () => checkDate(selectedDate, new Date()),
    [selectedDate]
  );

  useEffect(() => {
    filterByDate(selectedDate);
  }, [selectedDate, tasks]);

  return (
    <>
      <div className="px-4 lg:w-6/12 mx-auto mt-3 grid grid-cols-3">
        <Menu className="text-3xl " />
        <div
          className="flex items-center gap-1 justify-center"
          onClick={() => setOpenCalendar(true)}
        >
          <h5 className="text-2xl font-semibold">
            {checkTodayDate
              ? "Today"
              : selectedDate.toLocaleString("default", {
                  month: "short",
                }) +
                "  " +
                selectedDate.getFullYear()}
          </h5>
          <Dropdown className="text-2xl" />
        </div>
        <div className="flex items-center ms-auto gap-3">
          <Filter className="text-2xl" />
          <Search className="text-3xl" />
        </div>
      </div>

      <DayHeader
        selectedDate={selectedDate}
        onChange={(date: Date) => setSelectedDate(date)}
      />

      <div
        className={`h-[67vh] px-4 overflow-y-auto border-b border-t border-border-color pb-6 ${
          openNewTask || openCalendar ? "bg-system-black" : "bg-bg-mute-color"
        }`}
      >
        <TaskList tasks={filterTasks} />
      </div>

      <div className="lg:w-6/12 mx-auto">
        <button
          onClick={() => setOpenNewTask(true)}
          className=" text-center mt-8 text-lg cursor-pointer text-primary-text w-full"
        >
          New Task
        </button>
      </div>

      <div
        className={`absolute bottom-0 w-full bg-white rounded-t-3xl transition-all duration-300 ease-in-out ${
          openNewTask || openCalendar ? "h-[93vh]" : "h-0"
        } overflow-hidden`}
      >
        {openNewTask && <AddTask />}
        {openCalendar && (
          <Calendar
            selectedDate={selectedDate}
            onChange={(date: Date) => setSelectedDate(date)}
          />
        )}
      </div>
    </>
  );
};

export default Home;
