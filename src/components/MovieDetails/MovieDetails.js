import React from "react";
import LabelText from "../LabelText/LabelText";
import movieDetailsStyles from "./MovieDetails.module.css";

const MovieDetails = ({ details }) => {
  return (
    <div className={movieDetailsStyles.movie_details_wrapper}>
      <h2 className={movieDetailsStyles.movie_details_title}>
        {details?.title}
      </h2>
      <div className={movieDetailsStyles.movie_details_container}>
        <LabelText label="Year" text={details?.year} />
        <LabelText label="Genre" text={details?.genre} />
        <LabelText label="Description" text={details?.description} />
        <div className={movieDetailsStyles.movie_details_names_container}>
          <LabelText label="Director" text={details?.director} names />
          <LabelText label="Actors" text={details?.actors} names />
        </div>
        <LabelText label="Runtime" text={`${details?.runtime} mins`} />
        <LabelText label="Rating" text={details?.rating} />
        <LabelText label="Votes" text={details?.votes} />
        <LabelText
          label="Revenue"
          text={details?.revenue ? `$${details?.revenue}` : "----"}
        />
        <LabelText
          label="Metascore"
          text={details?.metascore ? `${details?.metascore}` : "----"}
        />
      </div>
    </div>
  );
};

export default MovieDetails;
