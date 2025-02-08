import { useState, memo, useMemo } from "react";
import { DateTimePopupPropsType } from "../../../types";
import Modal from "../Shared/Modal";
import CalendarHeader from "./CalendarHeader";
import CalendarGrid from "./CalendarGrid";
import { formattedTime } from "../../../utils/format-date-time";

const DatePopup = memo(({
  isOpen,
  onClose,
  onSelect,
  chooseDate,
  value,
  onChange,
}: DateTimePopupPropsType) => {
  const [currentDate, setCurrentDate] = useState(chooseDate ?? new Date());
  const [tempDate, setTempDate] = useState<Date | null>(currentDate);
  const [tempTime, setTempTime] = useState(value);
  const [open, setOpen] = useState(false);

  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  const days = useMemo(() => {
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
    const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0);
    const startingDayIndex = firstDayOfMonth.getDay();

    const daysArray: (Date | null)[] = Array.from(
      { length: startingDayIndex },
      () => null
    );
    for (let day = 1; day <= lastDayOfMonth.getDate(); day++) {
      daysArray.push(new Date(currentYear, currentMonth, day));
    }
    return daysArray;
  }, [currentYear, currentMonth]); 

  const handleMonthChange = (monthIndex: number) => {
    setCurrentDate(new Date(currentYear, monthIndex, 1));
  };

  const handleYearChange = (year: number) => {
    setCurrentDate(new Date(year, currentMonth, 1));
  };

  const handleSelect = (date: Date | null) => {
    if (date) {
      setTempDate(date);
    }
  };

  const handleCancel = () => {
    setTempTime(value)
    onClose();
    setOpen(false)
  }

  const handleDone = () => {
    if(tempDate) {
      onSelect(tempDate)
      onChange(tempTime)
      onClose(); 
      setOpen(false)
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={() => {}}>
      <div className="space-y-4 " onClick={() => setOpen(false)}>
        <CalendarHeader
          currentDate={currentDate}
          onMonthChange={handleMonthChange}
          onYearChange={handleYearChange}
        />
        <CalendarGrid
          days={days}
          selectedDate={tempDate}
          onSelectDate={(date) => handleSelect(date)}
        />
      </div>

      <div onClick={() => setOpen(false)}>
        <div className="border-b border-border-color" />
        <div className="my-3 flex justify-between items-center">
          <h4>Start Time</h4>
          <div className="relative">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setOpen(!open); 
              }}
              className="p-2 rounded-md bg-primary-bg-active"
            >
              {formattedTime(tempTime)}
            </button>
            {open && (
              <div className="absolute right-0 mt-1 bg-base-white border rounded-md shadow-lg z-10 p-2">
                <input
                  type="time"
                  value={tempTime}
                  onChange={(e) => {
                    setTempTime(e.target.value);
                  }}
                  className="p-1 border rounded text-sm"
                  onClick={(e) => e.stopPropagation()}
                />
              </div>
            )}
          </div>
        </div>
        <div className="border-b border-border-color " />
      </div>

      <div className="my-3 flex justify-center gap-2">
          <button className="py-2 w-full bg-neutral-bg-active rounded-md" onClick={handleCancel}>
            Cancel
          </button>
          <button className="py-3 w-full bg-primary-bg-strong rounded-md text-base-white" onClick={handleDone}>
            Done
          </button>
      </div>
    </Modal>
  );
});

export default DatePopup;
