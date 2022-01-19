import React from "react";
import { useStateValue } from "../StateProvider";
import movieRowStyles from "./MovieRow.module.css";

const MovieRow = ({ movie }) => {
  const [{ openModal }, dispatch] = useStateValue();

  const handleClick = (id) => {
    // open the modal
    dispatch({
      type: "SET_OPEN_MODAL",
      openModal: !openModal,
    });
    // selected movie id
    dispatch({
      type: "SET_MOVIE_DETAILS",
      movieId: id,
    });
  };

  return (
    <tr className={movieRowStyles.mr_table__tr}>
      <td>{movie?.rank}</td>
      <td>{movie?.title}</td>
      <td>{movie?.year}</td>
      <td>{movie?.revenue ? `$${movie?.revenue}` : "----"}</td>
      <td>
        <button onClick={() => handleClick(movie?.id)}></button>
      </td>
    </tr>
  );
};

export default MovieRow;
