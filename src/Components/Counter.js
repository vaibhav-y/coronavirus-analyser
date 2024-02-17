import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlusCircle,
  faMinusCircle,
  faDotCircle,
} from "@fortawesome/free-solid-svg-icons";

function CounterExample(props) {
  const [count, setCount] = useState(0);

  return (
    <div
      className="card border-info mx-auto text-center bg-dark text-white shadow-lg rounded-pill"
      style={{ top: 100, width: 800, height: 400 }}
    >
      <div className="card-header font bg-info h4 text-white font-italic rounded-pill mx-auto w-75">
        Welcome to the Counter game!
      </div>
      <div className="card-body m-4">
        <h5 className="">Play around with this counter app!</h5>
        <br />
        <button
          className="btn btn-success m-2 rounded-pill"
          style={{ width: 225 }}
          onClick={() => setCount(count + 1)}
        >
          Plus
          <br />
          <FontAwesomeIcon icon={faPlusCircle} />
        </button>
        <button
          className="btn btn-danger rounded-pill"
          style={{ width: 225 }}
          onClick={() => (count > 0 ? setCount(count - 1) : setCount(0))}
        >
          Minus
          <br />
          <FontAwesomeIcon icon={faMinusCircle} />
        </button>
        <button
          className="btn btn-primary m-2 rounded-pill"
          style={{ width: 225 }}
          onClick={() => setCount(0)}
        >
          Reset
          <br />
          <FontAwesomeIcon icon={faDotCircle} />
        </button>
        <span className="display-3">{count}</span>
      </div>

      <div className="card-footer text-muted font-italic small rounded-pill w-75 mx-auto">
        Last updated 3 mins ago
      </div>
    </div>
  );
}

export default CounterExample;
