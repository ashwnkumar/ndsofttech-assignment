import React, { useEffect } from "react";
import Button from "./form/Button";
import { X } from "lucide-react";

const ModalComponent = ({
  title = "Modal Title",
  desc,
  isOpen,
  setIsOpen,
  children,
  message,
  buttons = [],
  onClose,
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => document.body.classList.remove("overflow-hidden");
  }, [isOpen]);

  if (!isOpen) return null;

  const closeModal = () => {
    setIsOpen(null);
    onClose?.();
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center min-h-screen p-4"
      // onClick={closeModal}
      style={{ zIndex: 9999 }}
    >
      <div
        className="bg-white rounded-xl w-full max-w-xl max-h-[90vh] flex flex-col px-5 py-3 m-3 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header*/}
        <div className="flex items-center justify-between w-full pb-2 sticky top-0 bg-light z-10">
          <div>
            <h2 className="text-xl font-medium">{title}</h2>
            {desc && <p className="font-normal">{desc}</p>}
          </div>
          <button
            type="button"
            onClick={closeModal}
            className="p-1 hover:bg-hover rounded-md cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>

        {/* Body*/}
        <div className="w-full flex-1 overflow-y-auto custom-scrollbar">
          {message ? message : children}
        </div>

        {/* Actions*/}
        {buttons.length > 0 && (
          <div className="flex items-center justify-end w-full gap-4 pt-2 sticky bottom-0 bg-light z-10">
            {buttons.map((button, index) => (
              <Button key={index} {...button} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ModalComponent;
