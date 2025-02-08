import { useMemo } from "react";
import { formattedDate, formattedTime } from "../utils/format-date-time";
import { TaskType } from "../types";

const useFormattedTaskDates = (task: TaskType) => {
    const formattedStartDate = useMemo(
        () => (task?.startDate ? formattedDate(new Date(task.startDate)) : ""),
        [task?.startDate]
      );
    
      const formattedStartTime = useMemo(
        () => (task?.startTime ? formattedTime(task.startTime) : ""),
        [task?.startTime]
      );
    
      const formattedEndDate = useMemo(
        () => (task?.endDate ? formattedDate(new Date(task.endDate)) : ""),
        [task?.endDate]
      );
    
      const formattedEndTime = useMemo(
        () => (task?.endTime ? formattedTime(task.endTime) : ""),
        [task?.endTime]
      );
    
  return { formattedStartDate, formattedStartTime, formattedEndDate, formattedEndTime };
};

export default useFormattedTaskDates;
