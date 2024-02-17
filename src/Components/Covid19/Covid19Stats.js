import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowAltCircleRight,
  faLocationArrow,
  faArrowAltCircleLeft,
  faSyncAlt,
  faArrowCircleUp,
  faArrowCircleDown,
  faArrowAltCircleUp,
  faArrowAltCircleDown,
  faLongArrowAltDown,
  faLongArrowAltUp,
  faDotCircle,
} from "@fortawesome/free-solid-svg-icons";

function Covid19Stats(props) {
  const [cases, setCases] = useState(null);
  const url = "https://api.covid19india.org/data.json";

  useEffect(() => {
    axios.get(url).then((response) => {
      setCases(response.data);
    });
  }, [url]);

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

    function setSymbolStats(statsData) {
      if (statsData < 0)
        return (
          <FontAwesomeIcon className="text-danger" icon={faArrowCircleDown} />
        );
      else if (statsData > 0)
        return (
          <FontAwesomeIcon className="text-success" icon={faArrowCircleUp} />
        );
      else
        return <FontAwesomeIcon className="text-warning" icon={faDotCircle} />;
    }

    function percentageIncrease(prefix, day1, day2) {
      if (prefix === "totalsamplestested" || prefix === "testspermillion") {
        return (
          ((cases.tested[cases.tested.length - day1][prefix] -
            cases.tested[cases.tested.length - day2][prefix]) /
            cases.tested[cases.tested.length - day2][prefix]) *
          100
        ).toFixed(2);
      } else {
        return (
          ((cases.cases_time_series[cases.cases_time_series.length - day1][
            prefix
          ] -
            cases.cases_time_series[cases.cases_time_series.length - day2][
              prefix
            ]) /
            cases.cases_time_series[cases.cases_time_series.length - day2][
              prefix
            ]) *
          100
        ).toFixed(4);
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

          <br />
          <span className="h6 rounded-pill bg-dark text-white p-2">
            Today's statistics <FontAwesomeIcon icon={faArrowAltCircleDown} />
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
                  className="bg-white text-info"
                  style={{ width: "45%", borderTopLeftRadius: 20 }}
                >
                  Statistic
                </th>
                <th
                  scope="col"
                  className="bg-warning text-dark"
                  style={{ width: "30%" }}
                >
                  Data
                </th>
                <th
                  scope="col"
                  className="bg-white text-info"
                  style={{ width: "5%" }}
                >
                  <FontAwesomeIcon icon={faLongArrowAltUp} />
                  <FontAwesomeIcon icon={faLongArrowAltDown} />
                </th>
                <th
                  scope="col"
                  className="bg-white text-info"
                  style={{ width: "20%", borderTopRightRadius: 20 }}
                >
                  Change since yesterday
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row" className="font-weight">
                  Days since first case{" "}
                </th>
                <td>
                  {(cases.cases_time_series.length / 30) | 0} months*,{" "}
                  {cases.cases_time_series.length % 30} days (First case on 30
                  January)
                </td>
                <td>
                  <FontAwesomeIcon
                    className="text-success"
                    icon={faArrowCircleUp}
                  />
                </td>
                <td>1 Day</td>
              </tr>

              <tr>
                <th scope="row" className="font-weight">
                  Doubling rate (approx)
                </th>
                <td>
                  {doublingRate} days ({halfCases} cases on {halfCasesDate})
                </td>
                <td>{setSymbolStats(doublingRate - doublingRateyesterday)}</td>
                <td>
                  {(
                    ((doublingRate - doublingRateyesterday) /
                      doublingRateyesterday) *
                    100
                  ).toFixed(2)}{" "}
                  % ({doublingRateyesterday} days)
                </td>
              </tr>

              <tr>
                <th scope="row" className="font-weight">
                  Last one lac cases crossed in{" "}
                </th>
                <td>
                  {lacDays} days ({lacCases} cases on {lacCasesDate})
                </td>
                <td>{setSymbolStats(lacDays - lacDaysyesterday)}</td>
                <td>
                  {(
                    ((lacDays - lacDaysyesterday) / lacDaysyesterday) *
                    100
                  ).toFixed(2)}{" "}
                  % ({lacDaysyesterday} days)
                </td>
              </tr>

              <tr>
                <th scope="row" className="font-weight">
                  Last 10 lac cases crossed in{" "}
                </th>
                <td>
                  {tenLacDays} days ({tenLacCases} cases on {tenLacCasesDate})
                </td>
                <td>{setSymbolStats(tenLacDays - tenLacDaysyesterday)}</td>
                <td>
                  {(
                    ((tenLacDays - tenLacDaysyesterday) / tenLacDaysyesterday) *
                    100
                  ).toFixed(2)}{" "}
                  % ({tenLacDaysyesterday} days)
                </td>
              </tr>

              <tr>
                <th scope="row" className="font-weight">
                  Percentage increase in total confirmed cases per day{" "}
                </th>
                <td>{percentageIncrease("totalconfirmed", 1, 2)} %</td>
                <td>
                  {setSymbolStats(
                    (percentageIncrease("totalconfirmed", 1, 2) -
                      percentageIncrease("totalconfirmed", 2, 3)) /
                      percentageIncrease("totalconfirmed", 2, 3)
                  )}
                </td>
                <td>
                  {(
                    ((percentageIncrease("totalconfirmed", 1, 2) -
                      percentageIncrease("totalconfirmed", 2, 3)) /
                      percentageIncrease("totalconfirmed", 2, 3)) *
                    100
                  ).toFixed(2)}{" "}
                  % ({percentageIncrease("totalconfirmed", 2, 3)} %)
                </td>
              </tr>

              <tr>
                <th scope="row" className="font-weight">
                  Percentage increase in total confirmed cases per month*{" "}
                </th>
                <td>{percentageIncrease("totalconfirmed", 1, 31)} %</td>
                <td>
                  {setSymbolStats(
                    (percentageIncrease("totalconfirmed", 1, 31) -
                      percentageIncrease("totalconfirmed", 2, 32)) /
                      percentageIncrease("totalconfirmed", 2, 32)
                  )}
                </td>
                <td>
                  {(
                    ((percentageIncrease("totalconfirmed", 1, 31) -
                      percentageIncrease("totalconfirmed", 2, 32)) /
                      percentageIncrease("totalconfirmed", 2, 32)) *
                    100
                  ).toFixed(2)}{" "}
                  % ({percentageIncrease("totalconfirmed", 2, 32)} %)
                </td>
              </tr>

              <tr>
                <th scope="row" className="font-weight">
                  Percentage increase in total recoveries per day{" "}
                </th>
                <td>{percentageIncrease("totalrecovered", 1, 2)} %</td>
                <td>
                  {setSymbolStats(
                    (percentageIncrease("totalrecovered", 1, 2) -
                      percentageIncrease("totalrecovered", 2, 3)) /
                      percentageIncrease("totalrecovered", 2, 3)
                  )}
                </td>
                <td>
                  {(
                    ((percentageIncrease("totalrecovered", 1, 2) -
                      percentageIncrease("totalrecovered", 2, 3)) /
                      percentageIncrease("totalrecovered", 2, 3)) *
                    100
                  ).toFixed(2)}{" "}
                  % ({percentageIncrease("totalrecovered", 2, 3)} %)
                </td>
              </tr>

              <tr>
                <th scope="row" className="font-weight">
                  Percentage increase in total deaths per day{" "}
                </th>
                <td>{percentageIncrease("totaldeceased", 1, 2)} %</td>
                <td>
                  {setSymbolStats(
                    (percentageIncrease("totaldeceased", 1, 2) -
                      percentageIncrease("totaldeceased", 2, 3)) /
                      percentageIncrease("totaldeceased", 2, 3)
                  )}
                </td>
                <td>
                  {(
                    ((percentageIncrease("totaldeceased", 1, 2) -
                      percentageIncrease("totaldeceased", 2, 3)) /
                      percentageIncrease("totaldeceased", 2, 3)) *
                    100
                  ).toFixed(2)}{" "}
                  % ({percentageIncrease("totaldeceased", 2, 3)} %)
                </td>
              </tr>

              <tr>
                <th scope="row" className="font-weight">
                  Total tests{" "}
                </th>
                <td>
                  {cases.tested[cases.tested.length - 1].totalsamplestested}{" "}
                  tests{" "}
                </td>
                <td>
                  {setSymbolStats(
                    cases.tested[cases.tested.length - 1].totalsamplestested -
                      cases.tested[cases.tested.length - 2].totalsamplestested
                  )}
                </td>
                <td>
                  {percentageIncrease("totalsamplestested", 1, 2)} % (
                  {cases.tested[cases.tested.length - 2].totalsamplestested}{" "}
                  tests)
                </td>
              </tr>

              <tr>
                <th scope="row" className="font-weight">
                  Tests per million{" "}
                </th>
                <td>
                  {cases.tested[cases.tested.length - 1].testspermillion} tests
                </td>
                <td>
                  {setSymbolStats(
                    cases.tested[cases.tested.length - 1].testspermillion -
                      cases.tested[cases.tested.length - 2].testspermillion
                  )}
                </td>
                <td>
                  {percentageIncrease("testspermillion", 1, 2)} % (
                  {cases.tested[cases.tested.length - 2].testspermillion} tests)
                </td>
              </tr>
            </tbody>
          </table>
          <span className="font-italic">*1 month = 30 days</span>
        </div>
      );
    };

    var currentCases =
      cases.cases_time_series[cases.cases_time_series.length - 1]
        .totalconfirmed;

    var i;

    var doublingRate = 0;
    for (i = cases.cases_time_series.length - 1; i >= 0; i--) {
      if (cases.cases_time_series[i].totalconfirmed <= currentCases / 2) {
        break;
      } else {
        var halfCases = cases.cases_time_series[i].totalconfirmed;
        var halfCasesDate = cases.cases_time_series[i].date;
        doublingRate += 1;
      }
    }

    var lacDays = 0;
    for (i = cases.cases_time_series.length - 1; i >= 0; i--) {
      if (cases.cases_time_series[i].totalconfirmed <= currentCases - 100000) {
        break;
      } else {
        var lacCases = cases.cases_time_series[i].totalconfirmed;
        var lacCasesDate = cases.cases_time_series[i].date;
        lacDays += 1;
      }
    }

    var tenLacDays = 0;
    for (i = cases.cases_time_series.length - 1; i >= 0; i--) {
      if (cases.cases_time_series[i].totalconfirmed <= currentCases - 1000000) {
        break;
      } else {
        var tenLacCases = cases.cases_time_series[i].totalconfirmed;
        var tenLacCasesDate = cases.cases_time_series[i].date;
        tenLacDays += 1;
      }
    }

    var currentCasesyesterday =
      cases.cases_time_series[cases.cases_time_series.length - 2]
        .totalconfirmed;

    var doublingRateyesterday = 0;
    for (i = cases.cases_time_series.length - 2; i >= 0; i--) {
      if (
        cases.cases_time_series[i].totalconfirmed <=
        currentCasesyesterday / 2
      ) {
        break;
      } else {
        // var halfCasesyesterday = cases.cases_time_series[i].totalconfirmed;
        // var halfCasesDateyesterday = cases.cases_time_series[i].date;
        doublingRateyesterday += 1;
      }
    }

    var lacDaysyesterday = 0;
    for (i = cases.cases_time_series.length - 2; i >= 0; i--) {
      if (
        cases.cases_time_series[i].totalconfirmed <=
        currentCasesyesterday - 100000
      ) {
        break;
      } else {
        // var lacCasesyesterday = cases.cases_time_series[i].totalconfirmed;
        // var lacCasesDateyesterday = cases.cases_time_series[i].date;
        lacDaysyesterday += 1;
      }
    }

    var tenLacDaysyesterday = 0;
    for (i = cases.cases_time_series.length - 2; i >= 0; i--) {
      if (
        cases.cases_time_series[i].totalconfirmed <=
        currentCasesyesterday - 1000000
      ) {
        break;
      } else {
        // var tenLacCasesyesterday = cases.cases_time_series[i].totalconfirmed;
        // var tenLacCasesDateyesterday = cases.cases_time_series[i].date;
        tenLacDaysyesterday += 1;
      }
    }

    return (
      <div>
        <br />
        <div className="h5">
          <FontAwesomeIcon icon={faLocationArrow} /> Welcome to the Covid19
          Statistics page!
        </div>
        <br />
        <div className="d-flex justify-content-around">
          <a
            href="/covid19/"
            className="h6 font-weight-bold bg-info w-25 mx-auto rounded-pill p-3 shadow-lg"
            style={{ color: "inherit" }}
          >
            <FontAwesomeIcon icon={faArrowAltCircleLeft} /> Go back to Covid19
            homepage{" "}
          </a>
          <a
            href="/covid19/stats/"
            className="h6 font-weight-bold"
            style={{ color: "inherit" }}
          >
            <FontAwesomeIcon icon={faSyncAlt} className="App-logo" />
            <br />
            Refresh to get the latest statistics!
          </a>
          <a
            href="/covid19/prediction/"
            className="h6 font-weight-bold bg-info w-25 mx-auto rounded-pill p-3 shadow-lg"
            style={{ color: "inherit" }}
          >
            Go to Covid19 prediction page{" "}
            <FontAwesomeIcon icon={faArrowAltCircleRight} />
          </a>
        </div>
        <span className="h6 font-weight-bold" style={{ color: "inherit" }}>
          All statistics are based on the data till{" "}
          {cases.cases_time_series[cases.cases_time_series.length - 1].date}
          <br />
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
      </div>
    );
  }

  return (
    <div>
      <br />
      <div className="h5">
        <FontAwesomeIcon icon={faLocationArrow} /> Welcome to the Covid19
        Statistics page!
      </div>
      <br />
      <div className="d-flex justify-content-around">
        <a
          href="/covid19/"
          className="h6 font-weight-bold bg-info w-25 mx-auto rounded-pill p-3 shadow-lg"
          style={{ color: "inherit" }}
        >
          <FontAwesomeIcon icon={faArrowAltCircleLeft} /> Go back to Covid19
          homepage{" "}
        </a>
        <a
          href="/covid19/stats/"
          className="h6 font-weight-bold"
          style={{ color: "inherit" }}
        >
          <FontAwesomeIcon icon={faSyncAlt} className="App-logo" />
          <br />
          Refresh to get the latest statistics!
        </a>
        <a
          href="/covid19/prediction/"
          className="h6 font-weight-bold bg-info w-25 mx-auto rounded-pill p-3 shadow-lg"
          style={{ color: "inherit" }}
        >
          Go to Covid19 prediction page{" "}
          <FontAwesomeIcon icon={faArrowAltCircleRight} />
        </a>
      </div>
      <br />
      <br />
      <br />
      <h3>Loading Covid19 statistics table...</h3>
      <img src={require("./infinityloader.gif")} alt="Loading table..."></img>
    </div>
  );
}

export default Covid19Stats;
