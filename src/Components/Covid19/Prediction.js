import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowAltCircleRight,
  faLocationArrow,
  faArrowAltCircleLeft,
  faSyncAlt,
  faCalendarDay,
  faArrowCircleUp,
  faArrowCircleDown,
  faArrowAltCircleDown,
} from "@fortawesome/free-solid-svg-icons";
// import { useParams } from "react-router-dom";

function Prediction(props) {
  // var { chosenDate } = useParams();

  const [cases, setCases] = useState(null);
  // const [pastCases, setPastCases] = useState(null);
  const [chooseDate, setChooseDate] = useState({ showing: false, value: null });

  const url = "https://api.covid19india.org/data.json";
  // var dateUrl = `https://api.covid19india.org/v3/data-${chosenDate}.json`;

  useEffect(() => {
    axios.get(url).then((response) => {
      setCases(response.data);
    });
  }, [url]);

  // useEffect(() => {
  //   axios.get(dateUrl).then((response) => {
  //     setPastCases(response.data);
  //   });
  // }, [dateUrl]);

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
    var currentConfirmed =
      cases.cases_time_series[cases.cases_time_series.length - 1]
        .totalconfirmed;

    var currentRecoveries =
      cases.cases_time_series[cases.cases_time_series.length - 1]
        .totalrecovered;

    var currentDeaths =
      cases.cases_time_series[cases.cases_time_series.length - 1].totaldeceased;

    //Daily rates

    var confirmedRate =
      (cases.cases_time_series[cases.cases_time_series.length - 1]
        .totalconfirmed -
        cases.cases_time_series[cases.cases_time_series.length - 2]
          .totalconfirmed) /
      cases.cases_time_series[cases.cases_time_series.length - 2]
        .totalconfirmed;

    var recoveredRate =
      (cases.cases_time_series[cases.cases_time_series.length - 1]
        .totalrecovered -
        cases.cases_time_series[cases.cases_time_series.length - 2]
          .totalrecovered) /
      cases.cases_time_series[cases.cases_time_series.length - 2]
        .totalrecovered;

    var deceasedRate =
      (cases.cases_time_series[cases.cases_time_series.length - 1]
        .totaldeceased -
        cases.cases_time_series[cases.cases_time_series.length - 2]
          .totaldeceased) /
      cases.cases_time_series[cases.cases_time_series.length - 2].totaldeceased;

    //Rates weekly

    var weeklyconfirmedRate =
      (cases.cases_time_series[cases.cases_time_series.length - 7]
        .totalconfirmed -
        cases.cases_time_series[cases.cases_time_series.length - 14]
          .totalconfirmed) /
      cases.cases_time_series[cases.cases_time_series.length - 14]
        .totalconfirmed;

    var weeklyrecoveredRate =
      (cases.cases_time_series[cases.cases_time_series.length - 7]
        .totalrecovered -
        cases.cases_time_series[cases.cases_time_series.length - 14]
          .totalrecovered) /
      cases.cases_time_series[cases.cases_time_series.length - 14]
        .totalrecovered;

    var weeklydeceasedRate =
      (cases.cases_time_series[cases.cases_time_series.length - 7]
        .totaldeceased -
        cases.cases_time_series[cases.cases_time_series.length - 14]
          .totaldeceased) /
      cases.cases_time_series[cases.cases_time_series.length - 14].totaldeceased;

    //Current cases yesterday

    var currentConfirmedyesterday =
      cases.cases_time_series[cases.cases_time_series.length - 2]
        .totalconfirmed;

    var currentRecoveriesyesterday =
      cases.cases_time_series[cases.cases_time_series.length - 2]
        .totalrecovered;

    var currentDeathsyesterday =
      cases.cases_time_series[cases.cases_time_series.length - 2].totaldeceased;

    //Rate yesterday

    var confirmedRateyesterday =
      (cases.cases_time_series[cases.cases_time_series.length - 2]
        .totalconfirmed -
        cases.cases_time_series[cases.cases_time_series.length - 3]
          .totalconfirmed) /
      cases.cases_time_series[cases.cases_time_series.length - 3]
        .totalconfirmed;

    var recoveredRateyesterday =
      (cases.cases_time_series[cases.cases_time_series.length - 2]
        .totalrecovered -
        cases.cases_time_series[cases.cases_time_series.length - 3]
          .totalrecovered) /
      cases.cases_time_series[cases.cases_time_series.length - 3]
        .totalrecovered;

    var deceasedRateyesterday =
      (cases.cases_time_series[cases.cases_time_series.length - 2]
        .totaldeceased -
        cases.cases_time_series[cases.cases_time_series.length - 3]
          .totaldeceased) /
      cases.cases_time_series[cases.cases_time_series.length - 3].totaldeceased;

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
    console.log(todayDiff);

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

    let dayTable;

    if (chooseDate.showing) {
      var chosenDate = document.getElementById("futureprediction").value;

      if (chosenDate) {
        var diff = (
          (new Date(chosenDate).getTime() -
            new Date(
              "2020-" + casesLastMonth + "-" + casesLastDate
            ).getTime()) /
          (1000 * 3600 * 24)
        ).toFixed(0);
        dayTable = (
          <div>
            <table
              className="table table-dark mx-auto table-borderless table-striped table-hover table shadow-lg position-relative d overflow-auto"
              style={{ borderRadius: 20, width: "75%" }}
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
                      id="lastUpdated"
                      className="bg-dark p-2 text-white font-weight-bold rounded-pill w-100"
                      disabled
                    >
                      Predicted for
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
                      <br />
                      (Predicted)*
                    </a>
                  </th>

                  <td style={{ verticalAlign: "middle" }}>
                    {setSymbol(
                      (currentConfirmed * (1 + confirmedRate) ** diff).toFixed(
                        0
                      ) -
                        currentConfirmed -
                        ((
                          currentConfirmed *
                          (1 + confirmedRate) ** (diff - 1)
                        ).toFixed(0) -
                          currentConfirmed),
                      "small"
                    )}
                    {(currentConfirmed * (1 + confirmedRate) ** diff).toFixed(
                      0
                    )}
                  </td>

                  <td style={{ verticalAlign: "middle" }}>
                    {setSymbol(
                      (currentConfirmed * (1 + confirmedRate) ** diff).toFixed(
                        0
                      ) -
                        currentConfirmed -
                        ((
                          currentRecoveries *
                          (1 + recoveredRate) ** diff
                        ).toFixed(0) -
                          currentRecoveries) -
                        ((currentDeaths * (1 + deceasedRate) ** diff).toFixed(
                          0
                        ) -
                          currentDeaths) -
                        ((
                          currentConfirmed *
                          (1 + confirmedRate) ** (diff - 1)
                        ).toFixed(0) -
                          currentConfirmed -
                          ((
                            currentRecoveries *
                            (1 + recoveredRate) ** (diff - 1)
                          ).toFixed(0) -
                            currentRecoveries) -
                          ((
                            currentDeaths *
                            (1 + deceasedRate) ** (diff - 1)
                          ).toFixed(0) -
                            currentDeaths)),
                      "small text-info"
                    )}
                    {(currentConfirmed * (1 + confirmedRate) ** diff).toFixed(
                      0
                    ) -
                      (currentRecoveries * (1 + recoveredRate) ** diff).toFixed(
                        0
                      ) -
                      (currentDeaths * (1 + deceasedRate) ** diff).toFixed(0)}
                  </td>

                  <td style={{ verticalAlign: "middle" }}>
                    {setSymbol(
                      (currentRecoveries * (1 + recoveredRate) ** diff).toFixed(
                        0
                      ) -
                        currentRecoveries -
                        ((
                          currentRecoveries *
                          (1 + recoveredRate) ** (diff - 1)
                        ).toFixed(0) -
                          currentRecoveries),
                      "small text-success"
                    )}
                    {(currentRecoveries * (1 + recoveredRate) ** diff).toFixed(
                      0
                    )}
                  </td>

                  <td style={{ verticalAlign: "middle" }}>
                    {(
                      ((
                        currentRecoveries *
                        (1 + recoveredRate) ** diff
                      ).toFixed(0) /
                        (
                          currentConfirmed *
                          (1 + confirmedRate) ** diff
                        ).toFixed(0)) *
                      100
                    ).toFixed(2)}{" "}
                    %
                  </td>

                  <td style={{ verticalAlign: "middle" }}>
                    {setSymbol(
                      (currentDeaths * (1 + deceasedRate) ** diff).toFixed(0) -
                        currentDeaths -
                        ((
                          currentDeaths *
                          (1 + deceasedRate) ** (diff - 1)
                        ).toFixed(0) -
                          currentDeaths),
                      "small text-danger"
                    )}
                    {(currentDeaths * (1 + deceasedRate) ** diff).toFixed(0)}
                  </td>

                  <td style={{ verticalAlign: "middle" }}>
                    {(
                      ((currentDeaths * (1 + deceasedRate) ** diff).toFixed(0) /
                        (
                          currentConfirmed *
                          (1 + confirmedRate) ** diff
                        ).toFixed(0)) *
                      100
                    ).toFixed(2)}{" "}
                    %
                  </td>

                  <td style={{ verticalAlign: "middle" }}>{chosenDate}</td>
                </tr>
              </tbody>
            </table>
          </div>
        );
      }
    }

    let tableGenerator = () => {
      return (
        <div>
          <table
            className="table table-dark mx-auto table-borderless table-striped table-hover table shadow-lg position-relative d overflow-auto"
            style={{ borderRadius: 20, width: "75%" }}
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
                  {cases.statewise[0].lastupdatedtime.split(" ")[0] ===
                  todaySlash
                    ? "Today at " +
                      cases.statewise[0].lastupdatedtime.split(" ")[1]
                    : null}
                  {cases.statewise[0].lastupdatedtime.split(" ")[0] !==
                  todaySlash
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
          <br />
          <span className="h6 rounded-pill bg-dark p-2 text-white">
            To get prediction of a specific day, choose the date below!{" "}
            <FontAwesomeIcon icon={faArrowAltCircleDown} />
          </span>
          <br />
          <br />
          <div className="d-flex justify-content-around">
            <div style={{ width: "25%" }}>
              <input
                type="date"
                className="p-2 small"
                id="futureprediction"
                style={{
                  borderTopLeftRadius: 25,
                  borderBottomLeftRadius: 25,
                  width: "50%",
                }}
                min={casesLastTime}
                // max=
              />
              <div className="d-inline">
                <button
                  type="submit"
                  className="bg-warning p-2 font-weight-bold small text-dark"
                  style={{
                    borderTopRightRadius: 25,
                    borderBottomRightRadius: 25,
                    width: "50%",
                  }}
                  onClick={() => setChooseDate({ showing: true })}
                >
                  <FontAwesomeIcon icon={faCalendarDay} /> Show prediction!
                </button>
              </div>
            </div>
          </div>
          <br />

          {dayTable}

          <br />
          <span className="h6 rounded-pill bg-dark text-white p-2">
            Today's predicted data{" "}
            <FontAwesomeIcon icon={faArrowAltCircleDown} />
          </span>
          <br />
          <br />

          <table
            className="table table-dark mx-auto table-borderless table-striped table-hover table shadow-lg position-relative d overflow-auto"
            style={{ borderRadius: 20, width: "75%" }}
            id="mytable"
          >
            <thead>
              <tr>
                <th
                  scope="col"
                  className="bg-warning text-dark"
                  style={{
                    width: "30%",
                    borderTopLeftRadius: 20,
                  }}
                >
                  Time
                </th>
                <th
                  scope="col"
                  className="bg-white text-info"
                  style={{ width: "35%" }}
                >
                  Parametre
                </th>
                <th
                  scope="col"
                  className="bg-warning text-dark"
                  style={{
                    width: "35%",
                    borderTopRightRadius: 20,
                  }}
                >
                  Prediction*
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th
                  rowSpan="3"
                  scope="row"
                  className="font-weight"
                  style={{ verticalAlign: "middle" }}
                >
                  <div className='small badge badge-success font-weight-light'>New update!</div><div></div>
                  Today
                  <div className="small">
                    (
                    {date.getDate() < 10
                      ? "0" + date.getDate()
                      : date.getDate()}{" "}
                    {
                      cases.cases_time_series[
                        cases.cases_time_series.length - 1
                      ].date.split(" ")[1]
                    }
                    )
                  </div>
                </th>
                <th
                  scope="row"
                  className="font-weight"
                  style={{ verticalAlign: "middle" }}
                >
                  Total confirmed cases{" "}
                </th>
                <td style={{ verticalAlign: "middle" }}>
                  {(
                    currentConfirmed *
                    (1 + weeklyconfirmedRate) ** todayDiff
                  ).toFixed(0)}{" "}
                  cases
                  <div className="small">
                    (
                    {(
                      currentConfirmed *
                      (1 + weeklyconfirmedRate) ** todayDiff
                    ).toFixed(0) -
                      currentConfirmed -
                      ((
                        currentConfirmed *
                        (1 + weeklyconfirmedRate) ** (todayDiff - 1)
                      ).toFixed(0) -
                        currentConfirmed)}{" "}
                    new cases
                    {todayDiff == 1
                      ? ", " +
                        (cases.statewise[0].deltaconfirmed /
                          (((1 + weeklyconfirmedRate) * currentConfirmed).toFixed(0) -
                            currentConfirmed) <=
                        1
                          ? (
                              (cases.statewise[0].deltaconfirmed /
                                ((
                                  (1 + weeklyconfirmedRate) *
                                  currentConfirmed
                                ).toFixed(0) -
                                  currentConfirmed)) *
                              100
                            ).toFixed(2)
                          : (
                              (((
                                (1 + weeklyconfirmedRate) *
                                currentConfirmed
                              ).toFixed(0) -
                                currentConfirmed) /
                                cases.statewise[0].deltaconfirmed) *
                              100
                            ).toFixed(2)) +
                        " % accuracy so far)"
                      : ")"}
                  </div>
                </td>
              </tr>

              <tr>
                <th
                  scope="row"
                  className="font-weight"
                  style={{ verticalAlign: "middle" }}
                >
                  Total recoveries{" "}
                </th>
                <td style={{ verticalAlign: "middle" }}>
                  {(
                    currentRecoveries *
                    (1 + weeklyrecoveredRate) ** todayDiff
                  ).toFixed(0)}{" "}
                  recoveries
                  <div className="small">
                    (
                    {(
                      currentRecoveries *
                      (1 + weeklyrecoveredRate) ** todayDiff
                    ).toFixed(0) -
                      currentRecoveries -
                      ((
                        currentRecoveries *
                        (1 + weeklyrecoveredRate) ** (todayDiff - 1)
                      ).toFixed(0) -
                        currentRecoveries)}{" "}
                    new recoveries
                    {todayDiff == 1
                      ? ", " +
                        (cases.statewise[0].deltarecovered /
                          (((1 + weeklyrecoveredRate) * currentRecoveries).toFixed(
                            0
                          ) -
                            currentRecoveries) <=
                        1
                          ? (
                              (cases.statewise[0].deltarecovered /
                                ((
                                  (1 + weeklyrecoveredRate) *
                                  currentRecoveries
                                ).toFixed(0) -
                                  currentRecoveries)) *
                              100
                            ).toFixed(2)
                          : (
                              (((
                                (1 + weeklyrecoveredRate) *
                                currentRecoveries
                              ).toFixed(0) -
                                currentRecoveries) /
                                cases.statewise[0].deltarecovered) *
                              100
                            ).toFixed(2)) +
                        " % accuracy so far)"
                      : ")"}
                  </div>
                </td>
              </tr>

              <tr>
                <th
                  scope="row"
                  className="font-weight"
                  style={{ verticalAlign: "middle" }}
                >
                  Total deaths{" "}
                </th>
                <td style={{ verticalAlign: "middle" }}>
                  {(currentDeaths * (1 + weeklydeceasedRate) ** todayDiff).toFixed(0)}{" "}
                  deaths
                  <div className="small">
                    (
                    {(currentDeaths * (1 + weeklydeceasedRate) ** todayDiff).toFixed(
                      0
                    ) -
                      currentDeaths -
                      ((
                        currentDeaths *
                        (1 + weeklydeceasedRate) ** (todayDiff - 1)
                      ).toFixed(0) -
                        currentDeaths)}{" "}
                    new deaths
                    {todayDiff == 1
                      ? ", " +
                        (cases.statewise[0].deltadeaths /
                          (((1 + weeklydeceasedRate) * currentDeaths).toFixed(0) -
                            currentDeaths) <=
                        1
                          ? (
                              (cases.statewise[0].deltadeaths /
                                (((1 + weeklydeceasedRate) * currentDeaths).toFixed(
                                  0
                                ) -
                                  currentDeaths)) *
                              100
                            ).toFixed(2)
                          : (
                              ((((1 + weeklydeceasedRate) * currentDeaths).toFixed(
                                0
                              ) -
                                currentDeaths) /
                                cases.statewise[0].deltadeaths) *
                              100
                            ).toFixed(2)) +
                        " % accuracy so far)"
                      : ")"}
                  </div>
                </td>
              </tr>

              <tr>
                <th
                  rowSpan="3"
                  scope="row"
                  className="font-weight"
                  style={{ verticalAlign: "middle" }}
                >
                  After 15 days
                  <div className="small">
                    (From{" "}
                    {
                      cases.cases_time_series[
                        cases.cases_time_series.length - 1
                      ].date
                    }
                    )
                  </div>
                </th>
                <th
                  scope="row"
                  className="font-weight"
                  style={{ verticalAlign: "middle" }}
                >
                  Total confirmed cases{" "}
                </th>
                <td style={{ verticalAlign: "middle" }}>
                  {(currentConfirmed * (1 + confirmedRate) ** 15).toFixed(0)}{" "}
                  cases
                  <div className="small">
                    (
                    {(currentConfirmed * (1 + confirmedRate) ** 15).toFixed(0) -
                      currentConfirmed}{" "}
                    new cases,{" "}
                    {(
                      ((currentConfirmed * (1 + confirmedRate) ** 15).toFixed(
                        0
                      ) -
                        currentConfirmed) /
                      15
                    ).toFixed(0)}{" "}
                    cases/day)
                  </div>
                </td>
              </tr>

              <tr>
                <th
                  scope="row"
                  className="font-weight"
                  style={{ verticalAlign: "middle" }}
                >
                  Total recoveries{" "}
                </th>
                <td style={{ verticalAlign: "middle" }}>
                  {(currentRecoveries * (1 + recoveredRate) ** 15).toFixed(0)}{" "}
                  recoveries
                  <div className="small">
                    (
                    {(currentRecoveries * (1 + recoveredRate) ** 15).toFixed(
                      0
                    ) - currentRecoveries}{" "}
                    new recoveries,{" "}
                    {(
                      ((currentRecoveries * (1 + recoveredRate) ** 15).toFixed(
                        0
                      ) -
                        currentRecoveries) /
                      15
                    ).toFixed(0)}{" "}
                    recoveries/day)
                  </div>
                </td>
              </tr>

              <tr>
                <th
                  scope="row"
                  className="font-weight"
                  style={{ verticalAlign: "middle" }}
                >
                  Total deaths{" "}
                </th>
                <td style={{ verticalAlign: "middle" }}>
                  {(currentDeaths * (1 + deceasedRate) ** 15).toFixed(0)} deaths
                  <div className="small">
                    (
                    {(currentDeaths * (1 + deceasedRate) ** 15).toFixed(0) -
                      currentDeaths}{" "}
                    new deaths,{" "}
                    {(
                      ((currentDeaths * (1 + deceasedRate) ** 15).toFixed(0) -
                        currentDeaths) /
                      15
                    ).toFixed(0)}{" "}
                    deaths/day)
                  </div>
                </td>
              </tr>

              <tr>
                <th
                  rowSpan="3"
                  scope="row"
                  className="font-weight"
                  style={{ verticalAlign: "middle" }}
                >
                  After a month**
                  <div className="small">
                    (From{" "}
                    {
                      cases.cases_time_series[
                        cases.cases_time_series.length - 1
                      ].date
                    }
                    )
                  </div>
                </th>
                <th
                  scope="row"
                  className="font-weight"
                  style={{ verticalAlign: "middle" }}
                >
                  Total confirmed cases{" "}
                </th>
                <td style={{ verticalAlign: "middle" }}>
                  {(currentConfirmed * (1 + confirmedRate) ** 30).toFixed(0)}{" "}
                  cases
                  <div className="small">
                    (
                    {(currentConfirmed * (1 + confirmedRate) ** 30).toFixed(0) -
                      currentConfirmed}{" "}
                    new cases,{" "}
                    {(
                      ((currentConfirmed * (1 + confirmedRate) ** 30).toFixed(
                        0
                      ) -
                        currentConfirmed) /
                      30
                    ).toFixed(0)}{" "}
                    cases/day)
                  </div>
                </td>
              </tr>

              <tr>
                <th
                  scope="row"
                  className="font-weight"
                  style={{ verticalAlign: "middle" }}
                >
                  Total recoveries{" "}
                </th>
                <td style={{ verticalAlign: "middle" }}>
                  {(currentRecoveries * (1 + recoveredRate) ** 30).toFixed(0)}{" "}
                  recoveries
                  <div className="small">
                    (
                    {(currentRecoveries * (1 + recoveredRate) ** 30).toFixed(
                      0
                    ) - currentRecoveries}{" "}
                    new recoveries,{" "}
                    {(
                      ((currentRecoveries * (1 + recoveredRate) ** 30).toFixed(
                        0
                      ) -
                        currentRecoveries) /
                      30
                    ).toFixed(0)}{" "}
                    recoveries/day)
                  </div>
                </td>
              </tr>

              <tr>
                <th
                  scope="row"
                  className="font-weight"
                  style={{ verticalAlign: "middle" }}
                >
                  Total deaths{" "}
                </th>
                <td style={{ verticalAlign: "middle" }}>
                  {(currentDeaths * (1 + deceasedRate) ** 30).toFixed(0)} deaths
                  <div className="small">
                    (
                    {(currentDeaths * (1 + deceasedRate) ** 30).toFixed(0) -
                      currentDeaths}{" "}
                    new deaths,{" "}
                    {(
                      ((currentDeaths * (1 + deceasedRate) ** 30).toFixed(0) -
                        currentDeaths) /
                      30
                    ).toFixed(0)}{" "}
                    deaths/day)
                  </div>
                </td>
              </tr>

              <tr>
                <th
                  rowSpan="3"
                  scope="row"
                  className="font-weight"
                  style={{ verticalAlign: "middle" }}
                >
                  After two months**
                  <div className="small">
                    (From{" "}
                    {
                      cases.cases_time_series[
                        cases.cases_time_series.length - 1
                      ].date
                    }
                    )
                  </div>
                </th>
                <th
                  scope="row"
                  className="font-weight"
                  style={{ verticalAlign: "middle" }}
                >
                  Total confirmed cases{" "}
                </th>
                <td style={{ verticalAlign: "middle" }}>
                  {(currentConfirmed * (1 + confirmedRate) ** 60).toFixed(0)}{" "}
                  cases
                  <div className="small">
                    (
                    {(currentConfirmed * (1 + confirmedRate) ** 60).toFixed(0) -
                      currentConfirmed}{" "}
                    new cases,{" "}
                    {(
                      ((currentConfirmed * (1 + confirmedRate) ** 60).toFixed(
                        0
                      ) -
                        currentConfirmed) /
                      60
                    ).toFixed(0)}{" "}
                    cases/day)
                  </div>
                </td>
              </tr>

              <tr>
                <th
                  scope="row"
                  className="font-weight"
                  style={{ verticalAlign: "middle" }}
                >
                  Total recoveries{" "}
                </th>
                <td style={{ verticalAlign: "middle" }}>
                  {(currentRecoveries * (1 + recoveredRate) ** 60).toFixed(0)}{" "}
                  recoveries
                  <div className="small">
                    (
                    {(currentRecoveries * (1 + recoveredRate) ** 60).toFixed(
                      0
                    ) - currentRecoveries}{" "}
                    new recoveries,{" "}
                    {(
                      ((currentRecoveries * (1 + recoveredRate) ** 60).toFixed(
                        0
                      ) -
                        currentRecoveries) /
                      60
                    ).toFixed(0)}{" "}
                    recoveries/day)
                  </div>
                </td>
              </tr>

              <tr>
                <th
                  scope="row"
                  className="font-weight"
                  style={{ verticalAlign: "middle" }}
                >
                  Total deaths{" "}
                </th>
                <td style={{ verticalAlign: "middle" }}>
                  {(currentDeaths * (1 + deceasedRate) ** 60).toFixed(0)} deaths
                  <div className="small">
                    (
                    {(currentDeaths * (1 + deceasedRate) ** 60).toFixed(0) -
                      currentDeaths}{" "}
                    new deaths,{" "}
                    {(
                      ((currentDeaths * (1 + deceasedRate) ** 60).toFixed(0) -
                        currentDeaths) /
                      60
                    ).toFixed(0)}{" "}
                    deaths/day)
                  </div>
                </td>
              </tr>

              <tr>
                <th
                  scope="row"
                  className="font-weight"
                  style={{ verticalAlign: "middle" }}
                ></th>
                <th
                  scope="row"
                  className="font-weight"
                  style={{ verticalAlign: "middle" }}
                >
                  Days until 1 crore total confirmed cases{" "}
                </th>
                <td style={{ verticalAlign: "middle" }}>
                  {(
                    Math.log(10000000 / currentConfirmed) /
                    Math.log(1 + confirmedRate)
                  ).toFixed(4)}{" "}
                  days
                  <div className="small">
                    (
                    {(
                      (Math.log(10000000 / currentConfirmed) /
                        Math.log(1 + confirmedRate) -
                        Math.log(10000000 / currentConfirmedyesterday) /
                          Math.log(1 + confirmedRateyesterday)) /
                      (Math.log(10000000 / currentConfirmedyesterday) /
                        Math.log(1 + confirmedRateyesterday))
                    ).toFixed(2)}{" "}
                    % change since yesterday's{" "}
                    {(
                      Math.log(10000000 / currentConfirmedyesterday) /
                      Math.log(1 + confirmedRateyesterday)
                    ).toFixed(4)}{" "}
                    days)
                  </div>
                </td>
              </tr>

              <tr>
                <th
                  scope="row"
                  className="font-weight"
                  style={{ verticalAlign: "middle" }}
                ></th>
                <th
                  scope="row"
                  className="font-weight"
                  style={{ verticalAlign: "middle" }}
                >
                  Days until 1 crore 6 lac total confirmed cases{" "}
                </th>
                <td style={{ verticalAlign: "middle" }}>
                  {(
                    Math.log(10600000 / currentConfirmed) /
                    Math.log(1 + confirmedRate)
                  ).toFixed(4)}{" "}
                  days
                  <div className="small">
                    (
                    {(
                      (Math.log(10600000 / currentConfirmed) /
                        Math.log(1 + confirmedRate) -
                        Math.log(10600000 / currentConfirmedyesterday) /
                          Math.log(1 + confirmedRateyesterday)) /
                      (Math.log(10600000 / currentConfirmedyesterday) /
                        Math.log(1 + confirmedRateyesterday))
                    ).toFixed(2)}{" "}
                    % change since yesterday's{" "}
                    {(
                      Math.log(10600000 / currentConfirmedyesterday) /
                      Math.log(1 + confirmedRateyesterday)
                    ).toFixed(4)}{" "}
                    days)
                  </div>
                </td>
              </tr>

              <tr>
                <th
                  scope="row"
                  className="font-weight"
                  style={{ verticalAlign: "middle" }}
                ></th>
                <th
                  scope="row"
                  className="font-weight"
                  style={{ verticalAlign: "middle" }}
                >
                  Days until 75 lac recoveries{" "}
                </th>
                <td style={{ verticalAlign: "middle" }}>
                  {(
                    Math.log(7500000 / currentRecoveries) /
                    Math.log(1 + recoveredRate)
                  ).toFixed(4)}{" "}
                  days
                  <div className="small">
                    (
                    {(
                      (Math.log(7500000 / currentRecoveries) /
                        Math.log(1 + recoveredRate) -
                        Math.log(7500000 / currentRecoveriesyesterday) /
                          Math.log(1 + recoveredRateyesterday)) /
                      (Math.log(7500000 / currentRecoveriesyesterday) /
                        Math.log(1 + recoveredRateyesterday))
                    ).toFixed(2)}{" "}
                    % change since yesterday's{" "}
                    {(
                      Math.log(7500000 / currentRecoveriesyesterday) /
                      Math.log(1 + recoveredRateyesterday)
                    ).toFixed(4)}{" "}
                    days)
                  </div>
                </td>
              </tr>

              <tr>
                <th
                  scope="row"
                  className="font-weight"
                  style={{ verticalAlign: "middle" }}
                ></th>
                <th
                  scope="row"
                  className="font-weight"
                  style={{ verticalAlign: "middle" }}
                >
                  Days until 1 crore recoveries{" "}
                </th>
                <td style={{ verticalAlign: "middle" }}>
                  {(
                    Math.log(10000000 / currentRecoveries) /
                    Math.log(1 + recoveredRate)
                  ).toFixed(4)}{" "}
                  days
                  <div className="small">
                    (
                    {(
                      (Math.log(10000000 / currentRecoveries) /
                        Math.log(1 + recoveredRate) -
                        Math.log(10000000 / currentRecoveriesyesterday) /
                          Math.log(1 + recoveredRateyesterday)) /
                      (Math.log(10000000 / currentRecoveriesyesterday) /
                        Math.log(1 + recoveredRateyesterday))
                    ).toFixed(2)}{" "}
                    % change since yesterday's{" "}
                    {(
                      Math.log(10000000 / currentRecoveriesyesterday) /
                      Math.log(1 + recoveredRateyesterday)
                    ).toFixed(4)}{" "}
                    days)
                  </div>
                </td>
              </tr>

              <tr>
                <th
                  scope="row"
                  className="font-weight"
                  style={{ verticalAlign: "middle" }}
                ></th>
                <th
                  scope="row"
                  className="font-weight"
                  style={{ verticalAlign: "middle" }}
                >
                  Days until 1 lac 25 thousand deaths{" "}
                </th>
                <td style={{ verticalAlign: "middle" }}>
                  {(
                    Math.log(125000 / currentDeaths) /
                    Math.log(1 + deceasedRate)
                  ).toFixed(4)}{" "}
                  days
                  <div className="small">
                    (
                    {(
                      (Math.log(125000 / currentDeaths) /
                        Math.log(1 + deceasedRate) -
                        Math.log(125000 / currentDeathsyesterday) /
                          Math.log(1 + deceasedRateyesterday)) /
                      (Math.log(125000 / currentDeathsyesterday) /
                        Math.log(1 + deceasedRateyesterday))
                    ).toFixed(2)}{" "}
                    % change since yesterday's{" "}
                    {(
                      Math.log(125000 / currentDeathsyesterday) /
                      Math.log(1 + deceasedRateyesterday)
                    ).toFixed(4)}{" "}
                    days)
                  </div>
                </td>
              </tr>

              <tr>
                <th
                  scope="row"
                  className="font-weight"
                  style={{ verticalAlign: "middle" }}
                ></th>
                <th
                  scope="row"
                  className="font-weight"
                  style={{ verticalAlign: "middle" }}
                >
                  Days until 1 lac 50 thousand deaths{" "}
                </th>
                <td style={{ verticalAlign: "middle" }}>
                  {(
                    Math.log(150000 / currentDeaths) /
                    Math.log(1 + deceasedRate)
                  ).toFixed(4)}{" "}
                  days
                  <div className="small">
                    (
                    {(
                      (Math.log(150000 / currentDeaths) /
                        Math.log(1 + deceasedRate) -
                        Math.log(150000 / currentDeathsyesterday) /
                          Math.log(1 + deceasedRateyesterday)) /
                      (Math.log(150000 / currentDeathsyesterday) /
                        Math.log(1 + deceasedRateyesterday))
                    ).toFixed(2)}{" "}
                    % change since yesterday's{" "}
                    {(
                      Math.log(150000 / currentDeathsyesterday) /
                      Math.log(1 + deceasedRateyesterday)
                    ).toFixed(4)}{" "}
                    days)
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          <span className="font-italic">
            *All predictions are based on certain mathematical formulae and may
            not be accurate!
            <br />
            **1 month = 30 days
          </span>
        </div>
      );
    };

    return (
      <div>
        <br />
        <div className="h5">
          <FontAwesomeIcon icon={faLocationArrow} /> Welcome to the Covid19
          Prediction page!
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
            href="/covid19/prediction/"
            className="h6 font-weight-bold"
            style={{ color: "inherit" }}
          >
            <FontAwesomeIcon icon={faSyncAlt} className="App-logo" />
            <br />
            Refresh to get the latest predictions!
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
          All predictions are based on the data till{" "}
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
        <FontAwesomeIcon icon={faLocationArrow} /> Welcome to the Covid19
        Prediction page!
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
          href="/covid19/prediction/"
          className="h6 font-weight-bold"
          style={{ color: "inherit" }}
        >
          <FontAwesomeIcon icon={faSyncAlt} className="App-logo" />
          <br />
          Refresh to get the latest predictions!
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
      <h3>Loading Covid19 predictions...</h3>
      <img src={require("./infinityloader.gif")} alt="Loading table..."></img>
    </div>
  );
}

export default Prediction;
