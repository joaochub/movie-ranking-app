import { useEffect } from "react";
import appStyles from "./App.module.css";
import TableMovies from "./components/TableMovies/TableMovies";
import RevenueButton from "./components/RevenueButton/RevenueButton";
import useQueryMovies from "./features/useQueryMovies";
import loadingIcon from "./assets/loading.svg";
import Modal from "./components/Modal/Modal";
import YearMenu from "./components/YearMenu/YearMenu";
import { useStateValue } from "./components/StateProvider";
import MovieDetails from "./components/MovieDetails/MovieDetails";

function App() {
  const sizeNumber = 10;

  const [
    {
      openModal,
      selectedTopTenRevenue,
      selectedYear,
      movieId,
      lastMovieVisible,
      pageNumber,
    },
    dispatch,
  ] = useStateValue();

  const { movies, movieDetails, hasMore, loading, error } = useQueryMovies(
    pageNumber,
    sizeNumber,
    selectedTopTenRevenue,
    selectedYear,
    movieId
  );

  const handleTopTenRevenue = () => {
    // toggle top 10 revenue button
    dispatch({
      type: "SET_TOP_TEN_REVENUE",
      selectedTopTenRevenue: !selectedTopTenRevenue,
    });
    // reset page number
    dispatch({
      type: "SET_PAGE_NUMBER",
      pageNumber: 0,
    });
    // reset selected year, if selected
    if (selectedYear) {
      dispatch({
        type: "SET_SELECT_YEAR",
        selectedYear: "",
      });
    }
  };

  const handleTopTenRevenueYear = () => {
    // open modal for the top 10 revenue per year
    dispatch({
      type: "SET_OPEN_MODAL",
      openModal: true,
    });
  };

  const onCloseMovieDetails = () => {
    // close modal of movie details
    dispatch({
      type: "SET_OPEN_MODAL",
      openModal: false,
    });
    // reset selected movie id
    dispatch({
      type: "SET_MOVIE_DETAILS",
      movieId: "",
    });
  };

  useEffect(() => {
    if (loading) return;
    if (lastMovieVisible && hasMore) {
      // Go to the next page on scroll down
      dispatch({
        type: "SET_PAGE_NUMBER",
        pageNumber: pageNumber + 1,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lastMovieVisible, hasMore, dispatch]);

  useEffect(() => {
    if (selectedYear && selectedTopTenRevenue) {
      // disable top 10 revenue selection, if selected
      dispatch({
        type: "SET_TOP_TEN_REVENUE",
        selectedTopTenRevenue: false,
      });
    }
  }, [selectedYear, selectedTopTenRevenue, dispatch]);

  return (
    <>
      <div className={appStyles.container}>
        <header></header>
        <main>
          <h1 className={appStyles.heading}>Movie ranking</h1>
          <div className={appStyles.revenue_button_container}>
            <RevenueButton
              text="Top 10 Revenue"
              onClick={handleTopTenRevenue}
              active={selectedTopTenRevenue}
              disabled={loading}
            />
            <RevenueButton
              text={
                selectedYear
                  ? `Top 10 Revenue ${selectedYear}`
                  : "Top 10 Revenue per Year"
              }
              onClick={handleTopTenRevenueYear}
              active={(openModal && !movieId) || !!selectedYear}
              disabled={loading}
            />
            {loading && (
              <div className={appStyles.loading}>
                <img src={loadingIcon} alt="loading" />
              </div>
            )}
            {error && (
              <div className={appStyles.status_container}>
                Error fetching data!
              </div>
            )}
            {!loading && !movies.length > 0 && (
              <div className={appStyles.status_container}>
                No movies available!
              </div>
            )}
          </div>
          {movies.length > 0 && <TableMovies movies={movies} />}
        </main>
      </div>
      {openModal && movieId ? (
        <Modal onClose={onCloseMovieDetails}>
          {movieDetails && <MovieDetails details={movieDetails} />}

          {loading && (
            <div className={`${appStyles.loading} ${appStyles.modal_loading}`}>
              <img src={loadingIcon} alt="loading" />
            </div>
          )}
        </Modal>
      ) : (
        openModal && (
          <Modal className={appStyles.top_ten_rev_year_modal}>
            <YearMenu />
          </Modal>
        )
      )}
    </>
  );
}

export default App;
