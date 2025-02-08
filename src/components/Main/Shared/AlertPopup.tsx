import { useEffect } from "react";
import { CheckCircle, CrossX, CrossXCircle } from "../../../assets/icons";
import { useAlert } from "../../../context/AlertContext";

const AlertPopup = ({ duration = 3000 }: { duration?: number }) => {
  const { message, type, isVisible, hideAlert } = useAlert();

  useEffect(() => {
    if (isVisible && duration > 0) {
      const timer = setTimeout(() => {
        hideAlert();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [isVisible, duration, hideAlert]);

  if (!isVisible) return null;

  const icons = {
    success: <CheckCircle className="h-5 w-5 text-green-500" />,
    error: <CrossXCircle className="h-5 w-5 text-red-500" />,
  };

  const backgrounds = {
    success: "bg-green-50 border-green-200",
    error: "bg-red-50 border-red-200",
  };

  return (
    <div className="fixed top-10 left-1/2 -translate-1/2 z-50 animate-in fade-in slide-in-from-top-4 duration-200">
      <div
        className={`flex items-center justify-between gap-3 px-4 py-3 rounded-lg border ${backgrounds[type]} shadow-lg min-w-[320px] max-w-[90vw]`}
      >
        <div className="flex items-center gap-2">
          {icons[type]}
          <p className="pt-1">{message}</p>
        </div>
        <button className="cursor-pointer" onClick={hideAlert}>
          <CrossX className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export default AlertPopup;
