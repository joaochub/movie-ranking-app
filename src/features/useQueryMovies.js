import { useEffect, useRef, useState } from "react";

function useQueryMovies(
  page = 0,
  size = "",
  queryByRevenue = false,
  queryByRevenueYear = "",
  movieId = ""
) {
  const [movies, setMovies] = useState([]);
  const [movieDetails, setMovieDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [hasMore, setHasMore] = useState(false);
  const sizeRef = useRef(size);

  const BASE_API_URL =
    "http://movie-challenge-api-xpand.azurewebsites.net/api/movies";

  const revenueSort = (a, b) => (a.revenue < b.revenue ? 1 : -1);

  // Reset Movies Array
  // Prevent a blank re-render when scrolling
  useEffect(() => {
    setMovies([]);
    setHasMore(false);
    // Remove or add the param size from the api endpoint, based on the buttons click
    if (queryByRevenue || queryByRevenueYear) {
      sizeRef.current = "";
    } else {
      sizeRef.current = size;
    }
  }, [queryByRevenue, queryByRevenueYear, size]);

  // Fetch Movies
  useEffect(() => {
    setLoading(true);
    setError(false);

    const endpoint = `${BASE_API_URL}?page=${page}${
      sizeRef.current && "&size=" + sizeRef.current
    }${
      queryByRevenueYear &&
      "&start=" + queryByRevenueYear + "&end=" + queryByRevenueYear
    }`;

    const apiOptions = {
      method: "GET",
      headers: {
        "Content-Type": "Aplication/json",
      },
    };

    const response = fetch(endpoint, apiOptions)
      .then((res) => res.json())
      .then((data) => {
        if (queryByRevenue || queryByRevenueYear) {
          setMovies(data.content.sort(revenueSort).slice(0, 10));
        } else {
          setMovies((prevMovies) => [...prevMovies, ...data.content]);
          setHasMore(data.content.length > 0);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.log("Error", error.message);
        setError(true);
        setLoading(false);
      });

    return response;
  }, [page, sizeRef, queryByRevenue, queryByRevenueYear]);

  // Fetch Movie Details
  useEffect(() => {
    setMovieDetails(null);
    // Prevent a new call when there is no movieId selected
    if (!movieId) return;
    setLoading(true);
    setError(false);

    const endpoint = `${BASE_API_URL}/${movieId}`;

    const apiOptions = {
      method: "GET",
      headers: {
        "Content-Type": "Aplication/json",
      },
    };

    const response = fetch(endpoint, apiOptions)
      .then((res) => res.json())
      .then((data) => {
        setMovieDetails(data);
        setLoading(false);
      })
      .catch((error) => {
        console.log("Error", error.message);
        setError(true);
        setLoading(false);
      });

    return response;
  }, [movieId]);

  return { movies, movieDetails, hasMore, loading, error };
}

export default useQueryMovies;
