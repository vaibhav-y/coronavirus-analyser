import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowAltCircleRight,
  faLocationArrow,
  faArrowAltCircleLeft,
  faArrowCircleUp,
  faSyncAlt,
  faSquare,
  faArrowCircleDown,
  faSortAmountDown,
  faSortAmountDownAlt,
  faMouse,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { useParams } from "react-router-dom";
import orderBy from "lodash/orderBy";
import {
  LineChart,
  AreaChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Area,
} from "recharts";

function DistrictWise(props) {
  const [stateCases, setStateCases] = useState(null);
  const [order, setOrder] = useState("confirmed-desc");
  // const [zones, setZones] = useState(null);
  const url = "https://api.covid19india.org/state_district_wise.json";
  // const zoneUrl = "https://api.covid19india.org/zones.json";

  const { statename } = useParams();

  useEffect(() => {
    axios.get(url).then((response) => {
      setStateCases(response.data);
    });
  }, [url]);

  // useEffect(() => {
  //   axios.get(zoneUrl).then((response) => {
  //     setZones(response.data);
  //   });
  // }, [zoneUrl]);

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

  const statelink = "/covid19/states/" + statename + "/";

  //   if (stateCases && zones) {
  if (stateCases) {
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

    var districtNames = [];
    for (var name in stateCases[statename].districtData) {
      districtNames.push(name);
    }

    var stateDataList = [];
    for (var i = 0; i < districtNames.length; i++) {
      //   for (var j = 0; j < zones.zones.length; j++) {
      stateDataList.push({
        key: stateCases[statename].statecode,
        statecode: stateCases[statename].statecode,
        name: districtNames[i],
        district: districtNames[i],
        confirmed: Number(
          stateCases[statename].districtData[districtNames[i]].confirmed
        ),
        deltaconfirmed: Number(
          stateCases[statename].districtData[districtNames[i]].delta.confirmed
        ),
        active: Number(
          stateCases[statename].districtData[districtNames[i]].active
        ),
        recovered: Number(
          stateCases[statename].districtData[districtNames[i]].recovered
        ),
        deltarecovered: Number(
          stateCases[statename].districtData[districtNames[i]].delta.recovered
        ),
        recoveryrate: Number(
          (
            (stateCases[statename].districtData[districtNames[i]].recovered /
              stateCases[statename].districtData[districtNames[i]].confirmed) *
            100
          ).toFixed(2)
        ),
        deaths: Number(
          stateCases[statename].districtData[districtNames[i]].deceased
        ),
        deltadeaths: Number(
          stateCases[statename].districtData[districtNames[i]].delta.deceased
        ),
        mortalityrate: Number(
          (
            (stateCases[statename].districtData[districtNames[i]].deceased /
              stateCases[statename].districtData[districtNames[i]].confirmed) *
            100
          ).toFixed(2)
        ),
        // lastupdatedtime: cases.statewise[i].lastupdatedtime,
        districtNotes:
          stateCases[statename].districtData[districtNames[i]].notes,
      });
      //   }
    }

    var changeOrder = { asc: "desc", desc: "asc" };
    var column;

    if (order.split("-")[1] === "desc") {
      column = order.split("-")[0];
      console.log(document.getElementById(column + "-order"));
      stateDataList = orderBy(stateDataList, [column], ["desc"]);
    }
    if (order.split("-")[1] === "asc") {
      column = order.split("-")[0];
      console.log(document.getElementById(column + "-order"));
      stateDataList = orderBy(stateDataList, [column], ["asc"]);
    }

    var count = 0;

    let tableGenerator = () => {
      return (
        <div>
          <br />
          <div className="d-flex justify-content-around">
            <LineChart
              width={600}
              height={250}
              data={stateDataList}
              margin={{
                top: 5,
                // right: 10,
                // left: 20,
                bottom: 5,
              }}
            >
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="deltaconfirmed"
                stroke="blue"
                activeDot={{ r: 8 }}
                dot={false}
              />
            </LineChart>

            <LineChart
              width={600}
              height={250}
              data={stateDataList}
              margin={{
                top: 5,
                // right: 10,
                // left: 20,
                bottom: 5,
              }}
            >
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="active"
                stroke="black"
                activeDot={{ r: 8 }}
                dot={false}
              />
            </LineChart>
          </div>

          <div className="d-flex justify-content-around">
            <LineChart
              width={600}
              height={250}
              data={stateDataList}
              margin={{
                top: 5,
                // right: 10,
                // left: 20,
                bottom: 5,
              }}
            >
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="deltarecovered"
                stroke="green"
                activeDot={{ r: 8 }}
                dot={false}
              />
            </LineChart>

            <LineChart
              width={600}
              height={250}
              data={stateDataList}
              margin={{
                top: 5,
                // right: 10,
                // left: 20,
                bottom: 5,
              }}
            >
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="deltadeaths"
                stroke="red"
                activeDot={{ r: 8 }}
                dot={false}
              />
            </LineChart>
          </div>
          <br />

          <div className="d-flex justify-content-around">
            <a
              href={
                "/covid19/timeseries/" +
                timeseriesDayBeforeYesterday +
                "/" +
                stateCases[statename].statecode +
                "/"
              }
              className="h6 font-weight-bold bg-warning mx-auto rounded-pill p-2 shadow-lg small text-dark"
              style={{ width: "12%" }}
            >
              <FontAwesomeIcon icon={faArrowAltCircleLeft} /> Day before
              yesterday
            </a>
            <span className="h6 font-weight-bold" style={{ color: "inherit" }}>
              <FontAwesomeIcon icon={faMouse} /> Click on any column name to
              sort by column!
            </span>
            <a
              href={
                "/covid19/timeseries/" +
                timeseriesYesterday +
                "/" +
                stateCases[statename].statecode +
                "/"
              }
              className="h6 font-weight-bold bg-warning mx-auto rounded-pill p-2 shadow-lg small text-dark"
              style={{ width: "12%" }}
            >
              Yesterday <FontAwesomeIcon icon={faArrowAltCircleRight} />
            </a>
          </div>
          <br />

          <table
            className="table table-dark mx-auto table-borderless table-striped table-hover table shadow-lg position-relative d overflow-auto"
            style={{ borderRadius: 20, width: "85%" }}
            id="mytable"
          >
            <thead>
              <tr>
                <th
                  scope="col"
                  className="bg-warning p-1 text-dark small font-weight-bold"
                  style={{ width: "2%", borderTopLeftRadius: 20 }}
                ></th>
                <th scope="col" style={{ width: "14%" }}>
                  <button
                    onClick={() =>
                      setOrder("district-" + changeOrder[order.split("-")[1]])
                    }
                    id="district"
                    className="bg-dark p-2 text-white font-weight-bold rounded-pill w-100"
                  >
                    District{" "}
                    {order.split("-")[0] === "district" &&
                    order.split("-")[1] === "desc" ? (
                      <FontAwesomeIcon
                        icon={faSortAmountDown}
                        className="small text-white"
                      />
                    ) : null}
                    {order.split("-")[0] === "district" &&
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
                    id="zone"
                    className="bg-dark p-2 text-white font-weight-bold rounded-pill w-100"
                    disabled
                  >
                    Zone (Exp)
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
              </tr>
            </thead>
            <tbody>
              {stateDataList.map((stateData) => (
                <tr>
                  <th
                    className="bg-warning p-1 text-dark small font-weight-bold"
                    style={{ verticalAlign: "middle" }}
                  >
                    {(count += 1)}
                  </th>
                  <th
                    scope="row"
                    className="font-weight"
                    style={{ verticalAlign: "middle" }}
                  >
                    <a href className="text-white font-weight-light">
                      {dateCompare(
                        stateData.districtNotes
                          .split("]")[0]
                          .replace("[", "")
                          .split(" ")[0],
                        stateData.districtNotes
                          .split("]")[0]
                          .replace("[", "")
                          .split(" ")[1]
                      ) ? (
                        <div className="badge badge-success">New statenote</div>
                      ) : null}
                      <br />
                      {stateData.district}
                    </a>{" "}
                    {stateData.districtNotes !== "" ? (
                      <FontAwesomeIcon
                        type="button"
                        onClick={() =>
                          alert(
                            "Districtnotes for " +
                              stateData.district +
                              ":\n\n" +
                              stateData.districtNotes
                          )
                        }
                        icon={faInfoCircle}
                      />
                    ) : null}
                  </th>

                  <td style={{ verticalAlign: "middle" }}>
                    <FontAwesomeIcon
                      icon={faSquare}
                      className="h2 text-warning"
                    />
                  </td>

                  <td style={{ verticalAlign: "middle" }}>
                    {setSymbol(stateData.deltaconfirmed, "small")}
                    {stateData.confirmed}
                  </td>

                  <td style={{ verticalAlign: "middle" }}>
                    {setSymbol(
                      stateData.deltaconfirmed -
                        stateData.deltarecovered -
                        stateData.deltadeaths,
                      "small text-info"
                    )}
                    {stateData.active}
                  </td>

                  <td style={{ verticalAlign: "middle" }}>
                    {setSymbol(stateData.deltarecovered, "small text-success")}
                    {stateData.recovered}
                  </td>

                  <td style={{ verticalAlign: "middle" }}>
                    {stateData.recoveryrate} %
                  </td>

                  <td style={{ verticalAlign: "middle" }}>
                    {setSymbol(stateData.deltadeaths, "small text-danger")}
                    {stateData.deaths}
                  </td>

                  <td style={{ verticalAlign: "middle" }}>
                    {stateData.mortalityrate} %
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
          <FontAwesomeIcon icon={faLocationArrow} /> Today's district-wise cases
          of {statename}!
        </div>
        <br />
        <div className="d-flex justify-content-around">
          <a
            href="/covid19/states/"
            className="h6 font-weight-bold bg-info w-25 mx-auto rounded-pill p-3 shadow-lg"
            style={{ color: "inherit" }}
          >
            <FontAwesomeIcon icon={faArrowAltCircleLeft} /> Go back to
            state-wise case page{" "}
          </a>
          <a
            href={statelink}
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
        {tableGenerator()}
        <br />
        <br />
      </div>
    );
  }

  return (
    <div>
      <br />
      <div className="h5">
        <FontAwesomeIcon icon={faLocationArrow} /> Today's district-wise cases
        of {statename}!
      </div>
      <br />
      <div className="d-flex justify-content-around">
        <a
          href="/covid19/states/"
          className="h6 font-weight-bold bg-info w-25 mx-auto rounded-pill p-3 shadow-lg"
          style={{ color: "inherit" }}
        >
          <FontAwesomeIcon icon={faArrowAltCircleLeft} /> Go back to state-wise
          case page{" "}
        </a>
        <a
          href={statelink}
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
      <h3>Loading district table of {statename}...</h3>
      <img src={require("./infinityloader.gif")} alt="Loading table..."></img>
    </div>
  );
}

export default DistrictWise;
