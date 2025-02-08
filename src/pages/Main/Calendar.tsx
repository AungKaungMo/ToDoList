import { useMemo, useState } from "react";
import { ArrowLeft } from "../../assets/icons";
import { useTask } from "../../context/TaskContext";
import Dropdown from "../../components/Main/Shared/DropDown";
import { CalendarPropsType } from "../../types";

const Calendar = ({ selectedDate, onChange }: CalendarPropsType) => {
  const [tempDate, setTempDate] = useState(selectedDate);
  const { setOpenCalendar } = useTask();
  const currentMonth = tempDate.getMonth();
  const currentYear = tempDate.getFullYear();

  //   GET THE YEARS BY SUBSTRACTING FROM CURRENT YEAR
  const years = useMemo(() => {
    return Array.from(
      { length: 10 },
      (_, i) => new Date().getFullYear() - 8 + i
    );
  }, []);

  const handleYearChange = (year: number) => {
    setTempDate(new Date(year, currentMonth, 1));
  };

  const isSelected = (date: Date) =>
    tempDate?.toDateString() === date?.toDateString();

  const getDaysInMonth = (year: number, month: number) => {
    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);
    const startingDayIndex = firstDayOfMonth.getDay();

    // Get null for prev month's day
    const days: (Date | null)[] = Array.from(
      { length: startingDayIndex },
      () => null
    );

    for (let day = 1; day <= lastDayOfMonth.getDate(); day++) {
      days.push(new Date(year, month, day));
    }
    return days;
  };

  const monthsToRender = useMemo(() => {
    return Array.from({ length: 12 }, (_, i) => {
      const monthDate = new Date(currentYear, i, 1);
      const days = getDaysInMonth(currentYear, i);
      return { monthDate, days };
    });
  }, [currentYear]);

  const handleDone = () => {
    onChange(tempDate);
    setOpenCalendar(false);
  };

  return (
    <div className="h-[93vh] overflow-hidden">
      {/* Header */}
      <div className="rounded-t-2xl pb-3 border-b-2 border-border-color px-4">
        <div className="lg:w-6/12 mx-auto grid grid-cols-3 mt-5 ">
          <ArrowLeft
            className="text-2xl cursor-pointer hover:opacity-70 transition-all duration-150"
            onClick={() => setOpenCalendar(false)}
          />

          <h2 className="text-xl font-semibold text-center">Select Date</h2>
          <button
            className="text-xl cursor-pointer ms-auto text-primary-bg-strong"
            onClick={handleDone}
          >
            Done
          </button>
        </div>
      </div>

      <div className="p-4 lg:w-6/12 mx-auto h-[76vh] overflow-y-auto ">
        <Dropdown
          items={years.map((year: number) => ({
            label: String(year),
            value: year,
          }))}
          selected={String(currentYear)}
          headerStyled={true}
          onSelect={(value) => handleYearChange(Number(value))}
        />

        {monthsToRender.map(({ monthDate, days }, index) => (
          <div className="mt-10 grid grid-cols-7 lg:gap-2 gap-5" key={index}>
            {days.map((date, subIndex) => (
              <div className="aspect-square relative" key={subIndex}>
                {date ? (
                  <>
                    {date.getDate() === 1 && (
                      <p className="absolute -top-8 left-0 right-0 text-center font-semibold text-lg">
                        {monthDate.toLocaleString("default", {
                          month: "short",
                        })}
                      </p>
                    )}
                    <button
                      onClick={() => setTempDate(date)}
                      className={`w-full h-full flex items-center justify-center rounded-full pt-1
                     ${
                       date.getDay() === 6 || date.getDay() === 0
                         ? "opacity-50"
                         : ""
                     } ${
                        isSelected(date)
                          ? "bg-primary-bg-strong text-base-white"
                          : "hover:bg-primary-bg-strong hover:text-base-white"
                      }
                 `}
                    >
                      {date.getDate()}
                    </button>
                  </>
                ) : (
                  <div className="w-full h-full" />
                )}
              </div>
            ))}
          </div>
        ))}
      </div>

      <div className="border-t-2 border-border-color " />
      <div className="lg:w-6/12 mx-auto">
        <button
          type="submit"
          className="w-full pt-5 text-lg text-primary-bg-strong"
          onClick={() => {
            onChange(new Date());
            setOpenCalendar(false);
          }}
        >
          Go to Today
        </button>
      </div>
    </div>
  );
};

export default Calendar;
