import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowAltCircleRight } from "@fortawesome/free-solid-svg-icons";

function Covid19Homepage(props) {
  return (
    <div
      className="card border-info mx-auto text-center bg-dark text-white shadow-lg rounded-pill"
      style={{ top: 100, width: 800, height: 400 }}
    >
      <div className="card-header font bg-info h4 text-white font-italic rounded-pill mx-auto w-75">
        Welcome to Covid19 Homepage!
      </div>
      <div className="card-body m-4">
        <h5 className="">Please select an appropriate option!</h5>
        <br />
        <div className="d-flex justify-content-around">
          <a
            href="/covid19/dailycases/"
            className="h5 font-weight-light bg-info mx-auto rounded-pill p-3 text-white shadow-lg"
          >
            Go to national daily cases page{" "}
            <FontAwesomeIcon icon={faArrowAltCircleRight} />
          </a>
          <a
            href="/covid19/states/"
            className="h5 font-weight-light bg-info mx-auto rounded-pill p-3 text-white shadow-lg"
          >
            Go to state-wise cases page{" "}
            <FontAwesomeIcon icon={faArrowAltCircleRight} />
          </a>
        </div>
        <div className="d-flex justify-content-around">
          <a
            href="/covid19/timeseries/"
            className="h5 font-weight-light bg-info mx-auto rounded-pill p-3 text-white shadow-lg"
          >
            Go to Covid19 timeseries page{" "}
            <FontAwesomeIcon icon={faArrowAltCircleRight} />
          </a>
          <a
            href="/covid19/stats/"
            className="h5 font-weight-light bg-info mx-auto rounded-pill p-3 text-white shadow-lg"
          >
            Go to Covid19 statistics page{" "}
            <FontAwesomeIcon icon={faArrowAltCircleRight} />
          </a>
        </div>
        <div className="d-flex justify-content-around">
          <a
            href="/covid19/prediction/"
            className="h5 font-weight-light bg-info mx-auto rounded-pill p-3 text-white shadow-lg"
          >
            Go to Covid19 prediction page{" "}
            <FontAwesomeIcon icon={faArrowAltCircleRight} />
          </a>
        </div>
      </div>

      <div className="card-footer text-muted font-italic small rounded-pill w-75 mx-auto">
        Last updated 3 mins ago
      </div>
    </div>
  );
}

export default Covid19Homepage;
