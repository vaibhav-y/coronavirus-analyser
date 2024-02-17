import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faHome,
  faSearch,
  faPhoneVolume,
  faHandHoldingHeart,
  faViruses,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";
import { useTransition, animated } from "react-spring";
import { BrowserRouter as Router } from "react-router-dom";

function Navigation() {
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
          width: 280,
          right: 10,
          top: 60,
          borderRadius: 15,
        }}
        // onMouseEnter={() => setShowMenu(true)}
        onMouseLeave={() => setShowMenu(false)}
        className="card position-fixed bg-dark text-white font-weight-light align-middle shadow-lg position-absolute border border-warning"
        id="menu"
      >
        <span
          className="card-header font bg-warning h5 text-dark font-italic"
          style={{ borderRadius: 15 }}
        >
          Menu
        </span>
        <Router>
          <div className="card-body h6">
            <a href="/" className="text-white">
              <FontAwesomeIcon icon={faHome} />
              <br />
              Home
              <br />
              (Counter Game)
            </a>
            <br />
            <br />
            <a
              href="/search/"
              className="text-dark d-block bg-warning rounded-pill p-2"
            >
              <FontAwesomeIcon icon={faSearch} />
              <br />
              Search
            </a>
            <br />
            <a href="/covid19/" className="text-white">
              <FontAwesomeIcon icon={faViruses} />
              <br />
              Covid19 homapage
            </a>
            <br />
            <br />
            <a
              href="/donate/"
              className="text-dark d-block bg-warning rounded-pill p-2"
            >
              <FontAwesomeIcon icon={faHandHoldingHeart} />
              <br />
              Donate
            </a>
            <br />
            <a href="/contact-us/" className="text-white">
              <FontAwesomeIcon icon={faPhoneVolume} />
              <br />
              Contact us
            </a>
          </div>
          <div className="card-footer text-muted font-italic h6">
            Copyright &copy; 2020.
          </div>
        </Router>
      </div>
    );
  }

  return showMenu ? (
    <nav className="h4">
      <FontAwesomeIcon
        role="button"
        icon={faTimesCircle}
        onClick={() => setShowMenu(!showMenu)}
        // onMouseEnter={() => setShowMenu(false)}
        // onMouseLeave={() => setShowMenu(false)}
      />
      {transitions.map(
        ({ item, key, props }) =>
          item && (
            <animated.div key={key} style={props}>
              {menu}
            </animated.div>
          )
      )}
    </nav>
  ) : (
    <nav className="h4">
      <FontAwesomeIcon
        role="button"
        icon={faBars}
        onClick={() => setShowMenu(!showMenu)}
        // onMouseEnter={() => setShowMenu(true)}
        // onMouseLeave={() => setShowMenu(false)}
      />
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

export default Navigation;
