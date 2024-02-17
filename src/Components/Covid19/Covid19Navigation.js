import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faViruses,
  faAngleDoubleDown,
  faAngleDoubleUp,
} from "@fortawesome/free-solid-svg-icons";
import { useTransition, animated } from "react-spring";
import { BrowserRouter as Router } from "react-router-dom";

function Covid19Navigation() {
  const [showMenu, setShowMenu] = useState(false);

  const transitions = useTransition(showMenu, null, {
    from: { position: "absolute", opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  });

  let menu;

  if (showMenu) {
    menu = (
      <div
        style={{
          // height: 550,
          // width: 280,
          //   right: 10,
          top: 60,
          borderRadius: 15,
        }}
        // onMouseEnter={() => setShowMenu(true)}
        onMouseLeave={() => setShowMenu(false)}
        className="card position-fixed bg-dark text-white font-weight-light align-middle shadow-lg position-absolute border border-warning mx-auto p-2"
        id="menu"
      >
        <Router>
          <br />
          <a href="/covid19/" className="h6 text-white">
            Covid19 homepage
          </a>
          <br />
          <a
            href="/covid19/dailycases/"
            className="h6 text-dark d-block bg-warning rounded p-2"
          >
            National daily cases
          </a>
          <br />
          <a href="/covid19/states/" className="h6 text-white">
            State-wise cases
          </a>
          <br />
          <a
            href="/covid19/timeseries/"
            className="h6 text-dark d-block bg-warning rounded p-2"
          >
            Covid19 timeseries
          </a>
          <br />
          <a href="/covid19/stats/" className="h6 text-white">
            Covid19 statistics
          </a>
          <br />
          <a
            href="/covid19/prediction/"
            className="h6 text-dark d-block bg-warning rounded p-2"
          >
            Covid19 prediction
          </a>
        </Router>
      </div>
    );
  }

  return (
    <nav>
      <FontAwesomeIcon
        icon={faViruses}
        role="button"
        onClick={() => setShowMenu(!showMenu)}
        onMouseEnter={() => setShowMenu(true)}
        // onMouseLeave={() => setShowMenu(false)}
      />{" "}
      <span
        role="button"
        onClick={() => setShowMenu(!showMenu)}
        onMouseEnter={() => setShowMenu(true)}
        // onMouseLeave={() => setShowMenu(false)}
      >
        Covid19
      </span>{" "}
      {showMenu ? (
        <FontAwesomeIcon
          icon={faAngleDoubleUp}
          className="small"
          role="button"
          onClick={() => setShowMenu(!showMenu)}
          onMouseEnter={() => setShowMenu(true)}
          // onMouseLeave={() => setShowMenu(false)}
        />
      ) : (
        <FontAwesomeIcon
          icon={faAngleDoubleDown}
          className="small"
          role="button"
          onClick={() => setShowMenu(!showMenu)}
          onMouseEnter={() => setShowMenu(true)}
          // onMouseLeave={() => setShowMenu(false)}
        />
      )}
      |
      {transitions.map(
        ({ item, key, props }) =>
          item && (
            <animated.div key={key} style={props}>
              {menu}
            </animated.div>
          )
      )}
    </nav>
  );
}

export default Covid19Navigation;
