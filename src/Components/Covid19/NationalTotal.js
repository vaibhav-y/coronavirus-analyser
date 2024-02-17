import React, { useState, useEffect } from "react";
import axios from "axios";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faSyncAlt } from "@fortawesome/free-solid-svg-icons";

function Total() {
  const [cases, setCases] = useState(null);
  const url = "https://api.covid19india.org/data.json";

  useEffect(() => {
    axios.get(url).then((response) => {
      setCases(response.data);
    });
  }, [url]);

  if (cases) {
    return (
      <div
        className="card border-warning mx-auto text-center shadow-lg bg-dark overflow-auto"
        style={{
          width: "30%",
          borderRadius: 50,
          height: 250,
        }}
      >
        <div
          className="card-header font bg-warning h5 font-italic mx-auto text-dark"
          style={{ borderRadius: 50, width: "90%" }}
        >
          Total cases
        </div>
        <br />
        <div className="h5 text-white">
          Total Confirmed: {cases.statewise[0].confirmed}
        </div>
        <div className="h5 text-info">
          Total Active: {cases.statewise[0].active}
        </div>
        <div className="h5 text-success">
          Total Recovered: {cases.statewise[0].recovered}
        </div>
        <div className="h5 text-danger">
          Total Deaths: {cases.statewise[0].deaths}
        </div>
        <div className="h5 text-white">
          Total tests:{" "}
          {cases.tested[cases.tested.length - 1].totalsamplestested}
        </div>
      </div>
    );
  }
  return (
    <div
      className="card border-warning mx-auto text-center bg-dark shadow-lg  overflow-auto"
      style={{ width: "30%", borderRadius: 50, height: 250 }}
    >
      <div
        className="card-header font bg-warning h5 font-italic mx-auto text-dark"
        style={{ borderRadius: 50, width: "90%" }}
      >
        Total cases
      </div>
      <br />
      <br />
      <div className="h5 text-white">
        Loading data...
        <br />
        <img
          src={require("./infinityloader.gif")}
          alt="Loading data..."
          height="60"
        ></img>
      </div>
    </div>
  );
}

export default Total;
