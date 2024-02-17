import React, { useState, useEffect } from "react";
import axios from "axios";

function NationalToday() {
  const [cases, setCases] = useState(null);
  const url = "https://api.covid19india.org/data.json";

  useEffect(() => {
    axios.get(url).then((response) => {
      setCases(response.data);
    });
  }, [url]);

  var date = new Date();

  var todayDash =
    date.getFullYear() +
    "-" +
    (date.getMonth() + 1 < 10
      ? "0" + (date.getMonth() + 1)
      : date.getMonth() + 1) +
    "-" +
    (date.getDate() < 10 ? "0" + date.getDate() : date.getDate());

  if (cases) {
    var casesLastMonth =
      new Date(
        Date.parse(
          cases.cases_time_series[
            cases.cases_time_series.length - 1
          ].date.split(" ")[1] + " 1, 2020"
        )
      ).getMonth() + 1;

    var casesLastDate = cases.cases_time_series[
      cases.cases_time_series.length - 1
    ].date.split(" ")[0];

    var casesLastTime =
      "2020-" +
      (casesLastMonth < 10 ? "0" + casesLastMonth : casesLastMonth) +
      "-" +
      (Number(casesLastDate) + 1 < 10
        ? "0" + (Number(casesLastDate) + 1)
        : Number(casesLastDate) + 1);

    var todayDiff = (
      (new Date(todayDash).getTime() -
        new Date("2020-" + casesLastMonth + "-" + casesLastDate).getTime()) /
      (1000 * 3600 * 24)
    ).toFixed(0);

    return (
      <div
        className="card border-info mx-auto text-center bg-dark shadow-lg overflow-auto"
        style={{ width: "20%", borderRadius: 50, height: 250 }}
      >
        <div
          className="card-header font bg-info h5 font-italic mx-auto"
          style={{ borderRadius: 50, width: "90%", color: "inherit" }}
        >
          {todayDiff == 2 ? "Yesterday" : "Today"}
        </div>
        <br />
        <div className="h5 text-white">
          Confirmed: {cases.statewise[0].deltaconfirmed}
        </div>
        <div className="h5 text-info">
          Active:{" "}
          {cases.statewise[0].deltaconfirmed -
            cases.statewise[0].deltarecovered -
            cases.statewise[0].deltadeaths}
        </div>
        <div className="h5 text-success">
          Recovered: {cases.statewise[0].deltarecovered}
        </div>
        <div className="h5 text-danger">
          Death: {cases.statewise[0].deltadeaths}
        </div>
        <div className="h5 text-white">Tests: Counting...</div>
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
        Today
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

export default NationalToday;
