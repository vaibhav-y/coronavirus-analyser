import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhoenixFramework } from "@fortawesome/free-brands-svg-icons";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Counter from "./Counter";
import Search from "./Search";
import Donation from "./Donation";
import Contact from "./Contact";
import Test from "./Test";
import Covid19Homepage from "./Covid19/Covid19Homepage";
import DailyData from "./Covid19/DailyData";
import StateWise from "./Covid19/State-wise";
import DistrictWise from "./Covid19/District-wise";
import Covid19Stats from "./Covid19/Covid19Stats";
import StatesTimeseries from "./Covid19/StatesTimeseries";
import DistrictsTimeseries from "./Covid19/DistrictsTimeseries";
import Prediction from "./Covid19/Prediction";

function Home(props) {
  return (
    <div className="">
      <Router>
        <Route>
          <Switch>
            <Route exact path="/">
              <div className="h3 font-weight-light">
                <br />
                <br />
                <FontAwesomeIcon icon={faPhoenixFramework} /> Created by:{" "}
                {props.creator}!
              </div>
              <Counter />
            </Route>

            <Route path="/search/">
              <div className="h3 font-weight-light">
                <br />
                <br />
                <FontAwesomeIcon icon={faPhoenixFramework} /> Created by:{" "}
                {props.creator}!
              </div>
              <Search />
            </Route>

            <Route exact path="/covid19/">
              <div className="h3 font-weight-light">
                <br />
                <br />
                <FontAwesomeIcon icon={faPhoenixFramework} /> Created by:{" "}
                {props.creator}!
              </div>
              <Covid19Homepage />
            </Route>

            <Route exact path="/covid19/dailycases/">
              <div className="h3 font-weight-light">
                <br />
                <br />
                <FontAwesomeIcon icon={faPhoenixFramework} /> Created by:{" "}
                {props.creator}!
              </div>
              <DailyData />
            </Route>

            <Route exact path="/covid19/states/">
              <div className="h3 font-weight-light">
                <br />
                <br />
                <FontAwesomeIcon icon={faPhoenixFramework} /> Created by:{" "}
                {props.creator}!
              </div>
              <StateWise />
            </Route>

            <Route exact path="/covid19/stats/">
              <div className="h3 font-weight-light">
                <br />
                <br />
                <FontAwesomeIcon icon={faPhoenixFramework} /> Created by:{" "}
                {props.creator}!
              </div>
              <Covid19Stats />
            </Route>

            <Route exact path="/covid19/timeseries/">
              <div className="h3 font-weight-light">
                <br />
                <br />
                <FontAwesomeIcon icon={faPhoenixFramework} /> Created by:{" "}
                {props.creator}!
              </div>
              <StatesTimeseries />
            </Route>

            <Route exact path="/covid19/timeseries/:chosenDate">
              <div className="h3 font-weight-light">
                <br />
                <br />
                <FontAwesomeIcon icon={faPhoenixFramework} /> Created by:{" "}
                {props.creator}!
              </div>
              <StatesTimeseries />
            </Route>

            <Route exact path="/covid19/timeseries/:chosenDate/:statecode">
              <div className="h3 font-weight-light">
                <br />
                <br />
                <FontAwesomeIcon icon={faPhoenixFramework} /> Created by:{" "}
                {props.creator}!
              </div>
              <DistrictsTimeseries />
            </Route>

            <Route exact path="/covid19/states/:statename">
              <div className="h3 font-weight-light">
                <br />
                <br />
                <FontAwesomeIcon icon={faPhoenixFramework} /> Created by:{" "}
                {props.creator}!
              </div>
              <DistrictWise />
            </Route>

            <Route exact path="/covid19/prediction/">
              <div className="h3 font-weight-light">
                <br />
                <br />
                <FontAwesomeIcon icon={faPhoenixFramework} /> Created by:{" "}
                {props.creator}!
              </div>
              <Prediction />
            </Route>

            <Route path="/donate/">
              <div className="h3 font-weight-light">
                <br />
                <br />
                <FontAwesomeIcon icon={faPhoenixFramework} /> Created by:{" "}
                {props.creator}!
              </div>
              <Donation />
            </Route>

            <Route path="/contact-us/">
              <div className="h3 font-weight-light">
                <br />
                <br />
                <FontAwesomeIcon icon={faPhoenixFramework} /> Created by:{" "}
                {props.creator}!
              </div>
              <Contact />
            </Route>

            <Route path="/test/">
              <div className="h3 font-weight-light">
                <br />
                <br />
                <FontAwesomeIcon icon={faPhoenixFramework} /> Created by:{" "}
                {props.creator}!
              </div>
              <Test />
            </Route>
          </Switch>
        </Route>
      </Router>
    </div>
  );
}

export default Home;
