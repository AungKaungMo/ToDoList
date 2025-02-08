import { memo } from "react";
import { TaskInputPropsType } from "../../../types";

const TaskInput = memo(({ type = 'text', placeholder, value, onChange }: TaskInputPropsType) => {
  const commonProps = {
    className: "w-full outline-none border-b pb-2 border-border-color",
    placeholder,
    value,
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => onChange(e.target.value)
  };

  return type === 'textarea' ? (
    <textarea {...commonProps} className={`${commonProps.className} h-32 mt-3`} />
  ) : (
    <input {...commonProps} type="text" />
  );
});

export default TaskInput;