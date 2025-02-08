import { DAYS } from "../../../assets/data";
import { CalendarGridPropsType } from "../../../types";

const CalendarGrid = ({
  days,
  selectedDate,
  onSelectDate,
}: CalendarGridPropsType) => {
  const isSelected = (date: Date) =>
  selectedDate?.toDateString() === date?.toDateString();
  
  return (
    <div className="grid grid-cols-7 gap-5 mb-4">
      {DAYS.map((day) => (
        <div
          key={day}
          className="text-sm text-netural-text-weak text-center py-1"
        >
          {day}
        </div>
      ))}
      {days.map((date, index) => (
        <div key={index} className="aspect-square">
          {date ? (
            <button
              onClick={() => onSelectDate(date)}
              className={`w-full h-full flex items-center justify-center rounded-full pt-1 ${
                isSelected(date)
                  ? "bg-primary-bg-active text-primary-bg-strong"
                  : "hover:bg-primary-bg-active hover:text-primary-bg-strong"
              }`}
            >
              {date.getDate()}
            </button>
          ) : (
            <div className="w-full h-full" />
          )}
        </div>
      ))}
    </div>
  );
};

export default CalendarGrid;
