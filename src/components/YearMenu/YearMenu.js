import React from "react";
import { useStateValue } from "../StateProvider";
import yearMenuStyles from "./YearMenu.module.css";

const YearMenu = () => {
  const [{ openModal }, dispatch] = useStateValue();

  const handleClick = (e) => {
    let selectedYear = e.target.textContent;
    // close the modal
    dispatch({
      type: "SET_OPEN_MODAL",
      openModal: !openModal,
    });
    // reset page number
    dispatch({
      type: "SET_PAGE_NUMBER",
      pageNumber: 0,
    });
    // user selected year
    dispatch({
      type: "SET_SELECT_YEAR",
      selectedYear: selectedYear,
    });
  };

  return (
    <div className={yearMenuStyles.years_container}>
      <p>Select a year</p>
      <div className={yearMenuStyles.years}>
        {[...Array(17).keys()]
          .map((_, i) => (
            <button key={i} onClick={handleClick}>
              {2000 + i}
            </button>
          ))
          .reverse()}
      </div>
    </div>
  );
};

export default YearMenu;
