import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlusCircle,
  faMinusCircle,
  faDotCircle,
  faHandHoldingHeart,
  faRupeeSign,
  faHeart,
} from "@fortawesome/free-solid-svg-icons";

function Donation(props) {
  const [amount, setAmount] = useState(0);
  const [showMsg, setShowMsg] = useState(false);

  let msg;

  if (showMsg) {
    if (amount === 0) {
      msg = <h4>Don't be so kanjoos!</h4>;
    } else {
      msg = (
        <h4>
          Thankyou for donating <FontAwesomeIcon icon={faRupeeSign} /> {amount}!{" "}
          <FontAwesomeIcon icon={faHeart} />
        </h4>
      );
    }
  }

  return (
    <div
      className="card border-info mx-auto text-center bg-dark text-white shadow-lg rounded-pill"
      style={{ top: 100, width: 800, height: 400 }}
    >
      <div className="card-header font bg-info h4 text-white font-italic rounded-pill mx-auto w-75">
        Welcome to the Covid19 Donation window!
      </div>
      <div className="card-body">
        <h5 className="">Select donation amount for covid19!</h5>
        <button
          className="btn btn-success m-2 rounded-pill"
          style={{ width: 225 }}
          onClick={() => setAmount(amount + 10)}
        >
          <FontAwesomeIcon icon={faPlusCircle} /> 10
        </button>
        <button
          className="btn btn-success m-2 rounded-pill"
          style={{ width: 225 }}
          onClick={() => setAmount(amount + 100)}
        >
          <FontAwesomeIcon icon={faPlusCircle} /> 100
        </button>
        <button
          className="btn btn-success m-2 rounded-pill"
          style={{ width: 225 }}
          onClick={() => setAmount(amount + 1000)}
        >
          <FontAwesomeIcon icon={faPlusCircle} /> 1000
        </button>
        <button
          className="btn btn-danger m-2 rounded-pill"
          style={{ width: 225 }}
          onClick={() => (amount >= 10 ? setAmount(amount - 10) : null)}
        >
          <FontAwesomeIcon icon={faMinusCircle} /> 10
        </button>
        <button
          className="btn btn-danger m-2 rounded-pill"
          style={{ width: 225 }}
          onClick={() => (amount >= 100 ? setAmount(amount - 100) : null)}
        >
          <FontAwesomeIcon icon={faMinusCircle} /> 100
        </button>
        <button
          className="btn btn-danger m-2 rounded-pill"
          style={{ width: 225 }}
          onClick={() => (amount >= 1000 ? setAmount(amount - 1000) : null)}
        >
          <FontAwesomeIcon icon={faMinusCircle} /> 1000
        </button>
        <button
          className="btn btn-primary m-2 rounded-pill"
          style={{ width: 225 }}
          onClick={() => setAmount(0)}
        >
          <FontAwesomeIcon icon={faDotCircle} /> Reset
        </button>
        <button
          className="btn btn-primary m-2 rounded-pill"
          style={{ width: 225 }}
          onClick={() => setShowMsg(!showMsg)}
        >
          <FontAwesomeIcon icon={faHandHoldingHeart} /> Donate
        </button>
        <br />

        <h1>
          <FontAwesomeIcon icon={faRupeeSign} /> {amount}
        </h1>
        {msg}
      </div>

      <div className="card-footer text-muted font-italic small rounded-pill mx-auto w-75">
        Last updated 3 mins ago
      </div>
    </div>
  );
}

export default Donation;
