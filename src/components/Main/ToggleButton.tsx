import { memo } from "react";
import { NotificationPropsType } from "../../types";

const ToggleButton = memo(({isEnabled, setIsEnabled} : NotificationPropsType) => {
  return (
    <button
      onClick={setIsEnabled}
      className={`
      relative inline-flex h-8 w-15 items-center rounded-full 
      duration-300 ease-in-out cursor-pointer
      ${isEnabled ? "bg-blue-600" : "bg-gray-200"}
    `}
      type="button"
    >
      <span
        className={`
          inline-block h-7 w-7 transform rounded-full bg-white 
          transition-all duration-300 ease-in-out
          ${isEnabled ? "translate-x-7" : "translate-x-1"}
          shadow-sm
        `}
      />
    </button>
  );
});

export default ToggleButton;
