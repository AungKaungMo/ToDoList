import { MONTHS } from "../../../assets/data";
import { CalendarHeaderPropsType } from "../../../types";
import DropDown from "../Shared/DropDown";

const CalendarHeader = ({
  currentDate,
  onMonthChange,
  onYearChange,
}: CalendarHeaderPropsType) => {
  const currentYear = currentDate.getFullYear();
  
  //   GET THE YEARS BY SUBSTRACTING FROM CURRENT YEAR
  const years = Array.from({ length: 10 }, (_, i) => new Date().getFullYear() - 8 + i);

  return (
    <div className="text-lg font-semibold gap-2 flex items-center ">
      <DropDown
        items={MONTHS.map((month, index) => ({ label: month, value: index }))}
        selected={MONTHS[currentDate.getMonth()]}
        onSelect={(value) => onMonthChange(Number(value))}
      />
      <DropDown
        items={years.map((year) => ({ label: String(year), value: year }))}
        selected={String(currentYear)}
        onSelect={(value) => onYearChange(Number(value))}
      />
    </div>
  );
};

export default CalendarHeader;
