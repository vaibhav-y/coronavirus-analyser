import React, { useState, useEffect } from "react";
import axios from "axios";

function NationalPast1Day() {
  const [cases, setCases] = useState(null);
  const url = "https://api.covid19india.org/data.json";

  useEffect(() => {
    axios.get(url).then((response) => {
      setCases(response.data);
    });
  }, [url]);

  var date = new Date();
  var today = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
  var yesterday =
    date.getDate() - 1 < 10 ? "0" + (date.getDate() - 1) : date.getDate() - 1;

  if (cases) {
    var last1Day = Number(
      cases.cases_time_series[cases.cases_time_series.length - 1].date.split(
        " "
      )[0]
    );

    return (
      <div
        className="card border-info mx-auto text-center bg-dark shadow-lg overflow-auto"
        style={{ width: "20%", borderRadius: 50, height: 250 }}
      >
        <div
          className="card-header font bg-info h5 font-italic mx-auto"
          style={{ borderRadius: 50, width: "90%", color: "inherit" }}
        >
          {last1Day === today
            ? "Today"
            : last1Day === yesterday
            ? "Yesterday"
            : cases.cases_time_series[cases.cases_time_series.length - 1].date +
              " 2020"}
        </div>
        <br />
        <div className="h5 text-white">
          Confirmed:{" "}
          {
            cases.cases_time_series[cases.cases_time_series.length - 1]
              .dailyconfirmed
          }
        </div>
        <div className="h5 text-info">
          Active:{" "}
          {cases.cases_time_series[cases.cases_time_series.length - 1]
            .dailyconfirmed -
            cases.cases_time_series[cases.cases_time_series.length - 1]
              .dailyrecovered -
            cases.cases_time_series[cases.cases_time_series.length - 1]
              .dailydeceased}
        </div>
        <div className="h5 text-success">
          Recovered:{" "}
          {
            cases.cases_time_series[cases.cases_time_series.length - 1]
              .dailyrecovered
          }
        </div>
        <div className="h5 text-danger">
          Death:{" "}
          {
            cases.cases_time_series[cases.cases_time_series.length - 1]
              .dailydeceased
          }
        </div>
        <div className="h5 text-white">
          Tests: {cases.tested[cases.tested.length - 1].samplereportedtoday}
        </div>
      </div>
    );
  }
  return (
    <div
      className="card border-info mx-auto text-center bg-dark shadow-lg overflow-auto"
      style={{ width: "20%", borderRadius: 50, height: 250 }}
    >
      <div
        className="card-header font bg-info h5 font-italic mx-auto"
        style={{ borderRadius: 50, width: "90%", color: "inherit" }}
      >
        Past 1 Day:
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

export default NationalPast1Day;
