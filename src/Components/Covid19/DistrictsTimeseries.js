import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowAltCircleLeft,
  faArrowCircleUp,
  faArrowAltCircleRight,
  faLocationArrow,
  faCalendarDay,
  faArrowCircleDown,
  faSortAmountDown,
  faSortAmountDownAlt,
  faMouse,
} from "@fortawesome/free-solid-svg-icons";
import { useParams } from "react-router-dom";
import orderBy from "lodash/orderBy";
import { PieChart, Pie, Legend, Tooltip } from "recharts";

function DistrictsTimeseries(props) {
  const [cases, setCases] = useState(null);
  const [chooseDate, setChooseDate] = useState(false);
  const [codes, setCodes] = useState(null);
  const [order, setOrder] = useState("confirmed-desc");

  var { chosenDate, statecode } = useParams();
  console.log(chosenDate, statecode);

  const codeUrl = "https://api.covid19india.org/data.json";

  var dateUrl = `https://api.covid19india.org/v3/data-${chosenDate}.json`;

  useEffect(() => {
    axios.get(dateUrl).then((response) => {
      setCases(response.data);
    });
  }, [dateUrl]);

  useEffect(() => {
    axios.get(codeUrl).then((response) => {
      setCodes(response.data);
    });
  }, [codeUrl]);

  var date = new Date();

  var today =
    date.getFullYear() +
    "-" +
    (date.getMonth() + 1 < 10
      ? "0" + (date.getMonth() + 1)
      : date.getMonth() + 1) +
    "-" +
    (date.getDate() < 10 ? "0" + date.getDate() : date.getDate());

  // var yesterday =
  //   (date.getDate() - 1 < 10
  //     ? "0" + (date.getDate() - 1)
  //     : date.getDate() - 1) +
  //   "/" +
  //   (date.getMonth() + 1 < 10
  //     ? "0" + (date.getMonth() + 1)
  //     : date.getMonth() + 1) +
  //   "/" +
  //   date.getFullYear();

  if (chooseDate) {
    var newChosenDate = document.getElementById("covid19timeseries").value;
    window.location.replace(
      "/covid19/timeseries/" + newChosenDate + "/" + statecode + "/"
    );
  }

  //   console.log(Boolean(chosenDate));
  if (cases && chosenDate && codes) {
    var stateVsCodeList = [];
    for (var j = 0; j < codes.statewise.length; j++) {
      stateVsCodeList[codes.statewise[j].statecode] = codes.statewise[j].state;
    }

    var districtNames = [];
    // console.log(cases[statecode].districts);
    for (var name in cases[statecode].districts) {
      districtNames.push(name);
    }

    // console.log(districtNames);

    var dataList = [];
    for (var i = 0; i < districtNames.length; i++) {
      //   console.log(stateCodes[i]);
      dataList.push({
        key: statecode,
        statecode: statecode,
        name: districtNames[i],
        district: districtNames[i],
        confirmed: cases[statecode].districts[districtNames[i]].total
          ? cases[statecode].districts[districtNames[i]].total.confirmed
            ? Number(
                cases[statecode].districts[districtNames[i]].total.confirmed
              )
            : 0
          : 0,
        deltaconfirmed: cases[statecode].districts[districtNames[i]].delta
          ? cases[statecode].districts[districtNames[i]].delta.confirmed
            ? Number(
                cases[statecode].districts[districtNames[i]].delta.confirmed
              )
            : 0
          : 0,
        active: null,
        recovered: cases[statecode].districts[districtNames[i]].total
          ? cases[statecode].districts[districtNames[i]].total.recovered
            ? Number(
                cases[statecode].districts[districtNames[i]].total.recovered
              )
            : 0
          : 0,
        deltarecovered: cases[statecode].districts[districtNames[i]].delta
          ? cases[statecode].districts[districtNames[i]].delta.recovered
            ? Number(
                cases[statecode].districts[districtNames[i]].delta.recovered
              )
            : 0
          : 0,
        recoveryrate: Number(
          (
            ((cases[statecode].districts[districtNames[i]].total
              ? cases[statecode].districts[districtNames[i]].total.confirmed
                ? Number(
                    cases[statecode].districts[districtNames[i]].total.confirmed
                  )
                : 0
              : 0) /
              (cases[statecode].districts[districtNames[i]].total
                ? cases[statecode].districts[districtNames[i]].total.confirmed
                  ? Number(
                      cases[statecode].districts[districtNames[i]].total
                        .confirmed
                    )
                  : 0
                : 0)) *
            100
          ).toFixed(2)
        ),
        deaths: cases[statecode].districts[districtNames[i]].total
          ? cases[statecode].districts[districtNames[i]].total.deceased
            ? Number(
                cases[statecode].districts[districtNames[i]].total.deceased
              )
            : 0
          : 0,
        deltadeaths: cases[statecode].districts[districtNames[i]].delta
          ? cases[statecode].districts[districtNames[i]].delta.deceased
            ? Number(
                cases[statecode].districts[districtNames[i]].delta.deceased
              )
            : 0
          : 0,
        mortalityrate: Number(
          (
            ((cases[statecode].districts[districtNames[i]].total
              ? cases[statecode].districts[districtNames[i]].total.deceased
                ? Number(
                    cases[statecode].districts[districtNames[i]].total.deceased
                  )
                : 0
              : 0) /
              (cases[statecode].districts[districtNames[i]].total
                ? cases[statecode].districts[districtNames[i]].total.confirmed
                  ? Number(
                      cases[statecode].districts[districtNames[i]].total
                        .confirmed
                    )
                  : 0
                : 0)) *
            100
          ).toFixed(2)
        ),
        tested: cases[statecode].districts[districtNames[i]].total
          ? cases[statecode].districts[districtNames[i]].total.tested
            ? Number(cases[statecode].districts[districtNames[i]].total.tested)
            : 0
          : 0,
        deltatested: cases[statecode].districts[districtNames[i]].delta
          ? cases[statecode].districts[districtNames[i]].delta.tested
            ? Number(cases[statecode].districts[districtNames[i]].delta.tested)
            : 0
          : 0,
        source: cases[statecode].districts[districtNames[i]].meta
          ? cases[statecode].districts[districtNames[i]].meta.tested
            ? cases[statecode].districts[districtNames[i]].meta.tested.source
            : "NA"
          : "NA",
        population: cases[statecode].districts[districtNames[i]].meta
          ? Number(cases[statecode].districts[districtNames[i]].meta.population)
          : "NA",
        lastupdatedtime: cases[statecode].districts[districtNames[i]].meta
          ? cases[statecode].districts[districtNames[i]].meta.tested
            ? cases[statecode].districts[districtNames[i]].meta.tested
                .last_updated
            : "NA"
          : "NA",
        // statelink:
        //   "/covid19/timeseries/" + chosenDate + "/" + stateCodes[i] + "/",
      });
    }

    // console.log(dataList);

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
                <th scope="col" style={{ width: 600 }}>
                  <button
                    id="total"
                    className="bg-dark p-2 text-white font-weight-bold rounded-pill w-100"
                    disabled
                  >
                    Total
                  </button>
                </th>
                <th scope="col" style={{ width: 300 }}>
                  <button
                    id="confirmed"
                    className="bg-dark p-2 text-white font-weight-bold rounded-pill w-100"
                    disabled
                  >
                    Confirmed
                  </button>
                </th>
                <th scope="col" style={{ width: 300 }}>
                  <button
                    id="active"
                    className="bg-dark p-2 text-info font-weight-bold rounded-pill w-100"
                    disabled
                  >
                    Active
                  </button>
                </th>
                <th scope="col" style={{ width: 300 }}>
                  <button
                    id="recovered"
                    className="bg-dark p-2 text-success font-weight-bold rounded-pill w-100"
                    disabled
                  >
                    Recovered
                  </button>
                </th>
                <th scope="col" style={{ width: 300 }}>
                  <button
                    id="recoveryRate"
                    className="bg-dark p-2 text-success font-weight-bold rounded-pill w-100"
                    disabled
                  >
                    Recovery rate
                  </button>
                </th>
                <th scope="col" style={{ width: 300 }}>
                  <button
                    id="deaths"
                    className="bg-dark p-2 text-danger font-weight-bold rounded-pill w-100"
                    disabled
                  >
                    Deceased
                  </button>
                </th>
                <th scope="col" style={{ width: 300 }}>
                  <button
                    id="mortalityRate"
                    className="bg-dark p-2 text-danger font-weight-bold rounded-pill w-100"
                    disabled
                  >
                    Mortality rate
                  </button>
                </th>
                <th scope="col" style={{ width: 300 }}>
                  <button
                    id="tested"
                    className="bg-dark p-2 text-white font-weight-bold rounded-pill w-100"
                    disabled
                  >
                    Tested
                  </button>
                </th>
                <th scope="col" style={{ width: 300 }}>
                  <button
                    id="population"
                    className="bg-dark p-2 text-white font-weight-bold rounded-pill w-100"
                    disabled
                  >
                    Population
                  </button>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row" className="font-weight-light">
                  <a href className="text-white">
                    {stateVsCodeList[statecode]}
                  </a>
                </th>
                <td>
                  <div className="small">
                    {(cases[statecode].delta
                      ? cases[statecode].delta.confirmed
                        ? cases[statecode].delta.confirmed
                        : 0
                      : 0) >= 0 ? (
                      <FontAwesomeIcon icon={faArrowCircleUp} />
                    ) : (
                      <FontAwesomeIcon icon={faArrowCircleDown} />
                    )}{" "}
                    {cases[statecode].delta
                      ? cases[statecode].delta.confirmed
                        ? cases[statecode].delta.confirmed
                        : 0
                      : 0}
                  </div>
                  {cases[statecode].total.confirmed}
                </td>
                <td>
                  <div className="text-info small">
                    {(cases[statecode].delta
                      ? cases[statecode].delta.confirmed
                        ? cases[statecode].delta.confirmed
                        : 0
                      : 0) -
                      (cases[statecode].delta
                        ? cases[statecode].delta.recovered
                          ? cases[statecode].delta.recovered
                          : 0
                        : 0) -
                      (cases[statecode].delta
                        ? cases[statecode].delta.deceased
                          ? cases[statecode].delta.deceased
                          : 0
                        : 0) >=
                    0 ? (
                      <FontAwesomeIcon icon={faArrowCircleUp} />
                    ) : (
                      <FontAwesomeIcon icon={faArrowCircleDown} />
                    )}{" "}
                    {(cases[statecode].delta
                      ? cases[statecode].delta.confirmed
                        ? cases[statecode].delta.confirmed
                        : 0
                      : 0) -
                      (cases[statecode].delta
                        ? cases[statecode].delta.recovered
                          ? cases[statecode].delta.recovered
                          : 0
                        : 0) -
                      (cases[statecode].delta
                        ? cases[statecode].delta.deceased
                          ? cases[statecode].delta.deceased
                          : 0
                        : 0)}
                  </div>
                  {cases[statecode].total.confirmed -
                    (cases[statecode].total.recovered
                      ? cases[statecode].total.recovered
                      : 0) -
                    (cases[statecode].total.deceased
                      ? cases[statecode].total.deceased
                      : 0)}
                </td>
                <td>
                  <div className="text-success small">
                    <FontAwesomeIcon icon={faArrowCircleUp} />{" "}
                    {cases[statecode].delta
                      ? cases[statecode].delta.recovered
                        ? cases[statecode].delta.recovered
                        : 0
                      : 0}
                  </div>
                  {cases[statecode].total.recovered
                    ? cases[statecode].total.recovered
                    : 0}
                </td>
                <td>
                  {/* <div className="text-danger small">
                    <FontAwesomeIcon icon={faArrowCircleUp} />{" "}
                    {cases['TT'].deltadeaths}
                  </div> */}
                  {(
                    ((cases[statecode].total.recovered
                      ? cases[statecode].total.recovered
                      : 0) /
                      cases[statecode].total.confirmed) *
                    100
                  ).toFixed(2)}{" "}
                  %
                </td>
                <td>
                  <div className="text-danger small">
                    <FontAwesomeIcon icon={faArrowCircleUp} />{" "}
                    {cases[statecode].delta
                      ? cases[statecode].delta.deceased
                        ? cases[statecode].delta.deceased
                        : 0
                      : 0}
                  </div>
                  {cases[statecode].total.deceased
                    ? cases[statecode].total.deceased
                    : 0}
                </td>
                <td>
                  {/* <div className="text-danger small">
                    <FontAwesomeIcon icon={faArrowCircleUp} />{" "}
                    {cases['TT'].deltadeaths}
                  </div> */}
                  {(
                    ((cases[statecode].total.deceased
                      ? cases[statecode].total.deceased
                      : 0) /
                      cases[statecode].total.confirmed) *
                    100
                  ).toFixed(2)}{" "}
                  %
                </td>
                <td>
                  <div className="small">
                    <FontAwesomeIcon icon={faArrowCircleUp} />{" "}
                    {cases[statecode].delta
                      ? cases[statecode].delta.tested
                        ? cases[statecode].delta.tested
                        : 0
                      : 0}
                  </div>
                  {cases[statecode].total.tested
                    ? cases[statecode].total.tested
                    : 0}
                </td>
                <td>
                  {cases[statecode].meta.population
                    ? cases[statecode].meta.population
                    : "NA"}
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

          <span className="h6 font-weight-bold" style={{ color: "inherit" }}>
            <FontAwesomeIcon icon={faMouse} /> You can also click on any column
            name to sort by column!
            <div className="small"></div>
          </span>
          <br />

          <table
            className="table table-dark mx-auto table-borderless table-striped table-hover table shadow-lg position-relative d overflow-auto"
            style={{ borderRadius: 20, width: "85%" }}
            id="mytable"
          >
            <thead>
              <tr>
                <th scope="col" style={{ width: 600 }}>
                  <button
                    // onClick={() =>
                    //   setOrder("recovered-" + changeOrder[order.split("-")[1]])
                    // }
                    id="district"
                    className="bg-dark p-2 text-white font-weight-bold rounded-pill w-100"
                    disabled
                  >
                    District
                  </button>
                </th>
                <th scope="col" style={{ width: 300 }}>
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
                <th scope="col" style={{ width: 300 }}>
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
                <th scope="col" style={{ width: 300 }}>
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
                <th scope="col" style={{ width: 300 }}>
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
                <th scope="col" style={{ width: 300 }}>
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
                <th scope="col" style={{ width: 300 }}>
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
                <th scope="col" style={{ width: 300 }}>
                  <button
                    onClick={() =>
                      setOrder("tested-" + changeOrder[order.split("-")[1]])
                    }
                    id="tested"
                    className="bg-dark p-2 text-white font-weight-bold rounded-pill w-100"
                  >
                    Tested{" "}
                    {order.split("-")[0] === "tested" &&
                    order.split("-")[1] === "desc" ? (
                      <FontAwesomeIcon
                        icon={faSortAmountDown}
                        className="small text-white"
                      />
                    ) : null}
                    {order.split("-")[0] === "tested" &&
                    order.split("-")[1] === "asc" ? (
                      <FontAwesomeIcon
                        icon={faSortAmountDownAlt}
                        className="small text-white"
                      />
                    ) : null}
                  </button>
                </th>
                <th scope="col" style={{ width: 300 }}>
                  <button
                    onClick={() =>
                      setOrder("population-" + changeOrder[order.split("-")[1]])
                    }
                    id="population"
                    className="bg-dark p-2 text-white font-weight-bold rounded-pill w-100"
                  >
                    Population{" "}
                    {order.split("-")[0] === "population" &&
                    order.split("-")[1] === "desc" ? (
                      <FontAwesomeIcon
                        icon={faSortAmountDown}
                        className="small text-white"
                      />
                    ) : null}
                    {order.split("-")[0] === "population" &&
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
              {dataList.map((data) => (
                <tr>
                  <th scope="row" className="font-weight-light">
                    <a href className="text-white">
                      {data.district}
                    </a>
                  </th>
                  <td>
                    <div className="small">
                      {data.deltaconfirmed >= 0 ? (
                        <FontAwesomeIcon icon={faArrowCircleUp} />
                      ) : (
                        <FontAwesomeIcon icon={faArrowCircleDown} />
                      )}{" "}
                      {data.deltaconfirmed}
                    </div>
                    {data.confirmed}
                  </td>
                  <td>
                    <div className="text-info small">
                      {data.deltaconfirmed -
                        data.deltarecovered -
                        data.deltadeaths >=
                      0 ? (
                        <FontAwesomeIcon icon={faArrowCircleUp} />
                      ) : (
                        <FontAwesomeIcon icon={faArrowCircleDown} />
                      )}{" "}
                      {data.deltaconfirmed -
                        data.deltarecovered -
                        data.deltadeaths}
                    </div>
                    {data.confirmed - data.recovered - data.deaths}
                  </td>
                  <td>
                    <div className="text-success small">
                      <FontAwesomeIcon icon={faArrowCircleUp} />{" "}
                      {data.deltarecovered}
                    </div>
                    {data.recovered}
                  </td>
                  <td>
                    {/* <div className="text-danger small">
                    <FontAwesomeIcon icon={faArrowCircleUp} />{" "}
                    {data.deltadeaths}
                  </div> */}
                    {data.recoveryrate} %
                  </td>
                  <td>
                    <div className="text-danger small">
                      <FontAwesomeIcon icon={faArrowCircleUp} />{" "}
                      {data.deltadeaths}
                    </div>
                    {data.deaths}
                  </td>
                  <td>
                    {/* <div className="text-danger small">
                    <FontAwesomeIcon icon={faArrowCircleUp} />{" "}
                    {data.deltadeaths}
                  </div> */}
                    {data.mortalityrate} %
                  </td>
                  <td>
                    <div className="small">
                      <FontAwesomeIcon icon={faArrowCircleUp} />{" "}
                      {data.deltatested}
                    </div>
                    {data.tested}
                  </td>
                  <td>{data.population}</td>
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
          <FontAwesomeIcon icon={faLocationArrow} /> Showing data of{" "}
          {stateVsCodeList[statecode]} as on {chosenDate}!
        </div>
        <br />
        <div className="d-flex justify-content-around">
          <a
            href={"/covid19/timeseries/" + chosenDate + "/"}
            className="h6 font-weight-bold bg-info w-25 mx-auto rounded-pill p-3 shadow-lg"
            style={{ color: "inherit" }}
          >
            <FontAwesomeIcon icon={faArrowAltCircleLeft} /> Go back to state
            timeseries page{" "}
          </a>

          <div style={{ width: "25%" }}>
            <input
              type="date"
              id="covid19timeseries"
              className="p-2"
              style={{
                borderTopLeftRadius: 25,
                borderBottomLeftRadius: 25,
                width: "50%",
              }}
              min="2020-01-30"
              max={today}
            />
            <div class="d-inline">
              <button
                type="submit"
                className="bg-info p-2 font-weight-bold"
                style={{
                  color: "inherit",
                  borderTopRightRadius: 25,
                  borderBottomRightRadius: 25,
                  width: "50%",
                }}
                onClick={() => setChooseDate(true)}
              >
                <FontAwesomeIcon icon={faCalendarDay} /> Select a date
              </button>
            </div>
          </div>

          <a
            href="/covid19/stats/"
            className="h6 font-weight-bold bg-info w-25 mx-auto rounded-pill p-3 shadow-lg"
            style={{ color: "inherit" }}
          >
            Go to Covid19 statistics page{" "}
            <FontAwesomeIcon icon={faArrowAltCircleRight} />
          </a>
        </div>

        <br />
        {tableGenerator()}
        <br />
        <br />

        {/* {console.log(document.getElementById("mytable"))} */}
      </div>
    );
  } else if (!cases && chosenDate) {
    return (
      <div>
        <br />
        <div className="h5">
          <FontAwesomeIcon icon={faLocationArrow} /> Loading data of {statecode}{" "}
          as on {chosenDate}!
        </div>
        <br />
        <div className="d-flex justify-content-around">
          <a
            href={"/covid19/timeseries/" + chosenDate + "/"}
            className="h6 font-weight-bold bg-info w-25 mx-auto rounded-pill p-3 shadow-lg"
            style={{ color: "inherit" }}
          >
            <FontAwesomeIcon icon={faArrowAltCircleLeft} /> Go back to state
            timeseries page{" "}
          </a>

          <div style={{ width: "25%" }}>
            <input
              type="date"
              id="covid19timeseries"
              className="p-2"
              style={{
                borderTopLeftRadius: 25,
                borderBottomLeftRadius: 25,
                width: "50%",
              }}
              min="2020-01-30"
              max={today}
            />
            <div class="d-inline">
              <button
                type="submit"
                className="bg-info p-2 font-weight-bold"
                style={{
                  color: "inherit",
                  borderTopRightRadius: 25,
                  borderBottomRightRadius: 25,
                  width: "50%",
                }}
                onClick={() => setChooseDate(true)}
              >
                <FontAwesomeIcon icon={faCalendarDay} /> Select a date
              </button>
            </div>
          </div>

          <a
            href="/covid19/stats/"
            className="h6 font-weight-bold bg-info w-25 mx-auto rounded-pill p-3 shadow-lg"
            style={{ color: "inherit" }}
          >
            Go to Covid19 statistics page{" "}
            <FontAwesomeIcon icon={faArrowAltCircleRight} />
          </a>
        </div>

        <br />
        <br />
        <br />
        <br />
        <h3>
          Loading district table of {statecode} as on {chosenDate}...
        </h3>
        <img src={require("./infinityloader.gif")} alt="Loading table..."></img>
      </div>
    );
  }

  return (
    <div>
      <br />
      <div className="h5">
        <FontAwesomeIcon icon={faLocationArrow} /> Welcome to the Covid19
        timeseries page of {statecode}!
      </div>
      <br />
      <div className="d-flex justify-content-around">
        <a
          href={"/covid19/timeseries/" + chosenDate + "/"}
          className="h6 font-weight-bold bg-info w-25 mx-auto rounded-pill p-3 shadow-lg"
          style={{ color: "inherit" }}
        >
          <FontAwesomeIcon icon={faArrowAltCircleLeft} /> Go back to state
          timeseries page{" "}
        </a>
        <a
          href="/covid19/stats/"
          className="h6 font-weight-bold bg-info w-25 mx-auto rounded-pill p-3 shadow-lg"
          style={{ color: "inherit" }}
        >
          Go to Covid19 statistics page{" "}
          <FontAwesomeIcon icon={faArrowAltCircleRight} />
        </a>
      </div>
      <br />
      <br />
      <br />
      <br />

      <div style={{ width: "25%" }}>
        <input
          type="date"
          id="covid19timeseries"
          className="p-2"
          style={{
            borderTopLeftRadius: 25,
            borderBottomLeftRadius: 25,
            width: "50%",
          }}
          min="2020-01-30"
          max={today}
        />
        <div class="d-inline">
          <button
            type="submit"
            className="bg-info p-2 font-weight-bold"
            style={{
              color: "inherit",
              borderTopRightRadius: 25,
              borderBottomRightRadius: 25,
              width: "50%",
            }}
            onClick={() => setChooseDate(true)}
          >
            <FontAwesomeIcon icon={faCalendarDay} /> Select a date
          </button>
        </div>
      </div>
    </div>
  );
}

export default DistrictsTimeseries;
