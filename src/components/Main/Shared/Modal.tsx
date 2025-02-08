import { ModalPropsType } from "../../../types";
import { createPortal } from "react-dom";

const Modal = ({ isOpen, onClose, children }: ModalPropsType) => {
  if (!isOpen) return;
  return createPortal(
    <>
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/50 z-50 transition-all duration-200 ease-in-out"
      />
      <div className="fixed lg:w-6/12 mx-auto left-1/2 top-1/2 z-50 w-11/12 bg-base-white rounded-lg shadow-lg p-4 -translate-x-1/2 -translate-y-1/2">
        {children}
      </div>
    </>,
    document.body
  );
};

export default Modal;
