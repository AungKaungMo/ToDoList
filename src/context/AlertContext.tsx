import { createContext, useCallback, useContext, useState } from "react";
import { AlertContextPropsType, AlertType } from "../types";

const AlertContext = createContext<AlertContextPropsType | undefined>(
  undefined
);

export const AlertProvider = ({ children }: { children: React.ReactNode }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [message, setMessage] = useState("");
  const [type, setType] = useState<AlertType>("success");

  const showAlert = useCallback(
    (message: string, type: AlertType = "success") => {
      setMessage(message);
      setType(type);
      setIsVisible(true);
    },
    []
  );

  const hideAlert = useCallback(() => {
    setIsVisible(false);
  }, []);

  return (
    <AlertContext.Provider
      value={{
        showAlert,
        hideAlert,
        message,
        type,
        isVisible,
      }}
    >
      {children}
    </AlertContext.Provider>
  );
};

export const useAlert = () => {
  const context = useContext(AlertContext);
  if (context === undefined) {
    throw new Error("useAlert must be used within an AlertProvider");
  }
  return context;
};
