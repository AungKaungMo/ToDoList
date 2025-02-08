import { Battery, CellularConnection, Wifi } from "../../assets/icons";
import { useTask } from "../../context/TaskContext";
import DynamicClock from "./DynamicClock";

const Navbar = () => {
  const { openNewTask, openCalendar } = useTask();
  return (
    <div className={`flex lg:w-7/12 mx-auto justify-between items-center ${openNewTask || openCalendar ? 'text-base-white' : ''}`}>
      <DynamicClock />
      <div className="flex gap-2 items-center">
        <CellularConnection className="text-2xl" />
        <Wifi className="text-2xl" />
        <Battery className="text-2xl" />
      </div>
    </div>
  );
};

export default Navbar;
