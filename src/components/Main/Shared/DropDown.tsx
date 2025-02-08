import { useState } from "react";
import { DropDownPropsType } from "../../../types";

const Dropdown = ({ items, selected, onSelect, disabled = false, headerStyled = false }: DropDownPropsType) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="relative cursor-pointer">
      <span
        className={`${(selected === 'To Do' || selected === 'Not Start') ? 'text-base-white  px-4 bg-neutral-bg-active' : selected === 'Processing' ? 'text-base-white px-4 bg-primary-bg-strong' : selected === 'Completed' ? 'text-base-white px-4 bg-success-bg-strong' : ''}
          py-2 rounded-md ${headerStyled ? 'text-2xl' : ''}
          `}
        onClick={() => setIsOpen(!isOpen)}
      >
        {selected}
      </span>

      {(isOpen && !disabled) && (
        <div className="absolute top-full left-0 mt-1 bg-base-white border rounded-md shadow-lg z-10 max-h-48 overflow-y-auto">
          {items.map((item) => (
            <div
              key={item.value}
              onClick={() => {
                onSelect(item.value);
                setIsOpen(false);
              }}
              className="px-3 py-2 text-sm hover:bg-primary-bg-strong hover:text-base-white cursor-pointer"
            >
              {item.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;