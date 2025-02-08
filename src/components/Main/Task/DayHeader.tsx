import { useMemo } from "react";
import { DAYS } from "../../../assets/data";
import { DayHeaderPropsType } from "../../../types";

const DayHeader = ({selectedDate, onChange} : DayHeaderPropsType) => {
  const selectedDayIndex = selectedDate.getDay();

  const getShowDate = useMemo(() => {
    return DAYS.map((_, index) => {
      const dayOffset = index - selectedDayIndex;
      const dateToShow = new Date(
        selectedDate.getFullYear(),
        selectedDate.getMonth(),
        selectedDate.getDate() + dayOffset // Use getDate() here, not getDay()
      );
      return dateToShow;
    });
  }, [selectedDate]);

  return (
    <div className="mt-3 lg:w-6/12 mx-auto px-3 grid grid-cols-7  border-b border-border-color transition-all delay-150 pb-3">
      {DAYS.map((day, index) => (
        <div
          key={day}
          className={`text-center flex flex-col items-center justify-center gap-2 ${
            day === "SUN" || day === "SAT" ? "opacity-50" : ""
          }`}
        >
          <p className="text-sm">{day}</p>
          <button
            onClick={() => onChange(getShowDate[index])}
            className={`w-10 h-10 rounded-full cursor-pointer flex justify-center items-center pt-1
            ${
              getShowDate[index]?.toDateString() === selectedDate.toDateString()
                ? "text-base-white bg-primary-bg-strong"
                : ""
            } `}
          >
            {getShowDate[index]?.getDate()}
          </button>
        </div>
      ))}
    </div>
  );
};

export default DayHeader;
