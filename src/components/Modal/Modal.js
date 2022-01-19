import React from "react";
import modalStyles from "./Modal.module.css";

const Modal = ({ children, onClose, className = "" }) => {
  return (
    <div className={`${modalStyles.modal} ${className}`}>
      <div className={modalStyles.modal_content}>
        {onClose && (
          <button className={modalStyles.close_btn} onClick={onClose}>
            <span>CLOSE</span>
          </button>
        )}
        {children}
      </div>
    </div>
  );
};

export default Modal;
