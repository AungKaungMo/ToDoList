import {memo} from "react";
import { DateTimeButtonPropsType } from "../../../types";

const DateTimeButton = memo(({ value, onClick }: DateTimeButtonPropsType) => (
  <button
    onClick={onClick}
    className="p-2 rounded-md cursor-pointer bg-primary-bg-active hover:bg-primary-bg-strong hover:text-base-white transition-colors"
  >
    {value}
  </button>
));

export default DateTimeButton