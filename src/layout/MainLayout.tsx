import { Outlet } from "react-router-dom";
import Navbar from "../components/Auth/Navbar";
import { useTask } from "../context/TaskContext";

const MainLayout = () => {
  const { openNewTask, openCalendar } = useTask();
  return (
    <div className={openNewTask || openCalendar ? 'bg-black' : ''}>
      <div className="w-9/12 mx-auto py-5 ">
        <Navbar />
      </div>
      <Outlet />
    </div>
  );
};

export default MainLayout;
