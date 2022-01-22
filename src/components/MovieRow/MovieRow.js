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
      <td data-label="ranking">{movie?.rank}</td>
      <td data-label="title">{movie?.title}</td>
      <td data-label="year">{movie?.year}</td>
      <td data-label="revenue">
        {movie?.revenue ? `$${movie?.revenue}` : "----"}
      </td>
      <td>
        <button onClick={() => handleClick(movie?.id)}></button>
      </td>
    </tr>
  );
};

export default MovieRow;
