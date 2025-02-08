import { STATUS_OPTIONS } from "../../../assets/data";
import { StatusButtonPropsType } from "../../../types";
import Dropdown from "../Shared/DropDown";

const StatusButton = ({ status, onChange, addStage = false}: StatusButtonPropsType) => {
  return (
    <Dropdown
      items={STATUS_OPTIONS.map(option => ({ label: option, value: option }))}
      selected={status}
      disabled={addStage}
      onSelect={onChange}
    />
  );
};


export default StatusButton