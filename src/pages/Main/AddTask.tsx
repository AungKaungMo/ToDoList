import { useCallback, useState } from "react";
// import CalendarPopup from "../../components/Main/CalendarPopup"
import ToggleButton from "../../components/Main/ToggleButton";
import { useTask } from "../../context/TaskContext";
import DateTimePopup from "../../components/Main/Calendar/DateTimePopup";
import StatusButton from "../../components/Main/Task/StatusButton";
import DateTimeButton from "../../components/Main/Task/DateTimeButton";
import TaskInput from "../../components/Main/Task/TaskInput";
import { StatusButtonPropsType, TaskType } from "../../types";
import { v4 as uuidv4 } from "uuid";
import useFormattedTaskDates from "../../hooks/useFormattedTaskDateTime";
import { useAlert } from "../../context/AlertContext";

const AddTask = () => {
  const { setOpenNewTask, addTask } = useTask();
  const [isStartDateTimeOpen, setIsStartDateTimeOpen] = useState(false);
  const [isEndDateTimeOpen, setIsEndDateTimeOpen] = useState(false);
  const [task, setTask] = useState<TaskType>({
    id: "",
    title: "",
    description: "",
    status: "To Do" as StatusButtonPropsType["status"],
    startDate: new Date(),
    endDate: new Date(),
    startTime: "09:00",
    endTime: "10:00",
    notification: false,
  });
  const {
    formattedStartDate,
    formattedEndDate,
    formattedStartTime,
    formattedEndTime,
  } = useFormattedTaskDates(task);

  const { showAlert } = useAlert();

  const handleChange = useCallback((key: keyof typeof task, value: any) => {
    setTask((prev) => ({ ...prev, [key]: value }));
  }, []);

  const addNewTask = useCallback(() => {
    if (!task.title && !task.description)
      return alert("Fill title and description to add task!");
    const data = { ...task, id: uuidv4() };
    addTask(data);
    showAlert("Successfully add task.");
    setOpenNewTask(false);
  }, [task, addTask, setOpenNewTask]);

  return (
    <div className="h-[93vh] overflow-hidden">
      {/* Header */}
      <div className=" mt-5 rounded-t-2xl pb-3 border-b border-border-color px-4">
        <div className="grid grid-cols-3 lg:w-6/12 mx-auto">
          <button
            className="text-primary-text me-auto text-lg"
            onClick={() => setOpenNewTask(false)}
          >
            Cancel
          </button>
          <h2 className="text-lg text-center">New Task</h2>
          <div className="w-1/12" />
        </div>
      </div>

      <div className="p-4 h-[75vh] overflow-y-auto bg-bg-mute-color space-y-6">
        {/* Task Input */}
        <div className="bg-base-white lg:w-6/12 mx-auto  p-3 shadow-md rounded-md space-y-4">
          <TaskInput
            placeholder="Title"
            value={task.title}
            onChange={(val) => handleChange("title", val)}
          />
          <TaskInput
            type="textarea"
            placeholder="Text"
            value={task.description}
            onChange={(val) => handleChange("description", val)}
          />
        </div>

        {/* Date & Time */}
        <div className="bg-base-white lg:w-6/12 mx-auto p-3 shadow-md rounded-md space-y-4">
          <div className="flex justify-between items-center">
            <h5>Starts</h5>
            <div className="flex gap-2">
              {task.startDate && (
                <DateTimeButton
                  value={formattedStartDate}
                  onClick={() => setIsStartDateTimeOpen(true)}
                />
              )}
              <DateTimeButton
                value={formattedStartTime}
                onClick={() => setIsStartDateTimeOpen(true)}
              />
            </div>
          </div>
          <div className="border-b border-border-color" />

          <div className="flex justify-between items-center ">
            <h5>Ends</h5>
            <div className="flex gap-2">
              <DateTimeButton
                value={formattedEndDate}
                onClick={() => setIsEndDateTimeOpen(true)}
              />
              <DateTimeButton
                value={formattedEndTime}
                onClick={() => setIsEndDateTimeOpen(true)}
              />
            </div>
          </div>
          <div className="border-b border-border-color" />

          <div className="flex justify-between items-center">
            <h5>Status</h5>
            <StatusButton
              addStage={true}
              status={"Not Start"}
              onChange={(val) => handleChange("status", val)}
            />
          </div>
        </div>

        {/* Notification */}
        <div className="bg-base-white lg:w-6/12 mx-auto  p-3 shadow-md rounded-md">
          <div className="flex justify-between items-center">
            <h5>Notification</h5>
            <ToggleButton
              isEnabled={task.notification}
              setIsEnabled={() =>
                handleChange("notification", !task.notification)
              }
            />
          </div>
        </div>
      </div>

      {/* Add Task Button */}
      <div className="lg:w-6/12 mx-auto">
        <button
          type="submit"
          className="w-full mt-8 text-lg text-primary-text"
          onClick={addNewTask}
        >
          Add Task
        </button>
      </div>

      {/* Start Date Time Modal */}
      <DateTimePopup
        value={task.startTime}
        onChange={(val) => handleChange("startTime", val)}
        isOpen={isStartDateTimeOpen}
        onClose={() => setIsStartDateTimeOpen(false)}
        onSelect={(date) => handleChange("startDate", date)}
      />

      {/* End Date Time Modal */}
      <DateTimePopup
        value={task.endTime}
        onChange={(val) => handleChange("endTime", val)}
        isOpen={isEndDateTimeOpen}
        onClose={() => setIsEndDateTimeOpen(false)}
        onSelect={(date) => handleChange("endDate", date)}
      />
    </div>
  );
};

export default AddTask;
