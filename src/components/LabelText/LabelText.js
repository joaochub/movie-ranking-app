import React from "react";
import labelTextStyles from "./LabelText.module.css";

const LabelText = ({ label, text, names }) => {
  return (
    <div>
      <p className={labelTextStyles.label}>{label}</p>
      <p
        className={`${labelTextStyles.text} ${
          names ? labelTextStyles.names : ""
        }`}
      >
        {text}
      </p>
    </div>
  );
};

export default LabelText;
