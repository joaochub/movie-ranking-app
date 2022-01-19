export const initialState = {
  openModal: false,
  selectedTopTenRevenue: false,
  selectedYear: "",
  movieId: "",
  lastMovieVisible: false,
  pageNumber: 0,
};

const selectionReducer = (state, action) => {
  switch (action.type) {
    case "SET_OPEN_MODAL":
      return {
        ...state,
        openModal: action.openModal,
      };
    case "SET_TOP_TEN_REVENUE":
      return {
        ...state,
        selectedTopTenRevenue: action.selectedTopTenRevenue,
      };
    case "SET_SELECT_YEAR":
      return {
        ...state,
        selectedYear: action.selectedYear,
      };
    case "SET_MOVIE_DETAILS":
      return {
        ...state,
        movieId: action.movieId,
      };
    case "SET_LAST_MOVIE_VISIBLE":
      return {
        ...state,
        lastMovieVisible: action.lastMovieVisible,
      };
    case "SET_PAGE_NUMBER":
      return {
        ...state,
        pageNumber: action.pageNumber,
      };

    default:
      return state;
  }
};

export default selectionReducer;
