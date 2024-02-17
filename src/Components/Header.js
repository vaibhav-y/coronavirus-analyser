import React, { useState } from "react";
import Navigation from "./Navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faSearch,
  faPhoneVolume,
  faHandHoldingHeart,
  faMoon,
  faSun,
} from "@fortawesome/free-solid-svg-icons";
// import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Covid19Navigation from "./Covid19/Covid19Navigation";

import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "./globalStyles";
import { lightTheme, darkTheme } from "./Theme";

function Header(props) {
  const [theme, setTheme] = useState(localStorage.getItem("storedTheme"));
  localStorage.setItem("storedTheme", theme);
  const themeToggler = () => {
    theme === "light" ? setTheme("dark") : setTheme("light");
  };

  return (
    <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
      <>
        <GlobalStyles />
        <nav
          className="navbar navbar-expand-lg mx-auto shadow-lg fixed-top"
          style={{
            // width: 1500,
            background:
              "linear-gradient(to right, black 10%, #001d27 30%, #004962 50%, #001d27 70%, black 90%)",
          }}
        >
          <a className="navbar-brand" href="/">
            <img
              src={require("./logo.jpeg")}
              alt="Vaibhav's site"
              height="30"
            ></img>
          </a>

          <div
            className="collapse navbar-collapse d-flex justify-content-around"
            id="navbarSupportedContent"
          >
            <ul className="navbar-nav">
              <li className="nav-item" id="navbar-home">
                <a className="nav-link text-white font-weight-bold" href="/">
                  <FontAwesomeIcon icon={faHome} className="" /> Home |
                </a>
              </li>
              <li className="nav-item" id="navbar-search">
                <a
                  className="nav-link text-white font-weight-bold"
                  href="/search/"
                >
                  <FontAwesomeIcon icon={faSearch} /> Search |
                </a>
              </li>
              <li className="nav-item" id="navbar-covid19">
                <a href className="nav-link text-white font-weight-bold">
                  <Covid19Navigation />
                </a>
              </li>
              <li className="nav-item" id="navbar-donate">
                <a
                  className="nav-link text-white font-weight-bold"
                  href="/donate/"
                >
                  <FontAwesomeIcon icon={faHandHoldingHeart} /> Donate |
                </a>
              </li>
              <li className="nav-item" id="navbar-contact">
                <a
                  className="nav-link text-white font-weight-bold"
                  href="/contact-us/"
                >
                  <FontAwesomeIcon icon={faPhoneVolume} /> Contact Us
                </a>
              </li>
            </ul>
          </div>
          <div className="text-white h5" style={{ width: 60 }}>
            <div type="button" onClick={themeToggler} className="">
              {theme === "light" ? (
                <FontAwesomeIcon icon={faMoon} />
              ) : (
                <FontAwesomeIcon icon={faSun} />
              )}
            </div>
          </div>
          <div className="text-white" style={{ width: 50 }}>
            <Navigation />
          </div>
        </nav>
      </>
    </ThemeProvider>
  );
}

export default Header;
