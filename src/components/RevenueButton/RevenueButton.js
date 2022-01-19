import React from "react";
import revenueButtonStyles from "./RevenueButton.module.css";

const RevenueButton = ({ text = "button", onClick, active, disabled }) => {
  return (
    <button
      className={`${revenueButtonStyles.button} ${
        active ? revenueButtonStyles.active : ""
      }`}
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </button>
  );
};

export default RevenueButton;
