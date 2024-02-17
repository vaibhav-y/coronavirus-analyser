import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowAltCircleLeft,
  faArrowCircleUp,
  faArrowAltCircleRight,
  faSyncAlt,
  faLink,
  faMouse,
  faLocationArrow,
  faArrowCircleDown,
  faSortAmountDown,
  faSortAmountDownAlt,
  faInfoCircle,
  faArrowAltCircleDown,
} from "@fortawesome/free-solid-svg-icons";
import orderBy from "lodash/orderBy";
import { PieChart, Pie, Legend, Tooltip } from "recharts";

function StateWise(props) {
  const [cases, setCases] = useState(null);
  const [order, setOrder] = useState("confirmed-desc");
  const url = "https://api.covid19india.org/data.json";

  useEffect(() => {
    axios.get(url).then((response) => {
      setCases(response.data);
    });
  }, [url]);

  //   console.log(document.getElementById("mytable"));

  var date = new Date();

  var today =
    (date.getDate() < 10 ? "0" + date.getDate() : date.getDate()) +
    "/" +
    (date.getMonth() + 1 < 10
      ? "0" + (date.getMonth() + 1)
      : date.getMonth() + 1) +
    "/" +
    date.getFullYear();

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

  var timeseriesYesterday =
    date.getFullYear() +
    "-" +
    (date.getMonth() + 1 < 10
      ? "0" + (date.getMonth() + 1)
      : date.getMonth() + 1) +
    "-" +
    (date.getDate() - 1 < 10 ? "0" + (date.getDate() - 1) : date.getDate() - 1);

  var timeseriesDayBeforeYesterday =
    date.getFullYear() +
    "-" +
    (date.getMonth() + 1 < 10
      ? "0" + (date.getMonth() + 1)
      : date.getMonth() + 1) +
    "-" +
    (date.getDate() - 2 < 10 ? "0" + (date.getDate() - 2) : date.getDate() - 2);

  if (cases) {
    function setSymbol(data, divClass) {
      if (data < 0)
        return (
          <div className={divClass}>
            <FontAwesomeIcon icon={faArrowCircleDown} /> {data}
          </div>
        );
      else if (data > 0)
        return (
          <div className={divClass}>
            <FontAwesomeIcon icon={faArrowCircleUp} /> {data}
          </div>
        );
    }

    function dateCompare(month, date) {
      var intMonth = new Date(Date.parse(month + " 1, 2020")).getMonth() + 1;
      var fullDate =
        (date < 10 ? "0" + date : date) +
        "/" +
        (intMonth < 10 ? "0" + intMonth : intMonth) +
        "/" +
        "2020";
      if (fullDate === today || fullDate === yesterday) return true;
      else return false;
    }

    var dataList = [];
    for (var i = 1; i < cases.statewise.length; i++) {
      dataList.push({
        key: cases.statewise[i].statecode,
        statecode: cases.statewise[i].statecode,
        name: cases.statewise[i].state,
        state: cases.statewise[i].state,
        confirmed: Number(cases.statewise[i].confirmed),
        deltaconfirmed: Number(cases.statewise[i].deltaconfirmed),
        active: Number(cases.statewise[i].active),
        recovered: Number(cases.statewise[i].recovered),
        deltarecovered: Number(cases.statewise[i].deltarecovered),
        recoveryrate: Number(
          (
            (cases.statewise[i].recovered / cases.statewise[i].confirmed) *
            100
          ).toFixed(2)
        ),
        deaths: Number(cases.statewise[i].deaths),
        deltadeaths: Number(cases.statewise[i].deltadeaths),
        mortalityrate: Number(
          (
            (cases.statewise[i].deaths / cases.statewise[i].confirmed) *
            100
          ).toFixed(2)
        ),
        lastupdatedtime: cases.statewise[i].lastupdatedtime,
        statenotes: cases.statewise[i].statenotes,
        statelink: "/covid19/states/" + cases.statewise[i].state + "/",
        rank: i,
      });
    }

    var changeOrder = { asc: "desc", desc: "asc" };
    var column;

    if (order.split("-")[1] === "desc") {
      column = order.split("-")[0];
      console.log(document.getElementById(column + "-order"));
      dataList = orderBy(dataList, [column], ["desc"]);
    }
    if (order.split("-")[1] === "asc") {
      column = order.split("-")[0];
      console.log(document.getElementById(column + "-order"));
      dataList = orderBy(dataList, [column], ["asc"]);
    }

    var count = 0;

    let tableGenerator = () => {
      return (
        <div>
          <table
            className="table table-dark mx-auto table-borderless table-striped table-hover table shadow-lg position-relative d overflow-auto"
            style={{ borderRadius: 20, width: "85%" }}
            id="mytable"
          >
            <thead>
              <tr>
                <th scope="col" style={{ width: "16%" }}>
                  <button
                    id="total"
                    className="bg-dark p-2 text-white font-weight-bold rounded-pill w-100"
                    disabled
                  >
                    Total
                  </button>
                </th>
                <th scope="col" style={{ width: "12%" }}>
                  <button
                    id="confirmed"
                    className="bg-dark p-2 text-white font-weight-bold rounded-pill w-100"
                    disabled
                  >
                    Confirmed
                  </button>
                </th>
                <th scope="col" style={{ width: "12%" }}>
                  <button
                    id="active"
                    className="bg-dark p-2 text-info font-weight-bold rounded-pill w-100"
                    disabled
                  >
                    Active
                  </button>
                </th>
                <th scope="col" style={{ width: "12%" }}>
                  <button
                    id="recovered"
                    className="bg-dark p-2 text-success font-weight-bold rounded-pill w-100"
                    disabled
                  >
                    Recovered
                  </button>
                </th>
                <th scope="col" style={{ width: "12%" }}>
                  <button
                    id="recoveryRate"
                    className="bg-dark p-2 text-success font-weight-bold rounded-pill w-100"
                    disabled
                  >
                    Recovery rate
                  </button>
                </th>
                <th scope="col" style={{ width: "12%" }}>
                  <button
                    id="deaths"
                    className="bg-dark p-2 text-danger font-weight-bold rounded-pill w-100"
                    disabled
                  >
                    Deceased
                  </button>
                </th>
                <th scope="col" style={{ width: "12%" }}>
                  <button
                    id="mortalityRate"
                    className="bg-dark p-2 text-danger font-weight-bold rounded-pill w-100"
                    disabled
                  >
                    Mortality rate
                  </button>
                </th>
                <th scope="col" style={{ width: "12%" }}>
                  <button
                    id="lastUpdated"
                    className="bg-dark p-2 text-white font-weight-bold rounded-pill w-100"
                    disabled
                  >
                    Last Updated
                  </button>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th
                  scope="row"
                  className="font-weight-light"
                  style={{ verticalAlign: "middle" }}
                >
                  <a href className="text-white">
                    India
                  </a>
                </th>

                <td style={{ verticalAlign: "middle" }}>
                  {setSymbol(cases.statewise[0].deltaconfirmed, "small")}
                  {cases.statewise[0].confirmed}
                </td>

                <td style={{ verticalAlign: "middle" }}>
                  {setSymbol(
                    cases.statewise[0].deltaconfirmed -
                      cases.statewise[0].deltarecovered -
                      cases.statewise[0].deltadeaths,
                    "small text-info"
                  )}
                  {cases.statewise[0].active}
                </td>

                <td style={{ verticalAlign: "middle" }}>
                  {setSymbol(
                    cases.statewise[0].deltarecovered,
                    "small text-success"
                  )}
                  {cases.statewise[0].recovered}
                </td>

                <td style={{ verticalAlign: "middle" }}>
                  {(
                    (cases.statewise[0].recovered /
                      cases.statewise[0].confirmed) *
                    100
                  ).toFixed(2)}{" "}
                  %
                </td>

                <td style={{ verticalAlign: "middle" }}>
                  {setSymbol(
                    cases.statewise[0].deltadeaths,
                    "small text-danger"
                  )}
                  {cases.statewise[0].deaths}
                </td>

                <td style={{ verticalAlign: "middle" }}>
                  {(
                    (cases.statewise[0].deaths / cases.statewise[0].confirmed) *
                    100
                  ).toFixed(2)}{" "}
                  %
                </td>

                <td style={{ verticalAlign: "middle" }}>
                  {cases.statewise[0].lastupdatedtime.split(" ")[0] === today
                    ? "Today at " +
                      cases.statewise[0].lastupdatedtime.split(" ")[1]
                    : null}
                  {cases.statewise[0].lastupdatedtime.split(" ")[0] !== today
                    ? cases.statewise[0].lastupdatedtime.split(" ")[0] ===
                      yesterday
                      ? "Yesterday at " +
                        cases.statewise[0].lastupdatedtime.split(" ")[1]
                      : cases.statewise[0].lastupdatedtime
                    : null}
                </td>
              </tr>
            </tbody>
          </table>

          <PieChart width={1200} height={330} className="mx-auto">
            <Pie
              data={dataList}
              dataKey="confirmed"
              cx={200}
              cy={150}
              innerRadius={50}
              outerRadius={100}
              paddingAngle={5}
              fill="#5bc0de"
            />
            <Pie
              data={dataList}
              dataKey="deltaconfirmed"
              cx={200}
              cy={150}
              innerRadius={110}
              outerRadius={130}
              paddingAngle={5}
              fill="#292b2c"
            />

            <Pie
              data={dataList}
              dataKey="recovered"
              cx={600}
              cy={150}
              innerRadius={50}
              outerRadius={100}
              paddingAngle={5}
              fill="#5cb85c"
            />
            <Pie
              data={dataList}
              dataKey="deltarecovered"
              cx={600}
              cy={150}
              innerRadius={110}
              outerRadius={130}
              paddingAngle={5}
              fill="#292b2c"
            />

            <Pie
              data={dataList}
              dataKey="deaths"
              cx={1000}
              cy={150}
              innerRadius={50}
              outerRadius={100}
              paddingAngle={5}
              fill="#d9534f"
            />
            <Pie
              data={dataList}
              dataKey="deltadeaths"
              cx={1000}
              cy={150}
              innerRadius={110}
              outerRadius={130}
              paddingAngle={5}
              fill="#292b2c"
            />
            <Tooltip />
          </PieChart>

          <div className="d-flex justify-content-around">
            <a
              href={"/covid19/timeseries/" + timeseriesDayBeforeYesterday + "/"}
              className="h6 font-weight-bold bg-warning mx-auto rounded-pill p-2 shadow-lg small text-dark"
              style={{ width: "12%" }}
            >
              <FontAwesomeIcon icon={faArrowAltCircleLeft} /> Day before
              yesterday
            </a>
            <span className="h6 font-weight-bold" style={{ color: "inherit" }}>
              <FontAwesomeIcon icon={faMouse} /> Click on any state name to go
              to district page of the state!
              <div className="small">
                (You can also click on any column name to sort by column)
              </div>
            </span>
            <a
              href={"/covid19/timeseries/" + timeseriesYesterday + "/"}
              className="h6 font-weight-bold bg-warning mx-auto rounded-pill p-2 shadow-lg small text-dark"
              style={{ width: "12%" }}
            >
              Yesterday <FontAwesomeIcon icon={faArrowAltCircleRight} />
            </a>
          </div>

          <br />
          <span className="h6 rounded-pill bg-dark text-white p-2">
            Select sorting type <FontAwesomeIcon icon={faArrowAltCircleDown} />
          </span>
          <br />
          <br />
          <div class="btn-group shadow-lg">
            <button type="button" class="btn text-info">
              Confirmed
            </button>
            <button type="button" class="btn btn-info">
              Active
            </button>
          </div>

          <br />
          <br />

          <table
            className="table table-dark mx-auto table-borderless table-striped table-hover table shadow-lg position-relative d-block overflow-auto"
            style={{ borderRadius: 20, width: "85%" }}
            id="mytable"
          >
            <thead>
              <tr>
                <th
                  scope="col"
                  className="bg-warning p-1 text-dark small font-weight-bold"
                  style={{ width: "2%" }}
                ></th>
                <th scope="col" style={{ width: "14%" }}>
                  <button
                    onClick={() =>
                      setOrder("state-" + changeOrder[order.split("-")[1]])
                    }
                    id="state/ut"
                    className="bg-dark p-2 text-white font-weight-bold rounded-pill w-100"
                  >
                    State/UT{" "}
                    {order.split("-")[0] === "state" &&
                    order.split("-")[1] === "desc" ? (
                      <FontAwesomeIcon
                        icon={faSortAmountDown}
                        className="small text-white"
                      />
                    ) : null}
                    {order.split("-")[0] === "state" &&
                    order.split("-")[1] === "asc" ? (
                      <FontAwesomeIcon
                        icon={faSortAmountDownAlt}
                        className="small text-white"
                      />
                    ) : null}
                  </button>
                </th>
                <th scope="col" style={{ width: "12%" }}>
                  <button
                    onClick={() =>
                      setOrder("confirmed-" + changeOrder[order.split("-")[1]])
                    }
                    id="confirmed"
                    className="bg-dark p-2 text-white font-weight-bold rounded-pill w-100"
                  >
                    Confirmed{" "}
                    {order.split("-")[0] === "confirmed" &&
                    order.split("-")[1] === "desc" ? (
                      <FontAwesomeIcon
                        icon={faSortAmountDown}
                        className="small text-white"
                      />
                    ) : null}
                    {order.split("-")[0] === "confirmed" &&
                    order.split("-")[1] === "asc" ? (
                      <FontAwesomeIcon
                        icon={faSortAmountDownAlt}
                        className="small text-white"
                      />
                    ) : null}
                  </button>
                </th>
                <th scope="col" style={{ width: "12%" }}>
                  <button
                    onClick={() =>
                      setOrder("active-" + changeOrder[order.split("-")[1]])
                    }
                    id="active"
                    className="bg-dark p-2 text-info font-weight-bold rounded-pill w-100"
                  >
                    Active{" "}
                    {order.split("-")[0] === "active" &&
                    order.split("-")[1] === "desc" ? (
                      <FontAwesomeIcon
                        icon={faSortAmountDown}
                        className="small text-white"
                      />
                    ) : null}
                    {order.split("-")[0] === "active" &&
                    order.split("-")[1] === "asc" ? (
                      <FontAwesomeIcon
                        icon={faSortAmountDownAlt}
                        className="small text-white"
                      />
                    ) : null}
                  </button>
                </th>
                <th scope="col" style={{ width: "12%" }}>
                  <button
                    onClick={() =>
                      setOrder("recovered-" + changeOrder[order.split("-")[1]])
                    }
                    id="recovered"
                    className="bg-dark p-2 text-success font-weight-bold rounded-pill w-100"
                  >
                    Recovered{" "}
                    {order.split("-")[0] === "recovered" &&
                    order.split("-")[1] === "desc" ? (
                      <FontAwesomeIcon
                        icon={faSortAmountDown}
                        className="small text-white"
                      />
                    ) : null}
                    {order.split("-")[0] === "recovered" &&
                    order.split("-")[1] === "asc" ? (
                      <FontAwesomeIcon
                        icon={faSortAmountDownAlt}
                        className="small text-white"
                      />
                    ) : null}
                  </button>
                </th>
                <th scope="col" style={{ width: "12%" }}>
                  <button
                    onClick={() =>
                      setOrder(
                        "recoveryrate-" + changeOrder[order.split("-")[1]]
                      )
                    }
                    id="recoveryrate"
                    className="bg-dark p-2 text-success font-weight-bold rounded-pill w-100"
                  >
                    Recovery rate{" "}
                    {order.split("-")[0] === "recoveryrate" &&
                    order.split("-")[1] === "desc" ? (
                      <FontAwesomeIcon
                        icon={faSortAmountDown}
                        className="small text-white"
                      />
                    ) : null}
                    {order.split("-")[0] === "recoveryrate" &&
                    order.split("-")[1] === "asc" ? (
                      <FontAwesomeIcon
                        icon={faSortAmountDownAlt}
                        className="small text-white"
                      />
                    ) : null}
                  </button>
                </th>
                <th scope="col" style={{ width: "12%" }}>
                  <button
                    onClick={() =>
                      setOrder("deaths-" + changeOrder[order.split("-")[1]])
                    }
                    id="deaths"
                    className="bg-dark p-2 text-danger font-weight-bold rounded-pill w-100"
                  >
                    Deceased{" "}
                    {order.split("-")[0] === "deaths" &&
                    order.split("-")[1] === "desc" ? (
                      <FontAwesomeIcon
                        icon={faSortAmountDown}
                        className="small text-white"
                      />
                    ) : null}
                    {order.split("-")[0] === "deaths" &&
                    order.split("-")[1] === "asc" ? (
                      <FontAwesomeIcon
                        icon={faSortAmountDownAlt}
                        className="small text-white"
                      />
                    ) : null}
                  </button>
                </th>
                <th scope="col" style={{ width: "12%" }}>
                  <button
                    onClick={() =>
                      setOrder(
                        "mortalityrate-" + changeOrder[order.split("-")[1]]
                      )
                    }
                    id="mortalityrate"
                    className="bg-dark p-2 text-danger font-weight-bold rounded-pill w-100"
                  >
                    Mortality rate{" "}
                    {order.split("-")[0] === "mortalityrate" &&
                    order.split("-")[1] === "desc" ? (
                      <FontAwesomeIcon
                        icon={faSortAmountDown}
                        className="small text-white"
                      />
                    ) : null}
                    {order.split("-")[0] === "mortalityrate" &&
                    order.split("-")[1] === "asc" ? (
                      <FontAwesomeIcon
                        icon={faSortAmountDownAlt}
                        className="small text-white"
                      />
                    ) : null}
                  </button>
                </th>
                <th scope="col" style={{ width: "12%" }}>
                  <button
                    // onClick={() =>
                    //   setOrder("recovered-" + changeOrder[order.split("-")[1]])
                    // }
                    id="lastUpdated"
                    className="bg-dark p-2 text-white font-weight-bold rounded-pill w-100"
                    disabled
                  >
                    Last Updated
                  </button>
                </th>
              </tr>
            </thead>
            <tbody>
              {dataList.map((data) => (
                <tr>
                  <th
                    className="bg-warning p-1 text-dark small font-weight-bold"
                    style={{ verticalAlign: "middle" }}
                  >
                    {(count += 1)}
                  </th>
                  <th
                    scope="row"
                    className="font-weight-light"
                    style={{ verticalAlign: "middle" }}
                  >
                    <a href={data.statelink} className="text-white">
                      {dateCompare(
                        data.statenotes
                          .split("]")[0]
                          .replace("[", "")
                          .split(" ")[0],
                        data.statenotes
                          .split("]")[0]
                          .replace("[", "")
                          .split(" ")[1]
                      ) ? (
                        <div className="badge badge-success">New statenote</div>
                      ) : null}
                      <br />
                      <FontAwesomeIcon icon={faLink} className="small" />{" "}
                      {data.state}
                    </a>{" "}
                    {data.statenotes !== "" ? (
                      <FontAwesomeIcon
                        type="button"
                        onClick={() =>
                          alert(
                            "Statenotes for " +
                              data.state +
                              ":\n\n" +
                              data.statenotes
                          )
                        }
                        icon={faInfoCircle}
                      />
                    ) : null}
                  </th>
                  <td style={{ verticalAlign: "middle" }}>
                    {setSymbol(data.deltaconfirmed, "small")}
                    {data.confirmed}
                  </td>
                  <td style={{ verticalAlign: "middle" }}>
                    {setSymbol(
                      data.deltaconfirmed -
                        data.deltarecovered -
                        data.deltadeaths,
                      "small text-info"
                    )}
                    {data.active}
                  </td>
                  <td style={{ verticalAlign: "middle" }}>
                    {setSymbol(data.deltarecovered, "small text-success")}
                    {data.recovered}
                  </td>
                  <td style={{ verticalAlign: "middle" }}>
                    {data.recoveryrate} %
                  </td>
                  <td style={{ verticalAlign: "middle" }}>
                    {setSymbol(data.deltadeaths, "small text-danger")}
                    {data.deaths}
                  </td>
                  <td style={{ verticalAlign: "middle" }}>
                    {data.mortalityrate} %
                  </td>
                  <td style={{ verticalAlign: "middle" }}>
                    {data.lastupdatedtime.split(" ")[0] === today
                      ? "Today at " + data.lastupdatedtime.split(" ")[1]
                      : null}
                    {data.lastupdatedtime.split(" ")[0] !== today
                      ? data.lastupdatedtime.split(" ")[0] === yesterday
                        ? "Yesterday at " + data.lastupdatedtime.split(" ")[1]
                        : data.lastupdatedtime
                      : null}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    };

    return (
      <div>
        <br />
        <div className="h5">
          <FontAwesomeIcon icon={faLocationArrow} /> Today's state-wise cases!
        </div>
        <br />
        <div className="d-flex justify-content-around">
          <a
            href="/covid19/dailycases/"
            className="h6 font-weight-bold bg-info w-25 mx-auto rounded-pill p-3 shadow-lg"
            style={{ color: "inherit" }}
          >
            <FontAwesomeIcon icon={faArrowAltCircleLeft} /> Go back to daily
            cases page{" "}
          </a>
          <a
            href="/covid19/states/"
            className="h6 font-weight-bold"
            style={{ color: "inherit" }}
          >
            <FontAwesomeIcon icon={faSyncAlt} className="App-logo" />
            <br />
            Refresh to get the latest update!
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
          Last updated:{" "}
          {cases.statewise[0].lastupdatedtime.split(" ")[0] === today
            ? "Today at " + cases.statewise[0].lastupdatedtime.split(" ")[1]
            : null}
          {cases.statewise[0].lastupdatedtime.split(" ")[0] !== today
            ? cases.statewise[0].lastupdatedtime.split(" ")[0] === yesterday
              ? "Yesterday at " +
                cases.statewise[0].lastupdatedtime.split(" ")[1]
              : cases.statewise[0].lastupdatedtime
            : null}
        </span>
        <br />
        <br />
        {tableGenerator()}
        <br />
        <br />

        {/* {console.log(document.getElementById("mytable"))} */}
      </div>
    );
  }

  return (
    <div>
      <br />
      <div className="h5">
        <FontAwesomeIcon icon={faLocationArrow} /> Today's state-wise cases!
      </div>
      <br />
      <div className="d-flex justify-content-around">
        <a
          href="/covid19/dailycases/"
          className="h6 font-weight-bold bg-info w-25 mx-auto rounded-pill p-3 shadow-lg"
          style={{ color: "inherit" }}
        >
          <FontAwesomeIcon icon={faArrowAltCircleLeft} /> Go back to daily cases
          page{" "}
        </a>
        <a
          href="/covid19/states/"
          className="h6 font-weight-bold"
          style={{ color: "inherit" }}
        >
          <FontAwesomeIcon icon={faSyncAlt} className="App-logo" />
          <br />
          Refresh to get the latest update!
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
      <h3>Loading state table...</h3>
      <img src={require("./infinityloader.gif")} alt="Loading table..."></img>
    </div>
  );
}

export default StateWise;
