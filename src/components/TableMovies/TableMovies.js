import React, { useEffect, useRef } from "react";
import useOnScreen from "../../features/useOnScreen";
import MovieRow from "../MovieRow/MovieRow";
import { useStateValue } from "../StateProvider";
import tableMoviesStyles from "./TableMovies.module.css";

const TableMovies = ({ movies }) => {
  const tableRef = useRef();
  const lastElementRef = useRef();
  const onScreen = useOnScreen(lastElementRef, {
    root: tableRef.current,
    rootMargin: "0px",
    threshold: 0,
  });

  // eslint-disable-next-line no-unused-vars
  const [{ lastMovieVisible }, dispatch] = useStateValue();

  useEffect(() => {
    // when last the movie is visible in the table
    dispatch({
      type: "SET_LAST_MOVIE_VISIBLE",
      lastMovieVisible: onScreen,
    });
  }, [onScreen, dispatch]);

  return (
    <table ref={tableRef} className={tableMoviesStyles.mr_table}>
      <thead>
        <tr>
          <th>ranking</th>
          <th>title</th>
          <th>year</th>
          <th>revenue</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {movies.map((movie) => (
          <MovieRow key={movie?.id} movie={movie} />
        ))}
        <tr>
          <td style={{ padding: 0 }} ref={lastElementRef}></td>
        </tr>
      </tbody>
    </table>
  );
};

export default TableMovies;
