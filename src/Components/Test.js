import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowAltCircleRight,
  faLocationArrow,
  faArrowAltCircleLeft,
  faSyncAlt,
  faArrowAltCircleDown,
} from "@fortawesome/free-solid-svg-icons";
import {
  LineChart,
  AreaChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Area,
} from "recharts";

function Graphs(props) {
  const [cases, setCases] = useState(null);

  const url = "https://api.covid19india.org/data.json";

  useEffect(() => {
    axios.get(url).then((response) => {
      setCases(response.data);
    });
  }, [url]);

  var date = new Date();

  var todaySlash =
    (date.getDate() < 10 ? "0" + date.getDate() : date.getDate()) +
    "/" +
    (date.getMonth() + 1 < 10
      ? "0" + (date.getMonth() + 1)
      : date.getMonth() + 1) +
    "/" +
    date.getFullYear();

  var todayDash =
    date.getFullYear() +
    "-" +
    (date.getMonth() + 1 < 10
      ? "0" + (date.getMonth() + 1)
      : date.getMonth() + 1) +
    "-" +
    (date.getDate() < 10 ? "0" + date.getDate() : date.getDate());

  var yesterday =
    (date.getDate() - 1 < 10
      ? "0" + (date.getDate() - 1)
      : date.getDate() - 1) +
    "/" +
    (date.getMonth() + 1 < 10
      ? "0" + (date.getMonth() + 1)
      : date.getMonth() + 1) +
    "/" +
    date.getFullYear();

  if (cases) {
    var totalList = [];
    var deltaList = [];

    var i;
    for (
      i = cases.cases_time_series.length - 30;
      i < cases.cases_time_series.length;
      i++
    ) {
      totalList.push({
        date: cases.cases_time_series[i].date,
        "Total confirmed": Number(cases.cases_time_series[i].totalconfirmed),
        "Total recovered": Number(cases.cases_time_series[i].totalrecovered),
        "Total deceased": Number(cases.cases_time_series[i].totaldeceased),
      });

      deltaList.push({
        date: cases.cases_time_series[i].date,
        "Daily confirmed": Number(cases.cases_time_series[i].dailyconfirmed),
        "Daily recovered": Number(cases.cases_time_series[i].dailyrecovered),
        "Daily deceased": Number(cases.cases_time_series[i].dailydeceased),
      });
    }

    var testedList = [];

    for (i = 0; i < cases.tested.length; i++) {
      testedList.push({
        date: cases.cases_time_series[i + 40].date,
        "Total tested": Number(cases.tested[i].totalsamplestested),
        "Daily tested": Number(cases.tested[i].samplereportedtoday),
      });
    }

    console.log(cases.cases_time_series[43].date);

    return (
      <div>
        <br />
        <div className="h5">
          <FontAwesomeIcon icon={faLocationArrow} /> Welcome to the Covid19
          Graphs page!
        </div>
        <br />
        <div className="d-flex justify-content-around">
          <a
            href="/covid19/stats/"
            className="h6 font-weight-bold bg-info w-25 mx-auto rounded-pill p-3 shadow-lg"
            style={{ color: "inherit" }}
          >
            <FontAwesomeIcon icon={faArrowAltCircleLeft} /> Go back to Covid19
            statistics page{" "}
          </a>
          <a
            href="/covid19/graphs/"
            className="h6 font-weight-bold"
            style={{ color: "inherit" }}
          >
            <FontAwesomeIcon icon={faSyncAlt} className="App-logo" />
            <br />
            Refresh to get the latest graphs!
          </a>
          <a
            href="/covid19/timeseries/"
            className="h6 font-weight-bold bg-info w-25 mx-auto rounded-pill p-3 shadow-lg"
            style={{ color: "inherit" }}
          >
            Go to Covid19 timeseries page{" "}
            <FontAwesomeIcon icon={faArrowAltCircleRight} />
          </a>
        </div>
        <span className="h6 font-weight-bold" style={{ color: "inherit" }}>
          All graphs are based on the data till{" "}
          {cases.cases_time_series[cases.cases_time_series.length - 1].date}
          <br />
          Last updated:{" "}
          {cases.statewise[0].lastupdatedtime.split(" ")[0] === todaySlash
            ? "Today at " + cases.statewise[0].lastupdatedtime.split(" ")[1]
            : null}
          {cases.statewise[0].lastupdatedtime.split(" ")[0] !== todaySlash
            ? cases.statewise[0].lastupdatedtime.split(" ")[0] === yesterday
              ? "Yesterday at " +
                cases.statewise[0].lastupdatedtime.split(" ")[1]
              : cases.statewise[0].lastupdatedtime
            : null}
        </span>
        <br />
        <br />

        <span className="h6 rounded-pill bg-dark text-white p-2">
          Confirmed cases <FontAwesomeIcon icon={faArrowAltCircleDown} />
        </span>
        <br />
        <br />
        <br />

        <div className="d-flex justify-content-around">
          <div className="mx-auto">
            <AreaChart
              width={500}
              height={150}
              data={totalList}
              syncId="total"
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Area
                type="monotone"
                dataKey="Total confirmed"
                stroke="#8884d8"
                fill="#8884d8"
                activeDot={{ r: 8 }}
                dot={false}
              />
            </AreaChart>

            <AreaChart
              width={500}
              height={150}
              data={totalList}
              syncId="total"
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />

              <Area
                type="monotone"
                dataKey="Total recovered"
                stroke="green"
                fill="green"
                activeDot={{ r: 8 }}
                dot={false}
              />
            </AreaChart>

            <AreaChart
              width={500}
              height={150}
              data={totalList}
              syncId="total"
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />

              <Area
                type="monotone"
                dataKey="Total deceased"
                stroke="red"
                fill="red"
                activeDot={{ r: 8 }}
                dot={false}
              />
            </AreaChart>

            <AreaChart
              width={500}
              height={150}
              data={testedList}
              syncId="total"
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />

              <Area
                type="monotone"
                dataKey="Total tested"
                stroke="grey"
                fill="grey"
                activeDot={{ r: 8 }}
                dot={false}
              />
            </AreaChart>
          </div>

          <br />

          <div className="mx-auto">
            <LineChart
              width={800}
              height={300}
              data={deltaList}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="Daily confirmed"
                stroke="#8884d8"
                activeDot={{ r: 8 }}
                dot={false}
              />
              <Line
                type="monotone"
                dataKey="Daily recovered"
                stroke="green"
                activeDot={{ r: 8 }}
                dot={false}
              />
              <Line
                type="monotone"
                dataKey="Daily deceased"
                stroke="red"
                activeDot={{ r: 8 }}
                dot={false}
              />
            </LineChart>

            <LineChart
              width={800}
              height={300}
              data={testedList}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="Daily tested"
                stroke="grey"
                activeDot={{ r: 8 }}
                dot={false}
              />
            </LineChart>
          </div>
        </div>
        <br />
        <br />
      </div>
    );
  }

  return (
    <div>
      <br />
      <div className="h5">
        <FontAwesomeIcon icon={faLocationArrow} /> Welcome to the Covid19 Graphs
        page!
      </div>
      <br />
      <div className="d-flex justify-content-around">
        <a
          href="/covid19/stats/"
          className="h6 font-weight-bold bg-info w-25 mx-auto rounded-pill p-3 shadow-lg"
          style={{ color: "inherit" }}
        >
          <FontAwesomeIcon icon={faArrowAltCircleLeft} /> Go back to Covid19
          statistics page{" "}
        </a>
        <a
          href="/covid19/graphs/"
          className="h6 font-weight-bold"
          style={{ color: "inherit" }}
        >
          <FontAwesomeIcon icon={faSyncAlt} className="App-logo" />
          <br />
          Refresh to get the latest graphs!
        </a>
        <a
          href="/covid19/timeseries/"
          className="h6 font-weight-bold bg-info w-25 mx-auto rounded-pill p-3 shadow-lg"
          style={{ color: "inherit" }}
        >
          Go to Covid19 timeseries page{" "}
          <FontAwesomeIcon icon={faArrowAltCircleRight} />
        </a>
      </div>
      <br />
      <br />
      <br />
      <h3>Loading Covid19 graphs...</h3>
      <img
        src={require("./Covid19/infinityloader.gif")}
        alt="Loading table..."
      ></img>
    </div>
  );
}

export default Graphs;
