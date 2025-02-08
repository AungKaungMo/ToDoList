import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "../../assets/icons";
import Edit from "../../assets/icons/Edit";
import DateTimeButton from "../../components/Main/Task/DateTimeButton";
import StatusButton from "../../components/Main/Task/StatusButton";
import ToggleButton from "../../components/Main/ToggleButton";
import { useTask } from "../../context/TaskContext";
import { useCallback, useEffect, useState } from "react";
import { TaskType } from "../../types";
import DateTimePopup from "../../components/Main/Calendar/DateTimePopup";
import useFormattedTaskDates from "../../hooks/useFormattedTaskDateTime";
import { useAlert } from "../../context/AlertContext";

const Task = () => {
  const [task, setTask] = useState<TaskType | null>(null);
  const { getTaskById, tasks, editTaskById, deleteTaskById } = useTask();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const formattedTaskDates = useFormattedTaskDates(task ?? ({} as TaskType));
  const {
    formattedStartDate,
    formattedEndDate,
    formattedStartTime,
    formattedEndTime,
  } = formattedTaskDates;

  const [isEditable, setIsEditabled] = useState(false);
  const [isStartDateTimeOpen, setIsStartDateTimeOpen] = useState(false);
  const [isEndDateTimeOpen, setIsEndDateTimeOpen] = useState(false);
  const { showAlert } = useAlert();

  useEffect(() => {
    if (id && tasks.length > 0) setTask(getTaskById(id));
  }, [id, tasks]);

  const handleChange = useCallback((key: keyof TaskType, value: any) => {
    setTask((prev) => prev && { ...prev, [key]: value });
  }, []);

  const editTask = useCallback(() => {
    if (!task?.title || !task?.description)
      return showAlert("Fill title and description to add task!", "error");
    if (id && task) {
      editTaskById(id, task);
      showAlert("Successfully Updated task.");
      navigate("/home");
    }
  }, [task, id, editTaskById, navigate]);

  const deleteTask = useCallback(() => {
    if (id) {
      deleteTaskById(id);
      showAlert("Successfully delete task.");
      navigate("/home");
    }
  }, [id, deleteTaskById, navigate]);

  const handleTitleInput = useCallback(
    (e: React.FormEvent<HTMLTextAreaElement>) => {
      const target = e.currentTarget;
      target.style.height = "auto";
      target.style.height = `${target.scrollHeight}px`;
    },
    []
  );

  if (!task) {
    return (
      <div className="text-center h-[90vh] lg:w-6/12 mx-auto flex-col flex items-center justify-center">
        No data record found with that id.
      </div>
    );
  }

  return (
    <div className=" ">
      <div className="px-4  border-b border-border-color pb-4 ">
        <div className="grid grid-cols-3 lg:w-6/12 mx-auto ">
          <ArrowLeft
            className="text-2xl cursor-pointer hover:opacity-70 transition-all duration-150"
            onClick={() => navigate("/home")}
          />
          <h4 className="text-lg text-center">
            {isEditable ? "Edit Task" : "Task details"}
          </h4>
          {!isEditable && task.status !== "Completed" ? (
            <Edit
              onClick={() => setIsEditabled(true)}
              className="text-2xl cursor-pointer hover:opacity-70 transition-all duration-150 ms-auto"
            />
          ) : (
            <div />
          )}
        </div>
      </div>

      <div className="px-4 h-[75vh]  bg-bg-mute-color overflow-y-auto pb-6">
        <div className="py-3 lg:w-6/12 mx-auto">
          <textarea
            disabled={!isEditable}
            className="w-full outline-none h-9 font-semibold text-2xl"
            value={task.title}
            onChange={(e) => handleChange("title", e.target.value)}
            onInput={handleTitleInput}
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
                  onClick={() => isEditable && setIsStartDateTimeOpen(true)}
                />
              )}
              <DateTimeButton
                value={formattedStartTime}
                onClick={() => isEditable && setIsStartDateTimeOpen(true)}
              />
            </div>
          </div>
          <div className="border-b border-border-color" />

          <div className="flex justify-between items-center">
            <h5>Ends</h5>
            <div className="flex gap-2">
              <DateTimeButton
                value={formattedEndDate}
                onClick={() => isEditable && setIsEndDateTimeOpen(true)}
              />
              <DateTimeButton
                value={formattedEndTime}
                onClick={() => isEditable && setIsEndDateTimeOpen(true)}
              />
            </div>
          </div>
          <div className="border-b border-border-color" />

          <div className="flex justify-between items-center">
            <h5>Status</h5>
            <StatusButton
              addStage={!isEditable}
              status={task.status}
              onChange={(val) => isEditable && handleChange("status", val)}
            />
          </div>
          <div className="border-b border-border-color" />
        </div>

        {/* Notification */}
        <div className=" mt-4 bg-base-white lg:w-6/12 mx-auto p-3 shadow-md rounded-md">
          <div className="flex justify-between items-center">
            <h5>Notification</h5>
            <ToggleButton
              isEnabled={task.notification}
              setIsEnabled={() =>
                isEditable && handleChange("notification", !task.notification)
              }
            />
          </div>
        </div>

        {/* Description */}
        <div className="mt-4 bg-base-white lg:w-6/12 mx-auto p-3 shadow-md rounded-md ">
          <textarea
            disabled={!isEditable}
            className="w-full min-h-40 opacity-60 outline-none"
            value={task.description}
            onChange={(e) => handleChange("description", e.target.value)}
          ></textarea>
        </div>
      </div>

      {/* Delete Task Button */}
      <div className="lg:w-6/12 mx-auto">
        <button
          type="submit"
          className="w-full cursor-pointer mt-8 text-lg text-system-red"
          onClick={() => (isEditable ? editTask() : deleteTask())}
        >
          {isEditable ? "Update Task" : "Delete Task"}
        </button>
      </div>

      {/* Start Date Time Modal */}
      {isStartDateTimeOpen && (
        <DateTimePopup
          value={task.startTime}
          onChange={(val) => handleChange("startTime", val)}
          isOpen={isStartDateTimeOpen}
          chooseDate={task.startDate && new Date(task.startDate)}
          onClose={() => setIsStartDateTimeOpen(false)}
          onSelect={(date) => handleChange("startDate", date)}
        />
      )}

      {/* End Date Time Modal */}
      {isEndDateTimeOpen && (
        <DateTimePopup
          value={task.endTime}
          onChange={(val) => handleChange("endTime", val)}
          isOpen={isEndDateTimeOpen}
          chooseDate={task.endDate && new Date(task.endDate)}
          onClose={() => setIsEndDateTimeOpen(false)}
          onSelect={(date) => handleChange("endDate", date)}
        />
      )}
    </div>
  );
};

export default Task;
